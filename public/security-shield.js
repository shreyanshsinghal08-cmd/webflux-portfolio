/**
 * ==============================================================================================
 * PROPRIETARY & CONFIDENTIAL - CLIENT-SIDE INTEGRITY SHIELD
 * ==============================================================================================
 * File: security-shield.js
 * Version: 2.5.0-HARDENED
 * Architecture: Multi-Layer Anti-Scraping, Anti-Inspection & Domain Integrity Lock
 * Deployment: Load synchronously as the FIRST element inside <head> before any DOM or stylesheets.
 * ==============================================================================================
 */

(function (global) {
  'use strict';

  // ============================================================================================
  // 1. CONFIGURATION SPECIFICATION (FROZEN AT RUNTIME)
  // ============================================================================================
  const CONFIG = Object.freeze({
    // Domain Integrity Lock: Whitelist of authorized production & development hostnames
    ALLOWED_DOMAINS: [
      'webfluxdesign.in',
      'www.webfluxdesign.in',
      'localhost',
      '127.0.0.1',
      '0.0.0.0'
    ],

    // If false, loading via file:/// (local filesystem extraction/unzipping) triggers instant lockout
    ALLOW_FILE_PROTOCOL: false,

    // Feature toggles for granular control
    ENABLE_DOMAIN_LOCK: true,
    ENABLE_KEYBOARD_TRAP: true,
    ENABLE_DEVTOOLS_TRAP: true,
    ENABLE_CASUAL_PROTECTION: true,
    ENABLE_CONSOLE_SHIELD: true,
    ENABLE_WATERMARK: true,

    // Timing parameters (in milliseconds)
    DEVTOOLS_CHECK_INTERVAL: 150,
    DEBUGGER_TIMING_THRESHOLD: 100,

    // Cryptographic & Author Identity Metadata
    AUTHOR_SIGNATURE: {
      owner: 'WebFlux Design & VIZN Systems',
      licenseId: 'WF-SEC-2026-X8914-PRO',
      fingerprint: 'sha256:d8a5f013e9a7e6b05d15c26b713028d6c7e2b6a5e1c4e7f9a2b8d0c3e5f7a1b9',
      buildTimestamp: '2026-10-01T21:55:15Z',
      tamperThreshold: 3
    }
  });

  // Track violation state to prevent duplicate triggers
  let isLockoutActive = false;
  let devtoolsDetected = false;

  // ============================================================================================
  // 2. LAYER 1: DOMAIN INTEGRITY LOCK (ANTI-REHOSTING & ANTI-PIRACY)
  // ============================================================================================
  function verifyDomainIntegrity() {
    if (!CONFIG.ENABLE_DOMAIN_LOCK) return true;

    try {
      const currentProtocol = (global.location.protocol || '').toLowerCase();
      const currentHostname = (global.location.hostname || '').toLowerCase();

      // Block local filesystem execution (file:/// protocol)
      if (!CONFIG.ALLOW_FILE_PROTOCOL && (currentProtocol === 'file:' || !currentHostname)) {
        triggerLockout('UNAUTHORIZED_PROTOCOL_FILE_DETECTED', 'Local filesystem extraction detected.');
        return false;
      }

      // Check against domain whitelist (supports exact match & wildcard subdomains)
      const isDomainWhitelisted = CONFIG.ALLOWED_DOMAINS.some(allowed => {
        allowed = allowed.toLowerCase().trim();
        if (allowed === currentHostname) return true;
        // Allow subdomains if configured with wildcard or standard subdomain matching
        if (allowed.startsWith('*.')) {
          const rootDomain = allowed.slice(2);
          return currentHostname.endsWith('.' + rootDomain) || currentHostname === rootDomain;
        }
        return false;
      });

      if (!isDomainWhitelisted) {
        triggerLockout('HOST_MISMATCH_PIRACY_DETECTED', `Domain [${currentHostname}] is not authorized.`);
        return false;
      }

      return true;
    } catch (e) {
      // Any error reading location (e.g. sandbox evasion) triggers lockout
      triggerLockout('ENVIRONMENT_MANIPULATION_DETECTED', 'Runtime integrity check failed.');
      return false;
    }
  }

  /**
   * Instantly purges DOM and mounts an unclosable, tamper-resistant legal lockout screen.
   */
  function triggerLockout(code, message) {
    if (isLockoutActive) return;
    isLockoutActive = true;

    // Neutralize standard timers to freeze client application activity
    try {
      const noop = function () {};
      global.setInterval = noop;
      global.setTimeout = noop;
      global.requestAnimationFrame = noop;
    } catch (err) {}

    // Function to render the unclosable legal lockout screen
    const renderLockoutScreen = () => {
      try {
        // Purge head contents (prevents further assets or scripts from executing)
        if (document.head) {
          document.head.innerHTML = '<title>SECURITY LOCKOUT // ACCESS RESTRICTED</title>';
        }

        // Wipe body innerHTML and apply tamper-proof fullscreen overlay
        const rootElement = document.body || document.documentElement;
        if (!rootElement) return;

        rootElement.innerHTML = `
          <div id="integrity-lockout-shield" style="
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: #090a0f !important;
            color: #e2e8f0 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', monospace !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 2147483647 !important;
            padding: 24px !important;
            box-sizing: border-box !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            pointer-events: auto !important;
            overflow: hidden !important;
          ">
            <div style="
              max-width: 640px !important;
              width: 100% !important;
              background: #11141e !important;
              border: 1px solid rgba(239, 68, 68, 0.4) !important;
              box-shadow: 0 0 60px rgba(239, 68, 68, 0.15), 0 20px 40px rgba(0,0,0,0.8) !important;
              border-radius: 12px !important;
              padding: 40px 32px !important;
              text-align: center !important;
              position: relative !important;
            ">
              <!-- Warning Icon -->
              <div style="
                width: 68px !important;
                height: 68px !important;
                margin: 0 auto 24px !important;
                background: rgba(239, 68, 68, 0.12) !important;
                border: 2px solid #ef4444 !important;
                border-radius: 50% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              ">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>

              <!-- Header -->
              <h1 style="
                color: #ef4444 !important;
                font-size: 20px !important;
                font-weight: 700 !important;
                letter-spacing: 1.5px !important;
                text-transform: uppercase !important;
                margin: 0 0 12px !important;
              ">Integrity Lockout Enforced</h1>

              <div style="
                font-size: 15px !important;
                color: #f87171 !important;
                font-weight: 600 !important;
                margin-bottom: 20px !important;
                line-height: 1.5 !important;
              ">
                Unauthorized distribution detected. This source is cryptographically signed and registered.
              </div>

              <p style="
                color: #94a3b8 !important;
                font-size: 13.5px !important;
                line-height: 1.6 !important;
                margin: 0 0 24px !important;
              ">
                Execution of this web application has been permanently terminated because the hosting domain, network origin, or distribution container failed cryptographic signature verification.
              </p>

              <!-- Diagnostic Block -->
              <div style="
                background: #090b10 !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                border-radius: 8px !important;
                padding: 14px 18px !important;
                text-align: left !important;
                font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
                font-size: 12px !important;
                color: #cbd5e1 !important;
                line-height: 1.8 !important;
                margin-bottom: 24px !important;
              ">
                <div><span style="color: #64748b;">VIOLATION_CODE :</span> <span style="color: #f87171;">${code}</span></div>
                <div><span style="color: #64748b;">ORIGIN_HOST    :</span> <span>${global.location.hostname || 'LOCAL_FILESYSTEM'}</span></div>
                <div><span style="color: #64748b;">LICENSE_KEY    :</span> <span>${CONFIG.AUTHOR_SIGNATURE.licenseId}</span></div>
                <div><span style="color: #64748b;">SIGNATURE_HASH :</span> <span style="color: #38bdf8;">${CONFIG.AUTHOR_SIGNATURE.fingerprint.substring(0, 24)}...</span></div>
                <div><span style="color: #64748b;">TIMESTAMP      :</span> <span>${new Date().toISOString()}</span></div>
              </div>

              <!-- Footer Legal Notice -->
              <div style="
                font-size: 11.5px !important;
                color: #64748b !important;
                line-height: 1.5 !important;
                border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
                padding-top: 16px !important;
              ">
                © ${new Date().getFullYear()} ${CONFIG.AUTHOR_SIGNATURE.owner}. All rights reserved.<br>
                Reverse-engineering, unauthorized re-hosting, scraping, or asset redistributing violates international intellectual property treaties.
              </div>
            </div>
          </div>
        `;
      } catch (renderError) {
        // Fallback for extremely strict sandboxes
        document.documentElement.innerHTML = '<h1 style="color:red;padding:40px;">UNAUTHORIZED DISTRIBUTION DETECTED</h1>';
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderLockoutScreen, { once: true });
    } else {
      renderLockoutScreen();
    }

    // Stop execution by throwing a fatal uncatchable termination error
    throw new Error('[SECURITY SHIELD] Execution aborted due to domain integrity policy violation.');
  }

  // ============================================================================================
  // 3. LAYER 2: DEVTOOLS & INSPECTION TRAP (ANTI-F12 / INSPECT ELEMENT)
  // ============================================================================================
  function setupKeyboardTrap() {
    if (!CONFIG.ENABLE_KEYBOARD_TRAP) return;

    // Intercept keyboard events in the CAPTURE phase before any listener can read them
    const blockShortcuts = function (event) {
      const e = event || global.event;
      const keyCode = e.keyCode || e.which;
      const key = (e.key || '').toLowerCase();
      const isCtrlOrMeta = e.ctrlKey || e.metaKey; // Windows 'Ctrl' or macOS 'Command'
      const isShift = e.shiftKey;

      // 1. F12 (DevTools)
      if (keyCode === 123 || key === 'f12') {
        killEvent(e);
        return false;
      }

      // 2. Ctrl/Cmd + Shift + I (Inspect Element)
      if (isCtrlOrMeta && isShift && (keyCode === 73 || key === 'i')) {
        killEvent(e);
        return false;
      }

      // 3. Ctrl/Cmd + Shift + J (Developer Console)
      if (isCtrlOrMeta && isShift && (keyCode === 74 || key === 'j')) {
        killEvent(e);
        return false;
      }

      // 4. Ctrl/Cmd + Shift + C (Element Selector Probe)
      if (isCtrlOrMeta && isShift && (keyCode === 67 || key === 'c')) {
        killEvent(e);
        return false;
      }

      // 5. Ctrl/Cmd + U (View Source)
      if (isCtrlOrMeta && (keyCode === 85 || key === 'u')) {
        killEvent(e);
        return false;
      }

      // 6. Ctrl/Cmd + S (Save Page Offline)
      if (isCtrlOrMeta && (keyCode === 83 || key === 's')) {
        killEvent(e);
        return false;
      }

      // 7. Ctrl/Cmd + P (Print / Save as PDF scraper)
      if (isCtrlOrMeta && (keyCode === 80 || key === 'p')) {
        killEvent(e);
        return false;
      }
    };

    function killEvent(e) {
      if (!e) return;
      if (e.preventDefault) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      e.returnValue = false;
    }

    // Attach to window and document in capture phase
    ['keydown', 'keyup', 'keypress'].forEach(eventType => {
      global.addEventListener(eventType, blockShortcuts, true);
      if (document) {
        document.addEventListener(eventType, blockShortcuts, true);
      }
    });
  }

  /**
   * Multi-Vector DevTools Open Detection Loop
   * Employs:
   *  A. Performance Timing Differential on dynamic debugger statement
   *  B. Console Dimension Delta (docked DevTools check)
   *  C. Console Object Getter / toString Probe (undocked DevTools check)
   */
  function setupDevToolsTrap() {
    if (!CONFIG.ENABLE_DEVTOOLS_TRAP) return;

    // Helper: Action taken when DevTools is active
    function onDevToolsOpen() {
      devtoolsDetected = true;
      try {
        console.clear();
      } catch (e) {}

      // Aggressive recursive debugger trap loop to freeze inspector thread
      (function triggerDebuggerTrap() {
        const loop = function () {
          try {
            // Function constructor prevents static compiler/bundler dead-code removal
            (function () {
              return false;
            })
              .constructor('debugger')();
          } catch (err) {}
        };
        for (let i = 0; i < 5; i++) {
          loop();
        }
      })();
    }

    // Vector A: Timing Differential Detection via Debugger Execution
    function checkTimingDifferential() {
      const startTime = performance.now();
      // Invoke debugger dynamically
      try {
        (function () {
          return true;
        })
          .constructor('debugger')();
      } catch (e) {}

      const duration = performance.now() - startTime;
      if (duration > CONFIG.DEBUGGER_TIMING_THRESHOLD) {
        onDevToolsOpen();
      }
    }

    // Vector B: Dimension Delta Detection (Docked Inspector)
    function checkDimensionDelta() {
      // Threshold: DevTools docking creates significant outer/inner delta
      const widthDelta = global.outerWidth - global.innerWidth > 160;
      const heightDelta = global.outerHeight - global.innerHeight > 160;
      if (widthDelta || heightDelta) {
        onDevToolsOpen();
      }
    }

    // Vector C: Console Object Getter Probe (Works for undocked/floating DevTools)
    const probeElement = document.createElement('div');
    Object.defineProperty(probeElement, 'id', {
      get: function () {
        onDevToolsOpen();
        return 'security-probe';
      },
      configurable: true
    });

    function checkConsoleProbe() {
      // Browsers with devtools open evaluate DOM object getters when logged
      try {
        console.log(probeElement);
        console.clear();
      } catch (e) {}
    }

    // Run periodic scanner loop
    setInterval(() => {
      checkTimingDifferential();
      checkDimensionDelta();
      checkConsoleProbe();
    }, CONFIG.DEVTOOLS_CHECK_INTERVAL);
  }

  // ============================================================================================
  // 4. LAYER 3: CASUAL CLONING & ASSET SCRAPING PREVENTION
  // ============================================================================================
  function setupCasualProtection() {
    if (!CONFIG.ENABLE_CASUAL_PROTECTION) return;

    // 1. Globally disable Context Menu
    global.addEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      },
      true
    );

    // 2. Disable text selection and dragging via CSS Injection
    const injectProtectionStyles = () => {
      try {
        const style = document.createElement('style');
        style.id = 'shield-protection-rules';
        style.type = 'text/css';
        style.innerHTML = `
          /* Global selection lockout */
          *, *::before, *::after {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
          }
          /* Allow text selection only in designated editable form inputs */
          input, textarea, [contenteditable="true"] {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
          }
          /* Disable image dragging and asset extraction */
          img, picture, svg, video, canvas {
            -webkit-user-drag: none !important;
            user-drag: none !important;
            -webkit-touch-callout: none !important;
            pointer-events: auto !important;
          }
        `;
        (document.head || document.documentElement).appendChild(style);
      } catch (err) {}
    };

    if (document.head || document.documentElement) {
      injectProtectionStyles();
    } else {
      document.addEventListener('DOMContentLoaded', injectProtectionStyles, { once: true });
    }

    // 3. Disable text selection events
    global.addEventListener(
      'selectstart',
      function (e) {
        const target = e.target || e.srcElement;
        const tagName = (target.tagName || '').toLowerCase();
        // Allow form inputs to remain functional for legitimate users
        if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) {
          return true;
        }
        e.preventDefault();
        return false;
      },
      true
    );

    // 4. Disable clipboard copying
    global.addEventListener(
      'copy',
      function (e) {
        const target = e.target || e.srcElement;
        const tagName = (target.tagName || '').toLowerCase();
        if (tagName === 'input' || tagName === 'textarea' || target.isContentEditable) {
          return true;
        }
        e.preventDefault();
        if (e.clipboardData) {
          e.clipboardData.setData('text/plain', 'Source content is cryptographically protected by WebFlux Design.');
        }
        return false;
      },
      true
    );

    // 5. Disable asset dragstart (prevents dragging images onto desktop or into reverse-search)
    global.addEventListener(
      'dragstart',
      function (e) {
        e.preventDefault();
        return false;
      },
      true
    );
  }

  // ============================================================================================
  // 5. LAYER 4: WATERMARK & ASSET SIGNATURE PROTECTION
  // ============================================================================================
  function setupWatermarkAndBadge() {
    // 1. Console ASCII Author Badge
    if (CONFIG.ENABLE_CONSOLE_SHIELD) {
      try {
        const bannerStyles = [
          'color: #00f2fe',
          'background: #07090e',
          'font-size: 11px',
          'font-family: monospace',
          'padding: 8px 12px',
          'border: 1px solid #00f2fe',
          'border-radius: 4px',
          'display: block',
          'line-height: 1.4'
        ].join(';');

        const asciiBanner = `
 ███████╗███████╗ ██████╗██╗   ██╗██████╗ ██╗████████╗██╗   ██╗
 ██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝
 ███████╗█████╗  ██║     ██║   ██║██████╔╝██║   ██║    ╚████╔╝ 
 ╚════██║██╔══╝  ██║     ██║   ██║██╔══██╗██║   ██║     ╚██╔╝  
 ███████║███████╗╚██████╗╚██████╔╝██║  ██║██║   ██║      ██║   
 ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝      ╚═╝   
 [ ARCHITECTURE: CLIENT-SIDE HARDENING SHIELD v2.5 ]
 [ OWNER        : ${CONFIG.AUTHOR_SIGNATURE.owner} ]
 [ LICENSE TOKEN: ${CONFIG.AUTHOR_SIGNATURE.licenseId} ]
 [ FINGERPRINT  : ${CONFIG.AUTHOR_SIGNATURE.fingerprint.substring(0, 32)}... ]
 ---------------------------------------------------------------------
 NOTICE: All scripts, assets, styles and layouts are cryptographically
 registered. Unauthorized duplication, cloning, or distribution will
 trigger automated domain-lock and legal notice procedures.
        `;

        // Render banner
        console.log(`%c${asciiBanner}`, bannerStyles);
      } catch (e) {}
    }

    // 2. Invisible Randomized DOM Signature (Watermark)
    if (CONFIG.ENABLE_WATERMARK) {
      const injectSignature = () => {
        try {
          // Cryptographic meta tag
          const metaTag = document.createElement('meta');
          metaTag.setAttribute('name', 'x-content-integrity');
          metaTag.setAttribute('content', JSON.stringify({
            licensee: CONFIG.AUTHOR_SIGNATURE.owner,
            token: CONFIG.AUTHOR_SIGNATURE.licenseId,
            hash: CONFIG.AUTHOR_SIGNATURE.fingerprint,
            epoch: CONFIG.AUTHOR_SIGNATURE.buildTimestamp
          }));
          document.head.appendChild(metaTag);

          // Invisible DOM node with anti-tamper watermark
          const watermark = document.createElement('div');
          const randomId = 'sec_' + Math.random().toString(36).substring(2, 10);
          watermark.id = randomId;
          watermark.setAttribute('aria-hidden', 'true');
          watermark.setAttribute('data-sec-sig', CONFIG.AUTHOR_SIGNATURE.fingerprint);
          watermark.style.cssText = 'position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(1px,1px,1px,1px)!important;opacity:0.001!important;pointer-events:none!important;';
          watermark.innerHTML = `<!-- Registered to ${CONFIG.AUTHOR_SIGNATURE.owner} | Token: ${CONFIG.AUTHOR_SIGNATURE.licenseId} -->`;
          document.body.appendChild(watermark);

          // Self-defending MutationObserver: If watermark or shield style is tampered with, re-inject or lockout
          const observer = new MutationObserver(function (mutations) {
            for (let i = 0; i < mutations.length; i++) {
              const removedNodes = mutations[i].removedNodes;
              for (let j = 0; j < removedNodes.length; j++) {
                if (removedNodes[j] === watermark || removedNodes[j].id === 'shield-protection-rules') {
                  triggerLockout('TAMPER_ATTEMPT_DETECTED', 'Security watermark node was modified or removed.');
                  return;
                }
              }
            }
          });

          observer.observe(document.body, { childList: true, subtree: true });
          observer.observe(document.head, { childList: true, subtree: true });
        } catch (err) {}
      };

      if (document.body) {
        injectSignature();
      } else {
        document.addEventListener('DOMContentLoaded', injectSignature, { once: true });
      }
    }
  }

  // ============================================================================================
  // 6. INITIALIZATION & SELF-DEFENDING EXECUTION
  // ============================================================================================
  function initializeShield() {
    // Stage 1: Verify Domain Integrity first. If failed, execution is aborted immediately.
    const isValidOrigin = verifyDomainIntegrity();
    if (!isValidOrigin) return;

    // Stage 2: Initialize keyboard interceptors
    setupKeyboardTrap();

    // Stage 3: Setup active inspection countermeasures
    setupDevToolsTrap();

    // Stage 4: Apply casual scraping restrictions
    setupCasualProtection();

    // Stage 5: Inject cryptographic watermarks and console telemetry
    setupWatermarkAndBadge();
  }

  // Execute shield immediately
  initializeShield();

})(typeof window !== 'undefined' ? window : this);
