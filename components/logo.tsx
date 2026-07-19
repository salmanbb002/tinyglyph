import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="SmallTextGen home">
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill="#2563eb" />
        <path d="M7 9h18v6h-6v18h-6V15H7V9Z" fill="#fff" />
        <rect x="25" y="7" width="10" height="10" rx="3" fill="#fff" />
        <path d="M27 10h6v2h-2v4h-2v-4h-2v-2Z" fill="#2563eb" />
      </svg>
      <span className="brand-name">SmallText<span>Gen</span></span>
    </Link>
  );
}
