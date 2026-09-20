import { motion } from "framer-motion";

const LAYERS = [
  { label: "Client", detail: "React request, user action" },
  { label: "API Layer", detail: "Route matched, request received" },
  { label: "Middleware", detail: "JWT verified, role checked" },
  { label: "Controller", detail: "Input validated, request parsed" },
  { label: "Service Layer", detail: "Business logic executed" },
  { label: "Database", detail: "MongoDB read or write, response returned" },
];

export default function Architecture() {
  return (
    <section id="architecture" className="relative overflow-hidden border-t border-line px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="mono text-sm text-accent">Behind the system</span>
          <h2 className="mt-4 font-display text-4xl font-medium text-paper md:text-5xl">
            How a request actually moves.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
            This is the shape every backend Krish builds follows — a request
            doesn't touch the database until it's been authenticated,
            authorized and validated.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-line md:left-1/2" aria-hidden="true" />
          <div className="relative mx-auto h-3 w-3 overflow-visible md:absolute md:left-1/2 md:-translate-x-1/2">
            <motion.div
              className="absolute h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(232,163,61,0.5)] md:left-1/2 md:-translate-x-1/2"
              style={{ left: 12 }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-start gap-5 py-6 md:w-1/2 ${
                i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              <span
                className={`absolute top-8 z-10 h-2.5 w-2.5 rounded-full border-2 border-accent bg-ink left-2.5 -translate-x-1/2 ${
                  i % 2 === 0 ? "md:left-auto md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                }`}
              />
              <div className="ml-9 md:ml-0">
                <p className="mono text-xs text-muted">0{i + 1}</p>
                <h3 className="font-display text-2xl text-paper">{layer.label}</h3>
                <p className="mt-1 text-sm text-muted">{layer.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-2">
          {["JWT", "RBAC", "Validation", "Centralized Error Handling", "MongoDB", "REST APIs"].map((tag) => (
            <span key={tag} className="mono rounded-full border border-line px-3.5 py-1.5 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
