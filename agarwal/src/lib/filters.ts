export type SortKey = "popular" | "price_asc" | "price_desc" | "discount" | "rating" | "newest" | "name";

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Popularity" },
  { key: "discount", label: "Discount (high to low)" },
  { key: "price_asc", label: "Price: low to high" },
  { key: "price_desc", label: "Price: high to low" },
  { key: "rating", label: "Customer rating" },
  { key: "newest", label: "Newest first" },
  { key: "name", label: "Name (A – Z)" },
];
