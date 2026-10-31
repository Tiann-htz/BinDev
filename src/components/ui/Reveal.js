"use client";

import { useEffect, useRef, useState } from "react";

// Fades and slides content in when it scrolls into view.
// People who prefer reduced motion see the content right away (CSS only,
// `motion-reduce:` classes), so no state is set inside the effect.
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => setShown(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none ${
        shown
          ? "translate-y-0 blur-0 opacity-100"
          : "translate-y-6 blur-sm opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
