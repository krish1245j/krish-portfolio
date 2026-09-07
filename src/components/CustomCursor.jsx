import { useEffect, useRef, useState } from "react";

// A lightweight custom cursor: a small solid dot plus a softer trailing ring
// that lags slightly behind it, so the pair always reads clearly as a cursor
// rather than a stray floating mark. Only mounts on fine-pointer devices —
// does nothing on touch, so there's no wasted CPU on mobile.
function getInitial() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(getInitial);
  const [variant, setVariant] = useState("default"); // default | link | view

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = (e) => setEnabled(e.matches);
    mq.addEventListener("change", handleChange);
    if (!mq.matches) return () => mq.removeEventListener("change", handleChange);

    const dot = dotRef.current;
    const ring = ringRef.current;
    let raf = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let dotX = x;
    let dotY = y;
    let ringX = x;
    let ringY = y;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      dotX += (x - dotX) * 0.35;
      dotY += (y - dotY) * 0.35;
      ringX += (x - ringX) * 0.14;
      ringY += (y - ringY) * 0.14;
      if (dot) dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const overHandler = (e) => {
      const target = e.target.closest("[data-cursor]");
      setVariant(target ? target.getAttribute("data-cursor") : "default");
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", overHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overHandler);
      mq.removeEventListener("change", handleChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const dotSizes = { default: 7, link: 5, view: 5 };
  const ringSizes = { default: 26, link: 46, view: 58 };
  const dotSize = dotSizes[variant] ?? dotSizes.default;
  const ringSize = ringSizes[variant] ?? ringSizes.default;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-paper mix-blend-difference"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: 0.6,
          transition: "width 0.25s var(--ease-out-quart), height 0.25s var(--ease-out-quart), margin 0.25s var(--ease-out-quart)",
        }}
      >
        {variant === "view" && (
          <span className="mono text-[9px] tracking-wide text-paper">VIEW</span>
        )}
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-paper mix-blend-difference"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          transition: "width 0.2s var(--ease-out-quart), height 0.2s var(--ease-out-quart), margin 0.2s var(--ease-out-quart)",
        }}
      />
    </>
  );
}
