"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// REMOVABLE: floating 3D phone + laptop for the Hero (right side).
// To remove: delete this file, then delete the <DeviceShowcase /> block and its
// import in Hero.js (and the xl: grid classes marked there).
//
// Pure CSS 3D, no packages. The phone and laptop show a tiny version of the
// BinDev site. Each device scrolls its page from top to the very end, then it
// flips to the other device, which scrolls too. Tilts toward the mouse.
// Hidden under 1280px.

const REDUCED = "(prefers-reduced-motion: reduce)";
const HOLD_MS = 900; // pause at the end of the scroll before flipping
const INTRO_MS = 2000; // the one-time spin-in on page load (500ms wait + 1500ms)

function subscribeReduced(callback) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const css = `
@keyframes dv-float { from { transform: translateY(0); } to { transform: translateY(-12px); } }
@keyframes dv-scroll { from { transform: translateY(0); } to { transform: translateY(var(--dv-dist, 0px)); } }
.dv-float { animation: dv-float 5s ease-in-out infinite alternate; }
.dv-scroll { animation: dv-scroll var(--dv-time, 8s) ease-in-out 0.4s 1 forwards; }
@keyframes dv-intro {
  0% { opacity: 0; transform: translateX(110px) rotateY(85deg) scale(0.88); }
  35% { opacity: 1; }
  100% { opacity: 1; transform: translateX(0) rotateY(0deg) scale(1); }
}
.dv-intro { animation: dv-intro 1500ms cubic-bezier(0.22, 1, 0.36, 1) 500ms 1 backwards; }
.dv-root[data-paused="true"] .dv-float,
.dv-root[data-paused="true"] .dv-intro,
.dv-root[data-paused="true"] .dv-scroll { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .dv-float, .dv-scroll, .dv-intro { animation: none; } }
`;

const services = [
  { title: "Websites", note: "Starting at $175" },
  { title: "Web apps", note: "Priced per project" },
  { title: "Custom software", note: "Priced per project" },
];

const reasons = [
  { title: "Fast sites", note: "Built to load quickly" },
  { title: "Clear scope", note: "We help you pick the right size" },
  { title: "Real people", note: "A small team you can talk to" },
];

function MiniCTA({ small }) {
  return (
    <span className="block rounded-[9px] border border-hair bg-surface p-3 text-center">
      <span className={`block font-bold text-foreground ${small ? "text-[10px]" : "text-[12px]"}`}>
        Have a project in mind?
      </span>
      <span className="mt-1 block text-[7.5px] text-muted">
        Tell us what you need. The first call is free.
      </span>
      <span className="mx-auto mt-2 block w-fit rounded-full bg-signal px-3 py-1.5 text-[8px] font-semibold text-signal-ink">
        Book a free call
      </span>
    </span>
  );
}

function MiniLogo() {
  return (
    <span className="flex items-center gap-1 font-bold tracking-tight text-foreground">
      <span className="grid h-[11px] w-[11px] place-items-center rounded-[3px] bg-signal text-[6px] font-black text-signal-ink">
        B
      </span>
      <span className="text-[10px]">BinDev</span>
    </span>
  );
}

function MiniCard({ title, note }) {
  return (
    <span className="block rounded-[7px] border border-hair bg-surface p-2">
      <span className="mb-1.5 block h-3 w-3 rounded-[3px] bg-signal/20 ring-1 ring-signal/40" />
      <span className="block text-[9px] font-bold text-foreground">{title}</span>
      <span className="mt-0.5 block text-[7px] text-muted">{note}</span>
    </span>
  );
}

function Headline({ className }) {
  return (
    <span className={`block font-bold tracking-tight text-foreground ${className}`}>
      Websites and web apps{" "}
      <span className="inline-block h-[0.7em] w-[1.6em] translate-y-[0.06em] rounded-full bg-signal/70 align-middle" />{" "}
      that run your business.
    </span>
  );
}

// The page inside a screen. It sits in a clipped box BELOW the screen's header,
// so scrolling text never shows behind the header or the status bar.
// It measures how far it must scroll to reach the very end, scrolls once
// (only while `active`), then calls onDone.
function Scroller({ active, onDone, children }) {
  const viewRef = useRef(null);
  const contentRef = useRef(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const view = viewRef.current;
    const content = contentRef.current;
    if (!view || !content || typeof ResizeObserver === "undefined") return;
    const measure = () => setDist(Math.max(0, content.offsetHeight - view.clientHeight));
    const observer = new ResizeObserver(measure); // also fires once on start
    observer.observe(view);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={viewRef} className="relative min-h-0 flex-1 overflow-hidden">
      <div
        ref={contentRef}
        className={active ? "dv-scroll" : undefined}
        style={{ "--dv-dist": `-${dist}px`, "--dv-time": `${Math.max(4, dist / 56)}s` }}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) onDone?.();
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PhoneScreen({ active, onDone }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <div className="relative z-10 shrink-0 bg-background">
        <div className="flex h-9 items-end justify-between px-6 pb-1 text-[9px] font-semibold">
          <span>9:41</span>
          <span className="mb-[3px] block h-[6px] w-[14px] rounded-sm bg-foreground/70" />
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <MiniLogo />
          <span className="grid gap-[3px]">
            <span className="block h-px w-3.5 bg-foreground" />
            <span className="block h-px w-3.5 bg-foreground" />
          </span>
        </div>
      </div>
      <Scroller active={active} onDone={onDone}>
        <div className="px-4 pb-6">
          <span className="mt-3 block font-mono text-[6px] uppercase tracking-[0.2em] text-muted">
            BinDev / software studio
          </span>
          <Headline className="mt-2 text-[22px] leading-[1.02]" />
          <span className="mt-3 block text-[8.5px] leading-snug text-muted">
            A small team building clean, fast, reliable software for small
            businesses.
          </span>
          <span className="mt-4 block rounded-full bg-signal py-2 text-center text-[9px] font-semibold text-signal-ink">
            Book a free call
          </span>
          <span className="mt-2 block rounded-full border border-hair py-2 text-center text-[9px] font-medium text-foreground">
            See our services
          </span>
          <span className="mt-7 block font-mono text-[6px] uppercase tracking-[0.2em] text-muted">
            Services
          </span>
          <span className="mt-1 block text-[14px] font-bold text-foreground">
            What we can build
          </span>
          <span className="mt-3 grid gap-2">
            {services.map((s) => (
              <MiniCard key={s.title} {...s} />
            ))}
          </span>
          <span className="mt-7 block font-mono text-[6px] uppercase tracking-[0.2em] text-muted">
            Why BinDev
          </span>
          <span className="mt-1 block text-[14px] font-bold text-foreground">
            Simple, fast, reliable
          </span>
          <span className="mt-3 grid gap-2">
            {reasons.map((s) => (
              <MiniCard key={s.title} {...s} />
            ))}
          </span>
          <span className="mt-7 block">
            <MiniCTA small />
          </span>
        </div>
      </Scroller>
    </div>
  );
}

function LaptopScreen({ active, onDone }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-background text-foreground">
      <div className="relative z-10 flex h-8 shrink-0 items-center justify-between border-b border-hair bg-background px-4">
        <MiniLogo />
        <span className="flex gap-3 text-[7px] text-muted">
          <span>Services</span>
          <span>Work</span>
          <span>Pricing</span>
          <span>About</span>
        </span>
        <span className="rounded-full bg-signal px-2 py-[3px] text-[7px] font-semibold text-signal-ink">
          Book a free call
        </span>
      </div>
      <Scroller active={active} onDone={onDone}>
        <div className="grid grid-cols-[1.3fr_1fr] items-center gap-4 px-5 pb-4 pt-6">
          <span className="block">
            <span className="block font-mono text-[6px] uppercase tracking-[0.2em] text-muted">
              BinDev / software studio
            </span>
            <Headline className="mt-2 text-[22px] leading-[1]" />
            <span className="mt-2 block text-[7.5px] leading-snug text-muted">
              Clean, fast, reliable software for small businesses.
            </span>
            <span className="mt-3 flex gap-2">
              <span className="rounded-full bg-signal px-3 py-1.5 text-[7.5px] font-semibold text-signal-ink">
                Book a free call
              </span>
              <span className="rounded-full border border-hair px-3 py-1.5 text-[7.5px] font-medium text-foreground">
                See our services
              </span>
            </span>
          </span>
          <span className="grid gap-1.5">
            {services.map((s) => (
              <MiniCard key={s.title} {...s} />
            ))}
          </span>
        </div>
        <div className="px-5 pb-5">
          <span className="block font-mono text-[6px] uppercase tracking-[0.2em] text-muted">
            Services
          </span>
          <span className="mt-1 block text-[13px] font-bold text-foreground">
            What we can build
          </span>
          <span className="mt-2 grid grid-cols-3 gap-2">
            {services.map((s) => (
              <MiniCard key={s.title} {...s} />
            ))}
          </span>
          <span className="mt-6 block font-mono text-[6px] uppercase tracking-[0.2em] text-muted">
            Why BinDev
          </span>
          <span className="mt-1 block text-[13px] font-bold text-foreground">
            Simple, fast, reliable
          </span>
          <span className="mt-2 grid grid-cols-3 gap-2">
            {reasons.map((s) => (
              <MiniCard key={s.title} {...s} />
            ))}
          </span>
          <span className="mt-6 block">
            <MiniCTA />
          </span>
        </div>
      </Scroller>
    </div>
  );
}

const glass = {
  background: "linear-gradient(115deg, rgba(255,255,255,0.10), transparent 35%)",
};
const glow = "0 0 70px -25px color-mix(in srgb, var(--signal) 55%, transparent)";

function Phone({ active, onDone }) {
  return (
    <div className="relative h-[520px] w-[250px]" style={{ transformStyle: "preserve-3d" }}>
      <span
        className="absolute inset-0 rounded-[40px] bg-black/80"
        style={{ transform: "translateZ(-14px)" }}
      />
      <div
        className="absolute inset-0 rounded-[40px] border border-white/15 bg-[#0d1117] p-[10px]"
        style={{ boxShadow: `0 30px 60px -20px rgba(0,0,0,0.6), ${glow}` }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[30px]">
          <PhoneScreen active={active} onDone={onDone} />
          <span className="absolute left-1/2 top-2 z-20 h-[20px] w-[70px] -translate-x-1/2 rounded-full bg-black" />
          <span className="pointer-events-none absolute inset-0 z-20" style={glass} />
        </div>
      </div>
      <span className="absolute -right-[3px] top-28 h-14 w-[3px] rounded bg-[#1b212b]" />
      <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded bg-[#1b212b]" />
      <span className="absolute -left-[3px] top-36 h-8 w-[3px] rounded bg-[#1b212b]" />
    </div>
  );
}

function Laptop({ active, onDone }) {
  return (
    <div className="relative w-[440px]" style={{ transformStyle: "preserve-3d" }}>
      <div
        className="rounded-t-[14px] border border-white/15 bg-[#0d1117] p-[8px] pb-[10px]"
        style={{ boxShadow: `0 30px 60px -20px rgba(0,0,0,0.6), ${glow}` }}
      >
        <div className="relative h-[270px] overflow-hidden rounded-[6px]">
          <LaptopScreen active={active} onDone={onDone} />
          <span className="pointer-events-none absolute inset-0 z-20" style={glass} />
        </div>
      </div>
      <div
        className="relative left-1/2 h-[12px] w-[500px] -translate-x-1/2 rounded-b-[16px]"
        style={{ background: "linear-gradient(#2b323d, #11151b)" }}
      >
        <span className="absolute left-1/2 top-0 h-[4px] w-[80px] -translate-x-1/2 rounded-b-md bg-black/40" />
      </div>
    </div>
  );
}

const slot =
  "absolute inset-0 grid place-items-center transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none";

export default function DeviceShowcase() {
  const [mode, setMode] = useState("phone"); // phone | laptop (the one on show)
  const [scrolling, setScrolling] = useState(null); // the one whose page is scrolling
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);
  const tiltRef = useRef(null);
  const holdRef = useRef(null);
  const mountRef = useRef(0);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false
  );

  // Pause the animations while off screen (it is display:none under 1280px).
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

  // The new device starts scrolling once the flip is (almost) done. The old
  // one keeps its end position until it has faded out, so it never jumps.
  // On page load it waits for the spin-in to finish first.
  useEffect(() => {
    if (!mountRef.current) mountRef.current = performance.now();
    const sinceMount = performance.now() - mountRef.current;
    const wait = Math.max(1000, INTRO_MS - sinceMount);
    const timer = setTimeout(() => setScrolling(mode), wait);
    return () => clearTimeout(timer);
  }, [mode]);

  useEffect(() => () => clearTimeout(holdRef.current), []);

  // A page reached its very end: wait a moment, then flip to the other device.
  function handleDone() {
    clearTimeout(holdRef.current);
    holdRef.current = setTimeout(
      () => setMode((current) => (current === "phone" ? "laptop" : "phone")),
      HOLD_MS
    );
  }

  function handleMove(event) {
    if (reduced || !tiltRef.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    tiltRef.current.style.setProperty("--ry", `${x * 14}deg`);
    tiltRef.current.style.setProperty("--rx", `${-y * 10}deg`);
  }

  function handleLeave() {
    if (!tiltRef.current) return;
    tiltRef.current.style.setProperty("--ry", "0deg");
    tiltRef.current.style.setProperty("--rx", "0deg");
  }

  const isPhone = mode === "phone";

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="dv-root relative ml-auto w-[500px] translate-x-4 min-[1440px]:translate-x-10 2xl:translate-x-20"
      data-paused={!visible}
    >
      <style>{css}</style>

      <div
        className="relative h-[540px] w-full"
        style={{ perspective: "1400px" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* ground shadow */}
        <span className="absolute bottom-[34px] left-1/2 h-8 w-[300px] -translate-x-1/2 rounded-full bg-black/50 blur-2xl" />
        {/* One-time spin-in when the site loads (does not replay on flips) */}
        <div className="dv-intro absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        <div
          ref={tiltRef}
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
            transition: "transform 200ms ease-out",
          }}
        >
          <div className="dv-float absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            <div
              className={slot}
              style={{
                transformStyle: "preserve-3d",
                transform: isPhone ? "rotateY(-14deg) rotateX(3deg)" : "rotateY(82deg) scale(0.7)",
                opacity: isPhone ? 1 : 0,
              }}
            >
              <Phone active={scrolling === "phone"} onDone={handleDone} />
            </div>
            <div
              className={slot}
              style={{
                transformStyle: "preserve-3d",
                transform: isPhone ? "rotateY(-82deg) scale(0.7)" : "rotateY(12deg) rotateX(3deg)",
                opacity: isPhone ? 0 : 1,
              }}
            >
              <Laptop active={scrolling === "laptop"} onDone={handleDone} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
