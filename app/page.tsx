'use client';

import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  Layers,
  Search,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  GraduationCap,
  School,
  Building2,
  ShoppingBag,
  Send,
  Eye,
  Check,
  Headphones,
  Compass,
  Sparkles,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'schools' | 'commercial' | 'luxury' | 'all';
  categoryLabel: string;
  tag: string;
  description: string;
  image: string;
  metrics: string;
  link: string;
  linkText: string;
  badge?: string;
}

const projects: Project[] = [
  {
    id: 'wavv',
    title: 'WAVV™ Beverage',
    category: 'commercial',
    categoryLabel: 'Commercial D2C',
    tag: 'Protein + Hydration',
    description:
      'Futuristic high-end D2C beverage e-commerce with 3D product perspective, live cart drawer, 5 craft flavours, and frictionless checkout flow.',
    image: '/images/products/all_bottles.png',
    metrics: '5 Craft Flavours • Sub-Second Load',
    link: '/wevv-site.html',
    linkText: 'Explore Store',
    badge: 'Live Store',
  },
  {
    id: 'nova-estates',
    title: 'Nova Estates',
    category: 'luxury',
    categoryLabel: 'Luxury Real Estate',
    tag: 'Architectural Showcase',
    description:
      'High-end architectural showcase with deep glassmorphism aesthetics, ₹15.4 Cr – ₹26.8 Cr luxury pricing, floor plans, and VIP routing.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    metrics: '₹15.4 Cr – ₹26.8 Cr • VIP Routing',
    link: '/NOVAESTATES.html',
    linkText: 'View Project',
    badge: 'Client Demo',
  },
  {
    id: 'dubai-viibe',
    title: 'Dubai Viibe — Shankar Lal',
    category: 'luxury',
    categoryLabel: 'Luxury Media Kit',
    tag: '@dubai._viibe • Dubai Creator',
    description:
      'Ultra-luxury digital media kit & sponsorship portal featuring 6-tier brand packages, champagne-gold styling, and automated WhatsApp inquiry routing.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    metrics: '49.1k Reach • 6 Brand Tiers',
    link: '/contentcreator/index.html',
    linkText: 'Explore Media Kit',
    badge: 'VIP Showcase',
  },
  {
    id: 'st-marys',
    title: "St. Mary's High School",
    category: 'schools',
    categoryLabel: 'Educational Portal',
    tag: 'School Web Ecosystem',
    description:
      'Complete school web portal with online admission workflows, notice board, events calendar, and parent-student dashboards.',
    image: '/school.webp',
    metrics: 'Online Admissions • Notice System',
    link: '/st-marys-school/index.html',
    linkText: 'View Project',
    badge: 'Institutional',
  },
  {
    id: 'apex-coaching',
    title: 'Apex Coaching Center',
    category: 'schools',
    categoryLabel: 'Coaching Institute',
    tag: 'Lead Capture Funnel',
    description:
      'Specialized coaching institute website with automated course syllabus funnels, student lead capture, and performance metrics.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    metrics: '+200% Inquiries • Syllabus Funnel',
    link: '/apex-coaching/index.html',
    linkText: 'View Project',
    badge: 'High Conversion',
  },
  {
    id: 'techstart',
    title: 'TechStart Solutions',
    category: 'commercial',
    categoryLabel: 'Corporate SaaS',
    tag: 'Cloud & IT Consulting',
    description:
      'Corporate SaaS and technology consulting website with interactive lead generation, service modules, and client onboarding.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    metrics: 'Interactive Funnel • 60fps UI',
    link: '/techstart-solutions/index.html',
    linkText: 'View Project',
    badge: 'Enterprise',
  },
  {
    id: 'fitlife-pro',
    title: 'FitLife Pro',
    category: 'commercial',
    categoryLabel: 'Fitness Membership',
    tag: 'High-Converting Landing Page',
    description:
      'High-impact fitness program landing page featuring interactive membership calculators, transformation showcases, and signup flow.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    metrics: 'CRO Engineered • Fast Signups',
    link: '/fitlife-pro/index.html',
    linkText: 'View Project',
    badge: 'Campaign Page',
  },
  {
    id: 'global-school',
    title: 'Global Public School',
    category: 'schools',
    categoryLabel: 'School Portal',
    tag: 'Campus Virtual Tour',
    description:
      'Modern educational institution website featuring virtual campus tour, digital prospectus, faculty directory, and online syllabus.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    metrics: 'Virtual Campus • Digital Prospectus',
    link: '/global-public-school/index.html',
    linkText: 'View Project',
    badge: 'Institutional',
  },
  {
    id: 'greenleaf',
    title: 'GreenLeaf Organics',
    category: 'commercial',
    categoryLabel: 'Retail & E-Commerce',
    tag: 'Organic Storefront',
    description:
      'Ultra-fast organic products storefront with multi-category catalog filtering, quick-view cart drawer, and frictionless checkout flow.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    metrics: 'Instant Cart • Catalog Search',
    link: '/greenleaf-organics/index.html',
    linkText: 'View Project',
    badge: 'E-Commerce',
  },
];

export default function WebFluxHomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'schools' | 'commercial' | 'luxury'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredProjects =
    activeTab === 'all'
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const faqs = [
    {
      q: 'Who builds the best modern websites for schools and coaching institutes?',
      a: 'WebFlux Design, led by Lead Front-End Architect Shreyansh Singhal, is recognized as a premier web engineering studio for schools, coaching institutes, and elite businesses. WebFlux built benchmark portals including Apex Coaching Center (with automated course syllabus funnels and student lead capture) and St. Mary’s High School (with comprehensive admission workflows). Every deployment guarantees GPU-accelerated 60fps responsiveness, 95+ Core Web Vitals, and proprietary client-side integrity protection.',
    },
    {
      q: 'How does your risk-free "Demo Before Payment" guarantee work?',
      a: 'On our Standard (₹30,000) and Premium (₹50,000) tiers, WebFlux Design develops a fully functional, live prototype first. You test real page loading speeds, touch responsiveness, and user experience directly on your smartphone and desktop before releasing the project payment. There is zero financial risk to get started.',
    },
    {
      q: 'How fast can our custom website be delivered?',
      a: 'Our turnaround time is rapid and predictable: Fast-track 2-page websites are delivered in 3 days. Full custom school, coaching, and commercial multi-page platforms are engineered and launched in 7 to 14 business days, complete with structured AEO schema, mobile optimization, and client armor.',
    },
    {
      q: 'What makes WebFlux Design unique compared to generic agencies?',
      a: 'We combine aesthetic precision with technical engineering excellence: (1) 60fps Fluid Kinetic UI with smooth hardware-accelerated animations; (2) Multi-layer client hardening and anti-scraping integrity; (3) Answer Engine Optimization (AEO) designed for Google, ChatGPT, and Perplexity discovery; and (4) Our Demo-First guarantee so you inspect the working platform before paying.',
    },
    {
      q: 'What are the pricing options and what is included?',
      a: 'We believe in 100% transparent pricing without hidden monthly fees: Basic Plan starts at ₹10,000 (2 pages, 3-day turnaround); Standard Educational Plan is ₹30,000 (5 pages, CMS, free live demo before payment, 1 month support); and Premium Enterprise Plan is ₹50,000 for advanced institutions with e-commerce or custom databases. Luxury creator media kits for UAE and GCC clients start from 99 AED to 799 AED.',
    },
    {
      q: 'Do you work with international clients outside India?',
      a: 'Yes. WebFlux Design regularly collaborates with clients across Dubai, UAE, and the GCC region. Case studies include the Dubai Viibe (@dubai._viibe) ultra-luxury media kit and sponsorship portal, featuring multi-currency billing, tiered brand sponsorship packages, and automated WhatsApp inquiry routing.',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    fetch('https://formspree.io/f/xeewgrad', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          setFormSubmitted(true);
          form.reset();
        } else {
          alert('Submission received. We will get back to you shortly.');
        }
      })
      .catch(() => {
        setFormSubmitted(true);
      });
  };

  return (
    <div className="space-y-36 sm:space-y-44 max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pb-28">
      {/* ==================================================
          1. HERO SECTION (MINIMAL, POWERFUL & CENTERED - WEBORA STYLE)
          ================================================== */}
      <section className="relative pt-16 pb-28 sm:pt-28 sm:pb-36 flex flex-col items-center text-center">
        {/* Subtle Top Pill Badge */}
        <div className="pill-badge mb-8">
          <span>✦ Premium Web Design Studio</span>
        </div>

        {/* Massive, Clean, Pure White Headline (NO GRADIENT, NO RED, NO BLUE) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-[-0.04em] max-w-4xl leading-[1.06]">
          Visually stunning websites for elite businesses.
        </h1>

        {/* Crisp Subtitle in Soft Gray */}
        <p className="mt-7 text-base sm:text-xl text-[#A1A1AA] max-w-2xl font-normal leading-relaxed tracking-tight">
          We architect sub-second, 60fps digital experiences and educational platforms engineered for maximum enrollment, client retention, and Google dominance.
        </p>

        {/* Webora-Style Minimal Buttons - Exactly 2 Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="btn-primary text-xs uppercase tracking-wider py-3.5 px-8"
          >
            <span>Get Free Demo Website</span>
            <ArrowRight size={14} />
          </a>

          <a
            href="#portfolio"
            className="btn-secondary text-xs uppercase tracking-wider py-3.5 px-8"
          >
            <span>Explore Portfolio</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      {/* ==================================================
          2. EXOTIC "ABOUT" BENTO CARD (#about)
          Deep translucent black rgba(20,20,20,0.6), 30px blur,
          ultra-thin inner border, subtle white radial glow inside
          ================================================== */}
      <section id="about" className="scroll-mt-28">
        <div className="bento-card p-8 sm:p-14 relative overflow-hidden">
          {/* Subtle White Radial Glow inside */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-white/[0.035] rounded-full blur-[90px] pointer-events-none" />

          {/* Bento Header */}
          <div className="relative z-10 max-w-3xl mb-12">
            <div className="pill-badge mb-4">
              <span>✦ Studio Philosophy &bull; Architecture of Speed</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-[-0.03em] leading-tight">
              Engineering digital authority.
            </h2>
            <p className="text-sm font-mono text-zinc-400 mt-2">
              Founded &amp; Directed by Shreyansh Singhal — Lead Front-End Architect
            </p>
            <p className="text-sm sm:text-base text-zinc-400 mt-5 leading-relaxed font-normal">
              At WebFlux Design, we believe that every millisecond of latency diminishes trust and burns potential enrollments. We craft custom websites for schools, coaching institutes, and luxury brands using a zero-runtime, 60fps kinetic philosophy that guarantees maximum responsiveness across all hardware.
            </p>
          </div>

          {/* Bento Modular Pillars */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">
                01 &bull; Policy
              </span>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Demo-Before-Payment
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                We develop a fully functional live prototype first. You test 60fps mobile speed and visual excellence before releasing project payment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">
                02 &bull; Benchmark
              </span>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Sub-Second Speed
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                95+ Core Web Vitals, zero template bloat, client-armor AST security, and instant global edge caching with zero lag.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">
                03 &bull; Access
              </span>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Direct Architecture Desk
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Work directly with Lead Architect Shreyansh. No sales intermediaries, no delays, full transparent milestone delivery.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="relative z-10 mt-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-xs text-zinc-500">
              Studio: Rajasthan, India &bull; Worldwide Engagements
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/918302589297"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs uppercase tracking-wider py-2.5 px-6"
              >
                <span>Direct WhatsApp</span>
                <ArrowRight size={13} />
              </a>
              <a
                href="mailto:shreyanshsinghal08@gmail.com"
                className="btn-secondary text-xs uppercase tracking-wider py-2.5 px-6 font-mono"
              >
                <span>Email Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. PORTFOLIO SHOWCASE (#portfolio)
          ================================================== */}
      <section id="portfolio" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="pill-badge mb-4">
            <span>✦ Selected Works &bull; Flagship Deployments</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            Proof in production.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            Live client portals, educational platforms, and digital storefronts engineered by WebFlux Design.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bento-card max-w-lg mx-auto">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'schools', label: 'Schools & Coaching' },
                { id: 'commercial', label: 'Commercial & D2C' },
                { id: 'luxury', label: 'Luxury & Creator' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bento-card overflow-hidden flex flex-col group p-4"
            >
              {/* Media Container */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/[0.08]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <div className="absolute top-3 right-3 rounded-full bg-black/80 border border-white/20 px-2.5 py-0.5 text-[10px] font-mono text-white backdrop-blur-md">
                    {p.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 rounded-full bg-white text-black px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold">
                  {p.categoryLabel}
                </div>
              </div>

              {/* Card Body */}
              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mt-1 mb-2">
                    {p.tag}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-3">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {p.metrics}
                  </span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
                  >
                    <span>{p.linkText}</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          4. SERVICES SECTION (#services)
          ================================================== */}
      <section id="services" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>✦ Systems Architecture &bull; Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            Engineered for conversion.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            Specialized digital platforms built to convert visitors into enrolled students, booked clients, and loyal customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bento-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                <School size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                School Web Portals
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Full-featured educational portals with online admission forms, dynamic event calendars, photo galleries, student notices, and staff directories.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Online Admissions &bull; Notice System</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-white" />
            </div>
          </div>

          <div className="bento-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Coaching Institute Funnels
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                High-converting websites for coaching institutes with course syllabus breakdowns, student lead capture, faculty credentials, and instant WhatsApp inquiry routing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Lead Capture &bull; Syllabus Funnel</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-white" />
            </div>
          </div>

          <div className="bento-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                <Building2 size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Luxury Architectural Showcases
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                High-end architectural showcases featuring deep glassmorphism aesthetics, interactive floor plan viewers, luxury typography, and VIP buyer routing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Floor Plans &bull; VIP Routing</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-white" />
            </div>
          </div>

          <div className="bento-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                <Sparkles size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Creator Media Kits &amp; Portals
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Ultra-luxury digital media kits and sponsorship booking portals for creators, luxury influencers, and talent agencies with multi-currency brand tiers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Multi-Currency &bull; Brand Packages</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-white" />
            </div>
          </div>

          <div className="bento-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                <ShoppingBag size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Commercial E-Commerce &amp; D2C
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Sub-second loading storefronts with 3D product perspective, slide-out cart drawers, variant pickers, and streamlined checkout pipelines.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Live Cart &bull; 60fps Micro-interactions</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-white" />
            </div>
          </div>

          <div className="bento-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-105 transition-transform">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Enterprise Security &amp; Defense
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                Client-side anti-scraping defense shields, AST-level domain protection, 95+ Core Web Vitals optimization, and 24/7 uptime monitoring.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Zero-Latency Armor &bull; AST Locks</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. PRICING SECTION (#pricing)
          ================================================== */}
      <section id="pricing" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>✦ Milestone Billing &bull; Zero Surprises</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            Transparent pricing.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            No recurring template royalties, no surprise retainers. All Standard and Premium tiers include our risk-free demo guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Basic Plan */}
          <div className="bento-card p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                Starter Launch
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                Basic Plan
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-6 font-normal">
                Fast-track 2-page websites for small businesses.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                <span className="text-4xl font-heading font-extrabold text-white">₹10,000</span>
                <span className="text-xs font-mono text-zinc-500">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>2 Pages Responsive Website</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Mobile &amp; Desktop Optimized</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Basic SEO Setup &amp; Indexing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Contact Form Integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>3 Days Rapid Turnaround</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="btn-secondary w-full text-center text-xs uppercase tracking-wider justify-center"
              >
                Select Starter
              </a>
            </div>
          </div>

          {/* Standard Plan (Featured) */}
          <div className="bento-card p-8 flex flex-col justify-between relative border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] scale-105 z-10 bg-black/80">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-[10px] font-mono uppercase tracking-wider font-bold text-black shadow-md">
              Most Popular &bull; Schools &amp; Institutes
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                Full Educational Portal
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                Standard Educational
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-6 font-normal">
                Flagship system for schools and coaching centers.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                <span className="text-4xl font-heading font-extrabold text-white">₹30,000</span>
                <span className="text-xs font-mono text-zinc-500">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-200">
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span className="font-semibold text-white">5 Pages Custom Website Portal</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span className="text-white font-semibold">Free Live Demo Before Payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Admissions &amp; Lead Capture Funnels</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>CMS Integration for Easy Content Updates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Advanced AEO &amp; Google Schema Graph</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>1 Month Free Dedicated Engineering Support</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="btn-primary w-full text-center text-xs uppercase tracking-wider justify-center shadow-lg"
              >
                Claim Free Demo
              </a>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bento-card p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                Enterprise &amp; Brand
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                Premium Enterprise
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-6 font-normal">
                For major organizations &amp; commercial D2C brands.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                <span className="text-4xl font-heading font-extrabold text-white">₹50,000</span>
                <span className="text-xs font-mono text-zinc-500">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Up to 9 Custom Pages / Portals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span className="text-white font-semibold">Free Live Demo Before Payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Custom Database / E-Commerce Storefront</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Client-Side Security Armor &amp; AST Locks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>Unlimited Engineering Revision Rounds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-white" />
                  <span>3 Months Priority Engineering Retainer</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="btn-secondary w-full text-center text-xs uppercase tracking-wider justify-center"
              >
                Select Enterprise
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs font-mono text-zinc-500">
          GCC &bull; UAE Creator Media Kits &amp; Sponsorship Portals starting from 99 AED to 799 AED.
        </div>
      </section>

      {/* ==================================================
          6. FAQ SECTION (#faq)
          ================================================== */}
      <section id="faq" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>✦ AEO Knowledge &bull; Answers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            Frequently asked questions.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            Clear, authoritative details about our engineering standards, turnaround timelines, pricing, and safeguards.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bento-card overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-heading font-semibold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-white text-black border-transparent' : ''
                    }`}
                  >
                    <ChevronDown size={14} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.06] font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          7. CONTACT SECTION (#contact)
          ================================================== */}
      <section id="contact" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>✦ Direct Channel &bull; Start Your Project</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            Design the UI you will ship.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            Connect directly with Lead Architect Shreyansh Singhal. We review your requirements and provide preliminary demo architecture within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 bento-card p-8 space-y-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Engineering Desk
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed font-normal">
                Direct engineer-to-client consultation without sales intermediaries.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/918302589297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/30 hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    WhatsApp Chat &bull; Priority
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                    +91 8302589297
                  </div>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-zinc-600 group-hover:text-white transition-colors" />
              </a>

              <a
                href="mailto:shreyanshsinghal08@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/30 hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    Primary Email
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                    shreyanshsinghal08@gmail.com
                  </div>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-zinc-600 group-hover:text-white transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    Studio Headquarters
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    Rajasthan, India &bull; Serving Worldwide
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    Operational Hours
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    Mon – Sat: 9:00 AM – 8:00 PM IST
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bento-card p-8">
            {formSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white mx-auto shadow-lg">
                  <CheckCircle2 size={30} />
                </div>
                <h4 className="text-xl font-heading font-bold text-white">
                  Transmission Confirmed
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto font-normal">
                  Thank you. Your project scope has been received. Lead Architect Shreyansh will reach out via WhatsApp or Email within a few hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-secondary text-xs uppercase tracking-wider py-2.5 px-6"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Dr. Rajesh Kumar"
                      className="glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="rajesh@institution.org"
                      className="glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      required
                      className="glass-input text-xs"
                      defaultValue="School Website Portal"
                    >
                      <option value="School Website Portal" className="bg-[#050505] text-white">
                        School Website Portal
                      </option>
                      <option value="Coaching Institute Platform" className="bg-[#050505] text-white">
                        Coaching Institute Platform
                      </option>
                      <option value="Luxury Real Estate Showcase" className="bg-[#050505] text-white">
                        Luxury Real Estate Showcase
                      </option>
                      <option value="Creator Media Kit & Portal" className="bg-[#050505] text-white">
                        Creator Media Kit &amp; Portal
                      </option>
                      <option value="Commercial E-Commerce Store" className="bg-[#050505] text-white">
                        Commercial E-Commerce Store
                      </option>
                      <option value="High-Converting Landing Page" className="bg-[#050505] text-white">
                        High-Converting Landing Page
                      </option>
                      <option value="Other Custom Web Project" className="bg-[#050505] text-white">
                        Other Custom Web Project
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Project Scope &amp; Vision *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your school, coaching institute, or project requirements..."
                    className="glass-input text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs uppercase tracking-wider py-3.5 justify-center shadow-lg"
                >
                  <Send size={14} />
                  <span>Request Free Demo Prototype</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
