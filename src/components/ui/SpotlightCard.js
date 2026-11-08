"use client";

import { useRef, useState } from "react";

// Radial border illumination that follows the cursor. Transform/opacity-free
// hover affordance: only the hairline lights up, so cards stay calm but feel
// expensive. Disabled on touch devices (no hover).
export default function SpotlightCard({
  children,
  className = "",
  radius = "140px",
  as: Tag = "div",
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999, active: false });

  const update = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, active: true });
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={update}
      onMouseEnter={() => setPos((p) => ({ ...p, active: true }))}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      className={"group/spot relative " + className}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: pos.active ? 1 : 0,
          background: `radial-gradient(${radius} at ${pos.x}px ${pos.y}px, color-mix(in srgb, var(--signal) 70%, transparent), transparent 70%)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      {children}
    </Tag>
  );
}