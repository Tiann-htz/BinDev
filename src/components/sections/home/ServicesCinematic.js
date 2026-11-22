"use client";

import { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";

// The 3D stage is heavy, so it loads only in the browser and only when the
// section is close to the screen.
const ServicesStage3D = dynamic(() => import("./ServicesStage3D"), { ssr: false });

// STEP 7: 3D only where it runs well. Reduced motion, no WebGL, weak phones and
// data saver get a static picture of the devices instead (public/services).
const POSTERS = ["/services/stage-1.png", "/services/stage-2.png", "/services/stage-3.png"];

function pickMode() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  try {
    const gl = document.createElement("canvas");
    const ctx = gl.getContext("webgl2") || gl.getContext("webgl");
    if (!ctx) return "static";
    ctx.getExtension("WEBGL_lose_context")?.loseContext(); // give the test context back
  } catch {
    return "static";
  }
  const weakCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2;
  const weakRam = navigator.deviceMemory > 0 && navigator.deviceMemory <= 2;
  const saveData = navigator.connection?.saveData === true;
  return weakCpu || weakRam || saveData ? "static" : "3d";
}

// if the 3D stage throws for any reason, the page falls back instead of breaking
class StageBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError?.();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// The devices are drawn in 3D by ServicesStage3D. This keeps the space on the
// right so the layout and the scene timing stay the same, and shows the
// static picture when 3D is off.
function Visual({ index, mode }) {
  return (
    <div data-visual aria-hidden="true" className="relative h-[36vh] sm:h-[48vh]">
      {mode === "static" && (
        <Image
          src={POSTERS[index]}
          alt=""
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-contain"
        />
      )}
    </div>
  );
}

export default function ServicesCinematic() {
  const rootRef = useRef(null);
  const progressRef = useRef(0); // 0 to 1, the scroll timeline, read by the 3D stage
  const [mount3D, setMount3D] = useState(false);
  const [active, setActive] = useState(true); // false while the section is far off screen
  const [mode, setMode] = useState("pending"); // "3d" or "static", decided in the browser

  // 3D only where it can run well. Everywhere else we show the static image.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMode(pickMode());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // start loading the 3D stage a little before the section arrives,
  // and stop drawing it while the section is far off screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setMount3D(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setMount3D(true);
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        onUpdate: () => {
          progressRef.current = tl.progress();
        },
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

      // make the timeline exactly scenes.length long, so progress 0 to 1 matches
      // the 3D stage (which counts in whole scenes)
      tl.set({}, {}, scenes.length);
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
      className="stage relative h-screen w-full overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible border-t border-hair bg-background text-foreground"
    >
      {/* light theme only: a bright studio glow BEHIND the 3D scene */}
      <div aria-hidden="true" className="stage-spot-light pointer-events-none absolute inset-0" />

      {/* 3D stage (devices, lights). Sits behind the text. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {mode === "3d" && mount3D && (
          <StageBoundary onError={() => setMode("static")}>
            <ServicesStage3D progress={progressRef} active={active} onFail={() => setMode("static")} />
          </StageBoundary>
        )}
      </div>

      {/* dark: one soft studio spotlight + vignette over the scene. light: only a faint edge shade. */}
      <div aria-hidden="true" className="stage-spot-dark pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="stage-vignette-light pointer-events-none absolute inset-0" />


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
              <Visual index={i} mode={mode} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}














