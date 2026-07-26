"use client";

import { FormEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <footer id="visit" className="bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl font-bold text-espresso-900">
              Ember &amp; Oak
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-espresso-600">
              A small roastery brewing single-origin coffee with intention,
              one cup at a time.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-espresso-500">
              Visit
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-espresso-700">
              214 Maple Street
              <br />
              Portland, OR 97209
              <br />
              <br />
              Mon–Fri: 7am – 6pm
              <br />
              Sat–Sun: 8am – 5pm
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-espresso-500">
              Stay in the loop
            </h4>
            <p className="mt-4 text-sm text-espresso-600">
              New origins, brewing tips, and the occasional discount.
            </p>
            {submitted ? (
              <p className="mt-4 text-sm font-medium text-gold-600">
                You&apos;re on the list. See you soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-espresso-900/15 bg-white px-4 py-2.5 text-sm text-espresso-900 outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-espresso-900 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-espresso-700"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-espresso-900/10 pt-8 text-xs text-espresso-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Ember &amp; Oak Coffee Co.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-600">
              Instagram
            </a>
            <a href="#" className="hover:text-gold-600">
              TikTok
            </a>
            <a href="#" className="hover:text-gold-600">
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
