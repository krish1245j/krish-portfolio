import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GithubIcon from "./icons/GithubIcon";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ACCENT_HEX, ACCENT_CLASSES } from "../data/colors";

const HEX = ACCENT_HEX;
const COLOR_CLASSES = ACCENT_CLASSES;

function SignalVisual({ color }) {
  // AI Resume Analyzer — routing between multiple model providers
  const models = ["LLaMA", "Qwen", "Gemini"];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <rect x="34" y="130" width="88" height="40" rx="4" fill="none" stroke={color} strokeWidth="1.2" />
      <text x="78" y="154" textAnchor="middle" className="mono" fontSize="11" fill={color}>Resume</text>
      {models.map((m, i) => (
        <g key={m}>
          <line x1="122" y1="150" x2="266" y2={72 + i * 76} stroke="#262b3a" strokeWidth="1" />
          <circle r="2.5" fill={color}>
            <animateMotion
              dur={`${3 + i}s`}
              repeatCount="indefinite"
              path={`M122,150 L266,${72 + i * 76}`}
            />
          </circle>
          <rect x="266" y={52 + i * 76} width="96" height="40" rx="4" fill="none" stroke="#8991a0" strokeWidth="1" />
          <text x="314" y={76 + i * 76} textAnchor="middle" className="mono" fontSize="11" fill="#ecedef">
            {m}
          </text>
        </g>
      ))}
    </svg>
  );
}

function StructureVisual({ color }) {
  // E-commerce — RBAC route tree
  const rows = [
    { label: "/admin/products", role: "admin" },
    { label: "/admin/orders", role: "admin" },
    { label: "/cart", role: "user" },
    { label: "/checkout", role: "user" },
    { label: "/products", role: "public" },
  ];
  const roleColor = { admin: color, user: "#ecedef", public: "#8991a0" };
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <line x1="64" y1="34" x2="64" y2="266" stroke="#262b3a" strokeWidth="1" />
      {rows.map((r, i) => (
        <g key={r.label}>
          <line x1="64" y1={42 + i * 46} x2="112" y2={42 + i * 46} stroke="#262b3a" strokeWidth="1" />
          <circle cx="64" cy={42 + i * 46} r="3" fill={roleColor[r.role]} />
          <text x="122" y={46 + i * 46} className="mono" fontSize="12" fill={roleColor[r.role]}>
            {r.label}
          </text>
          <text x="336" y={46 + i * 46} textAnchor="end" className="mono" fontSize="9" fill="#8991a0">
            {r.role}
          </text>
        </g>
      ))}
    </svg>
  );
}

function LedgerVisual({ color }) {
  // Banking — ledger balancing bars
  const bars = [62, 88, 41, 95, 70, 55, 100];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <line x1="34" y1="248" x2="366" y2="248" stroke="#262b3a" strokeWidth="1" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={44 + i * 45}
          y={248 - h * 1.55}
          width="24"
          height={h * 1.55}
          fill={i === bars.length - 1 ? color : "#1a1e2b"}
          stroke="#262b3a"
        />
      ))}
      <text x="34" y="270" className="mono" fontSize="10" fill="#8991a0">
        balanced ledger, per transfer
      </text>
    </svg>
  );
}

const VISUALS = {
  signal: SignalVisual,
  structure: StructureVisual,
  ledger: LedgerVisual,
};

function ProjectVisual({ project, scale }) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(py * -6);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const Visual = VISUALS[project.theme];
  const colors = COLOR_CLASSES[project.accentColor] ?? COLOR_CLASSES.accent;
  const hex = HEX[project.accentColor] ?? HEX.accent;

  return (
    <motion.div
      style={{ scale, rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface/50 p-5 transition-shadow duration-500 ${colors.ring} hover:shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)]`}
    >
      <div className="grain" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(50% 50% at 50% 100%, ${hex}14, transparent 70%)` }}
      />
      {Visual && <Visual color={hex} />}
      <span className={`mono absolute left-5 top-4 text-xs ${colors.text}`}>{project.index}</span>
    </motion.div>
  );
}

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  const reversed = index % 2 === 1;
  const colors = COLOR_CLASSES[project.accentColor] ?? COLOR_CLASSES.accent;

  return (
    <div
      ref={ref}
      id={project.id}
      className="py-20 md:py-28"
    >
      {index > 0 && (
        <div className="mx-auto mb-14 max-w-[1560px] px-6 md:mb-16 md:px-10 xl:px-14" aria-hidden="true">
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--color-line) 20%, var(--color-line) 80%, transparent)",
            }}
          />
        </div>
      )}
      <div
        className={`mx-auto grid max-w-[1560px] grid-cols-1 items-center gap-10 px-6 md:px-10 xl:px-14 lg:grid-cols-2 lg:gap-16 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <ProjectVisual project={project} scale={visualScale} />

        <motion.div style={{ y }}>
          <p className={`mono mb-3 text-xs ${colors.text}`}>{project.accentDetail}</p>
          <h3 className="font-display text-3xl font-medium text-paper md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 text-base text-muted">{project.tagline}</p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-paper/90">
                <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${colors.dot}`} />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className={`mono rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors duration-300 ${colors.hoverText} ${colors.ring}`}
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                View live <ArrowUpRight size={15} />
              </a>
            ) : (
              <span className="mono inline-flex items-center gap-1.5 rounded-full border border-dashed border-line px-4 py-2 text-sm text-muted">
                Live link coming soon
              </span>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className={`inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-paper transition-colors ${colors.hoverText} ${colors.ring}`}
            >
              <GithubIcon size={15} /> Source
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
