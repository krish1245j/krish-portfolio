import { useEffect, useRef, useState } from "react";

// Animates a numeric prefix within a string once it enters view.
// Handles values like "100+", "3rd", "3" gracefully by only counting the
// leading digits and preserving any trailing characters (+, rd, etc).
export function useCountUp(value, inView, duration = 1200) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || target === null) return;
    started.current = true;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, suffix, duration]);

  return display;
}
