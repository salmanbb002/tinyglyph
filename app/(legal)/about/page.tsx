import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "About",
  description: "How SmallTextGen turns plain text into copy-ready Unicode styles.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About SmallTextGen"
      title="A small tool with one careful job."
      intro="SmallTextGen makes expressive Unicode text quick to explore, safe to copy, and pleasant to use."
      sections={[
        {
          title: "Why it exists",
          body: <><p>Most text generators bury a useful interaction beneath ads and repetitive content. SmallTextGen puts the converter first: type once, compare every result, and copy without opening a new page.</p><p>The interface is built for profile writers, community managers, creators, gamers, and anyone who wants a few words to carry a different tone.</p></>,
        },
        {
          title: "How conversion works",
          body: <><p>Each style maps ordinary Latin letters and numbers to Unicode characters with a similar visual form. Conversion happens locally in your browser and updates on every keystroke.</p><p>Unicode does not contain a complete superscript or subscript alphabet. When an exact counterpart is unavailable, SmallTextGen leaves the original character intact so the result stays understandable.</p></>,
        },
        {
          title: "A note on accessibility",
          body: <p>Decorative Unicode can be read unpredictably by screen readers and search systems. Use it sparingly, keep important information in plain text, and never style critical instructions, passwords, or safety information.</p>,
        },
        {
          title: "The AI starter",
          body: <p>The optional caption starter uses a Hugging Face text-generation model configured by the site operator. It only receives the topic and tone submitted in that panel. The core converter does not require AI and remains available when the model service is not configured.</p>,
        },
      ]}
    />
  );
}
