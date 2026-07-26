"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-screen min-h-[720px] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-espresso-900 via-espresso-800 to-espresso-900"
    >
      <div className="absolute inset-0 bg-grain mix-blend-overlay" />
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-gold-500/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-espresso-400/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400"
        >
          Small-batch Roastery · Est. 2024
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl font-bold leading-[1.05] text-cream-50 sm:text-7xl md:text-8xl"
        >
          Coffee,
          <br />
          <span className="text-gold-400">Slower.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-cream-200/70"
        >
          Ember &amp; Oak roasts single-origin beans in small batches, brewed
          fresh, and poured with intention — one cup at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#menu"
            className="rounded-full bg-gold-500 px-8 py-3.5 text-sm font-semibold text-espresso-900 shadow-lg shadow-gold-500/20 transition-transform hover:scale-105"
          >
            Explore the Menu
          </a>
          <a
            href="#craft"
            className="rounded-full border border-cream-100/25 px-8 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-cream-50/10"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream-100/50"
      >
        <div className="flex flex-col items-center gap-2 animate-float">
          <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeOpacity="0.6" />
            <circle cx="7" cy="7" r="1.6" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
