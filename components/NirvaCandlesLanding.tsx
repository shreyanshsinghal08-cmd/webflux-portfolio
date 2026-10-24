'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  ArrowRight, 
  Leaf, 
  Flame, 
  ShieldCheck, 
  Gift, 
  Eye, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Volume2, 
  VolumeX, 
  Compass, 
  Check, 
  Menu, 
  Award,
  Instagram,
  Star
} from 'lucide-react';

interface CartItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  img: string;
  vessel: string;
}

interface ProductDetails {
  id: string;
  title: string;
  category: string;
  price: number;
  origPrice: number;
  desc: string;
  img: string;
  top: string;
  heart: string;
  base: string;
  burnTime: string;
  tag: string;
}

const PRODUCTS: Record<string, ProductDetails> = {
  'shell-pots': {
    id: 'shell-pots',
    title: 'Signature Wax Shell Pots',
    category: 'HAND-CAST STONEWARE CERAMIC',
    price: 1299,
    origPrice: 1599,
    desc: 'Inspired by coastal tranquility and organic fluted seashell architecture. Hand-cast in stoneware ceramic, poured with slow-cured natural soy wax and lead-free cotton wicks.',
    img: 'https://images.unsplash.com/photo-1619799360829-6689343ca0bb?auto=format&fit=crop&w=1200&q=85',
    top: 'Tahitian Vanilla & Crushed Sea Salt',
    heart: 'White Amber & Driftwood Blossom',
    base: 'Golden Sandalwood & Raw Honey',
    burnTime: '45 Hours Clean Burn',
    tag: 'Cult Favorite'
  },
  'festive-hamper': {
    id: 'festive-hamper',
    title: 'Luxury Festive Hampers',
    category: 'COMPLETE HEIRLOOM GIFTING RITUAL',
    price: 3499,
    origPrice: 4200,
    desc: 'Our crown signature gifting suite: 2x Amber Scented Jars, Solid Brass Antique Wick Trimmer, Match Apothecary Bottle with cork striker, and handwritten calligraphy note inside a keepsake wooden box tied with Italian velvet ribbon.',
    img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
    top: 'Sparkling Mandarin & Spiced Tonka',
    heart: 'Smoked Oud & French Jasmine',
    base: 'Aged Cedarwood & Cashmere Musk',
    burnTime: 'Complete Ritual Box',
    tag: 'Festive Deluxe'
  },
  'mahogany-jar': {
    id: 'mahogany-jar',
    title: 'Velvet Mahogany Jars',
    category: 'HEAVY AMBER APOTHECARY GLASS',
    price: 1699,
    origPrice: 1999,
    desc: 'Designed for quiet evenings and dimly lit sanctuaries. Heavy amber glassware crowned with an authentic crackling wood wick that crackles softly like a glowing winter hearth.',
    img: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1200&q=85',
    top: 'Dark Tonka Bean & Roasted Espresso',
    heart: 'Smoked Cedarwood & Cashmere Musk',
    base: 'Mahogany Hearth & Golden Amber',
    burnTime: '60 Hours Clean Burn',
    tag: 'Best for Evenings'
  },
  'rose-melts': {
    id: 'rose-melts',
    title: 'Floral & Rose Bliss Melts',
    category: 'FLAME-FREE BOTANICAL INFUSION',
    price: 899,
    origPrice: 1199,
    desc: 'Set of 12 hand-pressed botanical soy wax cubes infused with real French damask rose petals, dried jasmine buds, and wild Himalayan peonies. Melts into a slow aromatic sanctuary.',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    top: 'Rose Water & Italian Bergamot',
    heart: 'French Damask Rose Petals',
    base: 'Velvet Sandalwood & White Musk',
    burnTime: '80+ Hours Scent Throw',
    tag: 'Botanical Infusion'
  }
};

export default function NirvaCandlesLanding() {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'shell-pots',
      title: 'Signature Wax Shell Pots',
      price: 1299,
      qty: 1,
      img: 'https://images.unsplash.com/photo-1619799360829-6689343ca0bb?auto=format&fit=crop&w=300&q=80',
      vessel: 'Handmade Stoneware Ceramic'
    },
    {
      id: 'rose-melts',
      title: 'Floral & Rose Bliss Melts',
      price: 899,
      qty: 1,
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80',
      vessel: 'Set of 12 Botanical Cubes'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [isScentModalOpen, setIsScentModalOpen] = useState(false);
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'candles' | 'hampers' | 'melts'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [quizResult, setQuizResult] = useState<ProductDetails | null>(null);

  // Web Audio Context for Crackling Wick
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartTotalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const freeGiftThreshold = 1499;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToBag = (product: ProductDetails) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].qty += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          qty: 1,
          img: product.img,
          vessel: product.category
        }
      ];
    });
    setIsCartOpen(true);
    showToast(`Added "${product.title}" to your Scent Bag ✨`);
  };

  const updateItemQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from Scent Bag');
  };

  // Crackling Wood Wick Audio Synthesizer
  const toggleAmbientAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        audioIntervalRef.current = setInterval(() => {
          if (Math.random() > 0.4) {
            const bufferSize = ctx.sampleRate * 0.05;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
              output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
            }
            const whiteNoise = ctx.createBufferSource();
            whiteNoise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 850 + Math.random() * 1100;
            filter.Q.value = 3.0;

            const gain = ctx.createGain();
            gain.gain.value = 0.03 + Math.random() * 0.04;

            whiteNoise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            whiteNoise.start();
          }
        }, 120);

        setIsAudioPlaying(true);
        showToast('Playing gentle crackling wood wick atmosphere 🔥');
      } catch {
        showToast('Audio atmosphere enabled ✨');
        setIsAudioPlaying(true);
      }
    } else {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
      setIsAudioPlaying(false);
      showToast('Ambient wick paused');
    }
  };

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#2C241B] selection:bg-[#C2A89F] selection:text-[#FAF9F6] font-sans antialiased overflow-x-hidden">
      
      {/* 0. Top Announcement Bar */}
      <div className="bg-[#F4EFEA] text-[#2C241B]/80 text-[11px] sm:text-xs tracking-[0.2em] uppercase py-2.5 px-4 text-center border-b border-[#2C241B]/10 font-medium flex items-center justify-center gap-3 relative z-50">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
        <span className="truncate">Complimentary Botanical Wax Melt on orders above ₹1,499</span>
        <span className="hidden sm:inline text-[#D4AF37]">•</span>
        <span className="hidden sm:inline">Handcrafted in Micro-Batches</span>
        <span className="hidden md:inline text-[#D4AF37]">•</span>
        <span className="hidden md:inline">Express Pan-India Gifting</span>
      </div>

      {/* 1. Header */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#2C241B]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-[0.22em] font-medium text-[#2C241B]/75">
            <a href="#collections" className="hover:text-[#2C241B] transition-colors">Collections</a>
            <a href="#craftsmanship" className="hover:text-[#2C241B] transition-colors">The Craft</a>
            <a href="#scents" className="hover:text-[#2C241B] transition-colors">Fragrance Notes</a>
            <a href="#hampers" className="hover:text-[#2C241B] transition-colors">Gift Hampers</a>
          </nav>

          {/* Logo */}
          <a href="#" className="flex flex-col items-center group text-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#D4AF37] font-serif">✦</span>
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.26em] text-[#2C241B] group-hover:text-[#D4AF37] transition-colors">
                NIRVA
              </span>
              <span className="text-xs text-[#D4AF37] font-serif">✦</span>
            </div>
            <span className="text-[9px] tracking-[0.36em] uppercase text-[#8A7B6E] font-light mt-0.5">
              Artisanal Soy Candles
            </span>
          </a>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            
            {/* Scent Matcher Button */}
            <button
              onClick={() => setIsScentModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#FDFBF7] text-[#2C241B] hover:shadow-sm transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Scent Matcher</span>
            </button>

            {/* Crackling Wick Audio Toggle */}
            <button
              onClick={toggleAmbientAudio}
              title="Ambient Crackling Wood Wick"
              className={`w-9 h-9 rounded-full border border-[#2C241B]/15 flex items-center justify-center transition-all ${
                isAudioPlaying ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' : 'bg-[#F4EFEA]/80 text-[#2C241B]/70 hover:text-[#D4AF37]'
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => showToast('Saved to your private wishlist ✨')}
              className="w-9 h-9 rounded-full border border-[#2C241B]/15 bg-[#F4EFEA]/80 flex items-center justify-center text-[#2C241B]/70 hover:text-[#D4AF37] transition-all"
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 py-2 px-3.5 sm:px-4 rounded-full bg-[#2C241B] text-[#FDFBF7] hover:bg-[#231D16] shadow-md hover:scale-[1.02] active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.16em] font-medium hidden sm:inline">Bag</span>
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#2C241B] font-bold text-[10px] flex items-center justify-center">
                {cartTotalQty}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-xl border border-[#2C241B]/15 flex items-center justify-center text-[#2C241B]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FDFBF7] border-b border-[#2C241B]/10 px-6 py-6 transition-all">
            <div className="flex flex-col gap-4 text-xs uppercase tracking-[0.24em] font-medium text-[#2C241B]">
              <a href="#collections" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#2C241B]/10">Featured Collections</a>
              <a href="#craftsmanship" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#2C241B]/10">Our Craftsmanship</a>
              <a href="#scents" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#2C241B]/10">Fragrance Pyramid</a>
              <a href="#hampers" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-[#2C241B]/10">Luxury Hampers</a>
              <button
                onClick={() => { setIsScentModalOpen(true); setMobileMenuOpen(false); }}
                className="mt-2 w-full py-3 rounded-xl bg-[#F4EFEA] border border-[#D4AF37]/50 text-[#2C241B] font-serif normal-case text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Find Your Signature Intention Scent
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section (The Hook) */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24 px-5 sm:px-8">
        {/* Background Image & Soft Cream Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1920&q=85"
            alt="Warm aesthetic candle luxury lighting"
            className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[0.98] transition-transform duration-[20s] ease-out hover:scale-105 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/75 to-[#FAF9F6]/60 backdrop-blur-[1.5px]" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FDFBF7]/90 border border-[#D4AF37]/40 shadow-sm text-[#2C241B] text-[11px] sm:text-xs tracking-[0.24em] uppercase font-medium mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            <span>Artisanal Small-Batch Harvest 2026</span>
            <span className="text-[#D4AF37]">✦</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] text-[#2C241B] font-normal leading-[1.12] sm:leading-[1.1] tracking-tight max-w-4xl mb-6">
            Hand-poured with <span className="italic font-light">love</span> &amp; <span className="italic text-[#D4AF37]">intention</span> ✨
          </h1>

          <p className="font-sans text-sm sm:text-base md:text-lg text-[#6B5E52] font-light max-w-2xl leading-relaxed mb-10 sm:mb-12 tracking-wide px-2">
            Scented moments. Cozy spaces. Beautiful memories. Discover the art of handcrafted soy candles meticulously designed to turn everyday living into a sacred pause.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <a
              href="#collections"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-[#2C241B] text-[#FDFBF7] hover:bg-[#231D16] text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold hover:shadow-[0_10px_25px_-5px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#hampers"
              className="w-full sm:w-auto px-7 sm:px-9 py-4 rounded-2xl bg-[#FDFBF7]/90 hover:bg-[#F4EFEA] text-[#2C241B] border border-[#2C241B]/15 hover:border-[#D4AF37]/50 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium hover:scale-[1.01] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-2.5"
            >
              <span>Explore Festive Hampers</span>
              <Gift className="w-3.5 h-3.5 text-[#C2A89F]" />
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-[#2C241B]/10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-3xl text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#2C241B]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-[#2C241B]">100% Soy Wax</p>
                <p className="text-[10px] text-[#8A7B6E]">Pure botanical base</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#2C241B]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-[#2C241B]">Cruelty-Free</p>
                <p className="text-[10px] text-[#8A7B6E]">Phthalate-free &amp; vegan</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#2C241B]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-[#2C241B]">Crackling Wick</p>
                <p className="text-[10px] text-[#8A7B6E]">FSC wood &amp; cotton wicks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#2C241B]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-[#2C241B]">Made in India</p>
                <p className="text-[10px] text-[#8A7B6E]">Artisanal small-batches</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Collections (Bento Editorial Grid) */}
      <section id="collections" className="py-20 sm:py-28 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#2C241B]/10">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.26em] text-[#D4AF37] font-semibold block mb-2">
              ✦ Curated Pours &amp; Vessels
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C241B] font-normal leading-tight">
              The Signature Collection
            </h2>
            <p className="text-sm sm:text-base text-[#6B5E52] font-light mt-3">
              Each silhouette is poured in limited editions of 24 pieces, blending bespoke French and Himalayan essences into renewable soy wax.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            {(['all', 'candles', 'hampers', 'melts'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-[#2C241B] text-[#FDFBF7] font-semibold'
                    : 'bg-[#FDFBF7] hover:bg-[#F4EFEA] text-[#2C241B] border border-[#2C241B]/10 font-medium'
                }`}
              >
                {cat === 'all' ? 'All Pours' : cat === 'candles' ? 'Candles' : cat === 'hampers' ? 'Gift Hampers' : 'Wax Melts'}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Card 1: Shell Pots (Span 7) */}
          {(activeFilter === 'all' || activeFilter === 'candles') && (
            <div className="md:col-span-7 bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#2C241B]/10 shadow-sm hover:shadow-xl transition-all duration-700 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#F4EFEA] text-[10px] tracking-[0.2em] uppercase font-semibold text-[#2C241B] border border-[#2C241B]/10">
                    Cult Favorite • Limited Release
                  </span>
                  <span className="text-xs text-[#D4AF37] font-serif italic">45 Hours Burn</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241B] group-hover:text-[#D4AF37] transition-colors duration-500">
                  {PRODUCTS['shell-pots'].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E52] font-light mt-1.5">
                  Organic fluted sea-shell ceramic vessels hand-cast in stoneware, filled with Madagascar Vanilla Orchid, Sea Salt &amp; White Amber.
                </p>

                <div className="flex flex-wrap gap-2 mt-3.5 mb-6">
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-[#2C241B]/80">
                    Top: Tahitian Vanilla
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-[#2C241B]/80">
                    Heart: Sea Salt &amp; Driftwood
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-[#2C241B]/80">
                    Base: Golden Amber
                  </span>
                </div>
              </div>

              {/* Image Container with 105% Slow Zoom */}
              <div className="rounded-2xl relative aspect-[16/10] overflow-hidden my-2">
                <img
                  src={PRODUCTS['shell-pots'].img}
                  alt={PRODUCTS['shell-pots'].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <button
                  onClick={() => setSelectedProduct(PRODUCTS['shell-pots'])}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md text-[#2C241B] text-xs tracking-wider uppercase font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Inspect Notes</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#2C241B]/10 mt-4">
                <div>
                  <span className="text-xs text-[#8A7B6E] uppercase tracking-wider block">Artisan Stoneware Vessel</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-semibold text-[#2C241B]">₹1,299</span>
                    <span className="text-xs text-[#8A7B6E] line-through">₹1,599</span>
                  </div>
                </div>
                <button
                  onClick={() => addToBag(PRODUCTS['shell-pots'])}
                  className="px-6 py-3 rounded-xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-semibold hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Festive Hampers (Span 5) */}
          {(activeFilter === 'all' || activeFilter === 'hampers') && (
            <div className="md:col-span-5 bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#2C241B]/10 shadow-sm hover:shadow-xl transition-all duration-700 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#D4AF37]/15 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#2C241B] border border-[#D4AF37]/30">
                    Festive Edition ✦ Deluxe Box
                  </span>
                  <span className="text-xs text-[#D4AF37] font-serif italic">Complete Ritual</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241B] group-hover:text-[#D4AF37] transition-colors duration-500">
                  {PRODUCTS['festive-hamper'].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E52] font-light mt-1.5">
                  Our crown gifting suite: 2x Amber Scented Jars, Solid Brass Antique Wick Trimmer, Match Apothecary Bottle, and Italian velvet ribbon.
                </p>
              </div>

              <div className="rounded-2xl relative aspect-[4/3] overflow-hidden my-4">
                <img
                  src={PRODUCTS['festive-hamper'].img}
                  alt={PRODUCTS['festive-hamper'].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <button
                  onClick={() => setSelectedProduct(PRODUCTS['festive-hamper'])}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md text-[#2C241B] text-xs tracking-wider uppercase font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Inspect Notes</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-[#2C241B]/10">
                <div>
                  <span className="text-xs text-[#8A7B6E] uppercase tracking-wider block">Custom Keepsake Box</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-semibold text-[#2C241B]">₹3,499</span>
                    <span className="text-xs text-[#8A7B6E] line-through">₹4,200</span>
                  </div>
                </div>
                <button
                  onClick={() => addToBag(PRODUCTS['festive-hamper'])}
                  className="px-6 py-3 rounded-xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-semibold hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Velvet Mahogany Jars (Span 5) */}
          {(activeFilter === 'all' || activeFilter === 'candles') && (
            <div className="md:col-span-5 bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#2C241B]/10 shadow-sm hover:shadow-xl transition-all duration-700 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#F4EFEA] text-[10px] tracking-[0.2em] uppercase font-semibold text-[#2C241B] border border-[#2C241B]/10">
                    Best for Evenings
                  </span>
                  <span className="text-xs text-[#D4AF37] font-serif italic">60 Hours Burn</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241B] group-hover:text-[#D4AF37] transition-colors duration-500">
                  {PRODUCTS['mahogany-jar'].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E52] font-light mt-1.5">
                  Heavy amber glass jar with natural crackling wood wick. Smoked cedar, cashmere musk, dark tonka bean, and roasted espresso.
                </p>
              </div>

              <div className="rounded-2xl relative aspect-[4/3] overflow-hidden my-4">
                <img
                  src={PRODUCTS['mahogany-jar'].img}
                  alt={PRODUCTS['mahogany-jar'].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <button
                  onClick={() => setSelectedProduct(PRODUCTS['mahogany-jar'])}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md text-[#2C241B] text-xs tracking-wider uppercase font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Inspect Notes</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-[#2C241B]/10">
                <div>
                  <span className="text-xs text-[#8A7B6E] uppercase tracking-wider block">Heavy Apothecary Glass</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-semibold text-[#2C241B]">₹1,699</span>
                    <span className="text-xs text-[#8A7B6E] line-through">₹1,999</span>
                  </div>
                </div>
                <button
                  onClick={() => addToBag(PRODUCTS['mahogany-jar'])}
                  className="px-6 py-3 rounded-xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-semibold hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          )}

          {/* Card 4: Floral & Rose Bliss Melts (Span 7) */}
          {(activeFilter === 'all' || activeFilter === 'melts') && (
            <div className="md:col-span-7 bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 border border-[#2C241B]/10 shadow-sm hover:shadow-xl transition-all duration-700 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-[#C2A89F]/20 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#2C241B] border border-[#C2A89F]/30">
                    Botanical Infusion • 12 Cubes
                  </span>
                  <span className="text-xs text-[#D4AF37] font-serif italic">80+ Hours Throw</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241B] group-hover:text-[#D4AF37] transition-colors duration-500">
                  {PRODUCTS['rose-melts'].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5E52] font-light mt-1.5">
                  Hand-pressed botanical soy wax cubes embedded with French damask rose petals, dried jasmine buds, and wild Himalayan peonies.
                </p>

                <div className="flex flex-wrap gap-2 mt-3.5 mb-6">
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-[#2C241B]/80">
                    Top: Rose Water &amp; Bergamot
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-[#2C241B]/80">
                    Heart: French Damask Rose
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-[#2C241B]/80">
                    Base: Velvet Sandalwood
                  </span>
                </div>
              </div>

              <div className="rounded-2xl relative aspect-[16/10] overflow-hidden my-2">
                <img
                  src={PRODUCTS['rose-melts'].img}
                  alt={PRODUCTS['rose-melts'].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <button
                  onClick={() => setSelectedProduct(PRODUCTS['rose-melts'])}
                  className="absolute bottom-4 right-4 px-3.5 py-2 rounded-full bg-[#FDFBF7]/90 backdrop-blur-md text-[#2C241B] text-xs tracking-wider uppercase font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Inspect Notes</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-[#2C241B]/10 mt-4">
                <div>
                  <span className="text-xs text-[#8A7B6E] uppercase tracking-wider block">Set of 12 Botanical Cubes</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-semibold text-[#2C241B]">₹899</span>
                    <span className="text-xs text-[#8A7B6E] line-through">₹1,199</span>
                  </div>
                </div>
                <button
                  onClick={() => addToBag(PRODUCTS['rose-melts'])}
                  className="px-6 py-3 rounded-xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.16em] font-semibold hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. The Craftsmanship (Split-Screen About Section) */}
      <section id="craftsmanship" className="py-20 sm:py-32 bg-[#F4EFEA]/50 border-y border-[#2C241B]/10 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#2C241B]/10">
                <img
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85"
                  alt="Craftsman pouring hot soy wax into ceramic vessels"
                  className="w-full aspect-[4/5] object-cover object-center"
                />
              </div>

              {/* Floating Testimonial Quote */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-[#FAF9F6]/95 backdrop-blur-md p-6 rounded-2xl border border-[#D4AF37]/40 shadow-xl max-w-xs">
                <div className="flex items-center gap-1 mb-2 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="font-serif italic text-sm text-[#2C241B] leading-snug">
                  "The flame flickers like a quiet prayer. The entire living room transforms into a sanctuary of amber and rain."
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7B6E] font-semibold mt-3">
                  — Architectural Digest India
                </p>
              </div>

              {/* Batch Seal */}
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-[#FDFBF7] border-2 border-[#D4AF37]/50 shadow-md flex flex-col items-center justify-center text-center p-2">
                <span className="text-[8px] tracking-[0.16em] uppercase font-bold text-[#2C241B]">Batch No.</span>
                <span className="font-serif text-lg font-bold text-[#D4AF37]">24</span>
                <span className="text-[7px] tracking-[0.12em] uppercase text-[#8A7B6E]">Vessels Only</span>
              </div>
            </div>

            {/* Right Storytelling */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-semibold block mb-3">
                ✦ The Nirva Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#2C241B] font-normal leading-[1.15] mb-6">
                Ignite Your Intentions
              </h2>

              <p className="text-base sm:text-lg text-[#6B5E52] font-light leading-relaxed mb-6">
                Every Nirva candle is meticulously handcrafted using premium soy wax and cruelty-free fragrances. We don’t just make candles; <span className="text-[#2C241B] font-medium italic">we create a feeling</span>.
              </p>

              <p className="text-sm sm:text-base text-[#6B5E52]/90 font-light leading-relaxed mb-10">
                In an age of industrial rushing, our studio slows time down. Every single batch of wax is gently tempered by hand, blended with non-toxic IFRA-certified botanical essences, and poured into reusable stoneware jars designed to live forever in your home.
              </p>

              {/* 3 Minimal Points */}
              <div className="space-y-6 pt-4 border-t border-[#2C241B]/10">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] border border-[#2C241B]/10 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-sm">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2C241B]">
                      100% Soy Wax
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B5E52] font-light mt-1">
                      Harvested from sustainable, renewable soybean fields. Burns cleaner, cooler, and 50% slower than petroleum paraffin wax with zero black soot.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] border border-[#2C241B]/10 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-sm">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2C241B]">
                      Cruelty-Free
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B5E52] font-light mt-1">
                      Formulated without phthalates, parabens, petroleum, or synthetic dyes. 100% vegan ingredients never tested on innocent animals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] border border-[#2C241B]/10 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#2C241B]">
                      Handcrafted in India
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B5E52] font-light mt-1">
                      Honoring ancient artisan ceramic traditions and sacred botanicals. Hand-wicked, hand-stirred, and packaged with handwritten love in our studio.
                    </p>
                  </div>
                </div>

              </div>

              {/* Founder Sign-off */}
              <div className="mt-10 pt-6 border-t border-[#2C241B]/10 flex items-center justify-between">
                <div>
                  <p className="font-serif text-xl italic text-[#2C241B]">Aanya Sharma</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7B6E] font-medium">Founder &amp; Candle Architect</p>
                </div>
                <span className="text-xs text-[#D4AF37] tracking-[0.25em] font-serif">✦ NIRVA STUDIO ✦</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Olfactory Fragrance Pyramid */}
      <section id="scents" className="py-20 sm:py-28 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.26em] text-[#D4AF37] font-semibold block mb-2">
            ✦ The Sensory Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C241B] font-normal">
            The Anatomy of Our Aromas
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E52] font-light mt-3">
            Crafted like fine perfumery. As the soy wax melts into a warm pool, different botanical notes unveil themselves over hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#2C241B]/10 shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-sm mb-6 font-serif">
              01
            </div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold block mb-1">
              The First Breath (0 - 15 Mins)
            </span>
            <h3 className="font-serif text-2xl text-[#2C241B] font-medium mb-3">
              Top Notes
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5E52] font-light leading-relaxed mb-6">
              The initial delicate aura when unboxing and first lighting the wick. Crisp, sparkling, and awakening.
            </p>
            <div className="space-y-2 pt-4 border-t border-[#2C241B]/10 text-xs">
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Bergamot &amp; French Neroli</span>
                <span className="text-[#8A7B6E] text-[11px]">Sparkling Citrus</span>
              </div>
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Wild Damask Rose</span>
                <span className="text-[#8A7B6E] text-[11px]">Romantic Dew</span>
              </div>
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Crushed Himalayan Salt</span>
                <span className="text-[#8A7B6E] text-[11px]">Clean Breeze</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FDFBF7] rounded-3xl p-8 border-2 border-[#D4AF37]/50 shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#2C241B] font-bold flex items-center justify-center text-sm mb-6 font-serif">
              02
            </div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold block mb-1">
              The Soul of the Scent (15 - 60 Mins)
            </span>
            <h3 className="font-serif text-2xl text-[#2C241B] font-medium mb-3">
              Heart Notes
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5E52] font-light leading-relaxed mb-6">
              The true character that fills the room as the candle achieves a full melt pool. Luxurious, embracing, and warm.
            </p>
            <div className="space-y-2 pt-4 border-t border-[#2C241B]/10 text-xs">
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Madagascar Vanilla Orchid</span>
                <span className="text-[#8A7B6E] text-[11px]">Velvet Warmth</span>
              </div>
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>White Jasmine &amp; Peony</span>
                <span className="text-[#8A7B6E] text-[11px]">Lush Bloom</span>
              </div>
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Smoked Cedarwood</span>
                <span className="text-[#8A7B6E] text-[11px]">Woodland Hearth</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#2C241B]/10 shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="w-10 h-10 rounded-full bg-[#F4EFEA] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-sm mb-6 font-serif">
              03
            </div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold block mb-1">
              The Enduring Memory (Hours Beyond)
            </span>
            <h3 className="font-serif text-2xl text-[#2C241B] font-medium mb-3">
              Base Notes
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5E52] font-light leading-relaxed mb-6">
              The deep grounding undertones that linger softly on linens, books, and atmosphere long after the flame is snuffed.
            </p>
            <div className="space-y-2 pt-4 border-t border-[#2C241B]/10 text-xs">
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Spiced Tonka Bean</span>
                <span className="text-[#8A7B6E] text-[11px]">Cozy Amber</span>
              </div>
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Cashmere Wood &amp; Musk</span>
                <span className="text-[#8A7B6E] text-[11px]">Silken Texture</span>
              </div>
              <div className="flex items-center justify-between text-[#2C241B]">
                <span>Aged Golden Oud</span>
                <span className="text-[#8A7B6E] text-[11px]">Sacred Grounding</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Curated Luxury Hampers */}
      <section id="hampers" className="py-20 sm:py-32 bg-[#F4EFEA]/70 border-t border-[#2C241B]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-semibold block mb-3">
                ✦ Sacred Celebrations &amp; Gifting
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#2C241B] font-normal leading-[1.15] mb-6">
                Curated Luxury Hampers
              </h2>
              <p className="text-base text-[#6B5E52] font-light leading-relaxed mb-8">
                The ultimate gift of peace. Packaged inside a custom keepsake wooden box tied with Italian velvet ribbon, each hamper contains everything needed to cultivate a serene sanctuary.
              </p>

              <div className="space-y-3.5 mb-8">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF9F6] border border-[#2C241B]/10">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#2C241B] flex items-center justify-center text-xs font-semibold">1</span>
                  <span className="text-xs sm:text-sm text-[#2C241B] font-medium">Two 250g Luxury Scented Soy Candles (Your Choice of Fragrance)</span>
                </div>
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF9F6] border border-[#2C241B]/10">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#2C241B] flex items-center justify-center text-xs font-semibold">2</span>
                  <span className="text-xs sm:text-sm text-[#2C241B] font-medium">Solid Brass Antique Wick Trimmer &amp; Snuffer</span>
                </div>
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF9F6] border border-[#2C241B]/10">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#2C241B] flex items-center justify-center text-xs font-semibold">3</span>
                  <span className="text-xs sm:text-sm text-[#2C241B] font-medium">Apothecary Match Bottle with Cork &amp; Striker + 50 Matchsticks</span>
                </div>
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF9F6] border border-[#2C241B]/10">
                  <span className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#2C241B] flex items-center justify-center text-xs font-semibold">4</span>
                  <span className="text-xs sm:text-sm text-[#2C241B] font-medium">Custom Calligraphy Card with Wax Stamp Seal</span>
                </div>
              </div>

              <button
                onClick={() => addToBag(PRODUCTS['festive-hamper'])}
                className="px-8 py-4 rounded-2xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
              >
                Order Deluxe Hamper — ₹3,499
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#2C241B]/10 group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury Nirva Festive Hamper gift packaging"
                  className="w-full aspect-[4/3] object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FDFBF7]/90 backdrop-blur-md border border-[#2C241B]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">Pan-India Express</span>
                    <span className="text-xs font-serif font-medium text-[#2C241B]">Dispatched in 24 Hours in Luxury Tamper-Proof Box</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Reviews & Instagram Gallery */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.26em] text-[#D4AF37] font-semibold block mb-2">
            ✦ Words of Affection
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C241B] font-normal">
            Loved by Quiet Souls
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E52] font-light mt-3">
            Over 1,200+ homes elevated with warmth, light, and mindful intention across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#2C241B]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                ))}
              </div>
              <p className="font-serif italic text-base text-[#2C241B] leading-relaxed mb-6">
                "The scent throw of the Velvet Mahogany jar is unlike anything I've tried. It fills our high-ceiling apartment in Bangalore without triggering my migraine."
              </p>
            </div>
            <div className="pt-4 border-t border-[#2C241B]/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#2C241B] uppercase tracking-wider">Pooja Mehra</p>
                <p className="text-[10px] text-[#8A7B6E]">Interior Stylist, Bangalore</p>
              </div>
              <span className="text-xs text-[#D4AF37]">✦ Verified</span>
            </div>
          </div>

          <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#2C241B]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                ))}
              </div>
              <p className="font-serif italic text-base text-[#2C241B] leading-relaxed mb-6">
                "Ordered 40 festive hampers for our boutique firm clients. The packaging with Italian velvet and wax seals was so breathtaking that clients called just to compliment the boxes."
              </p>
            </div>
            <div className="pt-4 border-t border-[#2C241B]/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#2C241B] uppercase tracking-wider">Rohan Singhania</p>
                <p className="text-[10px] text-[#8A7B6E]">Founder, Studio Vert, Mumbai</p>
              </div>
              <span className="text-xs text-[#D4AF37]">✦ Verified</span>
            </div>
          </div>

          <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-[#2C241B]/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                ))}
              </div>
              <p className="font-serif italic text-base text-[#2C241B] leading-relaxed mb-6">
                "The shell pots are pieces of art! After burning, I cleaned the wax and now use the scalloped ceramic dish for my rings on the vanity table. Infinite value."
              </p>
            </div>
            <div className="pt-4 border-t border-[#2C241B]/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#2C241B] uppercase tracking-wider">Devika Kulkarni</p>
                <p className="text-[10px] text-[#8A7B6E]">Architect, New Delhi</p>
              </div>
              <span className="text-xs text-[#D4AF37]">✦ Verified</span>
            </div>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="border-t border-[#2C241B]/10 pt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 text-center sm:text-left">
            <div>
              <span className="text-[11px] uppercase tracking-[0.26em] text-[#D4AF37] font-semibold block">
                #NirvaMoments
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241B]">
                The Gallery of Quiet Living
              </h3>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mt-4 sm:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-[#2C241B] hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              <span>Follow @nirvacandles</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl overflow-hidden aspect-square relative group">
              <img src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=600&q=80" alt="Instagram aesthetic candle moment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square relative group">
              <img src="https://images.unsplash.com/photo-1695002817411-203c7f19dfa3?auto=format&fit=crop&w=600&q=80" alt="Instagram cozy interior candle" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square relative group">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80" alt="Instagram botanical dried flowers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square relative group">
              <img src="https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=600&q=80" alt="Instagram morning lighting ritual" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter (The Scent Journal) */}
      <section className="py-20 sm:py-24 bg-[#FDFBF7] border-t border-[#2C241B]/10">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-3">
            ✦ THE SCENT JOURNAL ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C241B] font-normal mb-4">
            Join The Nirva Circle
          </h2>
          <p className="text-sm sm:text-base text-[#6B5E52] font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Receive private invitations to micro-batch drops, seasonal scent rituals, and enjoy <span className="font-medium text-[#2C241B]">15% off your first festive order</span>.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newsletterEmail) {
                showToast(`Welcome! 15% discount code sent to ${newsletterEmail} ✨`);
                setNewsletterEmail('');
              }
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-2xl bg-[#FAF9F6] border border-[#2C241B]/15 focus:border-[#D4AF37] text-[#2C241B] text-xs tracking-wider placeholder:text-[#8A7B6E]/70 outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-2xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-[10px] text-[#8A7B6E] uppercase tracking-widest mt-4">
            No spam. Only quiet musings &amp; limited pours. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#FAF9F6] border-t border-[#2C241B]/10 pt-16 pb-12 text-[#2C241B]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-[#2C241B]/10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-[#D4AF37] font-serif">✦</span>
                <span className="font-serif text-2xl font-medium tracking-[0.24em] text-[#2C241B]">NIRVA</span>
                <span className="text-xs text-[#D4AF37] font-serif">✦</span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B5E52] font-light max-w-sm leading-relaxed mb-6">
                Handcrafted botanical soy wax candles poured with sacred intention. Designed to inspire stillness, scent memory, and tactile beauty in conscious spaces.
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2C241B] mb-4">Pours</p>
              <ul className="space-y-2.5 text-xs text-[#6B5E52] font-light">
                <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Wax Shell Pots</a></li>
                <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Festive Hampers</a></li>
                <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Velvet Mahogany</a></li>
                <li><a href="#collections" className="hover:text-[#D4AF37] transition-colors">Botanical Melts</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2C241B] mb-4">Candle Care</p>
              <ul className="space-y-2.5 text-xs text-[#6B5E52] font-light">
                <li><button onClick={() => setIsCareModalOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">First Burn Ritual</button></li>
                <li><button onClick={() => setIsCareModalOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">Wick Trimming Guide</button></li>
                <li><button onClick={() => setIsCareModalOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">Vessel Upcycling</button></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2C241B] mb-4">Studio Concierge</p>
              <p className="text-xs text-[#6B5E52] font-light leading-relaxed mb-3">
                Bandra West, Mumbai, India &bull; Express Shipping Pan-India
              </p>
              <p className="text-xs text-[#2C241B] font-medium">concierge@nirvacandles.com</p>
              <p className="text-xs text-[#6B5E52] font-light mt-1">+91 (0) 98200 12345</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8A7B6E] font-light gap-4 text-center sm:text-left">
            <p>&copy; 2026 Nirva Candles Studio. Hand-poured with love &amp; intention.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#2C241B] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#2C241B] transition-colors">Terms of Sanctuary</a>
              <a href="#" className="hover:text-[#2C241B] transition-colors">Shipping &amp; Returns</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-Over Shopping Bag Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-[#2C241B]/35 backdrop-blur-sm flex justify-end animate-fade-in">
          <div className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between border-l border-[#2C241B]/10">
            
            <div className="p-6 border-b border-[#2C241B]/10 flex items-center justify-between bg-[#FDFBF7]">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif text-xl text-[#2C241B] font-semibold tracking-wide">Your Scent Bag</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#F4EFEA] border border-[#2C241B]/10 font-mono">
                  {cartTotalQty} items
                </span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 rounded-full border border-[#2C241B]/10 flex items-center justify-center hover:border-[#2C241B] transition-colors">
                <X className="w-4 h-4 text-[#2C241B]" />
              </button>
            </div>

            {/* Free Gift Milestone */}
            <div className="bg-[#F4EFEA] p-4 border-b border-[#2C241B]/10 text-xs">
              <div className="flex items-center justify-between text-[#2C241B] mb-1.5">
                <span className="font-medium">
                  {cartSubtotal >= freeGiftThreshold
                    ? '🎉 Complimentary Rose Melt Unlocked!'
                    : `✨ Add ₹${(freeGiftThreshold - cartSubtotal).toLocaleString('en-IN')} more for free gift`}
                </span>
                <span className="text-[#D4AF37] font-semibold">₹1,499 goal</span>
              </div>
              <div className="w-full h-1.5 bg-[#FAF9F6] rounded-full overflow-hidden border border-[#2C241B]/10">
                <div
                  className="h-full bg-[#D4AF37] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((cartSubtotal / freeGiftThreshold) * 100))}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="py-12 text-center">
                  <ShoppingBag className="w-8 h-8 text-[#8A7B6E]/40 mx-auto mb-3" />
                  <p className="font-serif text-lg text-[#2C241B]">Your Scent Bag is Empty</p>
                  <p className="text-xs text-[#6B5E52] mt-1">Discover handcrafted serenity to begin your ritual.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#2C241B]/10">
                    <img src={item.img} alt={item.title} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#2C241B]/10" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-[#2C241B] truncate">{item.title}</h4>
                      <p className="text-[10px] text-[#8A7B6E] truncate">{item.vessel}</p>
                      <p className="text-xs font-semibold text-[#2C241B] mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeItem(item.id)} className="text-[#8A7B6E] hover:text-red-700 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center border border-[#2C241B]/10 rounded-lg bg-[#FAF9F6]">
                        <button onClick={() => updateItemQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-xs text-[#2C241B] hover:bg-[#F4EFEA] rounded-l">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono">{item.qty}</span>
                        <button onClick={() => updateItemQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-xs text-[#2C241B] hover:bg-[#F4EFEA] rounded-r">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-6 border-t border-[#2C241B]/10 bg-[#FDFBF7] space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#6B5E52]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C241B]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#6B5E52]">
                  <span>Pan-India Luxury Shipping</span>
                  <span className="text-emerald-700 font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base font-serif text-[#2C241B] pt-2 border-t border-[#2C241B]/10">
                  <span className="font-semibold">Estimated Total</span>
                  <span className="font-bold text-lg text-[#2C241B]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  showToast('Redirecting to 256-bit Encrypted Luxury Checkout... ✨');
                  setTimeout(() => alert('Thank you for exploring the Nirva Candles preview! This React component is fully ready for Shopify or Razorpay integration.'), 500);
                }}
                className="w-full py-4 rounded-2xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Secure Checkout</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#2C241B]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#FAF9F6] rounded-3xl shadow-2xl border border-[#2C241B]/10 overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FDFBF7]/80 backdrop-blur-md border border-[#2C241B]/10 flex items-center justify-center text-[#2C241B] hover:bg-[#2C241B] hover:text-[#FDFBF7] transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:w-1/2 aspect-square md:aspect-auto bg-[#F4EFEA] relative">
              <img src={selectedProduct.img} alt={selectedProduct.title} className="w-full h-full object-cover" />
            </div>

            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4AF37] font-semibold block mb-1">
                  {selectedProduct.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241B] mb-2">
                  {selectedProduct.title}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-serif text-2xl font-bold text-[#2C241B]">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-[#8A7B6E] line-through">₹{selectedProduct.origPrice.toLocaleString('en-IN')}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#6B5E52] font-light leading-relaxed mb-6">
                  {selectedProduct.desc}
                </p>

                <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#2C241B]/10 space-y-2 mb-6 text-xs">
                  <p className="font-serif font-semibold text-[#2C241B] text-sm">Olfactory Notes:</p>
                  <p className="text-[#6B5E52]"><span className="font-medium text-[#2C241B]">Top:</span> {selectedProduct.top}</p>
                  <p className="text-[#6B5E52]"><span className="font-medium text-[#2C241B]">Heart:</span> {selectedProduct.heart}</p>
                  <p className="text-[#6B5E52]"><span className="font-medium text-[#2C241B]">Base:</span> {selectedProduct.base}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#2C241B]/10">
                <button
                  onClick={() => {
                    addToBag(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#2C241B] hover:bg-[#231D16] text-[#FDFBF7] text-xs uppercase tracking-[0.18em] font-semibold hover:shadow-md transition-all"
                >
                  Add to Scent Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scent Matcher Quiz Modal */}
      {isScentModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2C241B]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#D4AF37]/40 p-6 sm:p-8 relative">
            <button
              onClick={() => { setIsScentModalOpen(false); setQuizResult(null); }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#2C241B]/10 flex items-center justify-center hover:bg-[#2C241B] hover:text-[#FDFBF7] transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-[0.26em] text-[#D4AF37] font-semibold block mb-1">
                ✦ Scent Matcher
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241B] font-normal">
                Find Your Ritual Scent
              </h3>
              <p className="text-xs text-[#6B5E52] font-light mt-1">
                Select your current mood or home sanctuary intention:
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setQuizResult(PRODUCTS['mahogany-jar'])}
                className="w-full p-4 rounded-2xl bg-[#FAF9F6] hover:bg-[#F4EFEA] border border-[#2C241B]/10 hover:border-[#D4AF37] text-left flex items-center justify-between transition-all group"
              >
                <div>
                  <p className="text-xs font-semibold text-[#2C241B] uppercase tracking-wider group-hover:text-[#D4AF37]">Cozy Evenings &amp; Deep Grounding</p>
                  <p className="text-[11px] text-[#8A7B6E] font-light">Warm amber, smoked cedar, and cashmere tonka</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => setQuizResult(PRODUCTS['shell-pots'])}
                className="w-full p-4 rounded-2xl bg-[#FAF9F6] hover:bg-[#F4EFEA] border border-[#2C241B]/10 hover:border-[#D4AF37] text-left flex items-center justify-between transition-all group"
              >
                <div>
                  <p className="text-xs font-semibold text-[#2C241B] uppercase tracking-wider group-hover:text-[#D4AF37]">Comfort, Warm Hugs &amp; Sweet Peace</p>
                  <p className="text-[11px] text-[#8A7B6E] font-light">Tahitian vanilla orchid, sea salt, and golden honey</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => setQuizResult(PRODUCTS['rose-melts'])}
                className="w-full p-4 rounded-2xl bg-[#FAF9F6] hover:bg-[#F4EFEA] border border-[#2C241B]/10 hover:border-[#D4AF37] text-left flex items-center justify-between transition-all group"
              >
                <div>
                  <p className="text-xs font-semibold text-[#2C241B] uppercase tracking-wider group-hover:text-[#D4AF37]">Romantic Serenity &amp; Sacred Meditation</p>
                  <p className="text-[11px] text-[#8A7B6E] font-light">French damask rose, wild peony, and morning dew</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {quizResult && (
              <div className="p-4 rounded-2xl bg-[#F4EFEA] border border-[#D4AF37]/50 text-center animate-fade-in">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">Your Ideal Pour</span>
                <p className="font-serif text-xl font-bold text-[#2C241B] my-1">{quizResult.title}</p>
                <p className="text-xs text-[#6B5E52] mb-3">{quizResult.top} • {quizResult.heart}</p>
                <button
                  onClick={() => {
                    addToBag(quizResult);
                    setIsScentModalOpen(false);
                    setQuizResult(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#2C241B] text-[#FDFBF7] text-xs uppercase tracking-wider font-semibold hover:shadow-md transition-all"
                >
                  Add Matched Pour to Bag
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Candle Care Guide Modal */}
      {isCareModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2C241B]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#2C241B]/10 p-6 sm:p-8 relative">
            <button
              onClick={() => setIsCareModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#2C241B]/10 flex items-center justify-center hover:bg-[#2C241B] hover:text-[#FDFBF7] transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="text-xs uppercase tracking-[0.26em] text-[#D4AF37] font-semibold block mb-1">
              ✦ Studio Rituals
            </span>
            <h3 className="font-serif text-2xl text-[#2C241B] font-normal mb-4">
              The Candle Care Guide
            </h3>
            <div className="space-y-4 text-xs text-[#6B5E52] leading-relaxed">
              <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#2C241B]/10">
                <p className="font-semibold text-[#2C241B] mb-0.5">1. The Memory Burn (First Burn)</p>
                <p>Always allow wax to melt across the entire vessel diameter (2-3 hours) to prevent tunneling.</p>
              </div>
              <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#2C241B]/10">
                <p className="font-semibold text-[#2C241B] mb-0.5">2. Trim the Wick to 1/4 Inch</p>
                <p>Keep cotton or wood wicks trimmed before every lighting for a soot-free, calm flame.</p>
              </div>
              <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#2C241B]/10">
                <p className="font-semibold text-[#2C241B] mb-0.5">3. Snuff, Don't Blow</p>
                <p>Use a snuffer or lid to extinguish to prevent smoke and preserve delicate fragrance oils.</p>
              </div>
            </div>
            <button
              onClick={() => setIsCareModalOpen(false)}
              className="w-full mt-6 py-3 rounded-xl bg-[#2C241B] text-[#FDFBF7] text-xs uppercase tracking-wider font-semibold"
            >
              Understood &bull; Honor the Ritual
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241B] text-[#FDFBF7] px-5 py-3.5 rounded-2xl shadow-xl border border-[#D4AF37]/40 flex items-center gap-3 text-xs tracking-wider animate-bounce">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
