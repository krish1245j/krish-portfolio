import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        className="fixed left-1/2 top-4 z-40 w-[min(94%,880px)] -translate-x-1/2"
      >
        <div
          className={`flex items-center justify-between rounded-full border border-line/80 px-4 backdrop-blur-xl transition-all duration-500 ${
            scrolled ? "bg-surface/80 py-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]" : "bg-surface/40 py-3"
          }`}
        >
          <button
            onClick={() => scrollTo("home")}
            data-cursor="link"
            className="mono text-sm tracking-tight text-paper"
            aria-label="Go to top"
          >
            KK<span className="text-accent">.</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                data-cursor="link"
                className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                  active === item.id ? "text-ink" : "text-muted hover:text-paper"
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contact")}
            data-cursor="link"
            className="hidden rounded-full border border-line px-4 py-1.5 text-sm text-paper transition-colors hover:border-accent hover:text-accent md:block"
          >
            Say hello
          </button>

          <button
            className="text-paper md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => scrollTo(item.id)}
                  className={`font-display text-3xl ${active === item.id ? "text-accent" : "text-paper"}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
