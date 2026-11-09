"use client";

import { useRef, useEffect } from "react";

// Magnetic pull for primary CTAs on desktop. Moves the wrapped element toward
// the cursor by at most ~3px; does nothing on touch / reduced-motion.
export default function Magnetic({ children, className = "", strength = 0.16, radius = 110 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduced || coarse) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const pullX = dx * strength;
        const pullY = dy * strength;
        const max = 3;
        el.style.transform = `translate3d(${Math.max(-max, Math.min(max, pullX))}px, ${Math.max(-max, Math.min(max, pullY))}px, 0)`;
      } else {
        el.style.transform = "";
      }
    };
    const onLeave = () => {
      el.style.transform = "";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, radius]);

  return (
    <span
      ref={ref}
      className={"inline-block will-change-transform " + className}
      style={{ transition: "transform 280ms cubic-bezier(0.32, 0.72, 0, 1)" }}
    >
      {children}
    </span>
  );
}