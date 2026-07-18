import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Converter } from "@/components/converter";
import { getStyle, textStyles, toolPages } from "@/lib/fonts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return toolPages.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style || !toolPages.includes(slug as (typeof toolPages)[number])) return {};
  const title = `${style.name} Text Generator — Copy & Paste`;
  const description = `Convert normal text into ${style.name.toLowerCase()} Unicode instantly. Free, private, and ready to copy for bios, captions, chats, and names.`;
  return { title, description, alternates: { canonical: `/tools/${slug}` } };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style || !toolPages.includes(slug as (typeof toolPages)[number])) notFound();

  const related = textStyles
    .filter((item) => item.slug !== slug && toolPages.includes(item.slug as (typeof toolPages)[number]))
    .slice(0, 4);
  const example = style.transform("Tiny text, big mood.");
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${style.name} Text Generator`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="tool-hero">
        <Link href="/" className="back-link"><ArrowLeft size={16} /> All styles</Link>
        <span className="eyebrow">Focused text tool</span>
        <h1>{style.name}<br /><em>text generator.</em></h1>
        <p>Turn plain letters into copy-ready {style.name.toLowerCase()} Unicode as you type.</p>
        <div className="tool-example"><span>Example</span><strong>{example}</strong></div>
      </section>

      <Converter
        initialStyle={style.slug}
        title={`Make ${style.name.toLowerCase()} text.`}
        description={`${style.description}. Your focused result appears first, with every other style close by.`}
      />

      <section className="tool-explainer">
        <div>
          <span className="section-index">About this style</span>
          <h2>What is {style.name.toLowerCase()} text?</h2>
        </div>
        <div>
          <p>
            {style.name} text uses Unicode characters that resemble familiar Latin letters in a different visual form. The output remains selectable, searchable text rather than an image.
          </p>
          <p>
            Copy the result into a profile, caption, display name, message, or document. Character support can vary by app and device, so preview the final result where you plan to use it.
          </p>
        </div>
      </section>

      <section className="related-tools">
        <span className="section-index">Keep exploring</span>
        <h2>More ways to shape a word.</h2>
        <div>
          {related.map((item) => (
            <Link href={`/tools/${item.slug}`} key={item.slug}>
              <span>{item.name}</span><strong>{item.transform("Tiny")}</strong><ArrowRight size={18} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
