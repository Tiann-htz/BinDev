"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import ServicesBackground, { ServicesForeground } from "./ServicesBackground";

// STEP 5: all 3 scenes have samples (website, dashboard, system flow).

function WebsiteMockup() {
  return (
    <div
      data-visual
      className="mx-auto w-full max-w-[640px] overflow-hidden rounded-2xl border border-hair bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
    >
      {/* browser bar */}
      <div className="flex items-center gap-3 border-b border-hair bg-background/60 px-4 py-3">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-hair" />
          <i className="h-2.5 w-2.5 rounded-full bg-hair" />
          <i className="h-2.5 w-2.5 rounded-full bg-hair" />
        </span>
        <span className="flex-1 rounded-full bg-background px-4 py-1 font-mono text-[11px] text-muted">
          yourbusiness.com
        </span>
      </div>

      {/* fake website that "scrolls" inside the frame */}
      <div className="relative h-[36vh] overflow-hidden sm:h-[48vh]">
        <div data-page className="space-y-6 p-6">
          <div data-pop className="flex items-center justify-between">
            <span className="h-6 w-6 rounded-md bg-signal" />
            <span className="flex gap-3">
              <i className="h-2 w-10 rounded bg-hair" />
              <i className="h-2 w-10 rounded bg-hair" />
              <i className="h-2 w-10 rounded bg-hair" />
            </span>
          </div>

          <div className="space-y-3 pt-4">
            <div data-pop className="h-5 w-4/5 rounded bg-foreground/80" />
            <div data-pop className="h-5 w-3/5 rounded bg-foreground/80" />
            <div data-pop className="h-2.5 w-2/3 rounded bg-hair" />
            <div data-pop className="h-9 w-32 rounded-full bg-signal" />
          </div>

          <div
            data-pop
            className="h-44 rounded-xl border border-hair bg-[radial-gradient(80%_80%_at_20%_20%,color-mix(in_srgb,var(--signal)_35%,transparent),transparent)]"
          />

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                data-pop
                className="space-y-2 rounded-lg border border-hair bg-background/50 p-3"
              >
                <i className="block h-6 w-6 rounded bg-signal/30" />
                <i className="block h-2 w-3/4 rounded bg-foreground/60" />
                <i className="block h-2 w-full rounded bg-hair" />
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <div data-pop className="h-4 w-1/2 rounded bg-foreground/70" />
            <div data-pop className="h-2.5 w-full rounded bg-hair" />
            <div data-pop className="h-2.5 w-5/6 rounded bg-hair" />
          </div>

          <div data-pop className="grid grid-cols-2 gap-3">
            <div className="h-28 rounded-xl border border-hair bg-background/50" />
            <div className="h-28 rounded-xl border border-hair bg-signal/10" />
          </div>

          <div data-pop className="flex items-center justify-between rounded-xl bg-signal/90 p-5">
            <i className="h-3 w-32 rounded bg-background/80" />
            <i className="h-7 w-24 rounded-full bg-background" />
          </div>

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}

const frame =
  "mx-auto w-full max-w-[640px] overflow-hidden rounded-2xl border border-hair bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]";

function BrowserBar({ url }) {
  return (
    <div className="flex items-center gap-3 border-b border-hair bg-background/60 px-4 py-3">
      <span className="flex gap-1.5">
        <i className="h-2.5 w-2.5 rounded-full bg-hair" />
        <i className="h-2.5 w-2.5 rounded-full bg-hair" />
        <i className="h-2.5 w-2.5 rounded-full bg-hair" />
      </span>
      <span className="flex-1 rounded-full bg-background px-4 py-1 font-mono text-[11px] text-muted">
        {url}
      </span>
    </div>
  );
}

function DashboardMockup() {
  const bars = [35, 55, 42, 68, 50, 82, 64, 90];
  return (
    <div data-visual className={frame}>
      <BrowserBar url="app.yourbusiness.com/dashboard" />
      <div className="flex h-[36vh] sm:h-[48vh]">
        <div className="hidden w-14 flex-col items-center gap-4 border-r border-hair bg-background/40 py-5 sm:flex">
          <span data-pop className="h-6 w-6 rounded-md bg-signal" />
          {[0, 1, 2, 3].map((n) => (
            <i key={n} data-pop className="block h-5 w-5 rounded bg-hair" />
          ))}
        </div>

        <div className="flex-1 space-y-3 overflow-hidden p-3 sm:space-y-4 sm:p-5">
          <div data-pop className="hidden items-center justify-between sm:flex">
            <div className="h-4 w-32 rounded bg-foreground/80" />
            <div className="h-7 w-7 rounded-full bg-signal/30" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                data-pop
                className="space-y-2 rounded-lg border border-hair bg-background/50 p-3"
              >
                <div className="h-2 w-1/2 rounded bg-hair" />
                <div className="h-5 w-2/3 rounded bg-signal/80" />
              </div>
            ))}
          </div>

          <div data-pop className="rounded-xl border border-hair bg-background/50 p-4">
            <div className="flex h-20 items-end gap-2 sm:h-28">
              {bars.map((h, n) => (
                <div
                  key={n}
                  data-bar
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t bg-signal/70"
                />
              ))}
            </div>
          </div>

          {[0, 1].map((n) => (
            <div key={n} data-pop className="hidden items-center gap-3 sm:flex">
              <div className="h-6 w-6 rounded-full bg-hair" />
              <div className="h-2.5 flex-1 rounded bg-hair" />
              <div className="h-5 w-14 rounded-full bg-signal/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemMockup() {
  const steps = [
    "Customer places an order",
    "Stock is checked automatically",
    "Invoice is sent out",
    "Report is ready for you",
  ];
  return (
    <div data-visual className={frame}>
      <div className="flex items-center justify-between border-b border-hair bg-background/60 px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Your system
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] text-signal">
          <i className="block h-2 w-2 rounded-full bg-signal" />
          running
        </span>
      </div>

      <div className="flex h-[36vh] flex-col justify-center p-3 sm:h-[48vh] sm:p-6">
        {steps.map((label, n) => (
          <div key={label}>
            <div
              data-pop
              className="flex items-center gap-3 rounded-xl border border-hair bg-background/50 p-2.5 sm:gap-4 sm:p-3.5"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg sm:h-8 sm:w-8 bg-signal/15 font-mono text-xs text-signal">
                0{n + 1}
              </span>
              <span className="flex-1 text-xs font-medium sm:text-sm">{label}</span>
              <span
                data-pop
                className="flex h-5 w-5 items-center justify-center rounded-full bg-signal text-background"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                  aria-hidden="true"
                >
                  <path d="m5 12 5 5 9-10" />
                </svg>
              </span>
            </div>
            {n < steps.length - 1 && (
              <div data-line className="ml-[1.4rem] h-2 w-px bg-signal/50 sm:ml-[2.1rem] sm:h-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Visual({ slug }) {
  if (slug === "web-apps") return <DashboardMockup />;
  if (slug === "custom-software") return <SystemMockup />;
  return <WebsiteMockup />;
}
export default function ServicesCinematic() {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scenes = gsap.utils.toArray("[data-scene]");
      const last = scenes.length - 1;
      // softer 3D on phones (smaller screen, weaker GPU)
      const D = window.matchMedia("(max-width: 767px)").matches ? 0.4 : 1;

      gsap.set(scenes, { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${scenes.length * 100}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // background glows drift at different speeds while we scroll (parallax)
      gsap.utils.toArray("[data-parallax]", rootRef.current).forEach((el) => {
        tl.to(el, { yPercent: +el.dataset.parallax, ease: "none", duration: scenes.length }, 0);
        if (el.dataset.rotate) {
          tl.to(el, { rotation: +el.dataset.rotate, ease: "none", duration: scenes.length }, 0);
        }
      });

      scenes.forEach((scene, i) => {
        const text = scene.querySelectorAll("[data-text]");
        const visual = scene.querySelector("[data-visual]");
        const page = scene.querySelector("[data-page]");

        // ENTER
        tl.set(scene, { autoAlpha: 1 }, i)
          .fromTo(
            text,
            { y: 60, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.05 },
            i
          )
          .fromTo(
            visual,
            {
              x: 160 * D,
              y: 80,
              z: -500 * D,
              rotateY: -38 * D,
              rotateX: 10 * D,
              scale: 0.9,
              autoAlpha: 0,
              transformPerspective: 1400,
            },
            {
              x: 0,
              y: 0,
              z: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.45,
              ease: "power3.out",
            },
            i
          );

        // camera: push in on enter, keep creeping forward while we hold
        tl.fromTo(scene, { scale: 0.94 }, { scale: 1, duration: 0.45, ease: "power3.out" }, i).to(
          scene,
          { scale: 1.03, ease: "none", duration: 0.4 },
          i + 0.45
        );

        // text layers drift at different speeds, so the text has depth too
        tl.to(text, { y: (j) => -8 * (j + 1), ease: "none", duration: 0.4 }, i + 0.45);

        // slow camera drift while we hold on the scene
        tl.to(visual, { rotateY: -6 * D, rotateX: 3 * D, ease: "none", duration: 0.4 }, i + 0.45);

        // the sample "plays" like a video while we hold on this scene
        const pops = visual.querySelectorAll("[data-pop]");
        const bars = visual.querySelectorAll("[data-bar]");
        const lines = visual.querySelectorAll("[data-line]");
        if (pops.length)
          tl.fromTo(
            pops,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.2,
              stagger: Math.min(0.025, 0.4 / pops.length),
            },
            i + 0.15
          );
        if (bars.length)
          tl.fromTo(
            bars,
            { scaleY: 0, transformOrigin: "50% 100%" },
            { scaleY: 1, duration: 0.3, stagger: 0.03 },
            i + 0.3
          );
        if (lines.length)
          tl.fromTo(
            lines,
            { scaleY: 0, transformOrigin: "50% 0%" },
            { scaleY: 1, duration: 0.1, stagger: 0.12 },
            i + 0.25
          );

        if (page) {
          tl.to(
            page,
            {
              y: () => -(page.offsetHeight - page.parentElement.offsetHeight),
              ease: "none",
              duration: 0.6,
            },
            i + 0.2
          );
        }

        // EXIT (not for the last scene, it just unpins)
        if (i < last) {
          // punch through the scene on exit
          tl.to(scene, { scale: 1.12, duration: 0.15, ease: "power2.in" }, i + 0.85)
            .to(text, { y: -50, autoAlpha: 0, duration: 0.15, ease: "power2.in" }, i + 0.85)
            .to(
              visual,
              {
                x: -140 * D,
                z: 300 * D,
                rotateY: 28 * D,
                rotateX: -6 * D,
                autoAlpha: 0,
                duration: 0.15,
                ease: "power2.in",
              },
              i + 0.85
            )
            .set(scene, { autoAlpha: 0 }, i + 1);
        }
      });
    }, rootRef);

    // desktop only: the whole scene tilts a little toward the cursor
    mm.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
      () => {
        const el = rootRef.current;
        const tilts = gsap.utils.toArray("[data-tilt]", el);
        gsap.set(tilts, { transformPerspective: 1200 });
        const toRX = tilts.map((t) => gsap.quickTo(t, "rotationX", { duration: 0.6, ease: "power3.out" }));
        const toRY = tilts.map((t) => gsap.quickTo(t, "rotationY", { duration: 0.6, ease: "power3.out" }));

        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
          const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
          toRY.forEach((fn) => fn(nx * 7));
          toRX.forEach((fn) => fn(-ny * 5));
        };
        const onLeave = () => {
          toRY.forEach((fn) => fn(0));
          toRX.forEach((fn) => fn(0));
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          gsap.set(tilts, { rotationX: 0, rotationY: 0 });
        };
      },
      rootRef
    );

    // re-measure once fonts are ready so the pin starts/ends in the right place
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen w-full overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible border-t border-hair bg-background text-foreground"
    >
      <ServicesBackground />

      {services.map((service, i) => (
        <div
          key={service.slug}
          data-scene
          className="absolute inset-0 flex items-center pt-20 opacity-0 sm:pt-24 motion-reduce:static motion-reduce:pt-14 motion-reduce:pb-14 motion-reduce:opacity-100"
        >
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-5 px-6 sm:gap-8 md:px-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p
                data-text
                className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted"
              >
                Services / 0{i + 1} of 0{services.length}
              </p>
              <h2
                data-text
                className="mt-3 text-3xl font-bold tracking-tight sm:mt-4 sm:text-6xl"
              >
                {service.title}
              </h2>
              <p data-text className="mt-3 max-w-xl text-base text-muted sm:mt-4 sm:text-lg">
                {service.description}
              </p>
              <div data-text className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:mt-6">
                <span className="text-muted">{service.note}</span>
                <Link
                  href={service.href}
                  className="font-medium text-signal transition hover:translate-x-1"
                >
                  Learn more -&gt;
                </Link>
              </div>
            </div>

            <div data-tilt className="relative isolate">
              <div
                aria-hidden="true"
                className="absolute inset-[6%] -z-10 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--signal)_22%,transparent),transparent)]"
              />
              <Visual slug={service.slug} />
            </div>
          </div>
        </div>
      ))}
      <ServicesForeground />
    </section>
  );
}









