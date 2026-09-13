import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header, { type NavCategory } from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart";
import { getCategoriesWithCounts } from "@/lib/queries";
import { STORE } from "@/lib/store";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: {
    default: `${STORE.name} | 10,000+ Genuine Medicines, Wellness & Protection Online`,
    template: `%s | ${STORE.name}`,
  },
  description: `Order genuine medicines online from ${STORE.name}, run by ${STORE.owner} since ${STORE.since}. 10,000+ medicines, sexual wellness & protection with 100% discreet packaging, same-day delivery in Jaipur and 2–4 day delivery across India.`,
  keywords: [
    "online pharmacy",
    "medical store",
    "buy medicines online",
    "Agarwal Ji Medical Store",
    "sexual wellness",
    "condoms online discreet",
    "contraceptive pills",
    "Jaipur pharmacy",
  ],
  authors: [{ name: STORE.owner }],
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const categories = await getCategoriesWithCounts().catch(() => []);
  const navCategories: NavCategory[] = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon,
    accent: c.accent,
    count: c.count,
    ageRestricted: c.ageRestricted,
    tagline: c.tagline,
  }));

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <CartProvider>
          <Header categories={navCategories} />
          <main className="min-h-[55vh]">{children}</main>
          <Footer categories={navCategories} />
          <a
            href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(
              "Hello Agarwal Ji, I need help ordering medicines.",
            )}`}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-900/25 transition hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <Icon name="whatsapp" className="h-5 w-5" />
            <span className="hidden sm:inline">Chat with us</span>
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
