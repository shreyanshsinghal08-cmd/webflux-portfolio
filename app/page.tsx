'use client';

import { useState, useEffect } from 'react';
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
      q: 'What is WebFlux Design?',
      a: 'WebFlux Design is an elite web architecture studio led by Shreyansh Singhal. We specialize in engineering ultra-fast, visually captivating, 60fps digital experiences, institutional portals, and commercial web platforms built specifically for ambitious brands and institutions seeking digital dominance.',
    },
    {
      q: 'How is this different from standard templates or themes?',
      a: 'Unlike bloated WordPress themes or off-the-shelf templates weighed down by redundant scripts, insecure plugins, and generic styles, every WebFlux build is custom-engineered from the ground up using Next.js and Tailwind CSS. The result is instant sub-second page loads, 95+ Core Web Vitals, bespoke aesthetics, and clean maintainable code.',
    },
    {
      q: 'How is it different from generic AI website builders?',
      a: 'Generic AI builders produce cookie-cutter layouts with predictable typography, clunky animations, and unoptimized code structures that search engines penalize. We architect unique, human-crafted kinetic interfaces with cinematic motion design, intentional typographic hierarchy, and rock-solid production performance.',
    },
    {
      q: 'What do I actually get when the project is done?',
      a: 'You receive complete ownership of the full production codebase, optimized build artifacts, global CDN edge deployment setup (Vercel, Cloudflare, or AWS), custom domain & DNS configuration, automated lead capture workflows, SEO & AEO schema integrations, and comprehensive maintenance documentation.',
    },
    {
      q: 'Can I bring my existing branding and assets?',
      a: 'Yes, absolutely. We can seamlessly integrate your existing logo, typography rules, brand color palettes, and photography, elevating them into an ultra-modern, high-end design system. If you lack assets, we will architect pristine typography and visual assets tailored to your market.',
    },
    {
      q: 'Do you handle backend logic or just frontend?',
      a: 'We build end-to-end full-stack architectures. In addition to our signature 60fps frontend interfaces, we engineer secure backend APIs, database systems (PostgreSQL, Supabase, MongoDB), automated email & lead funnels, student enrollment management, authentication, and payment gateways like Razorpay and Stripe.',
    },
    {
      q: 'What does a custom project cost?',
      a: 'Our investment tiers are structured transparently with zero hidden fees. Rapid 2-page websites start at ₹10,000; comprehensive educational and institutional platforms are ₹30,000; and full-stack bespoke enterprise portals start at ₹50,000. On qualifying tiers, we build a free live working demo before you pay.',
    },
    {
      q: 'What is the timeline from start to launch?',
      a: 'Most standard projects are completed and ready for final review within 3 to 7 business days. Complex custom platforms with deep backend integrations or multi-stage admissions workflows typically launch within 10 to 14 business days.',
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-28 sm:space-y-44 max-w-6xl mx-auto px-4 sm:px-8 lg:px-10 pb-28">
      {/* ==================================================
          1. HERO SECTION (MINIMAL, POWERFUL & CENTERED - WEBORA STYLE)
          ================================================== */}
      <section className="relative pt-16 pb-28 sm:pt-28 sm:pb-36 flex flex-col items-center text-center">
        {/* Subtle Top Pill Badge */}
        <div className="pill-badge mb-8 animate-hero-pill">
          <span>✦ Premium Web Design Studio</span>
        </div>

        {/* Massive, Clean, Pure White Headline (Free, Open-Space Kinetic Typography - Zero Clipping Boxes) */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-[-0.04em] max-w-4xl leading-[1.1] select-none overflow-visible break-words">
          <span className="hero-free-word hero-word-1 text-draw-underline">Visually</span>{' '}
          <span className="hero-free-word hero-word-2">stunning</span>{' '}
          <span className="hero-free-word hero-word-3">websites</span>{' '}
          <span className="hero-free-word hero-word-4">for</span>{' '}
          <span className="hero-free-word hero-word-5">elite</span>{' '}
          <span className="hero-free-word hero-word-6">businesses.</span>
        </h1>

        {/* Crisp Subtitle in Soft Gray (Staggered Directional Slide & Landing Jump) */}
        <p className="mt-7 text-base sm:text-xl text-[#A1A1AA] max-w-2xl font-normal leading-relaxed tracking-tight">
          <span className="animate-subtext-left">We architect sub-second, 60fps digital experiences and educational platforms</span>{' '}
          <span className="animate-subtext-right">engineered for maximum enrollment, client retention, and Google dominance.</span>
        </p>

        {/* Webora-Style Minimal Buttons - Exactly 2 Buttons with Crazy Spring & Icon Kick */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-hero-buttons">
          <a
            href="#contact"
            className="btn-primary btn-crazy-spring text-xs uppercase tracking-wider py-3.5 px-8"
          >
            <span>Get Free Demo Website</span>
            <ArrowRight size={14} className="btn-icon-kick" />
          </a>

          <a
            href="#portfolio"
            className="btn-secondary btn-crazy-spring text-xs uppercase tracking-wider py-3.5 px-8"
          >
            <span>Explore Portfolio</span>
            <ArrowUpRight size={14} className="btn-icon-kick" />
          </a>
        </div>
      </section>

      {/* ==================================================
          2. EXOTIC "ABOUT" BENTO CARD (#about)
          Deep translucent black rgba(20,20,20,0.6), 30px blur,
          ultra-thin inner border, subtle white radial glow inside
          ================================================== */}
      <section id="about" className="scroll-mt-28 reveal-on-scroll">
        <div className="bento-card p-5 sm:p-14 relative overflow-hidden">
          {/* Subtle White Radial Glow inside */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-white/[0.035] rounded-full blur-[90px] pointer-events-none" />

          {/* Bento Header */}
          <div className="relative z-10 max-w-3xl mb-12">
            <div className="pill-badge mb-4">
              <span>✦ Studio Philosophy &bull; Architecture of Speed</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-[-0.03em] leading-tight">
              <span className="section-word section-word-left word-delay-1">Engineering</span>{' '}
              <span className="section-word section-word-pop word-delay-2">digital</span>{' '}
              <span className="section-word section-word-right word-delay-3">authority.</span>
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
                className="btn-primary btn-crazy-spring text-xs uppercase tracking-wider py-2.5 px-6"
              >
                <span>Direct WhatsApp</span>
                <ArrowRight size={13} className="btn-icon-kick" />
              </a>
              <a
                href="mailto:shreyanshsinghal08@gmail.com"
                className="btn-secondary btn-crazy-spring text-xs uppercase tracking-wider py-2.5 px-6 font-mono"
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
      <section id="portfolio" className="scroll-mt-28 reveal-on-scroll">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="pill-badge mb-4">
            <span>✦ Selected Works &bull; Flagship Deployments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            <span className="section-word section-word-left word-delay-1">Proof</span>{' '}
            <span className="section-word section-word-pop word-delay-2">in</span>{' '}
            <span className="section-word section-word-right word-delay-3">production.</span>
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
      <section id="services" className="scroll-mt-28 reveal-on-scroll">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>✦ Systems Architecture &bull; Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            <span className="section-word section-word-left word-delay-1">Engineered</span>{' '}
            <span className="section-word section-word-pop word-delay-2">for</span>{' '}
            <span className="section-word section-word-right word-delay-3">conversion.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            Specialized digital platforms built to convert visitors into enrolled students, booked clients, and loyal customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bento-card service-bento-card p-5 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="service-icon-box">
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

          <div className="bento-card service-bento-card p-5 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="service-icon-box">
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

          <div className="bento-card service-bento-card p-5 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="service-icon-box">
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

          <div className="bento-card service-bento-card p-5 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="service-icon-box">
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

          <div className="bento-card service-bento-card p-5 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="service-icon-box">
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

          <div className="bento-card service-bento-card p-5 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="service-icon-box">
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
      <section id="pricing" className="scroll-mt-28 reveal-on-scroll">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>✦ Milestone Billing &bull; Zero Surprises</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            <span className="section-word section-word-left word-delay-1">Transparent</span>{' '}
            <span className="section-word section-word-right word-delay-2">pricing.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            No recurring template royalties, no surprise retainers. All Standard and Premium tiers include our risk-free demo guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Basic Plan */}
          <div className="bento-card p-5 sm:p-8 flex flex-col justify-between">
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
                className="btn-secondary btn-crazy-spring w-full text-center text-xs uppercase tracking-wider justify-center"
              >
                Select Starter
              </a>
            </div>
          </div>

          {/* Standard Plan (Featured) */}
          <div className="bento-card p-5 sm:p-8 flex flex-col justify-between relative border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] md:scale-105 z-10 bg-black/80">
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
                className="btn-primary btn-crazy-spring w-full text-center text-xs uppercase tracking-wider justify-center shadow-lg"
              >
                Claim Free Demo
              </a>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bento-card p-5 sm:p-8 flex flex-col justify-between">
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
                className="btn-secondary btn-crazy-spring w-full text-center text-xs uppercase tracking-wider justify-center"
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
          6. FAQ SECTION (#faq - WEBORA STYLE VERTICAL ACCORDION LIST)
          ================================================== */}
      <section id="faq" className="scroll-mt-28 reveal-on-scroll">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            Everything you need to know about WebFlux Design and our process.
          </p>
        </div>

        {/* Webora.com Style: Sleek vertical list with thin subtle borders & smooth accordion */}
        <div className="max-w-3xl mx-auto divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-5 sm:py-6 text-left flex items-center justify-between gap-6 cursor-pointer group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-base sm:text-lg text-white group-hover:text-zinc-200 transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-zinc-500 group-hover:text-white shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'max-h-96 pb-6 pt-1 opacity-100' : 'max-h-0 pb-0 pt-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          7. CONTACT SECTION (#contact)
          ================================================== */}
      <section id="contact" className="scroll-mt-28 reveal-on-scroll">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="pill-badge mb-4">
            <span>✦ Direct Channel &bull; Start Your Project</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-[-0.03em]">
            <span className="section-word section-word-left word-delay-1">Design</span>{' '}
            <span className="section-word section-word-pop word-delay-2">the</span>{' '}
            <span className="section-word section-word-left word-delay-3">UI</span>{' '}
            <span className="section-word section-word-pop word-delay-4">you</span>{' '}
            <span className="section-word section-word-pop word-delay-5">will</span>{' '}
            <span className="section-word section-word-right word-delay-6">ship.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto font-normal">
            Connect directly with Lead Architect Shreyansh Singhal. We review your requirements and provide preliminary demo architecture within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 bento-card p-5 sm:p-8 space-y-6">
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
          <div className="lg:col-span-7 bento-card p-5 sm:p-8">
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
                  className="btn-primary btn-crazy-spring w-full text-xs uppercase tracking-wider py-3.5 justify-center shadow-lg"
                >
                  <Send size={14} className="btn-icon-kick" />
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
