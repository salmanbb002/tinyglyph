import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = { title: "Terms", description: "Terms for using TinyGlyph." };

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Terms"
      title="Use it freely. Use it thoughtfully."
      intro="These plain-language terms describe the intended use of TinyGlyph."
      sections={[
        { title: "Using the service", body: <p>You may use TinyGlyph for personal or commercial text conversion. You are responsible for the text you submit and for making sure your use follows the rules of any platform where you paste it.</p> },
        { title: "Acceptable use", body: <p>Do not use the service to impersonate others, evade moderation, distribute unlawful content, interfere with the service, or probe systems you do not have permission to test.</p> },
        { title: "Generated output", body: <p>Unicode conversions are mechanical and are not claimed as exclusive creative works. AI suggestions may be inaccurate or similar to other outputs; review them before publishing.</p> },
        { title: "Availability", body: <p>The service is provided as available. Unicode appearance varies across apps, operating systems, and typefaces, and we cannot guarantee every character will render everywhere.</p> },
        { title: "Before launch", body: <p>Replace this starter document with terms reviewed for your business entity, jurisdiction, hosting provider, analytics, advertising, and support process.</p> },
      ]}
    />
  );
}
