import { useRef } from "react";
import { motion } from "framer-motion";
import { Mail, FileDown } from "lucide-react";
import GithubIcon from "../components/icons/GithubIcon";
import { profile } from "../data/profile";

function MagneticButton({ children, href, target, download, className, dataCursor }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target ? "noreferrer" : undefined}
      download={download}
      data-cursor={dataCursor ?? "link"}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: "transform 0.2s var(--ease-out-quart)" }}
    >
      {children}
    </a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-line px-6 py-28 md:px-10 xl:px-14 md:py-40">
      <div className="mx-auto max-w-[1240px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-medium leading-[1.05] text-paper sm:text-6xl md:text-7xl"
        >
          Let's build something
          <br />
          <span className="text-muted">meaningful.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-md text-base text-muted"
        >
          Open to backend and full-stack roles, internships, and collaborations
          where the interesting problems are underneath the UI.
        </motion.p>

        <div className="mt-12 flex flex-wrap gap-4">
          <MagneticButton
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink"
          >
            <Mail size={16} /> {profile.email}
          </MagneticButton>
          <MagneticButton
            href={profile.github}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-paper hover:border-accent hover:text-accent"
          >
            <GithubIcon size={16} /> {profile.githubLabel}
          </MagneticButton>
          <MagneticButton
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-paper hover:border-accent hover:text-accent"
          >
            <FileDown size={16} /> Resume
          </MagneticButton>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mono mt-16 rounded-xl border border-line bg-surface/40 p-5 text-xs leading-relaxed text-muted"
        >
          <p><span className="text-accent">$</span> location --show</p>
          <p className="mt-1 pl-4">{profile.location}</p>
        </motion.div>
      </div>
    </section>
  );
}
