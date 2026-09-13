export const STORE = {
  name: "Agarwal Ji Medical Store",
  short: "AgarwalJi",
  tagline: "Bharosa Teen Peedhiyon Ka",
  owner: "Shri Ramesh Agarwal Ji",
  ownerShort: "Agarwal Ji",
  since: 1987,
  phone: "+91 98290 45112",
  phoneDisplay: "+91 98290 45112",
  whatsapp: "919829045112",
  email: "care@agarwaljimedical.in",
  gstin: "08AACGA4321K1ZQ",
  licence: "RJ-20B/21/004213 · RJ-21B/19/003877",
  pharmacist: "Mr. Ankur Agarwal (B.Pharm, R.Ph. Reg. No. RP/14/8821)",
  address: {
    line1: "Shop No. 12–14, Gopal Bari Road",
    line2: "Near Sanganeri Gate, MI Road",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
  },
  hours: "Mon – Sun · 8:00 AM to 11:00 PM",
  deliveryFee: 49,
  freeDeliveryAbove: 499,
  expressDeliveryFee: 99,
  stats: {
    years: 38,
    dailyOrders: 1200,
    pincodeServed: 240,
    cities: 45,
  },
} as const;

export type CouponCode = "AGARWAL10" | "FIRST100" | "WELLNESS20" | "SUPER150";

export const COUPONS: Record<
  string,
  { label: string; type: "percent" | "flat"; value: number; maxDiscount?: number; minOrder: number }
> = {
  AGARWAL10: { label: "10% off up to ₹150 on your bill", type: "percent", value: 10, maxDiscount: 150, minOrder: 199 },
  FIRST100: { label: "Flat ₹100 off on first order", type: "flat", value: 100, minOrder: 499 },
  WELLNESS20: { label: "20% off up to ₹300 on sexual wellness", type: "percent", value: 20, maxDiscount: 300, minOrder: 399 },
  SUPER150: { label: "Flat ₹150 off on orders above ₹1,200", type: "flat", value: 150, minOrder: 1200 },
};

export function applyCoupon(code: string | null | undefined, subtotal: number) {
  if (!code) return { discount: 0, applied: null as null | string, error: null as null | string };
  const coupon = COUPONS[code.trim().toUpperCase()];
  if (!coupon) return { discount: 0, applied: null, error: "This coupon code is not valid." };
  if (subtotal < coupon.minOrder)
    return {
      discount: 0,
      applied: null,
      error: `Add ₹${(coupon.minOrder - subtotal).toFixed(0)} more to use ${coupon.label.toLowerCase()}.`,
    };
  const raw =
    coupon.type === "percent"
      ? (subtotal * coupon.value) / 100
      : coupon.value;
  const discount = Math.min(coupon.maxDiscount ?? Infinity, raw);
  return { discount: Math.round(discount * 100) / 100, applied: code.trim().toUpperCase(), error: null };
}

export function deliveryFeeFor(subtotal: number, express = false) {
  if (express) return STORE.expressDeliveryFee;
  return subtotal >= STORE.freeDeliveryAbove ? 0 : STORE.deliveryFee;
}

export function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: value % 1 === 0 ? 0 : 2 })}`;
}

export const ORDER_FLOW = [
  { key: "confirmed", label: "Order confirmed", hint: "Pharmacist reviewing your prescription" },
  { key: "packed", label: "Packed at store", hint: "Cold-chain and expiry verified" },
  { key: "shipped", label: "Out for delivery", hint: "Handed to our delivery partner" },
  { key: "delivered", label: "Delivered", hint: "Received by customer" },
] as const;

export type OrderStatus = (typeof ORDER_FLOW)[number]["key"];

export function statusIndex(status: string) {
  const i = ORDER_FLOW.findIndex((s) => s.key === status);
  return i < 0 ? 0 : i;
}

export const PAYMENT_MODES = [
  { key: "cod", label: "Cash / UPI on delivery", hint: "Pay the delivery partner" },
  { key: "upi", label: "UPI · GPay · PhonePe · Paytm", hint: "Instant confirmation" },
  { key: "card", label: "Credit / Debit card", hint: "Visa, Mastercard, RuPay" },
  { key: "netbanking", label: "Net banking", hint: "All major Indian banks" },
] as const;

export const PAYMENT_LABEL: Record<string, string> = {
  cod: "Cash / UPI on delivery",
  upi: "UPI (GPay / PhonePe / Paytm)",
  card: "Credit / Debit card",
  netbanking: "Net banking",
};

export const TRUST_POINTS = [
  { icon: "shieldCheck", title: "100% genuine medicines", text: "Sourced only from licensed manufacturers and authorised distributors. Batch & expiry printed on every bill." },
  { icon: "prescription", title: "Verified by pharmacists", text: "Every Schedule H & H1 order is checked by our registered pharmacist before dispatch." },
  { icon: "truck", title: "Same day delivery", text: "Order before 7 PM in Jaipur for same-day drop. 24–72 hours across 45+ cities." },
  { icon: "lock", title: "Discreet packaging", text: "Sexual wellness orders ship in plain unmarked boxes with no product names on the label." },
];

export const TESTIMONIALS = [
  {
    name: "Sunita Sharma",
    city: "Vaishali Nagar, Jaipur",
    rating: 5,
    text: "Agarwal Ji personally calls if a medicine is out of stock and suggests a salt-equivalent alternative. In 6 years I have never had a single wrong delivery.",
  },
  {
    name: "Rohit Meena",
    city: "Malviya Nagar, Jaipur",
    rating: 5,
    text: "My father is a diabetic patient. Monthly insulin and strips reach home the same evening. Cold pack delivery for insulin is a genuinely thoughtful touch.",
  },
  {
    name: "Anonymous customer",
    city: "Delivered discreetly",
    rating: 5,
    text: "Ordered protection and wellness products late night. The box was completely plain — no branding, no product name, no awkward questions at the door. Truly respectful service.",
  },
  {
    name: "Dr. Kavita Nair",
    city: "SMS Hospital, Jaipur",
    rating: 5,
    text: "As a physician I recommend this store to my patients. Prescriptions are read properly and they never substitute without informing the family.",
  },
];

export const FAQS = [
  {
    q: "How do I know the medicines are genuine?",
    a: `Every product at ${STORE.name} is procured directly from the manufacturer or an authorised C&F agent. Each invoice carries the batch number, manufacturing date and expiry date, and you can verify any strip against our licence ${STORE.licence}.`,
  },
  {
    q: "Do I need a prescription to order?",
    a: "Over-the-counter products, supplements, devices and wellness items need no prescription. Anything marked 'Rx' (Schedule H, H1 or X) requires a valid prescription — you can upload a photo at checkout or send it on WhatsApp and our pharmacist verifies it within 15 minutes.",
  },
  {
    q: "Is the packaging for sexual wellness products discreet?",
    a: "Yes. Orders containing items from the Sexual Wellness & Protection category are packed in a plain brown box. The delivery label shows only 'Agarwal Ji Medical Store' with no product name, and the bill is sent to your email instead of inside the parcel.",
  },
  {
    q: "What are the delivery charges and timelines?",
    a: `Delivery is free above ₹${STORE.freeDeliveryAbove}, otherwise ₹${STORE.deliveryFee}. Inside Jaipur we deliver the same day for orders placed before 7 PM, and 2–4 days for the rest of India. Express delivery within Jaipur is ₹${STORE.expressDeliveryFee}.`,
  },
  {
    q: "Can I return medicines?",
    a: "Unopened, sealed products in intact condition can be returned within 7 days of delivery. Schedule H/H1 drugs, refrigerated items, condoms, lubricants, personal care and devices with broken seals cannot be taken back as per Drug & Cosmetic rules. Damaged or wrong deliveries are replaced free.",
  },
  {
    q: "Do you offer medicine subscriptions?",
    a: `Yes. Chronic medicines for diabetes, blood pressure and thyroid can be auto-delivered every 30, 60 or 90 days at up to ${20}% off. Call ${STORE.phoneDisplay} and ${STORE.ownerShort} will set it up for you.`,
  },
];
