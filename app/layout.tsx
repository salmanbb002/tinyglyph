import type { Metadata } from "next";
import "@fontsource-variable/manrope/index.css";
import "@fontsource-variable/newsreader/index.css";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TinyGlyph — Small Text Generator",
    template: "%s | TinyGlyph",
  },
  description: "Turn ordinary text into small caps, superscript, subscript, cursive, bubble text, and more. Free, instant, and private.",
  applicationName: "TinyGlyph",
  keywords: ["small text generator", "tiny text", "unicode text", "small caps", "superscript generator"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "TinyGlyph",
    title: "TinyGlyph — Small Text Generator",
    description: "22 copy-ready Unicode styles, generated instantly in your browser.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "TinyGlyph small text generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TinyGlyph — Small Text Generator",
    description: "22 copy-ready Unicode styles, generated instantly in your browser.",
    images: ["/og-image.svg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
