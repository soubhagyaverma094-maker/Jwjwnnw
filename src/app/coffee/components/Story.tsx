"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "12+", label: "Bean origins" },
  { value: "100%", label: "Direct trade" },
  { value: "48hrs", label: "Roast to cup" },
  { value: "0", label: "Compromises" },
];

export default function Story() {
  return (
    <section id="craft" className="bg-cream-50 py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
            Our Story
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-espresso-900 md:text-5xl">
            Roasted with patience, served with purpose.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-espresso-600">
            Ember &amp; Oak started as a single roaster in the back of a
            neighborhood bakery. Today, we still buy directly from the
            farmers who grow our beans, roast every batch by hand, and taste
            each one before it reaches your cup. No shortcuts, no fillers —
            just coffee the way it should be.
          </p>
          <p className="mt-4 text-base leading-relaxed text-espresso-600">
            Scroll down to watch a single bean become the cup in your hands.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-espresso-900/8 bg-white p-6 text-center shadow-sm"
            >
              <div className="font-display text-3xl font-bold text-espresso-900">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-espresso-500">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
