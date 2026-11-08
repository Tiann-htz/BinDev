"use client";

import { useEffect, useRef, useState } from "react";

export default function SignalCursor() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: -1000, y: -1000, cx: -1000, cy: -1000, hovering: false });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduced || coarse) return;
    const t = window.setTimeout(() => setEnabled(true), 0);

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      const hovering = !!(e.target && e.target.closest && e.target.closest("a, button, [role='button']"));
      pos.current.hovering = hovering;
      const el = ref.current;
      if (el) {
        // Absorb the floating cursor into the control's border glow: hide fast
        // on enter, return a touch slower so it does not flicker at the edges.
        el.style.transition = hovering
          ? "opacity 420ms cubic-bezier(0.16, 1, 0.3, 1), transform 420ms cubic-bezier(0.16, 1, 0.3, 1)"
          : "opacity 260ms cubic-bezier(0.16, 1, 0.3, 1), transform 260ms cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.opacity = hovering ? "0" : "1";
        el.style.transform = hovering
          ? "translate3d(" + (pos.current.cx - 18) + "px, " + (pos.current.cy - 18) + "px, 0) scale(0.6)"
          : "translate3d(" + (pos.current.cx - 18) + "px, " + (pos.current.cy - 18) + "px, 0) scale(1)";
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const tick = () => {
      const p = pos.current;
      p.cx += (p.x - p.cx) * 0.18;
      p.cy += (p.y - p.cy) * 0.18;
      const el = ref.current;
      if (el) {
        const scale = p.hovering ? 0.6 : 1;
        el.style.transform =
          "translate3d(" + (p.cx - 18) + "px, " + (p.cy - 18) + "px, 0) scale(" + scale + ")";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-screen"
      style={{ willChange: "transform, opacity", transition: "opacity 180ms ease" }}
    >
      <div className="h-9 w-9 rounded-full bg-signal/25 blur-md" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_12px_color-mix(in_srgb,var(--signal)_80%,transparent)]" />
    </div>
  );
}
