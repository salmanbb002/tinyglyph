import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TinyGlyph Small Text Generator",
    short_name: "TinyGlyph",
    description: "Instant, copy-ready Unicode text styles.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e7",
    theme_color: "#182421",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
