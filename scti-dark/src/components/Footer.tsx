import { Mail, MapPin, Phone, Terminal } from "lucide-react";
import type { SVGProps } from "react";

const programLinks = [
  "Full-Stack Development",
  "Data Science & AI",
  "UI/UX Design",
  "Cyber Security",
  "Cloud & DevOps",
  "Digital Marketing",
];

const instituteLinks = ["About us", "Mentors", "Placement cell", "Careers", "Blog"];

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: LinkedinIcon, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/40 to-transparent" />
      <div className="container-x pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-mint to-mint-2 shadow-[0_0_26px_rgba(16,185,129,0.35)]">
                <Terminal size={16} strokeWidth={2.6} className="text-ink" />
              </span>
              <span className="leading-none">
                <span className="font-display text-[15px] font-bold tracking-tight text-frost">
                  Smart<span className="text-mint-2">Institute</span>
                </span>
                <span className="mt-1 block text-[8.5px] font-medium tracking-[0.26em] text-mist/60">
                  COMPUTER TRAINING
                </span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-mist">
              Building tech careers since 2016 — with live projects, honest
              mentorship and placements that actually happen.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="glass grid h-9 w-9 place-items-center rounded-xl text-mist transition-all duration-300 hover:border-mint/40 hover:text-mint-2"
                >
                  <Icon width={15} height={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-frost/80">
              Programs
            </h4>
            <ul className="mt-5 space-y-3">
              {programLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#courses"
                    className="text-[13.5px] text-mist transition-colors duration-300 hover:text-mint-2"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-frost/80">
              Institute
            </h4>
            <ul className="mt-5 space-y-3">
              {instituteLinks.map((l) => (
                <li key={l}>
                  <a
                    href="#why-us"
                    className="text-[13.5px] text-mist transition-colors duration-300 hover:text-mint-2"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-frost/80">
              Visit or call
            </h4>
            <ul className="mt-5 space-y-4 text-[13.5px] text-mist">
              <li className="flex gap-3">
                <MapPin size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-mint-2" />
                <span>
                  2nd Floor, Crystal Plaza,
                  <br />
                  MG Road — opposite Central Mall
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-mint-2" />
                <a href="tel:+919876543210" className="transition-colors hover:text-mint-2">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-mint-2" />
                <a
                  href="mailto:hello@smartinstitute.in"
                  className="transition-colors hover:text-mint-2"
                >
                  hello@smartinstitute.in
                </a>
              </li>
            </ul>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-[11px] font-medium text-mist">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint-2" />
              Campus open · Mon–Sat · 8 AM – 8 PM
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-7">
          <p className="text-[12px] text-mist/60">
            © 2026 Smart Computer Training Institute. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-mist/40">
            {"<"}built with mint{">"} — designed for the future
          </p>
          <div className="flex gap-6 text-[12px] text-mist/60">
            <a href="#top" className="transition-colors hover:text-mint-2">
              Privacy
            </a>
            <a href="#top" className="transition-colors hover:text-mint-2">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
