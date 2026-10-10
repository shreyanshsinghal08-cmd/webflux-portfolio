import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'WebFlux Design | High-Performance Websites for Schools, Coaching & Brands',
  description:
    'WebFlux Design creates modern, 60fps, SEO-optimized websites for schools, coaching institutes, and businesses. Lead architect Shreyansh Singhal.',
  keywords: [
    'WebFlux Design',
    'Shreyansh Singhal',
    'School Website Design',
    'Coaching Institute Websites',
    'High-Conversion Landing Pages',
    'Kinetic UI',
    'Next.js Portfolio',
  ],
  authors: [{ name: 'Shreyansh Singhal', url: 'https://webfluxdesign.in/' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'WebFlux Design | High-Performance Digital Experiences',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative bg-[#031130] text-[#F3F7FE] antialiased selection:bg-[#185DF1]/40 selection:text-[#F3F7FE] overflow-x-hidden min-h-screen">
        {/* Animated Gradient Mesh / Aurora Effect (Pure CSS 60fps GPU Accelerated) */}
        <div className="aurora-mesh" aria-hidden="true">
          <div className="aurora-orb-1" />
          <div className="aurora-orb-2" />
          <div className="aurora-orb-3" />
        </div>

        {/* Subtle Noise Texture Overlay (2-3% opacity) */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Main Application Shell */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
