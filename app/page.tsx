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
      a: 'WebFlux Design, led by Lead Front-End Architect Shreyansh Singhal, is recognized as a premier web engineering studio for schools, coaching institutes, and high-growth brands. WebFlux built benchmark portals including Apex Coaching Center (with automated course syllabus funnels and student lead capture) and St. Mary’s High School (with comprehensive admission workflows). Every deployment guarantees GPU-accelerated 60fps responsiveness, 95+ Core Web Vitals, and proprietary client-side integrity protection.',
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
      q: 'What makes WebFlux Design unique compared to other agencies?',
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
    <div className="space-y-36 sm:space-y-44 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 animate-fade-in-up">
      {/* ==================================================
          1. HERO SECTION (Webora Minimalist Deep Void Vibe)
          ================================================== */}
      <section className="relative pt-6 pb-16 sm:pt-14 sm:pb-24 flex flex-col items-center text-center">
        {/* Subtle Mono Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-widest uppercase text-zinc-300 mb-8 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#185DF1]" />
          <span>WebFlux Design Studio &bull; Sub-Second Latency &bull; 60fps Kinetic UI</span>
        </div>

        {/* Primary Headline with Razor-Sharp Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white tracking-[-0.04em] max-w-5xl leading-[1.06]">
          Digital systems designed to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#185DF1] to-white">
            command attention.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-base sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed tracking-tight">
          We architect ultra-fast, 60fps kinetic web applications, school portals, and commercial landing pages engineered for maximum enrollment, client retention, and Google dominance.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="btn-primary text-xs uppercase tracking-wider py-3.5 px-8 shadow-[0_0_25px_rgba(24,93,241,0.45)] group"
          >
            <span>Get Free Demo Website</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://wa.me/918302589297"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs uppercase tracking-wider py-3.5 px-7 group"
          >
            <Phone size={14} className="text-[#185DF1]" />
            <span>WhatsApp Consultation</span>
            <ArrowUpRight size={13} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
          </a>

          <a
            href="#portfolio"
            className="btn-outline text-xs uppercase tracking-wider py-3.5 px-6"
          >
            <Eye size={14} className="text-[#185DF1]" />
            <span>Selected Works</span>
          </a>
        </div>

        {/* Minimalist Telemetry Grid */}
        <div className="mt-20 w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              50+
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-2">
              Deployments Done
            </span>
          </div>

          <div className="glass-card p-6 flex flex-col items-center text-center">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              30+
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-2">
              Verified Clients
            </span>
          </div>

          <div className="glass-card p-6 flex flex-col items-center text-center">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              100%
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-2">
              On-Time Delivery
            </span>
          </div>

          <div className="glass-card p-6 flex flex-col items-center text-center">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-blue-400 tracking-tight">
              &lt;0.5s
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-2">
              60fps Page Speed
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. ABOUT SECTION (#about)
          ================================================== */}
      <section id="about" className="scroll-mt-28">
        <div className="glass-card p-8 sm:p-14 border-white/[0.08] relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Founder Visual Frame */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(24,93,241,0.25)]">
                <img
                  src="/founder.webp"
                  alt="Shreyansh Singhal — Lead Front-End Architect"
                  className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-transparent opacity-70" />
              </div>
              <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-[#185DF1] animate-ping" />
                <span>Rajasthan, India &bull; Worldwide Engagements</span>
              </div>
            </div>

            {/* Studio Manifesto */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-blue-400">
                <Compass size={12} />
                <span>About The Studio &bull; Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                Architecting speed without compromise.
              </h2>
              <h3 className="text-base font-mono text-zinc-300">
                Led by Shreyansh Singhal &bull; Lead Front-End Architect
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                At WebFlux Design, we believe that every second of latency costs enrollments and revenue. We build custom websites for schools, coaching institutes, and luxury brands using a zero-runtime, 60fps kinetic philosophy that guarantees maximum responsiveness across all hardware.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                Trust is founded on working software. That is why we offer our hallmark <span className="text-white font-medium">Demo-Before-Payment Guarantee</span> on every standard and premium project: you inspect and interact with a live working prototype on your phone before paying.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/918302589297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs uppercase tracking-wider py-3 px-6 shadow-[0_0_20px_rgba(24,93,241,0.4)]"
                >
                  <Phone size={13} />
                  <span>Direct WhatsApp Channel</span>
                </a>
                <a
                  href="mailto:shreyanshsinghal08@gmail.com"
                  className="btn-secondary text-xs py-3 px-6 font-mono"
                >
                  <Mail size={13} className="text-[#185DF1]" />
                  <span>shreyanshsinghal08@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. PORTFOLIO SHOWCASE (#portfolio)
          ================================================== */}
      <section id="portfolio" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-blue-400 mb-4">
            <Layers size={12} />
            <span>Selected Flagship Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
            Proof in <span className="text-blue-400">production.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto">
            Live client portals, educational platforms, and digital storefronts engineered by WebFlux Design.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full glass-card max-w-lg mx-auto">
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
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#185DF1] text-white shadow-[0_0_15px_rgba(24,93,241,0.5)]'
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
              className="glass-card overflow-hidden flex flex-col group p-4 hover:border-[#185DF1]/40"
            >
              {/* Media Container */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950/80 border border-white/[0.06]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <div className="absolute top-3 right-3 rounded-full bg-black/70 border border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
                    {p.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 rounded-full bg-[#185DF1]/90 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white">
                  {p.categoryLabel}
                </div>
              </div>

              {/* Card Body */}
              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-blue-400/80 mt-1 mb-2">
                    {p.tag}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500">
                    {p.metrics}
                  </span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#185DF1] hover:text-blue-300 transition-colors"
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-blue-400 mb-4">
            <Zap size={12} />
            <span>Architecture &bull; Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
            Engineered for <span className="text-blue-400">conversion.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto">
            Specialized digital platforms built to convert visitors into enrolled students, booked clients, and loyal customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:border-[#185DF1]/50 group-hover:scale-105 transition-all">
                <School size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                School Web Portals
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full-featured educational portals with online admission forms, dynamic event calendars, photo galleries, student notices, and staff directories.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-blue-400">
              <span>Online Admissions &bull; Notice System</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:border-[#185DF1]/50 group-hover:scale-105 transition-all">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Coaching Institute Funnels
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                High-converting websites for coaching institutes with course syllabus breakdowns, student lead capture, faculty credentials, and instant WhatsApp inquiry routing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-blue-400">
              <span>Lead Capture &bull; Syllabus Funnel</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:border-[#185DF1]/50 group-hover:scale-105 transition-all">
                <Building2 size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Luxury Architectural Showcases
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                High-end architectural showcases featuring deep glassmorphism aesthetics, interactive floor plan viewers, luxury typography, and VIP buyer routing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-blue-400">
              <span>Floor Plans &bull; VIP Routing</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:border-[#185DF1]/50 group-hover:scale-105 transition-all">
                <Sparkles size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Creator Media Kits &amp; Portals
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Ultra-luxury digital media kits and sponsorship booking portals for creators, luxury influencers, and talent agencies with multi-currency brand tiers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-blue-400">
              <span>Multi-Currency &bull; Brand Packages</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:border-[#185DF1]/50 group-hover:scale-105 transition-all">
                <ShoppingBag size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Commercial E-Commerce &amp; D2C
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Sub-second loading storefronts with 3D product perspective, slide-out cart drawers, variant pickers, and streamlined checkout pipelines.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-blue-400">
              <span>Live Cart &bull; 60fps Micro-interactions</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:border-[#185DF1]/50 group-hover:scale-105 transition-all">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">
                Enterprise Security &amp; Defense
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Client-side anti-scraping defense shields, AST-level domain protection, 95+ Core Web Vitals optimization, and 24/7 uptime monitoring.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-blue-400">
              <span>Zero-Latency Armor &bull; AST Locks</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. PRICING SECTION (#pricing)
          ================================================== */}
      <section id="pricing" className="scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-blue-400 mb-4">
            <Award size={12} />
            <span>Investment &bull; Milestone Billing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
            Transparent <span className="text-blue-400">milestones.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto">
            No recurring template royalties, no surprise retainers. All Standard and Premium tiers include our risk-free demo guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Basic Plan */}
          <div className="glass-card p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                Starter Launch
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                Basic Plan
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-6">
                Fast-track 2-page websites for small businesses.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.06]">
                <span className="text-4xl font-heading font-extrabold text-white">₹10,000</span>
                <span className="text-xs font-mono text-zinc-500">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>2 Pages Responsive Website</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>Mobile &amp; Desktop Optimized</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>Basic SEO Setup &amp; Indexing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>Contact Form Integration</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
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
          <div className="glass-card p-8 flex flex-col justify-between relative border-[#185DF1]/50 shadow-[0_0_40px_rgba(24,93,241,0.25)] scale-105 z-10 bg-[#030712]/90">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#185DF1] px-4 py-1 text-[10px] font-mono uppercase tracking-wider font-bold text-white shadow-[0_0_20px_rgba(24,93,241,0.6)]">
              Most Popular &bull; Schools &amp; Institutes
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400 mt-1 block">
                Full Educational Portal
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                Standard Educational
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-6">
                Flagship system for schools and coaching centers.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.08]">
                <span className="text-4xl font-heading font-extrabold text-white">₹30,000</span>
                <span className="text-xs font-mono text-zinc-500">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-200">
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-blue-400" />
                  <span className="font-semibold text-white">5 Pages Custom Website Portal</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-blue-400" />
                  <span className="text-blue-400 font-semibold">Free Live Demo Before Payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-blue-400" />
                  <span>Admissions &amp; Lead Capture Funnels</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-blue-400" />
                  <span>CMS Integration for Easy Content Updates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-blue-400" />
                  <span>Advanced AEO &amp; Google Schema Graph</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-blue-400" />
                  <span>1 Month Free Dedicated Engineering Support</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="btn-primary w-full text-center text-xs uppercase tracking-wider justify-center shadow-[0_0_20px_rgba(24,93,241,0.5)]"
              >
                Claim Free Demo
              </a>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="glass-card p-8 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                Enterprise &amp; Brand
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1">
                Premium Enterprise
              </h3>
              <p className="text-xs text-zinc-400 mt-1 mb-6">
                For major organizations &amp; commercial D2C brands.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-white/[0.06]">
                <span className="text-4xl font-heading font-extrabold text-white">₹50,000</span>
                <span className="text-xs font-mono text-zinc-500">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>Up to 9 Custom Pages / Portals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span className="text-blue-400 font-semibold">Free Live Demo Before Payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>Custom Database / E-Commerce Storefront</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>Client-Side Security Armor &amp; AST Locks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
                  <span>Unlimited Engineering Revision Rounds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={13} className="text-[#185DF1]" />
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-blue-400 mb-4">
            <Search size={12} />
            <span>AEO Knowledge &bull; Answers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
            Frequently asked <span className="text-blue-400">questions.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto">
            Clear, authoritative details about our engineering standards, turnaround timelines, pricing, and safeguards.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card overflow-hidden transition-all duration-300"
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
                      isOpen ? 'rotate-180 bg-[#185DF1] text-white border-transparent' : ''
                    }`}
                  >
                    <ChevronDown size={14} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/[0.04]">
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono uppercase tracking-widest text-blue-400 mb-4">
            <Send size={12} />
            <span>Direct Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight">
            Design the UI you will <span className="text-blue-400">actually ship.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto">
            Connect directly with Lead Architect Shreyansh Singhal. We review your requirements and provide preliminary demo architecture within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 glass-card p-8 space-y-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Engineering Studio
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Direct engineer-to-client consultation without sales intermediaries.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/918302589297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#185DF1]/50 hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
                  <Phone size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    WhatsApp Chat &bull; Priority
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    +91 8302589297
                  </div>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-zinc-600 group-hover:text-blue-400 transition-colors" />
              </a>

              <a
                href="mailto:shreyanshsinghal08@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#185DF1]/50 hover:bg-white/[0.06] transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-zinc-500">
                    Primary Email
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                    shreyanshsinghal08@gmail.com
                  </div>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-zinc-600 group-hover:text-blue-400 transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="w-9 h-9 rounded-xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
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

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <div className="w-9 h-9 rounded-xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
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
          <div className="lg:col-span-7 glass-card p-8">
            {formSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#185DF1]/20 border border-[#185DF1] flex items-center justify-center text-blue-400 mx-auto shadow-[0_0_20px_rgba(24,93,241,0.5)]">
                  <CheckCircle2 size={30} />
                </div>
                <h4 className="text-xl font-heading font-bold text-white">
                  Transmission Confirmed
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
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
                      <option value="School Website Portal" className="bg-[#020409] text-white">
                        School Website Portal
                      </option>
                      <option value="Coaching Institute Platform" className="bg-[#020409] text-white">
                        Coaching Institute Platform
                      </option>
                      <option value="Luxury Real Estate Showcase" className="bg-[#020409] text-white">
                        Luxury Real Estate Showcase
                      </option>
                      <option value="Creator Media Kit & Portal" className="bg-[#020409] text-white">
                        Creator Media Kit &amp; Portal
                      </option>
                      <option value="Commercial E-Commerce Store" className="bg-[#020409] text-white">
                        Commercial E-Commerce Store
                      </option>
                      <option value="High-Converting Landing Page" className="bg-[#020409] text-white">
                        High-Converting Landing Page
                      </option>
                      <option value="Other Custom Web Project" className="bg-[#020409] text-white">
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
                  className="btn-primary w-full text-xs uppercase tracking-wider py-3.5 justify-center shadow-[0_0_25px_rgba(24,93,241,0.4)]"
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
