// Minimal Express server with Google OAuth (Passport) and phone verify endpoints (Twilio)
// Usage: set environment variables GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;
const verificationCodes = new Map();

function normalizePhone(phone) {
  return String(phone || '').trim();
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('Google client ID/secret not set. Google OAuth will not work until environment variables are configured. Demo session fallback is enabled.');
}

const googleStrategyConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
  callbackURL: '/auth/google/callback'
};

passport.use(new GoogleStrategy(googleStrategyConfig, (accessToken, refreshToken, profile, done) => {
  const user = {
    method: 'google',
    id: profile.id,
    name: profile.displayName,
    email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
    picture: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
    accessToken
  };
  return done(null, user);
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/auth/google', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    req.session.user = {
      method: 'google',
      name: 'Demo Google User',
      email: 'demo-google-user@example.com',
      demo: true
    };
    return res.redirect('/');
  }
  return passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })(req, res, next);
});

app.get('/auth/google/callback', (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    req.session.user = {
      method: 'google',
      name: 'Demo Google User',
      email: 'demo-google-user@example.com',
      demo: true
    };
    return res.redirect('/');
  }

  passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
    if (err || !user) {
      return res.redirect('/');
    }
    req.session.user = user;
    return res.redirect('/');
  })(req, res, next);
});

app.get('/auth/session', (req, res) => {
  if (req.session && req.session.user) {
    return res.json({ ok: true, user: req.session.user });
  }
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({ ok: true, user: req.user });
  }
  res.json({ ok: false });
});

app.post('/auth/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
    return;
  }
  res.json({ ok: true });
});

// Twilio phone verification endpoints (requires Twilio Verify service)
let twilioClient = null;
try {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (accountSid && authToken) {
    const Twilio = require('twilio');
    twilioClient = Twilio(accountSid, authToken);
  }
} catch (e) {
  console.warn('Twilio client not initialized:', e.message);
}

app.post('/auth/send-code', async (req, res) => {
  const phone = normalizePhone(req.body && req.body.phone);
  if (!phone) return res.status(400).json({ ok: false, error: 'phone required' });

  if (!twilioClient || !process.env.TWILIO_SERVICE_SID) {
    const code = generateOtp();
    verificationCodes.set(phone, { code, expiresAt: Date.now() + 5 * 60 * 1000 });
    console.log(`Demo verification code for ${phone}: ${code}`);
    return res.json({ ok: true, demoCode: code });
  }

  try {
    await twilioClient.verify.services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/auth/verify-code', async (req, res) => {
  const phone = normalizePhone(req.body && req.body.phone);
  const code = String(req.body && req.body.code || '').trim();

  if (!phone || !code) return res.status(400).json({ ok: false, error: 'phone and code required' });

  if (!twilioClient || !process.env.TWILIO_SERVICE_SID) {
    const record = verificationCodes.get(phone);
    if (record && Date.now() < record.expiresAt && record.code === code) {
      req.session.user = { method: 'phone', phone, demo: true };
      verificationCodes.delete(phone);
      return res.json({ ok: true, user: req.session.user });
    }
    return res.status(400).json({ ok: false, error: 'invalid code' });
  }

  try {
    const verificationCheck = await twilioClient.verify.services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === 'approved') {
      req.session.user = { method: 'phone', phone };
      return res.json({ ok: true, user: req.session.user });
    }

    res.status(400).json({ ok: false, error: 'invalid code' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log('Server running on port', PORT));

module.exports = app;
