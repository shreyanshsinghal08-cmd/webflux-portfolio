import React from 'react';
import type { Metadata } from 'next';
import NirvaCandlesLanding from '@/components/NirvaCandlesLanding';

export const metadata: Metadata = {
  title: 'Nirva Candles | Handcrafted Luxury Soy Candles & Gifting Hampers',
  description:
    'Hand-poured with love & intention. Discover luxury soy candles, wax melts, and bespoke gifting hampers handcrafted in India.',
  openGraph: {
    title: 'Nirva Candles — Handcrafted Luxury Scented Candles',
    description: 'Scented moments. Cozy spaces. Beautiful memories. 100% Pure Botanical Soy Wax.',
    images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85'],
  },
};

export default function NirvaCandlesPage() {
  return (
    // Fixed overlay isolates the warm luxury aesthetic from the agency dark mode layout
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF9F6] text-[#2C241B]">
      <NirvaCandlesLanding />
    </div>
  );
}
