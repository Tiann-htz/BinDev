"use client";

import { useEffect, useRef, useState } from "react";

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

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setShown(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown
          ? "translate-y-0 blur-0 opacity-100"
          : "translate-y-6 blur-sm opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
