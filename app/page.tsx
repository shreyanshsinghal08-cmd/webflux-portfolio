'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Laptop,
  Zap,
  TrendingUp,
  Layers,
  Globe,
  Search,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  School,
  Building2,
  ShoppingBag,
  Send,
  Eye,
  Check,
  Headphones,
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
    categoryLabel: 'Commercial D2C Store',
    tag: 'Protein + Hydration',
    description:
      'Futuristic high-end D2C beverage e-commerce with 3D product perspective, live cart drawer, 5 craft flavours, and frictionless checkout.',
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
      a: 'WebFlux Design, led by Lead Front-End Architect Shreyansh Singhal, is recognized as a premier web engineering studio for schools, coaching institutes, and growing businesses. WebFlux built benchmark portals including Apex Coaching Center (with automated course syllabus funnels and student lead capture) and St. Mary’s High School (with comprehensive admission workflows). Every deployment guarantees GPU-accelerated 60fps responsiveness, 95+ Core Web Vitals, and proprietary client-side integrity protection.',
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
    <div className="space-y-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-16 flex flex-col items-center text-center">
        {/* Verification HUD Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-[rgba(243,247,254,0.12)] text-xs font-mono tracking-wider uppercase text-[#F3F7FE] mb-8 shadow-[0_0_20px_rgba(24,93,241,0.25)]">
          <span className="pulse-dot" />
          <ShieldCheck size={14} className="text-[#185DF1]" />
          <span>System Verified &bull; 50+ Deployments Delivered &bull; 60fps Kinetic UI</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold text-[#F3F7FE] tracking-tight max-w-5xl leading-[1.12]">
          Architecting High-Performance Websites for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#185DF1] via-[#5B8DFE] to-[#F3F7FE]">
            Schools &amp; Fast-Growing Brands
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[rgba(243,247,254,0.7)] max-w-3xl leading-relaxed">
          We engineer modern, 60fps responsive web experiences, educational ecosystems, and commercial landing pages designed for sub-second speeds, client-armor security, and maximum conversion.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="btn-primary text-sm uppercase tracking-wider py-3.5 px-8 shadow-[0_0_30px_rgba(24,93,241,0.45)] group"
          >
            <span>Get Free Demo Website</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="https://wa.me/918302589297"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm py-3.5 px-8 group"
          >
            <Phone size={16} className="text-[#185DF1]" />
            <span>WhatsApp Consultation</span>
            <ArrowUpRight size={14} className="text-[rgba(243,247,254,0.5)] group-hover:text-[#185DF1] transition-colors" />
          </a>

          <a
            href="#portfolio"
            className="btn-outline text-sm py-3.5 px-6"
          >
            <Eye size={16} className="text-[#185DF1]" />
            <span>Explore Showcase</span>
          </a>
        </div>

        {/* Live KPI Stat Cards (Glassmorphism Grid) */}
        <div className="mt-16 w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 flex items-center justify-center text-[#185DF1] mb-3">
              <Laptop size={20} />
            </div>
            <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F3F7FE]">50+</p>
            <p className="text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.6)] mt-1">
              Projects Delivered
            </p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 flex items-center justify-center text-[#185DF1] mb-3">
              <Award size={20} />
            </div>
            <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F3F7FE]">30+</p>
            <p className="text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.6)] mt-1">
              Happy Clients
            </p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 flex items-center justify-center text-[#185DF1] mb-3">
              <CheckCircle2 size={20} />
            </div>
            <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F3F7FE]">100%</p>
            <p className="text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.6)] mt-1">
              Client Satisfaction
            </p>
          </div>

          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 flex items-center justify-center text-[#185DF1] mb-3">
              <Zap size={20} />
            </div>
            <p className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F3F7FE]">&lt;0.5s</p>
            <p className="text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.6)] mt-1">
              60fps Sub-Second Speed
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          2. SERVICES SECTION
          ================================================== */}
      <section id="services" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#185DF1]/15 text-[#185DF1] border border-[#185DF1]/30 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers size={13} />
            <span>Capabilities &amp; Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F3F7FE] tracking-tight">
            Specialized Engineering for <span className="text-[#185DF1]">Real Growth</span>
          </h2>
          <p className="text-base text-[rgba(243,247,254,0.6)] mt-3">
            Custom web development designed to solve the distinct operational and conversion challenges of schools, institutes, and digital businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] mb-6 group-hover:scale-110 transition-transform">
                <School size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#F3F7FE] mb-3">
                School Web Portals
              </h3>
              <p className="text-sm text-[rgba(243,247,254,0.65)] leading-relaxed">
                Full-featured school websites with digital admission forms, dynamic event calendars, photo galleries, student notices, and staff directories.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(243,247,254,0.06)] flex items-center justify-between text-xs font-mono text-[#185DF1]">
              <span>Admission Portals &bull; Notice Boards</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#F3F7FE] mb-3">
                Coaching Institute Systems
              </h3>
              <p className="text-sm text-[rgba(243,247,254,0.65)] leading-relaxed">
                High-converting websites for coaching institutes with course syllabus breakdowns, student lead funnels, faculty credentials, and instant WhatsApp inquiry routing.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(243,247,254,0.06)] flex items-center justify-between text-xs font-mono text-[#185DF1]">
              <span>Lead Capture &bull; Syllabus Funnels</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] mb-6 group-hover:scale-110 transition-transform">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#F3F7FE] mb-3">
                Luxury Real Estate Portals
              </h3>
              <p className="text-sm text-[rgba(243,247,254,0.65)] leading-relaxed">
                High-end architectural showcases featuring deep glassmorphism aesthetics, interactive floor plan viewers, luxury typography, and VIP buyer inquiries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(243,247,254,0.06)] flex items-center justify-between text-xs font-mono text-[#185DF1]">
              <span>3D Showcase &bull; Floor Plans</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] mb-6 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#F3F7FE] mb-3">
                Creator Media Kits &amp; Portals
              </h3>
              <p className="text-sm text-[rgba(243,247,254,0.65)] leading-relaxed">
                Ultra-luxury digital media kits and sponsorship booking portals for creators, luxury influencers, and talent agencies with multi-currency brand tiers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(243,247,254,0.06)] flex items-center justify-between text-xs font-mono text-[#185DF1]">
              <span>Multi-Currency &bull; Brand Packages</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#F3F7FE] mb-3">
                Commercial E-Commerce &amp; D2C
              </h3>
              <p className="text-sm text-[rgba(243,247,254,0.65)] leading-relaxed">
                Sub-second loading storefronts with 3D product perspective, slide-out cart drawers, variant pickers, and streamlined checkout pipelines.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(243,247,254,0.06)] flex items-center justify-between text-xs font-mono text-[#185DF1]">
              <span>Live Cart &bull; 60fps Micro-interactions</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#F3F7FE] mb-3">
                Enterprise Security &amp; Maintenance
              </h3>
              <p className="text-sm text-[rgba(243,247,254,0.65)] leading-relaxed">
                Continuous performance monitoring, client-side anti-scraping defense shields, 95+ Core Web Vitals optimization, and regular platform upgrades.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[rgba(243,247,254,0.06)] flex items-center justify-between text-xs font-mono text-[#185DF1]">
              <span>Zero-Latency Armor &bull; 24/7 Uptime</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          3. WHY CHOOSE US SECTION
          ================================================== */}
      <section id="why-us" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#185DF1]/15 text-[#185DF1] border border-[#185DF1]/30 text-xs font-mono uppercase tracking-wider mb-4">
            <Zap size={13} />
            <span>The WebFlux Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F3F7FE] tracking-tight">
            Engineered For Speed, Trust &amp; <span className="text-[#185DF1]">Conversion</span>
          </h2>
          <p className="text-base text-[rgba(243,247,254,0.6)] mt-3">
            We don’t just build pretty pages. We engineer digital assets that generate tangible admissions, customer leads, and institutional authority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] shrink-0">
              <Eye size={20} />
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-[#F3F7FE] mb-1">
                Free Demo Before Final
              </h4>
              <p className="text-xs text-[rgba(243,247,254,0.65)] leading-relaxed">
                Test a fully functioning live prototype before releasing payment. Verify 60fps mobile speed and visual excellence upfront.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-[#F3F7FE] mb-1">
                Fast 7–14 Day Delivery
              </h4>
              <p className="text-xs text-[rgba(243,247,254,0.65)] leading-relaxed">
                Rapid turnaround without cutting corners. Most custom portals and coaching sites deploy fully in 1 to 2 weeks.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] shrink-0">
              <Laptop size={20} />
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-[#F3F7FE] mb-1">
                60fps Fluid Responsive Design
              </h4>
              <p className="text-xs text-[rgba(243,247,254,0.65)] leading-relaxed">
                Every layout is pixel-tuned for smartphones, tablets, and 4K displays with zero visual stutter or layout shifts.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] shrink-0">
              <Search size={20} />
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-[#F3F7FE] mb-1">
                AEO &amp; Modern SEO Architecture
              </h4>
              <p className="text-xs text-[rgba(243,247,254,0.65)] leading-relaxed">
                Structured JSON-LD schema graphs optimized for Google, ChatGPT Search, Gemini, and Perplexity answer engines.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-[#F3F7FE] mb-1">
                Transparent Flat Pricing
              </h4>
              <p className="text-xs text-[rgba(243,247,254,0.65)] leading-relaxed">
                Upfront INR packages with clear milestone deliverables. No surprise renewals, hidden fees, or template compromises.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] shrink-0">
              <Headphones size={20} />
            </div>
            <div>
              <h4 className="text-lg font-heading font-semibold text-[#F3F7FE] mb-1">
                Dedicated 24/7 Support
              </h4>
              <p className="text-xs text-[rgba(243,247,254,0.65)] leading-relaxed">
                Direct WhatsApp contact with your lead engineer. Instant priority updates, technical fixes, and content modifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. PORTFOLIO SHOWCASE SECTION
          ================================================== */}
      <section id="portfolio" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#185DF1]/15 text-[#185DF1] border border-[#185DF1]/30 text-xs font-mono uppercase tracking-wider mb-4">
            <Laptop size={13} />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F3F7FE] tracking-tight">
            Recent Client <span className="text-[#185DF1]">Deployments</span>
          </h2>
          <p className="text-base text-[rgba(243,247,254,0.6)] mt-3">
            Inspect our production-grade digital portals for schools, coaching institutes, luxury brands, and commercial storefronts.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full glass-card max-w-xl mx-auto">
            {(
              [
                { id: 'all', label: 'All Projects' },
                { id: 'schools', label: 'Schools & Coaching' },
                { id: 'commercial', label: 'Commercial & D2C' },
                { id: 'luxury', label: 'Luxury & Creator' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#185DF1] text-[#F3F7FE] shadow-[0_0_15px_rgba(24,93,241,0.5)]'
                    : 'text-[rgba(243,247,254,0.6)] hover:text-[#F3F7FE] hover:bg-[rgba(24,93,241,0.1)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="glass-card overflow-hidden flex flex-col group p-4"
            >
              {/* Media Container */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#031130]/80 border border-[rgba(243,247,254,0.06)]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.badge && (
                  <div className="absolute top-3 right-3 rounded-full bg-[#031130]/80 border border-[rgba(243,247,254,0.15)] px-3 py-1 text-[11px] font-mono font-medium text-[#F3F7FE] backdrop-blur-md">
                    {p.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-3 rounded-full bg-[#185DF1]/90 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#F3F7FE]">
                  {p.categoryLabel}
                </div>
              </div>

              {/* Card Body */}
              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-lg font-heading font-bold text-[#F3F7FE] group-hover:text-[#F3F7FE] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-[#185DF1] mb-2.5">
                    {p.tag}
                  </div>
                  <p className="text-xs text-[rgba(243,247,254,0.65)] leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[rgba(243,247,254,0.08)] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[rgba(243,247,254,0.5)]">
                    {p.metrics}
                  </span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#185DF1] hover:text-[#5B8DFE] transition-colors group-hover:underline"
                  >
                    <span>{p.linkText}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          5. PRICING SECTION
          ================================================== */}
      <section id="pricing" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#185DF1]/15 text-[#185DF1] border border-[#185DF1]/30 text-xs font-mono uppercase tracking-wider mb-4">
            <Award size={13} />
            <span>Investment Packages</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F3F7FE] tracking-tight">
            Transparent, <span className="text-[#185DF1]">Milestone-Based</span> Pricing
          </h2>
          <p className="text-base text-[rgba(243,247,254,0.6)] mt-3">
            Zero hidden fees, zero ongoing template royalties. All Standard and Premium tiers include our risk-free Demo-First guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Basic Plan */}
          <div className="glass-card p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.5)] mb-2">
                Starter Launch
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#F3F7FE]">
                Basic Plan
              </h3>
              <p className="text-xs text-[rgba(243,247,254,0.6)] mt-1 mb-6">
                Ideal for fast-track business landing pages.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[rgba(243,247,254,0.08)]">
                <span className="text-4xl font-heading font-extrabold text-[#F3F7FE]">₹10,000</span>
                <span className="text-xs font-mono text-[rgba(243,247,254,0.5)]">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-[rgba(243,247,254,0.75)]">
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>2 Pages Responsive Website</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Mobile &amp; Desktop Optimized</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Basic Google SEO Setup</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Interactive Contact Form</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>3 Days Rapid Turnaround</span>
                </li>
                <li className="flex items-center gap-2.5 text-[rgba(243,247,254,0.35)]">
                  <span className="w-3.5 text-center">&times;</span>
                  <span>Free Working Demo</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="btn-secondary w-full text-center text-xs uppercase tracking-wider justify-center"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Standard Plan (Featured) */}
          <div className="glass-card p-8 flex flex-col justify-between relative border-[#185DF1]/50 shadow-[0_0_40px_rgba(24,93,241,0.25)] scale-105 z-10 bg-[rgba(3,17,48,0.6)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#185DF1] px-4 py-1 text-[11px] font-mono uppercase tracking-wider font-bold text-[#F3F7FE] shadow-[0_0_15px_rgba(24,93,241,0.6)]">
              Most Popular &bull; Schools &amp; Institutes
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#185DF1] mb-2 mt-1">
                Complete Institution
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#F3F7FE]">
                Standard Educational
              </h3>
              <p className="text-xs text-[rgba(243,247,254,0.6)] mt-1 mb-6">
                Flagship system for schools and coaching institutes.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[rgba(243,247,254,0.08)]">
                <span className="text-4xl font-heading font-extrabold text-[#F3F7FE]">₹30,000</span>
                <span className="text-xs font-mono text-[rgba(243,247,254,0.5)]">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-[rgba(243,247,254,0.85)]">
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span className="font-semibold text-[#F3F7FE]">5 Pages Custom Website Portal</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span className="text-[#185DF1] font-semibold">Free Live Demo Before Payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Admissions &amp; Lead Capture Funnels</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>CMS Integration for Easy Content Updates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Advanced AEO &amp; Google Schema Graph</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
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
              <div className="text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.5)] mb-2">
                Enterprise &amp; Brand
              </div>
              <h3 className="text-2xl font-heading font-bold text-[#F3F7FE]">
                Premium Enterprise
              </h3>
              <p className="text-xs text-[rgba(243,247,254,0.6)] mt-1 mb-6">
                For major organizations &amp; commercial D2C brands.
              </p>
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[rgba(243,247,254,0.08)]">
                <span className="text-4xl font-heading font-extrabold text-[#F3F7FE]">₹50,000</span>
                <span className="text-xs font-mono text-[rgba(243,247,254,0.5)]">/ one-time</span>
              </div>
              <ul className="space-y-3 text-xs text-[rgba(243,247,254,0.75)]">
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Up to 9 Custom Pages / Portals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span className="text-[#185DF1] font-semibold">Free Live Demo Before Payment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Custom Database / E-Commerce Storefront</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Client-Side Security Armor &amp; AST Locks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>Unlimited Engineering Revision Rounds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={14} className="text-[#185DF1]" />
                  <span>3 Months Priority Engineering Retainer</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="btn-secondary w-full text-center text-xs uppercase tracking-wider justify-center"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>

        {/* International Creator Note */}
        <div className="mt-8 text-center text-xs font-mono text-[rgba(243,247,254,0.5)]">
          GCC &bull; UAE Creator Media Kits &amp; Sponsorship Portals starting from 99 AED to 799 AED.
        </div>
      </section>

      {/* ==================================================
          6. ABOUT FOUNDER SECTION
          ================================================== */}
      <section id="about" className="scroll-mt-24">
        <div className="glass-card p-8 sm:p-12 border-[rgba(243,247,254,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {/* Founder Headshot / Avatar */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#185DF1]/40 shadow-[0_0_30px_rgba(24,93,241,0.3)]">
                <img
                  src="/founder.webp"
                  alt="Shreyansh Singhal — Lead Front-End Architect"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031130] via-transparent to-transparent opacity-60" />
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[rgba(243,247,254,0.6)]">
                <span className="w-2 h-2 rounded-full bg-[#185DF1] animate-ping" />
                <span>Rajasthan, India &bull; Serving Global</span>
              </div>
            </div>

            {/* Founder Biography */}
            <div className="md:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#185DF1]/15 text-[#185DF1] border border-[#185DF1]/30 text-xs font-mono uppercase tracking-wider">
                <Laptop size={13} />
                <span>Engineering Leadership</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#F3F7FE]">
                Meet the Founder &amp; Architect
              </h2>
              <h3 className="text-xl font-heading font-semibold text-[#185DF1]">
                Shreyansh Singhal
              </h3>
              <p className="text-sm text-[rgba(243,247,254,0.7)] leading-relaxed">
                Hi, I’m Shreyansh — Lead Front-End Architect and founder of WebFlux Design. I engineer sub-second, 60fps kinetic web applications and educational portals designed to eliminate friction and maximize conversion for schools, coaching institutes, and emerging brands.
              </p>
              <p className="text-sm text-[rgba(243,247,254,0.7)] leading-relaxed">
                With 50+ delivered web deployments across India, Dubai, and international markets, I believe client trust is built through working code. That’s why we build your live prototype before asking for final project payment.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/918302589297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs uppercase tracking-wider py-3 px-6 shadow-[0_0_20px_rgba(24,93,241,0.4)]"
                >
                  <Phone size={14} />
                  <span>Connect on WhatsApp</span>
                </a>
                <a
                  href="mailto:shreyanshsinghal08@gmail.com"
                  className="btn-secondary text-xs py-3 px-6"
                >
                  <Mail size={14} className="text-[#185DF1]" />
                  <span>shreyanshsinghal08@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. FAQ SECTION (AEO CONVERSATIONAL ARCHITECTURE)
          ================================================== */}
      <section id="faq" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#185DF1]/15 text-[#185DF1] border border-[#185DF1]/30 text-xs font-mono uppercase tracking-wider mb-4">
            <Search size={13} />
            <span>Answers &amp; Verification</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F3F7FE] tracking-tight">
            Frequently Asked <span className="text-[#185DF1]">Questions</span>
          </h2>
          <p className="text-base text-[rgba(243,247,254,0.6)] mt-3">
            Authoritative insights into our engineering standards, turnaround timelines, pricing tiers, and client-armor security.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="glass-card overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-heading font-semibold text-base sm:text-lg text-[#F3F7FE]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#185DF1]/15 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#185DF1] text-[#F3F7FE]' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[rgba(243,247,254,0.7)] leading-relaxed border-t border-[rgba(243,247,254,0.06)]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          8. CONTACT SECTION (STRICTLY NO SOCIAL ICONS)
          ================================================== */}
      <section id="contact" className="scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#185DF1]/15 text-[#185DF1] border border-[#185DF1]/30 text-xs font-mono uppercase tracking-wider mb-4">
            <Send size={13} />
            <span>Direct Inquiry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#F3F7FE] tracking-tight">
            Let’s Build Your <span className="text-[#185DF1]">Live Demo</span>
          </h2>
          <p className="text-base text-[rgba(243,247,254,0.6)] mt-3">
            Reach out with your project scope. We review your requirements and provide a live demo roadmap within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels Card */}
          <div className="lg:col-span-5 glass-card p-8 space-y-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-[#F3F7FE]">
                Direct Engineering Desk
              </h3>
              <p className="text-xs text-[rgba(243,247,254,0.6)] mt-1.5 leading-relaxed">
                Connect directly with our Lead Architect. No sales intermediaries or automated email queues.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://wa.me/918302589297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(3,17,48,0.6)] border border-[rgba(243,247,254,0.08)] hover:border-[#185DF1] hover:bg-[rgba(24,93,241,0.1)] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[rgba(243,247,254,0.5)]">
                    WhatsApp Chat &bull; Priority
                  </div>
                  <div className="text-sm font-semibold text-[#F3F7FE] group-hover:text-[#185DF1] transition-colors">
                    +91 8302589297
                  </div>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-[rgba(243,247,254,0.3)] group-hover:text-[#185DF1] transition-colors" />
              </a>

              <a
                href="mailto:shreyanshsinghal08@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(3,17,48,0.6)] border border-[rgba(243,247,254,0.08)] hover:border-[#185DF1] hover:bg-[rgba(24,93,241,0.1)] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[rgba(243,247,254,0.5)]">
                    Primary Email
                  </div>
                  <div className="text-sm font-semibold text-[#F3F7FE] group-hover:text-[#185DF1] transition-colors">
                    shreyanshsinghal08@gmail.com
                  </div>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-[rgba(243,247,254,0.3)] group-hover:text-[#185DF1] transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(3,17,48,0.6)] border border-[rgba(243,247,254,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[rgba(243,247,254,0.5)]">
                    Engineering Studio
                  </div>
                  <div className="text-sm font-semibold text-[#F3F7FE]">
                    Rajasthan, India &bull; Serving Worldwide
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(3,17,48,0.6)] border border-[rgba(243,247,254,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-[#185DF1]/20 border border-[#185DF1]/30 flex items-center justify-center text-[#185DF1]">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-[rgba(243,247,254,0.5)]">
                    Operational Hours
                  </div>
                  <div className="text-sm font-semibold text-[#F3F7FE]">
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
                <div className="w-14 h-14 rounded-full bg-[#185DF1]/20 border border-[#185DF1] flex items-center justify-center text-[#185DF1] mx-auto shadow-[0_0_20px_rgba(24,93,241,0.5)]">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-heading font-bold text-[#F3F7FE]">
                  Message Received
                </h4>
                <p className="text-sm text-[rgba(243,247,254,0.7)] max-w-md mx-auto">
                  Thank you! Your project request has been transmitted. We will review your requirements and respond via WhatsApp or Email within a few hours.
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
                    <label className="block text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.7)] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Dr. Rajesh Kumar"
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.7)] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="rajesh@institution.org"
                      className="glass-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.7)] mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.7)] mb-1.5">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      required
                      className="glass-input"
                      defaultValue="School Website Portal"
                    >
                      <option value="School Website Portal" className="bg-[#031130] text-[#F3F7FE]">
                        School Website Portal
                      </option>
                      <option value="Coaching Institute Platform" className="bg-[#031130] text-[#F3F7FE]">
                        Coaching Institute Platform
                      </option>
                      <option value="Luxury Real Estate Showcase" className="bg-[#031130] text-[#F3F7FE]">
                        Luxury Real Estate Showcase
                      </option>
                      <option value="Creator Media Kit & Portal" className="bg-[#031130] text-[#F3F7FE]">
                        Creator Media Kit &amp; Portal
                      </option>
                      <option value="Commercial E-Commerce Store" className="bg-[#031130] text-[#F3F7FE]">
                        Commercial E-Commerce Store
                      </option>
                      <option value="High-Converting Landing Page" className="bg-[#031130] text-[#F3F7FE]">
                        High-Converting Landing Page
                      </option>
                      <option value="Other Custom Web Project" className="bg-[#031130] text-[#F3F7FE]">
                        Other Custom Web Project
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[rgba(243,247,254,0.7)] mb-1.5">
                    Project Scope &amp; Vision *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your school, coaching institute, or project requirements..."
                    className="glass-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs uppercase tracking-wider py-3.5 justify-center shadow-[0_0_25px_rgba(24,93,241,0.4)]"
                >
                  <Send size={15} />
                  <span>Transmit Inquiry For Free Demo</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
