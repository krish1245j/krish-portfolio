import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onDone, reducedMotion }) {
  const [phase, setPhase] = useState(reducedMotion ? 2 : 0);

  useEffect(() => {
    if (reducedMotion) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(onDone, 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
        >
          <AnimatePresence mode="wait">
            {phase === 0 ? (
              <motion.span
                key="kk"
                exit={{ opacity: 0, y: -10 }}
                className="font-display text-4xl text-paper"
              >
                KK<span className="text-accent">.</span>
              </motion.span>
            ) : (
              <motion.span
                key="full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mono text-sm tracking-[0.2em] text-muted"
              >
                KRISH KUMAR
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
