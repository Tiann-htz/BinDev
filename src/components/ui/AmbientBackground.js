"use client";

import { useEffect, useRef } from "react";

// Live, GPU-cheap mesh background. Falls back to the static CSS layer on
// coarse-pointer / reduced-motion devices, so it never blocks interaction.
export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Theme-aware orb colors so the live mesh adapts to light/dark switching.
    const colorForTheme = () => {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      return {
        signal: light ? "77,124,15" : "184,255,61",
        ink: light ? "11,15,20" : "234,239,247",
      };
    };
    const colors = colorForTheme();

    const orbs = [
      { baseX: 0.82, baseY: 0.18, r: 460, ampX: 120, ampY: 90, speed: 0.00014, phase: 0.0, parX: 0.05, parY: 0.04, scroll: 0.12, color: "signal", alpha: 0.16 },
      { baseX: 0.16, baseY: 0.82, r: 420, ampX: 100, ampY: 110, speed: 0.00011, phase: 2.1, parX: -0.04, parY: 0.06, scroll: 0.18, color: "signal", alpha: 0.10 },
      { baseX: 0.52, baseY: 0.48, r: 360, ampX: 80, ampY: 70, speed: 0.00009, phase: 4.2, parX: 0.03, parY: -0.03, scroll: 0.08, color: "ink", alpha: 0.05 },
    ];

    let mx = w * 0.5;
    let my = h * 0.5;
    let targetMx = mx;
    let targetMy = my;
    let scrollProgress = 0;
    const computeScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    computeScroll();

    const onMove = (e) => {
      targetMx = e.clientX;
      targetMy = e.clientY;
    };
    const onScroll = () => computeScroll();
    const onResize = () => resize();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const themeObserver = new MutationObserver(() => {
      const next = colorForTheme();
      colors.signal = next.signal;
      colors.ink = next.ink;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const drawFrame = (time) => {
      ctx.clearRect(0, 0, w, h);

      // Smooth the cursor so the mesh feels weighted, not jittery.
      mx += (targetMx - mx) * 0.07;
      my += (targetMy - my) * 0.07;

      ctx.globalCompositeOperation = "lighter";
      for (const o of orbs) {
        const x =
          w * o.baseX +
          Math.sin(time * o.speed + o.phase) * o.ampX +
          (mx - w * 0.5) * o.parX;
        const y =
          h * o.baseY +
          Math.cos(time * o.speed * 0.8 + o.phase) * o.ampY +
          (my - h * 0.5) * o.parY -
          scrollProgress * h * 0.08 * (o.scroll / 0.12);

        const rgb = colors[o.color];
        const light = document.documentElement.getAttribute("data-theme") === "light";
        const alpha = o.alpha * (light ? 1.7 : 1);
        const grad = ctx.createRadialGradient(x, y, 0, x, y, o.r);
        grad.addColorStop(0, "rgba(" + rgb + "," + alpha + ")");
        grad.addColorStop(1, "rgba(" + rgb + ",0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    // Always paint one frame so the mesh is present even when motion is off.
    drawFrame(0);

    let raf;
    if (!reduced && !coarse) {
      const tick = (t) => {
        drawFrame(t);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      themeObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Static CSS layer: keeps the page grounded when motion is disabled. */}
      <div aria-hidden="true" className="ambient-bg" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ willChange: "transform" }}
      />
    </>
  );
}