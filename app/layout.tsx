import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import FloatingMenu from '@/components/FloatingMenu';

export const metadata: Metadata = {
  title: 'WebFlux Design | High-Performance Digital Architecture',
  description:
    'WebFlux Design creates modern, 60fps, SEO-optimized digital ecosystems for schools, coaching institutes, and brands. Lead architect Shreyansh Singhal.',
  keywords: [
    'WebFlux Design',
    'Shreyansh Singhal',
    'School Website Design',
    'Coaching Institute Websites',
    'High-Conversion Landing Pages',
    'Kinetic UI',
    'Next.js Portfolio',
    'Webora Style Agency',
  ],
  authors: [{ name: 'Shreyansh Singhal', url: 'https://webfluxdesign.in/' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'WebFlux Design | High-Performance Digital Architecture',
    description:
      'Premier web design & engineering studio specializing in 60fps kinetic UI, school portals, and high-converting commercial pages.',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative bg-[#020409] text-[#F3F7FE] antialiased selection:bg-[#185DF1]/40 selection:text-[#F3F7FE] overflow-x-hidden min-h-screen">
        {/* Soft slow-moving blue radial glows / ambient light in deep void */}
        <div className="ambient-void-mesh" aria-hidden="true">
          <div className="ambient-glow-orb-1" />
          <div className="ambient-glow-orb-2" />
          <div className="ambient-glow-orb-3" />
        </div>

        {/* Tactile film noise overlay (2-3% opacity) */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Minimal Corner Branding Header (NO traditional top navbar links bar) */}
        <header className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-between pointer-events-none">
          <Link
            href="/"
            className="flex items-center gap-3 group pointer-events-auto cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:border-[#185DF1]/60 group-hover:shadow-[0_0_20px_rgba(24,93,241,0.4)]">
              <span className="font-heading font-black text-sm tracking-tight text-white">W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-heading font-bold text-white tracking-tight">
                WebFlux<span className="text-[#185DF1]">.</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 -mt-0.5">
                Design Studio
              </span>
            </div>
          </Link>

          {/* Minimal Availability Beacon in top-right */}
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#185DF1] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#185DF1] -ml-2" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
              Q4 Intake Open &bull; 60fps UI
            </span>
          </div>
        </header>

        {/* Main Application Content */}
        <main className="relative z-10 flex-1 pt-24 sm:pt-28">
          {children}
        </main>

        {/* Footer (strictly zero social icons) */}
        <Footer />

        {/* Floating Circular Bottom-Right Navigation Menu */}
        <FloatingMenu />
      </body>
    </html>
  );
}
