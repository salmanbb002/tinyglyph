import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="TinyGlyph home">
      <span className="brand-mark" aria-hidden="true">
        <span>T</span>
        <small>t</small>
      </span>
      <span className="brand-name">TinyGlyph</span>
    </Link>
  );
}
