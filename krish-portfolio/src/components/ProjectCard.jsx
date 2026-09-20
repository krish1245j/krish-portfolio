import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GithubIcon from "./icons/GithubIcon";

function SignalVisual() {
  // AI Resume Analyzer — routing between multiple model providers
  const models = ["LLaMA", "Qwen", "Gemini"];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <rect x="30" y="130" width="90" height="40" rx="4" fill="none" stroke="#e8a33d" strokeWidth="1.2" />
      <text x="75" y="154" textAnchor="middle" className="mono" fontSize="11" fill="#e8a33d">Resume</text>
      {models.map((m, i) => (
        <g key={m}>
          <line x1="120" y1="150" x2="270" y2={70 + i * 80} stroke="#262b3a" strokeWidth="1" />
          <circle r="2.5" fill="#e8a33d">
            <animateMotion
              dur={`${3 + i}s`}
              repeatCount="indefinite"
              path={`M120,150 L270,${70 + i * 80}`}
            />
          </circle>
          <rect x="270" y={50 + i * 80} width="100" height="40" rx="4" fill="none" stroke="#8991a0" strokeWidth="1" />
          <text x="320" y={74 + i * 80} textAnchor="middle" className="mono" fontSize="11" fill="#ecedef">
            {m}
          </text>
        </g>
      ))}
    </svg>
  );
}

function StructureVisual() {
  // E-commerce — RBAC route tree
  const rows = [
    { label: "/admin/products", role: "admin" },
    { label: "/admin/orders", role: "admin" },
    { label: "/cart", role: "user" },
    { label: "/checkout", role: "user" },
    { label: "/products", role: "public" },
  ];
  const color = { admin: "#e8a33d", user: "#ecedef", public: "#8991a0" };
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <line x1="60" y1="30" x2="60" y2="270" stroke="#262b3a" strokeWidth="1" />
      {rows.map((r, i) => (
        <g key={r.label}>
          <line x1="60" y1={40 + i * 48} x2="110" y2={40 + i * 48} stroke="#262b3a" strokeWidth="1" />
          <circle cx="60" cy={40 + i * 48} r="3" fill={color[r.role]} />
          <text x="120" y={44 + i * 48} className="mono" fontSize="12" fill={color[r.role]}>
            {r.label}
          </text>
          <text x="340" y={44 + i * 48} textAnchor="end" className="mono" fontSize="9" fill="#8991a0">
            {r.role}
          </text>
        </g>
      ))}
    </svg>
  );
}

function LedgerVisual() {
  // Banking — ledger balancing bars
  const bars = [62, 88, 41, 95, 70, 55, 100];
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <line x1="30" y1="250" x2="370" y2="250" stroke="#262b3a" strokeWidth="1" />
      {bars.map((h, i) => (
        <g key={i}>
          <rect
            x={40 + i * 46}
            y={250 - h * 1.6}
            width="24"
            height={h * 1.6}
            fill={i === bars.length - 1 ? "#e8a33d" : "#1a1e2b"}
            stroke="#262b3a"
          />
        </g>
      ))}
      <text x="30" y="270" className="mono" fontSize="10" fill="#8991a0">
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

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const visualScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  const Visual = VISUALS[project.theme];
  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      id={project.id}
      className="border-t border-line py-20 first:border-t-0 md:py-28"
    >
      <div
        className={`mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-2 lg:gap-16 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div style={{ scale: visualScale }} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface/50">
          <div className="grain" />
          {Visual && <Visual />}
          <span className="mono absolute left-4 top-4 text-xs text-muted">{project.index}</span>
        </motion.div>

        <motion.div style={{ y }}>
          <p className="mono mb-3 text-xs text-accent">{project.accentDetail}</p>
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
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="mono rounded-full border border-line px-3 py-1 text-xs text-muted"
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
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon size={15} /> Source
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
