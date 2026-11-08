"use client";

import { useEffect, useState } from "react";

// One-time intro overlay. Plays once per browser session, never past 1.2s,
// never blocks interaction beyond that. Pure transform/opacity.
export default function Intro() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("bindev-intro") === "1") return;
    } catch (_) {}

    const showTimer = window.setTimeout(() => setShow(true), 0);
    const leaveTimer = window.setTimeout(() => setLeaving(true), 900);
    const hideTimer = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem("bindev-intro", "1");
      } catch (_) {}
    }, 1200);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background transition-opacity duration-300"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="h-3 w-3 rounded-full bg-signal shadow-[0_0_24px_color-mix(in_srgb,var(--signal)_80%,transparent)] animate-[intro-dot_900ms_cubic-bezier(0.16,1,0.3,1)_forwards]" />
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted animate-[intro-text_900ms_cubic-bezier(0.16,1,0.3,1)_900ms_forwards] opacity-0">
          BinDev
        </p>
      </div>
    </div>
  );
}