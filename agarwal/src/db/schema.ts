import {
  boolean,
  index,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    tagline: text("tagline"),
    description: text("description"),
    icon: text("icon").notNull().default("pill"),
    accent: text("accent").notNull().default("from-emerald-500 to-teal-600"),
    sort: integer("sort").notNull().default(0),
    ageRestricted: boolean("age_restricted").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("categories_slug_idx").on(t.slug)],
);

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    brand: text("brand").notNull(),
    manufacturer: text("manufacturer").notNull(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
    description: text("description"),
    composition: text("composition").notNull(),
    uses: text("uses"),
    form: text("form").notNull(),
    packSize: text("pack_size").notNull(),
    strength: text("strength"),
    mrp: numeric("mrp", { precision: 10, scale: 2, mode: "number" }).notNull(),
    price: numeric("price", { precision: 10, scale: 2, mode: "number" }).notNull(),
    discountPct: integer("discount_pct").notNull().default(0),
    stock: integer("stock").notNull().default(0),
    requiresPrescription: boolean("requires_prescription").notNull().default(false),
    rating: numeric("rating", { precision: 3, scale: 2, mode: "number" }).notNull().default(4),
    reviewCount: integer("review_count").notNull().default(0),
    isFeatured: boolean("is_featured").notNull().default(false),
    isBestseller: boolean("is_bestseller").notNull().default(false),
    ageRestricted: boolean("age_restricted").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("products_slug_idx").on(t.slug),
    index("products_category_idx").on(t.categoryId),
    index("products_brand_idx").on(t.brand),
    index("products_price_idx").on(t.price),
    index("products_featured_idx").on(t.isFeatured),
  ],
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: text("order_number").notNull(),
    customerName: text("customer_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    pincode: text("pincode").notNull(),
    paymentMode: text("payment_mode").notNull().default("cod"),
    couponCode: text("coupon_code"),
    subtotal: numeric("subtotal", { precision: 10, scale: 2, mode: "number" }).notNull(),
    discount: numeric("discount", { precision: 10, scale: 2, mode: "number" }).notNull().default(0),
    deliveryFee: numeric("delivery_fee", { precision: 10, scale: 2, mode: "number" })
      .notNull()
      .default(0),
    total: numeric("total", { precision: 10, scale: 2, mode: "number" }).notNull(),
    itemCount: integer("item_count").notNull().default(0),
    status: text("status").notNull().default("confirmed"),
    notes: text("notes"),
    discreetPackaging: boolean("discreet_packaging").notNull().default(false),
    expectedDelivery: timestamp("expected_delivery", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("orders_number_idx").on(t.orderNumber),
    index("orders_phone_idx").on(t.phone),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull(),
    name: text("name").notNull(),
    brand: text("brand").notNull(),
    packSize: text("pack_size"),
    unitPrice: numeric("unit_price", { precision: 10, scale: 2, mode: "number" }).notNull(),
    mrp: numeric("mrp", { precision: 10, scale: 2, mode: "number" }).notNull(),
    quantity: integer("quantity").notNull(),
    lineTotal: numeric("line_total", { precision: 10, scale: 2, mode: "number" }).notNull(),
  },
  (t) => [index("order_items_order_idx").on(t.orderId)],
);

export const prescriptionRequests = pgTable("prescription_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  city: text("city"),
  medicines: text("medicines"),
  notes: text("notes"),
  fileNames: text("file_names"),
  fileData: text("file_data"),
  status: text("status").notNull().default("received"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  subject: text("subject"),
  body: text("body").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type PrescriptionRequest = typeof prescriptionRequests.$inferSelect;
export type Message = typeof messages.$inferSelect;
