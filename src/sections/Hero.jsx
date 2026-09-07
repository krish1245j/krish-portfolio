import { motion } from "framer-motion";
import { ArrowDownRight, Mail, FileDown } from "lucide-react";
import GithubIcon from "../components/icons/GithubIcon";
import { profile } from "../data/profile";
import { ACCENT_HEX, accentAt } from "../data/colors";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.3 },
  },
};

const line = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const NODES = [
  { key: "react", label: "React", x: 40, y: 40 },
  { key: "api", label: "API", x: 160, y: 40 },
  { key: "node", label: "Node.js", x: 280, y: 40 },
  { key: "express", label: "Express", x: 280, y: 130 },
  { key: "mongo", label: "MongoDB", x: 280, y: 220 },
  { key: "jwt", label: "JWT", x: 160, y: 220 },
  { key: "rbac", label: "RBAC", x: 40, y: 220 },
  { key: "aws", label: "AWS", x: 40, y: 130 },
];

const EDGES = [
  ["react", "api"],
  ["api", "node"],
  ["node", "express"],
  ["express", "mongo"],
  ["mongo", "jwt"],
  ["jwt", "rbac"],
  ["rbac", "aws"],
  ["aws", "react"],
  ["node", "jwt"],
];

function nodeByKey(k) {
  return NODES.find((n) => n.key === k);
}

function SystemGraphic() {
  return (
    <svg
      viewBox="0 0 320 260"
      className="h-full w-full"
      role="img"
      aria-label="Diagram showing React connected through an API layer to Node.js, Express, MongoDB, with JWT, RBAC and AWS as supporting nodes"
    >
      <g opacity="0.5">
        {EDGES.map(([a, b], i) => {
          const na = nodeByKey(a);
          const nb = nodeByKey(b);
          return (
            <line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="#262b3a"
              strokeWidth="1"
            />
          );
        })}
      </g>
      {EDGES.slice(0, 5).map(([a, b], i) => {
        const na = nodeByKey(a);
        const nb = nodeByKey(b);
        return (
          <circle key={`p-${i}`} r="2.5" fill={ACCENT_HEX[accentAt(i)]}>
            <animateMotion
              dur={`${4 + i * 0.6}s`}
              repeatCount="indefinite"
              path={`M${na.x},${na.y} L${nb.x},${nb.y}`}
            />
          </circle>
        );
      })}
      {NODES.map((n, i) => (
        <g key={n.key}>
          <circle cx={n.x} cy={n.y} r="3.5" fill={ACCENT_HEX[accentAt(i)]} />
          <text
            x={n.x}
            y={n.y - 12}
            textAnchor="middle"
            className="mono"
            fontSize="9"
            fill="#8991a0"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 md:px-10 xl:px-14"
    >
      <div className="grain" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 82% 12%, rgba(232,163,61,0.12), transparent 60%), radial-gradient(45% 40% at 8% 85%, rgba(94,203,196,0.08), transparent 65%)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative z-10 mx-auto grid w-full max-w-[1560px] grid-cols-1 items-center gap-14 lg:grid-cols-[1.3fr_0.9fr]"
      >
        <div>
          <motion.p variants={fade} className="mono mb-6 text-sm text-accent">
            Backend systems, built to scale
          </motion.p>

          <h1 className="font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-paper sm:text-[9vw] lg:text-[5.4vw]">
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                Krish
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block text-muted">
                Kumar
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            MERN Stack Developer building scalable backends, secure APIs and
            AI-powered applications — currently finishing a BCA in Amritsar.
          </motion.p>

          <motion.div variants={fade} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              data-cursor="link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Start a conversation
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              download
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <FileDown size={16} />
              Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          </motion.div>

          <motion.div variants={fade} className="mono mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs text-muted">
            <span>{profile.location}</span>
            <span className="flex items-center gap-1.5">
              <Mail size={12} /> {profile.email}
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={fade}
          className="relative hidden aspect-square rounded-2xl border border-line bg-surface/40 p-6 lg:block"
        >
          <SystemGraphic />
          <p className="mono absolute bottom-4 left-6 text-[11px] text-muted">
            request lifecycle, simplified
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="mono flex flex-col items-center gap-2 text-[11px] text-muted"
        >
          <span>scroll</span>
          <span className="h-8 w-px bg-line" />
        </motion.div>
      </motion.div>
    </section>
  );
}
