import { motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="relative py-8">
      <div className="mx-auto max-w-[1560px] px-6 md:px-10 xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mono text-sm text-accent">Selected work</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium text-paper md:text-5xl">
            Three systems, three different problems.
          </h2>
        </motion.div>
      </div>

      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </section>
  );
}
