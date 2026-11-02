"use client";

import { useEffect, useRef, useState } from "react";

export default function SignalCursor() {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: -1000, y: -1000, cx: -1000, cy: -1000 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduced || coarse) return;
    const t = window.setTimeout(() => setEnabled(true), 0);

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const tick = () => {
      const p = pos.current;
      p.cx += (p.x - p.cx) * 0.18;
      p.cy += (p.y - p.cy) * 0.18;
      const el = ref.current;
      if (el) {
        el.style.transform = "translate3d(" + (p.cx - 18) + "px, " + (p.cy - 18) + "px, 0)";
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
      style={{ willChange: "transform" }}
    >
      <div className="h-9 w-9 rounded-full bg-signal/25 blur-md" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_12px_color-mix(in_srgb,var(--signal)_80%,transparent)]" />
    </div>
  );
}
