import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <span aria-hidden="true">⁴⁰⁴</span>
      <p className="eyebrow">This glyph wandered off</p>
      <h1>Nothing this small<br /><em>lives here.</em></h1>
      <Link className="primary-cta" href="/"><ArrowLeft size={17} /> Back to the generator</Link>
    </section>
  );
}
