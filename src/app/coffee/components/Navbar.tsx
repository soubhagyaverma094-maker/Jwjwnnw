"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#craft", label: "Craft" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-cream-50/90 shadow-[0_1px_0_0_rgba(43,26,16,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className={`font-display text-xl font-bold tracking-tight ${
            solid ? "text-espresso-900" : "text-cream-50"
          }`}
        >
          Ember &amp; Oak
        </a>

        <div
          className={`hidden items-center gap-8 text-sm font-medium md:flex ${
            solid ? "text-espresso-700" : "text-cream-100/90"
          }`}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-gold-500"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#menu"
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
            solid
              ? "bg-espresso-900 text-cream-50 hover:bg-espresso-700"
              : "bg-cream-50 text-espresso-900 hover:bg-gold-400"
          }`}
        >
          Order Now
        </a>
      </nav>
    </header>
  );
}
