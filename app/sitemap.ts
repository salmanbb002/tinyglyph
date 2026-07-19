import type { MetadataRoute } from "next";
import { toolPages } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticPages = ["", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path}`, changeFrequency: path === "" ? "weekly" as const : "yearly" as const, priority: path === "" ? 1 : 0.4 })),
    ...toolPages.map((slug) => ({ url: `${base}/tools/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
