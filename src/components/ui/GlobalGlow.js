"use client";

import { useEffect } from "react";

// Drives the mouse-follow border glow for interactive elements and any
// `.glow-border` surface. The glow brightens as the cursor approaches (even
// before hovering), so the interaction can be anticipated.
export default function GlobalGlow() {
  useEffect(() => {
    const targets = () =>
      Array.from(document.querySelectorAll("a, button, [role='button'], .glow-border"));

    const update = (e) => {
      for (const el of targets()) {
        const rect = el.getBoundingClientRect();
        // Distance from the cursor to the element's nearest edge.
        const x = Math.max(rect.left, Math.min(e.clientX, rect.right));
        const y = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
        const dist = Math.hypot(e.clientX - x, e.clientY - y);
        const radius = 110;
        const strength = dist < radius ? Math.pow(1 - dist / radius, 1.6) : 0;

        el.style.setProperty("--gx", (e.clientX - rect.left) + "px");
        el.style.setProperty("--gy", (e.clientY - rect.top) + "px");
        el.style.setProperty("--glow-opacity", strength.toFixed(3));
      }
    };

    const timer = window.setTimeout(() => {
      window.addEventListener("mousemove", update, { passive: true });
    }, 400);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mousemove", update);
    };
  }, []);

  return null;
}