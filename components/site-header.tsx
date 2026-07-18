"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";

const links = [
  ["Small caps", "/tools/small-caps"],
  ["Superscript", "/tools/superscript"],
  ["Subscript", "/tools/subscript"],
  ["Cursive", "/tools/cursive"],
  ["Bubble", "/tools/bubble"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
          <Link className="nav-accent" href="/#generator">
            <Sparkles size={15} aria-hidden="true" /> Open generator
          </Link>
        </nav>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link href="/#generator" onClick={() => setOpen(false)}>All text styles</Link>
        </nav>
      )}
    </header>
  );
}
