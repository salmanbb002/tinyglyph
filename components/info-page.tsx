import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type InfoSection = {
  title: string;
  body: React.ReactNode;
};

export function InfoPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: InfoSection[] }) {
  return (
    <article className="info-page">
      <header>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>
      <div className="info-layout">
        <aside>
          <span>On this page</span>
          {sections.map((section) => <a href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={section.title}>{section.title}</a>)}
        </aside>
        <div className="info-content">
          {sections.map((section) => (
            <section id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} key={section.title}>
              <h2>{section.title}</h2>
              {section.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
