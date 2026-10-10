import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import FloatingNav from '@/components/FloatingNav';

export const metadata: Metadata = {
  title: 'WebFlux Design — Visually stunning websites for elite businesses.',
  description:
    'WebFlux Design architects ultra-minimalist, 60fps digital experiences and educational platforms for elite institutions and brands. Lead architect Shreyansh Singhal.',
  keywords: [
    'WebFlux Design',
    'Shreyansh Singhal',
    'Elite Web Design',
    'School Website Design',
    'Coaching Institute Portals',
    'Minimalist Agency',
    'Webora Aesthetic',
  ],
  authors: [{ name: 'Shreyansh Singhal', url: 'https://webfluxdesign.in/' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'WebFlux Design — Visually stunning websites for elite businesses.',
    description:
      'Ultra-minimalist web design and engineering studio. Pure black void, 60fps kinetic UI, sub-second latency.',
    url: 'https://webfluxdesign.in/',
    siteName: 'WebFlux Design',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-black">
      <head>
        {/* Anti-Clone Security: Synchronous protection against contextmenu and dragstart */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.addEventListener('contextmenu', function(e) { e.preventDefault(); return false; }, false);
                document.addEventListener('dragstart', function(e) { e.preventDefault(); return false; }, false);
              })();
            `,
          }}
        />

        {/* Client Security Shield */}
        <script src="/security-shield.min.js" async />

        {/* Clean Modern Fonts: Inter and Outfit only (No serif fonts) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative bg-black text-[#E2E8F0] antialiased overflow-x-hidden min-h-screen selection:bg-white/20 selection:text-white">
        {/* Pure CSS Faint Grid Background (Webora Style) */}
        <div className="bg-webora-grid" aria-hidden="true" />

        {/* Ultra-Minimal Top Header (No traditional top navbar links bar) */}
        <header className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-12 py-7 sm:py-9 flex items-center justify-between pointer-events-none">
          <Link
            href="/"
            className="pointer-events-auto flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-heading font-black text-sm group-hover:bg-white group-hover:text-black transition-all">
              W
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-sm tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                WebFlux<span className="text-zinc-500">.</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 -mt-0.5">
                Studio
              </span>
            </div>
          </Link>

          {/* Minimal Availability Indicator */}
          <div className="pointer-events-auto hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
              ✦ Q4 Commission Open &bull; 60fps
            </span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 pt-24 sm:pt-32">
          {children}
        </main>

        {/* Minimal Monochrome Footer */}
        <Footer />

        {/* Floating Circular Navigation Menu (Positioned safely above WhatsApp) */}
        <FloatingNav />
      </body>
    </html>
  );
}
