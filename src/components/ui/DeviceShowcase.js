"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// REMOVABLE: floating 3D phone + laptop for the Hero (right side).
// To remove: delete this file, then delete the <DeviceShowcase /> block and its
// import in Hero.js (and the xl: grid classes marked there).
//
// Pure CSS 3D, no packages. The phone and laptop show a tiny version of the
// BinDev site. It flips between them every 6 seconds, and the visitor can pick
// with the Phone / Desktop buttons. Tilts toward the mouse. Hidden under 1280px.

const REDUCED = "(prefers-reduced-motion: reduce)";
const SWITCH_MS = 6000;

function subscribeReduced(callback) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const css = `
@keyframes dv-float { from { transform: translateY(0); } to { transform: translateY(-12px); } }
@keyframes dv-scroll { from { transform: translateY(0); } to { transform: translateY(var(--dv-dist, -200px)); } }
.dv-float { animation: dv-float 5s ease-in-out infinite alternate; }
.dv-scroll { animation: dv-scroll 14s ease-in-out infinite alternate; }
.dv-root[data-paused="true"] .dv-float,
.dv-root[data-paused="true"] .dv-scroll { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .dv-float, .dv-scroll { animation: none; } }
`;

const services = [
  { title: "Websites", note: "Starting at $175" },
  { title: "Web apps", note: "Priced per project" },
  { title: "Custom software", note: "Priced per project" },
];

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

function PhoneScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background text-foreground">
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
      <div className="dv-scroll px-4 pb-24" style={{ "--dv-dist": "-215px" }}>
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
      </div>
    </div>
  );
}

function LaptopScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background text-foreground">
      <div className="flex h-8 items-center justify-between border-b border-hair px-4">
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
      <div className="dv-scroll" style={{ "--dv-dist": "-115px" }}>
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
        <div className="px-5 pb-24">
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
        </div>
      </div>
    </div>
  );
}

const glass = {
  background: "linear-gradient(115deg, rgba(255,255,255,0.10), transparent 35%)",
};
const glow = "0 0 70px -25px color-mix(in srgb, var(--signal) 55%, transparent)";

function Phone() {
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
          <PhoneScreen />
          <span className="absolute left-1/2 top-2 h-[20px] w-[70px] -translate-x-1/2 rounded-full bg-black" />
          <span className="pointer-events-none absolute inset-0" style={glass} />
        </div>
      </div>
      <span className="absolute -right-[3px] top-28 h-14 w-[3px] rounded bg-[#1b212b]" />
      <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded bg-[#1b212b]" />
      <span className="absolute -left-[3px] top-36 h-8 w-[3px] rounded bg-[#1b212b]" />
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative w-[440px]" style={{ transformStyle: "preserve-3d" }}>
      <div
        className="rounded-t-[14px] border border-white/15 bg-[#0d1117] p-[8px] pb-[10px]"
        style={{ boxShadow: `0 30px 60px -20px rgba(0,0,0,0.6), ${glow}` }}
      >
        <div className="relative h-[270px] overflow-hidden rounded-[6px]">
          <LaptopScreen />
          <span className="pointer-events-none absolute inset-0" style={glass} />
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
  const [mode, setMode] = useState("phone"); // phone | laptop
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);
  const tiltRef = useRef(null);

  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false
  );

  // Only run while on screen (the whole thing is display:none under 1280px).
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

  // Flip every SWITCH_MS. Picking a device with the buttons restarts the wait.
  useEffect(() => {
    if (reduced || !visible) return;
    const timer = setTimeout(
      () => setMode((current) => (current === "phone" ? "laptop" : "phone")),
      SWITCH_MS
    );
    return () => clearTimeout(timer);
  }, [mode, reduced, visible]);

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
    <div ref={rootRef} className="dv-root relative mx-auto w-[500px]" data-paused={!visible}>
      <style>{css}</style>

      <div
        aria-hidden="true"
        className="relative h-[540px] w-full"
        style={{ perspective: "1400px" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {/* ground shadow */}
        <span className="absolute bottom-[34px] left-1/2 h-8 w-[300px] -translate-x-1/2 rounded-full bg-black/50 blur-2xl" />
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
              <Phone />
            </div>
            <div
              className={slot}
              style={{
                transformStyle: "preserve-3d",
                transform: isPhone ? "rotateY(-82deg) scale(0.7)" : "rotateY(12deg) rotateX(3deg)",
                opacity: isPhone ? 0 : 1,
              }}
            >
              <Laptop />
            </div>
          </div>
        </div>
      </div>

      <div role="group" aria-label="Preview device" className="mt-2 flex justify-center gap-2">
        {[
          { id: "phone", label: "Phone" },
          { id: "laptop", label: "Desktop" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={mode === item.id}
            onClick={() => setMode(item.id)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
              mode === item.id
                ? "border-signal bg-signal text-signal-ink"
                : "border-hair bg-surface text-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
