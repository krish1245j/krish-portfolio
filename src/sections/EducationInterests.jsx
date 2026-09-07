import { motion } from "framer-motion";
import { profile } from "../data/profile";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function EducationInterests() {
  return (
    <section className="relative border-t border-line px-6 py-24 md:px-10 xl:px-14 md:py-32">
      <div className="mx-auto grid max-w-[1560px] grid-cols-1 gap-16 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <span className="mono text-sm text-accent">Education</span>
          <div className="mt-6 flex items-start gap-5">
            <span className="mono mt-1 text-xs text-muted">2024—27</span>
            <div>
              <h3 className="font-display text-2xl text-paper">{profile.education.degree}</h3>
              <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
              <p className="mono mt-2 text-xs text-muted">{profile.education.graduation}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <span className="mono text-sm text-accent">Interests</span>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-line px-3.5 py-1.5 text-sm text-paper transition-colors hover:border-accent hover:text-accent"
              >
                {interest}
              </span>
            ))}
          </div>
          <p className="mono mt-6 text-xs text-muted">
            Languages — {profile.languages.join(" · ")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
