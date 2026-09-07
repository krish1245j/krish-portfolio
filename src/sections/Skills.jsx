import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories, skillRelations } from "../data/skills";
import { ACCENT_CLASSES, ACCENT_HEX, accentAt } from "../data/colors";

// Map every skill name to its category's color, so a hovered chip and its
// related chips light up in a consistent hue even across category columns.
const SKILL_COLOR = {};
skillCategories.forEach((cat, i) => {
  const color = accentAt(i);
  cat.items.forEach((item) => {
    SKILL_COLOR[item.name] = color;
  });
});

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  const related = hovered ? skillRelations[hovered] ?? [] : [];
  const hoveredContext = hovered
    ? skillCategories.flatMap((c) => c.items).find((i) => i.name === hovered)?.context
    : null;
  const hoveredColor = hovered ? SKILL_COLOR[hovered] : null;

  return (
    <section id="skills" className="relative px-6 py-28 md:px-10 xl:px-14 md:py-36">
      <div className="mx-auto max-w-[1560px]">
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
                  className="mono flex items-center gap-2 text-sm text-muted md:justify-end"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: ACCENT_HEX[hoveredColor] }}
                  />
                  {hoveredContext}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          {skillCategories.map((cat, catIndex) => {
            const catColor = accentAt(catIndex);
            const colors = ACCENT_CLASSES[catColor];
            return (
              <div key={cat.id}>
                <h3 className="mono mb-4 flex items-center gap-2 text-xs uppercase tracking-wider text-muted/80">
                  <span className={`h-1.5 w-3 rounded-full ${colors.bg}`} />
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => {
                    const isHovered = hovered === skill.name;
                    const isRelated = related.includes(skill.name);
                    const isDimmed = hovered && !isHovered && !isRelated;
                    return (
                      <motion.button
                        key={skill.name}
                        onMouseEnter={() => setHovered(skill.name)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(skill.name)}
                        onBlur={() => setHovered(null)}
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        data-cursor="link"
                        className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                          isHovered
                            ? `${colors.border} ${colors.bg} text-ink`
                            : isRelated
                            ? `${colors.border} ${colors.text}`
                            : "border-line text-paper"
                        }`}
                        style={{ opacity: isDimmed ? 0.3 : 1, transition: "opacity 0.3s ease" }}
                      >
                        {skill.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
