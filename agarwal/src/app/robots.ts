import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout", "/cart", "/order/"],
      },
    ],
    sitemap: "https://agarwaljimedical.in/sitemap.xml",
    host: "https://agarwaljimedical.in",
  };
}
