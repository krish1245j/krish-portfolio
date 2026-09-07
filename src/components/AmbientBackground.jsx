import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const BLOBS = [
  {
    color: "rgba(232,163,61,0.16)",
    size: 620,
    initial: { top: "-8%", left: "62%" },
    drift: { x: [0, 40, -20, 0], y: [0, 30, 10, 0] },
    duration: 34,
  },
  {
    color: "rgba(94,203,196,0.13)",
    size: 560,
    initial: { top: "28%", left: "-12%" },
    drift: { x: [0, -30, 20, 0], y: [0, 40, -20, 0] },
    duration: 40,
  },
  {
    color: "rgba(143,140,240,0.12)",
    size: 640,
    initial: { top: "68%", left: "58%" },
    drift: { x: [0, 25, -35, 0], y: [0, -25, 15, 0] },
    duration: 46,
  },
];

export default function AmbientBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.initial.top,
            left: blob.initial.left,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={reducedMotion ? undefined : blob.drift}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
