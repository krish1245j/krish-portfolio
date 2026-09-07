import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "../data/profile";
import { useCountUp } from "../hooks/useCountUp";

function AchievementStat({ value, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const display = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-line py-8 first:border-t-0 md:border-t-0 md:border-l md:py-0 md:pl-8 md:first:border-l-0 md:first:pl-0"
    >
      <p className="font-display text-6xl font-medium text-accent md:text-7xl">{display}</p>
      <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-muted">{label}</p>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative border-t border-line px-6 py-28 md:px-10 xl:px-14 md:py-36">
      <div className="mx-auto max-w-[1560px]">
        <span className="mono text-sm text-accent">Achievements</span>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-medium text-paper md:text-5xl">
          A track record, in numbers.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {profile.achievements.map((a, i) => (
            <AchievementStat key={a.label} value={a.value} label={a.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
