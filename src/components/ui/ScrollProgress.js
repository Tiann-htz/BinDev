"use client";

import { useEffect, useState } from "react";

// Thin signal line pinned to the top that tracks reading progress — a quiet,
// expensive-feeling affordance (think Stripe / Linear), not a heavy widget.
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-signal shadow-[0_0_14px_color-mix(in_srgb,var(--signal)_70%,transparent)]"
      style={{ transform: "scaleX(" + progress + ")", willChange: "transform" }}
    />
  );
}