"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

const CupScene = dynamic(() => import("./CupScene"), { ssr: false });

const STAGES = [
  {
    range: [0, 0.22] as [number, number],
    eyebrow: "01 — Origin",
    title: "Single-origin beans",
    copy: "Sourced direct from small farms in Ethiopia, Colombia, and Sumatra.",
  },
  {
    range: [0.26, 0.48] as [number, number],
    eyebrow: "02 — Roast",
    title: "Slow roasted in-house",
    copy: "Small batches, roasted low and slow to unlock every note.",
  },
  {
    range: [0.52, 0.74] as [number, number],
    eyebrow: "03 — Brew",
    title: "Poured with intention",
    copy: "Every cup is pulled to order — no compromises, no shortcuts.",
  },
  {
    range: [0.78, 1] as [number, number],
    eyebrow: "04 — Enjoy",
    title: "Your perfect cup",
    copy: "Rich, warm, and unmistakably Ember & Oak.",
  },
];

export default function ScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-espresso-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <CupScene progressRef={progressRef} />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-900/60 via-transparent to-espresso-900/40" />

        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="relative h-64 md:w-[26rem]">
              {STAGES.map((stage, i) => (
                <Caption key={i} stage={stage} scrollYProgress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
          <span className="animate-float text-xs uppercase tracking-[0.3em] text-cream-100/50">
            Keep scrolling
          </span>
        </div>
      </div>
    </section>
  );
}

function Caption({
  stage,
  scrollYProgress,
}: {
  stage: (typeof STAGES)[number];
  scrollYProgress: MotionValue<number>;
}) {
  const [start, end] = stage.range;
  const fadeIn = start + 0.03;
  const fadeOut = end - 0.03;
  const opacity = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, fadeIn, fadeOut, end],
    [24, 0, 0, -24]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
        {stage.eyebrow}
      </span>
      <h3 className="font-display text-4xl font-semibold text-cream-50 md:text-5xl">
        {stage.title}
      </h3>
      <p className="mt-4 max-w-sm text-base text-cream-200/70">{stage.copy}</p>
    </motion.div>
  );
}
