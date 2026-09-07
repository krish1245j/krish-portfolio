import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8 md:px-10 xl:px-14">
      <div className="mx-auto flex max-w-[1560px] flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="mono text-xs text-muted">© {new Date().getFullYear()} {profile.name}</p>
        <p className="mono text-xs text-muted">Built with React, Tailwind &amp; Framer Motion</p>
      </div>
    </footer>
  );
}
