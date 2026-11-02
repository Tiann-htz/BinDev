"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

// Crossfading screenshot slideshow. It fills its parent box, so the parent
// decides the size (the layout stays as it was). Used for project screenshots.
//
// - images:   list of image paths inside /public (shown in this order)
// - alt:      short description, the "(2 of 8)" part is added automatically
// - sizes:    tells the browser how wide the image is shown (keeps downloads small)
// - interval: milliseconds between switches (default 3000 = every 3 seconds)
// - className: how the image fits the box (default: fill the box, keep the top)
//
// Timing: it switches every `interval` ms on a steady clock. Hovering does NOT
// pause or restart it. If the next screenshot has not finished loading yet, it
// waits and switches the moment it is ready (so the box never shows a blank).
// A screenshot that fails to load (missing file) is skipped, never a stall.
// It pauses only when scrolled out of view or the tab is hidden, and it shows a
// still first image for people who turned on "reduce motion".

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export default function ImageFader({
  images,
  alt,
  sizes,
  interval = 3000,
  priority = false,
  className = "object-cover object-top",
}) {
  const count = images.length;
  // index = image on top, prev = image fading out below it
  const [state, setState] = useState({ index: 0, prev: null });
  const [failed, setFailed] = useState([]); // indexes of images that did not load
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);
  const imgRefs = useRef([]);
  const stateRef = useRef(state);
  const failedRef = useRef(failed);
  const lastSwitchRef = useRef(0);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false
  );

  useEffect(() => {
    stateRef.current = state;
    failedRef.current = failed;
  }, [state, failed]);

  // Only run while the slideshow is actually on screen.
  useEffect(() => {
    const element = rootRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || reduced || !visible) return;
    lastSwitchRef.current = performance.now();

    // Check often, switch only when `interval` has passed AND the next image is loaded.
    const timer = setInterval(() => {
      const now = performance.now();
      if (document.hidden) {
        lastSwitchRef.current = now; // do not rush through images after coming back
        return;
      }

      const current = stateRef.current.index;
      const brokenNow = failedRef.current.includes(current);
      if (!brokenNow && now - lastSwitchRef.current < interval) return;

      // Next image in order, skipping any that failed to load.
      let next = current;
      for (let step = 1; step <= count; step++) {
        const candidate = (current + step) % count;
        if (!failedRef.current.includes(candidate)) {
          next = candidate;
          break;
        }
      }
      if (next === current) return; // nothing else to show

      const element = imgRefs.current[next];
      if (!element || !element.complete || element.naturalWidth === 0) return; // not ready yet

      lastSwitchRef.current = now;
      setState({ index: next, prev: current });
    }, 100);

    return () => clearInterval(timer);
  }, [count, interval, reduced, visible]);

  return (
    <div ref={rootRef} className="relative h-full w-full">
      {images.map((src, i) => {
        if (failed.includes(i)) return null;
        const active = i === state.index;
        const fadingOut = i === state.prev;
        return (
          <Image
            key={src}
            ref={(element) => {
              imgRefs.current[i] = element;
            }}
            src={src}
            alt={active ? `${alt} (${i + 1} of ${count})` : ""}
            aria-hidden={active ? undefined : true}
            fill
            sizes={sizes}
            priority={priority && i === 0}
            onError={() => setFailed((list) => (list.includes(i) ? list : [...list, i]))}
            // The new image fades IN on top while the old one stays underneath,
            // so the box never flashes empty in the middle of the fade.
            className={`${className} transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${
              active
                ? "z-10 opacity-100"
                : fadingOut
                ? "z-0 opacity-100"
                : "z-0 opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
