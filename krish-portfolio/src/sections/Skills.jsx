import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, skillRelations } from "../data/skills";

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  const related = hovered ? skillRelations[hovered] ?? [] : [];
  const hoveredContext = hovered
    ? skillCategories
        .flatMap((c) => c.items)
        .find((i) => i.name === hovered)?.context
    : null;

  return (
    <section id="skills" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mono text-sm text-accent">Skills</span>
            <h2 className="mt-4 font-display text-4xl font-medium text-paper md:text-5xl">
              A toolkit shaped by backend problems.
            </h2>
          </div>
          <div className="h-10 max-w-xs">
            <AnimatePresence mode="wait">
              {hoveredContext && (
                <motion.p
                  key={hoveredContext}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mono text-sm text-muted md:text-right"
                >
                  {hoveredContext}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          {skillCategories.map((cat) => (
            <div key={cat.id}>
              <h3 className="mono mb-4 text-xs uppercase tracking-wider text-muted/80">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => {
                  const isHovered = hovered === skill.name;
                  const isRelated = related.includes(skill.name);
                  const isDimmed = hovered && !isHovered && !isRelated;
                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() => setHovered(skill.name)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(skill.name)}
                      onBlur={() => setHovered(null)}
                      data-cursor="link"
                      className={`rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ${
                        isHovered
                          ? "border-accent bg-accent text-ink"
                          : isRelated
                          ? "border-accent/60 text-accent"
                          : "border-line text-paper"
                      } ${isDimmed ? "opacity-30" : "opacity-100"}`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
