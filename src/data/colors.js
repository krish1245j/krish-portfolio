// A small, deliberate color system layered on top of the black/white base —
// three accent hues (amber, teal, violet) used consistently so the site reads
// as "duotone-plus" rather than fully monochrome, without ever becoming a
// rainbow. Every className below is a full literal string so Tailwind's
// scanner picks it up — never build these strings dynamically.

export const ACCENT_HEX = {
  accent: "#e8a33d",
  signal: "#5ecbc4",
  flux: "#8f8cf0",
};

export const ACCENT_CLASSES = {
  accent: {
    text: "text-accent",
    border: "border-accent",
    bg: "bg-accent",
    dot: "bg-accent",
    ring: "hover:border-accent/60",
    hoverText: "hover:text-accent",
  },
  signal: {
    text: "text-signal",
    border: "border-signal",
    bg: "bg-signal",
    dot: "bg-signal",
    ring: "hover:border-signal/60",
    hoverText: "hover:text-signal",
  },
  flux: {
    text: "text-flux",
    border: "border-flux",
    bg: "bg-flux",
    dot: "bg-flux",
    ring: "hover:border-flux/60",
    hoverText: "hover:text-flux",
  },
};

export const ACCENT_CYCLE = ["accent", "signal", "flux"];

export function accentAt(index) {
  return ACCENT_CYCLE[index % ACCENT_CYCLE.length];
}
