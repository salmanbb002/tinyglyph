import Link from "next/link";
import { ArrowDown, ArrowRight, Camera, Check, Copy, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
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

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="status-dot" /> Free · private · instant</span>
          <h1>Make every word<br /><em>a little different.</em></h1>
          <p className="hero-lede">
            Turn ordinary text into small caps, superscript, cursive, bubble letters, and 18 more copy-ready Unicode styles.
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href="#generator">Start styling <ArrowDown size={18} aria-hidden="true" /></a>
            <span><ShieldCheck size={17} aria-hidden="true" /> Your text stays on this device</span>
          </div>
        </div>
        <div className="hero-specimen" aria-label="A preview of TinyGlyph text styles">
          <div className="specimen-topline"><span>Type specimen / 01</span><span>Unicode</span></div>
          <div className="specimen-main">
            <span className="specimen-normal">Tiny words</span>
            <span className="specimen-script">ᵀⁱⁿʸ ʷᵒʳᵈˢ</span>
          </div>
          <div className="specimen-swatches">
            <span>ᴛɪɴʏ ᴡᴏʀᴅꜱ</span>
            <span>𝓣𝓲𝓷𝔂 𝔀𝓸𝓻𝓭𝓼</span>
            <span>Ⓣⓘⓝⓨ ⓦⓞⓡⓓⓢ</span>
          </div>
          <div className="specimen-stamp">22<br /><small>styles</small></div>
        </div>
      </section>

      <div className="style-marquee" aria-hidden="true">
        <div>
          <span>Small caps</span><b>✦</b><span>Superscript</span><b>✦</b><span>Cursive</span><b>✦</b>
          <span>Bubble</span><b>✦</b><span>Fraktur</span><b>✦</b><span>Monospace</span><b>✦</b>
          <span>Small caps</span><b>✦</b><span>Superscript</span><b>✦</b><span>Cursive</span><b>✦</b>
        </div>
      </div>

      <Converter />

      <section className="how-it-works" aria-labelledby="how-title">
        <div className="section-intro">
          <span className="section-index">01 / How it works</span>
          <h2 id="how-title">From plain to <em>personal</em><br />in three small moves.</h2>
        </div>
        <div className="steps-grid">
          <article>
            <span className="step-number">01</span>
            <div className="step-icon">Aa</div>
            <h3>Type your text</h3>
            <p>Write, paste, or use a sample. Every style updates immediately.</p>
          </article>
          <article>
            <span className="step-number">02</span>
            <div className="step-icon">ᴀᵃ</div>
            <h3>Find your voice</h3>
            <p>Search and filter 22 distinct styles. Save the ones you love.</p>
          </article>
          <article>
            <span className="step-number">03</span>
            <div className="step-icon"><Copy size={28} aria-hidden="true" /></div>
            <h3>Copy anywhere</h3>
            <p>One tap puts the Unicode result on your clipboard, ready to paste.</p>
          </article>
        </div>
      </section>

      <section className="use-cases" aria-labelledby="uses-title">
        <div className="section-intro light">
          <span className="section-index">02 / Made to travel</span>
          <h2 id="uses-title">One tiny tool.<br /><em>So many places.</em></h2>
          <p>Unicode text goes wherever normal text can go—no image exports and no font files.</p>
        </div>
        <div className="use-case-grid">
          <article className="social-card instagram-card">
            <div className="use-icon"><Camera aria-hidden="true" /></div>
            <span>Social profiles</span>
            <h3>Make the bio<br />feel like yours.</h3>
            <div className="mock-profile">
              <span className="mock-avatar">tg</span>
              <p><b>studio.notes</b><br />ᴍᴀᴋɪɴɢ ᴛʜɪɴɢꜱ, ꜱʟᴏᴡʟʏ ✦</p>
            </div>
          </article>
          <article className="social-card chat-card">
            <div className="use-icon"><MessageCircle aria-hidden="true" /></div>
            <span>Chats & communities</span>
            <h3>Say less.<br />Stand out more.</h3>
            <div className="mock-chat">
              <p>Did we ship it?</p>
              <p>ʸᵉˢ. ⁱᵗ’ˢ ˡⁱᵛᵉ ✦</p>
            </div>
          </article>
          <article className="social-card creator-card">
            <div className="use-icon"><Sparkles aria-hidden="true" /></div>
            <span>Captions & titles</span>
            <h3>Give the first line<br />a second look.</h3>
            <div className="creator-type">𝓢𝓸𝓯𝓽<br /><strong>LAUNCH</strong></div>
          </article>
        </div>
      </section>

      <section className="unicode-story" aria-labelledby="unicode-title">
        <div className="unicode-mark" aria-hidden="true">U+</div>
        <div>
          <span className="section-index">03 / Under the hood</span>
          <h2 id="unicode-title">It looks like a font.<br /><em>It travels like text.</em></h2>
        </div>
        <div className="unicode-copy">
          <p>
            TinyGlyph does not shrink a font. It swaps familiar letters for Unicode characters that already have a small, raised, circled, or stylized shape.
          </p>
          <p>
            Because the result is real text, you can select it, search it, paste it, and remove it like any other text. Some alphabets are incomplete, so we preserve unsupported characters for clarity.
          </p>
          <Link href="/about">How TinyGlyph works <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="tool-directory" aria-labelledby="tools-title">
        <div className="section-intro">
          <span className="section-index">04 / Focused tools</span>
          <h2 id="tools-title">Go straight to<br /><em>your kind of small.</em></h2>
        </div>
        <div className="tool-link-grid">
          {[
            ["Small caps", "ᴛɪɴʏ", "small-caps"],
            ["Superscript", "ᵗⁱⁿʸ", "superscript"],
            ["Subscript", "ₜᵢₙᵧ", "subscript"],
            ["Cursive", "𝓽𝓲𝓷𝔂", "cursive"],
            ["Bubble", "ⓣⓘⓝⓨ", "bubble"],
            ["Upside down", "ʎuᴉʇ", "upside-down"],
          ].map(([name, preview, slug]) => (
            <Link href={`/tools/${slug}`} key={slug}>
              <span>{name}</span><strong>{preview}</strong><ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="faq-section" aria-labelledby="faq-title">
        <div className="section-intro">
          <span className="section-index">05 / Good to know</span>
          <h2 id="faq-title">Small questions,<br /><em>clear answers.</em></h2>
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
        <span className="closing-glyph" aria-hidden="true">ᵗⁱⁿʸ</span>
        <h2>Ready to make<br />something <em>small?</em></h2>
        <a className="primary-cta inverse" href="#generator">Open the generator <ArrowRight size={18} aria-hidden="true" /></a>
        <div className="closing-notes"><span><Check size={15} /> No sign-up</span><span><Check size={15} /> No limits</span><span><Check size={15} /> No uploads</span></div>
      </section>
    </>
  );
}
