"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import { applyCoupon, COUPONS, deliveryFeeFor, formatINR, STORE } from "@/lib/store";

export type CartLine = {
  productId: number;
  slug: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  packSize: string;
  form: string;
  composition: string;
  requiresPrescription: boolean;
  categoryAccent: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  mrpTotal: number;
  savings: number;
  add: (product: Omit<CartLine, "quantity">, quantity?: number) => void;
  setQty: (productId: number, quantity: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  coupon: string;
  setCoupon: (code: string) => void;
  couponResult: ReturnType<typeof applyCoupon>;
  express: boolean;
  setExpress: (value: boolean) => void;
  deliveryFee: number;
  needsPrescription: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "agarwalji-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [express, setExpress] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setItems(parsed.filter((i) => i && i.productId));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full or blocked */
    }
  }, [items, hydrated]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const add = useCallback((product: Omit<CartLine, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.productId ? { ...i, quantity: Math.min(10, i.quantity + quantity) } : i,
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((productId: number, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, quantity: Math.min(10, quantity) } : i)),
    );
  }, []);

  const remove = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const mrpTotal = items.reduce((sum, i) => sum + i.mrp * i.quantity, 0);
    const couponResult = applyCoupon(coupon, subtotal);
    const payable = Math.max(0, subtotal - couponResult.discount);
    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: Math.round(subtotal * 100) / 100,
      mrpTotal: Math.round(mrpTotal * 100) / 100,
      savings: Math.round((mrpTotal - subtotal) * 100) / 100,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      coupon,
      setCoupon,
      couponResult,
      express,
      setExpress,
      deliveryFee: items.length ? deliveryFeeFor(payable, express) : 0,
      needsPrescription: items.some((i) => i.requiresPrescription),
    };
  }, [items, coupon, express, isOpen, add, setQty, remove, clear]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function QtyStepper({
  quantity,
  onChange,
  compact = false,
}: {
  quantity: number;
  onChange: (next: number) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-emerald-200 bg-white ${
        compact ? "text-sm" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <Icon name={quantity === 1 ? "trash" : "minus"} className="h-4 w-4" />
      </button>
      <span className="min-w-7 text-center font-semibold text-slate-900">{quantity}</span>
      <button
        type="button"
        disabled={quantity >= 10}
        onClick={() => onChange(quantity + 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <Icon name="plus" className="h-4 w-4" />
      </button>
    </div>
  );
}

export function AddToCartButton({
  product,
  size = "md",
}: {
  product: Omit<CartLine, "quantity">;
  size?: "sm" | "md" | "lg";
}) {
  const { items, add, setQty } = useCart();
  const inCart = items.find((i) => i.productId === product.productId);
  const pad =
    size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-7 py-3.5 text-base" : "px-4 py-2.5 text-sm";

  if (inCart) {
    return (
      <div className="flex items-center justify-between gap-2">
        <QtyStepper quantity={inCart.quantity} onChange={(q) => setQty(product.productId, q)} compact />
        <Link
          href="/cart"
          className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Go to cart
        </Link>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => add(product)}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 font-semibold text-white shadow-[0_10px_24px_-12px_rgba(5,150,105,0.9)] transition hover:bg-emerald-700 active:scale-[0.98] ${pad}`}
    >
      <Icon name="cart" className="h-4 w-4" />
      Add to cart
    </button>
  );
}

function CartDrawer() {
  const {
    items, isOpen, close, setQty, remove, subtotal, savings, mrpTotal, count,
    couponResult, coupon, setCoupon, express, deliveryFee,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={close}
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your cart</h2>
            <p className="text-xs text-slate-500">
              {count} item{count === 1 ? "" : "s"} · {formatINR(savings)} saved
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            aria-label="Close"
          >
            <Icon name="x" className="h-4.5 w-4.5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Icon name="cart" className="h-9 w-9" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-900">Your cart is empty</p>
              <p className="mt-1 text-sm text-slate-500">
                Search 10,000+ genuine medicines, wellness and protection products.
              </p>
            </div>
            <Link
              href="/products"
              className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3 rounded-2xl border border-slate-200 p-3">
                  <div
                    className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.categoryAccent} text-white`}
                  >
                    <Icon name={item.form === "Tablet" || item.form === "Capsule" ? "capsule" : "bottle"} className="h-7 w-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${item.slug}`} className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-emerald-700">
                      {item.name}
                    </Link>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{item.packSize}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QtyStepper quantity={item.quantity} onChange={(q) => setQty(item.productId, q)} compact />
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900">{formatINR(item.price * item.quantity)}</p>
                        {item.mrp > item.price && (
                          <p className="text-[11px] text-slate-400 line-through">{formatINR(item.mrp * item.quantity)}</p>
                        )}
                      </div>
                    </div>
                    {item.requiresPrescription && (
                      <p className="mt-1.5 text-[11px] font-medium text-amber-700">Prescription required at checkout</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.productId)}
                    className="self-start text-slate-300 transition hover:text-rose-500"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Icon name="x" className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <footer className="space-y-3 border-t border-slate-200 bg-slate-50 px-5 py-4">
              <div className="flex items-center gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Coupon code (try AGARWAL10)"
                  className="h-10 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm uppercase outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
                {couponResult.applied && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    −{formatINR(couponResult.discount)}
                  </span>
                )}
              </div>
              {couponResult.error && <p className="text-xs text-rose-600">{couponResult.error}</p>}
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(COUPONS).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCoupon(code)}
                    className="rounded-full border border-dashed border-emerald-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    {code}
                  </button>
                ))}
              </div>
              <div className="space-y-1 border-t border-dashed border-slate-300 pt-3 text-sm">
                <Row label="Subtotal" value={formatINR(subtotal)} />
                <Row label="Product savings" value={`− ${formatINR(savings)}`} accent="text-emerald-600" />
                {couponResult.applied && (
                  <Row label={`Coupon ${couponResult.applied}`} value={`− ${formatINR(couponResult.discount)}`} accent="text-emerald-600" />
                )}
                <Row
                  label={express ? "Express delivery (Jaipur)" : "Delivery"}
                  value={deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}
                  accent={deliveryFee === 0 ? "text-emerald-600" : ""}
                />
                <div className="flex items-center justify-between border-t border-slate-300 pt-2 text-base font-bold text-slate-900">
                  <span>To pay</span>
                  <span>{formatINR(Math.max(0, subtotal - couponResult.discount + deliveryFee))}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700"
              >
                Proceed to checkout
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <p className="text-center text-[11px] text-slate-500">
                Total MRP {formatINR(mrpTotal)}
              </p>
              <p className="text-center text-[11px] text-slate-500">
                Free delivery above ₹{STORE.freeDeliveryAbove} · Discreet packaging on wellness orders
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function Row({ label, value, accent = "" }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between text-slate-600">
      <span className="text-xs">{label}</span>
      <span className={`text-xs font-semibold ${accent || "text-slate-800"}`}>{value}</span>
    </div>
  );
}
