"use client";

import { motion } from "framer-motion";

const ITEMS = [
  {
    name: "Espresso",
    tag: "Classic",
    price: "$3.50",
    copy: "A tight, syrupy double shot — bright and unapologetically bold.",
  },
  {
    name: "Cortado",
    tag: "Signature",
    price: "$4.50",
    copy: "Equal parts espresso and steamed milk. Balanced, never sweet.",
  },
  {
    name: "Pour Over",
    tag: "Single-origin",
    price: "$5.00",
    copy: "Hand-poured, one cup at a time. Notes rotate with the season.",
  },
  {
    name: "Cold Brew",
    tag: "House-made",
    price: "$4.75",
    copy: "Steeped 18 hours for a smooth, low-acid, naturally sweet finish.",
  },
  {
    name: "Oat Latte",
    tag: "Favorite",
    price: "$5.25",
    copy: "Silky oat milk and espresso, finished with a whisper of cinnamon.",
  },
  {
    name: "Mocha",
    tag: "Indulgent",
    price: "$5.50",
    copy: "Dark chocolate, espresso, and steamed milk. Rich, not sugary.",
  },
];

export default function Menu() {
  return (
    <section id="menu" className="bg-espresso-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            The Menu
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold text-cream-50 md:text-5xl">
            Made to order
          </h2>
          <p className="mt-4 text-base text-cream-200/60">
            Every drink starts with beans roasted less than two weeks ago.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group rounded-2xl border border-cream-50/10 bg-espresso-900/60 p-7 transition-colors hover:border-gold-400/40 hover:bg-espresso-900"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-gold-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-400">
                  {item.tag}
                </span>
                <span className="font-display text-lg font-semibold text-cream-50">
                  {item.price}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-cream-50 transition-colors group-hover:text-gold-400">
                {item.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-200/60">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
