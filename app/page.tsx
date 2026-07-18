import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Gauge,
  Globe2,
  LockKeyhole,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Converter } from "@/components/converter";

const faq = [
  [
    "Is this a font generator?",
    "Not exactly. TinyGlyph replaces regular letters with visually similar Unicode characters. That is why most results can be copied and pasted without installing a font.",
  ],
  [
    "Where can I use small text?",
    "Try it in social bios, captions, display names, chats, notes, and headings. Support varies because each app decides which Unicode characters it accepts.",
  ],
  [
    "Does TinyGlyph upload my text?",
    "No. The text converters run entirely in your browser. Only the optional AI caption starter sends the topic you enter to the server for generation.",
  ],
  [
    "Why are some superscript or subscript letters unchanged?",
    "Unicode does not include a perfect raised or lowered version of every Latin letter. TinyGlyph keeps unsupported letters readable instead of substituting misleading symbols.",
  ],
  [
    "Will every style work on every app?",
    "Most modern apps display these characters, but some services filter unusual Unicode or use fonts without every glyph. If one style fails, small caps and bold are usually reliable alternatives.",
  ],
];

const focusedTools = [
  ["Small caps", "ᴛɪɴʏ ᴛᴇxᴛ", "small-caps"],
  ["Superscript", "ᵗⁱⁿʸ ᵗᵉˣᵗ", "superscript"],
  ["Subscript", "ₜᵢₙy ₜₑₓₜ", "subscript"],
  ["Bold text", "𝐓𝐢𝐧𝐲 𝐭𝐞𝐱𝐭", "bold"],
  ["Cursive", "𝒯𝒾𝓃𝓎 𝓉ℯ𝓍𝓉", "cursive"],
  ["Bubble text", "Ⓣⓘⓝⓨ ⓣⓔⓧⓣ", "bubble"],
  ["Underline", "T̲i̲n̲y̲ t̲e̲x̲t̲", "underline"],
  ["Upside down", "ʇxǝʇ ʎuᴉ⊥", "upside-down"],
] as const;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tinyglyph.example";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "TinyGlyph Small Text Generator",
        url: siteUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        isAccessibleForFree: true,
        description: "A browser-based Unicode text generator for small caps, superscript, subscript, cursive, bubble text, and more.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="utility-hero">
        <div className="utility-hero-copy">
          <div className="breadcrumbs" aria-label="Breadcrumb">Home <span>/</span> Text tools <span>/</span> Small text generator</div>
          <span className="eyebrow"><span className="status-dot" /> Browser tool · ready to use</span>
          <h1>Small Text Generator</h1>
          <p>Convert normal text into small caps, superscript, subscript, cursive, bubble letters, and more copy-and-paste Unicode styles.</p>
          <div className="utility-badges">
            <span><Zap size={15} aria-hidden="true" /> Instant results</span>
            <span><LockKeyhole size={15} aria-hidden="true" /> Runs locally</span>
            <span><Check size={15} aria-hidden="true" /> Free to use</span>
          </div>
        </div>
        <div className="tool-profile" aria-label="Tool capabilities">
          <div className="tool-profile-head"><span>Tool profile</span><b>STG / 01</b></div>
          <div className="profile-metric"><strong>22</strong><span>Unicode styles<br />in one workspace</span></div>
          <div className="profile-grid">
            <span><b>0</b> uploads</span>
            <span><b>&lt;1s</b> conversion</span>
            <span><b>∞</b> uses</span>
          </div>
          <p>Works with Instagram, Discord, WhatsApp, TikTok, bios, captions, and display names.</p>
        </div>
      </section>

      <Converter />

      <section className="tool-benefits" aria-label="Tool benefits">
        <article><Zap aria-hidden="true" /><div><b>Instant conversion</b><span>Every output updates while you type.</span></div></article>
        <article><Globe2 aria-hidden="true" /><div><b>Copy almost anywhere</b><span>Use real Unicode text across modern apps.</span></div></article>
        <article><ShieldCheck aria-hidden="true" /><div><b>Private by default</b><span>Regular conversion happens in your browser.</span></div></article>
        <article><Gauge aria-hidden="true" /><div><b>No usage limits</b><span>No account, queue, or daily allowance.</span></div></article>
      </section>

      <section className="tool-directory" aria-labelledby="tools-title">
        <div className="section-intro">
          <span className="section-index">Tool directory</span>
          <div><h2 id="tools-title">More text generators</h2><p>Open a focused workspace when you already know the style you need.</p></div>
        </div>
        <div className="tool-link-grid">
          {focusedTools.map(([name, preview, slug]) => (
            <Link href={`/tools/${slug}`} key={slug}>
              <span>{name}</span><strong>{preview}</strong><ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="how-it-works" aria-labelledby="how-title">
        <div className="section-intro">
          <span className="section-index">How it works</span>
          <div><h2 id="how-title">Three steps. No learning curve.</h2><p>The entire workflow stays on one page from input to clipboard.</p></div>
        </div>
        <div className="steps-grid">
          <article>
            <span className="step-number">01</span>
            <div className="step-icon"><MousePointerClick size={24} aria-hidden="true" /></div>
            <h3>Enter text</h3>
            <p>Type, paste, or load a sample into the workspace.</p>
          </article>
          <article>
            <span className="step-number">02</span>
            <div className="step-icon"><Sparkles size={24} aria-hidden="true" /></div>
            <h3>Compare styles</h3>
            <p>Filter, search, and save the most useful outputs.</p>
          </article>
          <article>
            <span className="step-number">03</span>
            <div className="step-icon"><Copy size={24} aria-hidden="true" /></div>
            <h3>Copy and paste</h3>
            <p>Copy one result and paste it into the app you use.</p>
          </article>
        </div>
      </section>

      <section className="content-hub" aria-labelledby="unicode-title">
        <article>
          <span className="section-index">About the tool</span>
          <h2 id="unicode-title">What is a small text generator?</h2>
          <p>A small text generator replaces ordinary Latin letters with visually similar Unicode characters. The result looks like a different font, but it remains selectable text you can copy and paste.</p>
          <p>TinyGlyph generates small caps, raised superscript, lowered subscript, mathematical alphabets, circled characters, and decorated styles without asking you to install anything.</p>
          <Link href="/about">Read how Unicode conversion works <ArrowRight size={16} aria-hidden="true" /></Link>
        </article>
        <aside>
          <span className="section-index">Popular uses</span>
          <h3>Where can I use it?</h3>
          <ul>
            <li><Check size={16} aria-hidden="true" /> Instagram and TikTok bios</li>
            <li><Check size={16} aria-hidden="true" /> Discord names and community roles</li>
            <li><Check size={16} aria-hidden="true" /> WhatsApp and Messenger chats</li>
            <li><Check size={16} aria-hidden="true" /> Captions, headings, and notes</li>
            <li><Check size={16} aria-hidden="true" /> Gaming names and profile labels</li>
          </ul>
          <div className="platform-tags"><span>Instagram</span><span>Discord</span><span>WhatsApp</span><span>TikTok</span><span>Reddit</span></div>
        </aside>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="section-intro">
          <span className="section-index">Help center</span>
          <div><h2 id="faq-title">Frequently asked questions</h2><p>Quick answers about Unicode support, privacy, and compatibility.</p></div>
        </div>
        <div className="faq-list">
          {faq.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<span className="faq-plus">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <div><span className="closing-glyph" aria-hidden="true">Aa → ᴀᵃ</span><h2>Convert another piece of text</h2><p>The generator is free, instant, and ready whenever you are.</p></div>
        <a className="primary-cta inverse" href="#generator">Back to the tool <ArrowRight size={18} aria-hidden="true" /></a>
      </section>
    </>
  );
}
