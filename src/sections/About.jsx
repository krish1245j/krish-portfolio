import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Scalable APIs",
    detail: "REST endpoints built around clear resources, not ad hoc routes.",
  },
  {
    title: "Secure applications",
    detail: "JWT authentication and RBAC applied at the route and action level.",
  },
  {
    title: "Full-stack products",
    detail: "React frontends wired to MVC and Service Layer backends.",
  },
  {
    title: "AI-powered experiences",
    detail: "Integrating LLM providers into real evaluation pipelines.",
  },
  {
    title: "Cloud-ready systems",
    detail: "Deployed on Vercel and Render, thinking in Docker and AWS.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 xl:px-14 md:py-36">
      <div className="mx-auto max-w-[1560px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
          >
            <span className="mono text-sm text-accent">About</span>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-paper md:text-5xl">
              Krish thinks in systems before he thinks in screens.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              He's a detail-oriented BCA student and aspiring backend engineer who's
              spent his projects asking the questions a good backend developer asks
              first: what happens when this fails, who's allowed to do this, and where
              does this data actually live. That habit shows up as JWT authentication,
              role-based access control and a Service Layer pattern across everything
              he ships — with strong DSA fundamentals underneath and an active interest
              in AI and cloud infrastructure.
            </p>
          </motion.div>

          <div className="flex flex-col">
            <p className="mono mb-6 text-xs text-muted">What he builds</p>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
                className="group border-t border-line py-6 last:border-b"
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-xl text-paper transition-colors group-hover:text-accent md:text-2xl">
                    {cap.title}
                  </h3>
                  <p className="max-w-sm text-sm text-muted sm:text-right">{cap.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
