import type { MetadataRoute } from "next";
import { toolPages } from "@/lib/fonts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tinyglyph.example";
  const staticPages = ["", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path}`, changeFrequency: path === "" ? "weekly" as const : "yearly" as const, priority: path === "" ? 1 : 0.4 })),
    ...toolPages.map((slug) => ({ url: `${base}/tools/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
