import { useEffect, useRef, useState } from "react";

// A lightweight custom cursor. Only mounts its listeners on fine-pointer
// devices, and does nothing on touch — no CPU cost on mobile.
function getInitial() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [enabled, setEnabled] = useState(getInitial);
  const [variant, setVariant] = useState("default"); // default | link | view

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleChange = (e) => setEnabled(e.matches);
    mq.addEventListener("change", handleChange);
    if (!mq.matches) return () => mq.removeEventListener("change", handleChange);

    const dot = dotRef.current;
    let raf = null;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      if (dot) dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
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

  const sizes = { default: 8, link: 14, view: 56 };
  const size = sizes[variant] ?? sizes.default;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: "#ecedef",
        transition: "width 0.2s var(--ease-out-quart), height 0.2s var(--ease-out-quart), margin 0.2s var(--ease-out-quart)",
      }}
    >
      {variant === "view" && (
        <span className="mono text-[10px] tracking-wide text-ink">VIEW</span>
      )}
    </div>
  );
}
