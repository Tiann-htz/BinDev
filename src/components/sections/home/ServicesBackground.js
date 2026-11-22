// Layered background for the Services section: base gradient, drifting glows,
// grid, film grain and a vignette. Colors come from the theme tokens, so it
// works in both dark and light themes.
export default function ServicesBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* base: deep navy fading down to the page background */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_0%,color-mix(in_srgb,var(--glow)_16%,var(--background)),var(--background)_75%)]" />

      {/* glows (outer = scroll parallax, inner = slow drift) */}
      <div
        data-parallax="-20"
        className="absolute -left-[12%] top-[2%] h-[50vmax] w-[50vmax]"
      >
        <div className="svc-drift h-full w-full rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--signal)_30%,transparent),transparent)]" />
      </div>
      <div
        data-parallax="18"
        className="absolute -right-[16%] top-[22%] h-[56vmax] w-[56vmax]"
      >
        <div className="svc-drift h-full w-full rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--glow)_34%,transparent),transparent)] [animation-delay:-6s]" />
      </div>
      <div
        data-parallax="-26"
        className="absolute bottom-[-30%] left-[22%] h-[60vmax] w-[60vmax]"
      >
        <div className="svc-drift h-full w-full rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--signal)_18%,transparent),transparent)] [animation-delay:-11s]" />
      </div>

      {/* depth layer: floating shapes, each one moves at its own speed */}
      <div
        data-parallax="-45"
        data-rotate="40"
        className="absolute left-[6%] top-[58%] h-[16vmax] w-[16vmax] rounded-full border border-dashed border-signal/20"
      />
      <div
        data-parallax="60"
        data-rotate="-14"
        className="absolute right-[8%] top-[10%] hidden h-24 w-36 rotate-6 rounded-2xl border border-hair bg-surface/40 p-4 md:block"
      >
        <div className="h-2 w-1/2 rounded bg-signal/40" />
        <div className="mt-3 h-2 w-full rounded bg-hair" />
        <div className="mt-2 h-2 w-3/4 rounded bg-hair" />
      </div>
      <div
        data-parallax="-90"
        data-rotate="18"
        className="absolute left-[40%] top-[6%] hidden h-16 w-28 -rotate-6 rounded-xl border border-hair bg-surface/40 p-3 md:block"
      >
        <div className="h-2 w-1/3 rounded bg-signal/40" />
        <div className="mt-2 h-6 w-full rounded bg-hair" />
      </div>
      <svg
        data-parallax="-120"
        data-rotate="90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute right-[30%] top-[70%] h-8 w-8 text-signal/40"
      >
        <path d="M12 3v18M3 12h18" />
      </svg>
      <svg
        data-parallax="-70"
        data-rotate="-60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute left-[18%] top-[22%] h-6 w-6 text-signal/30"
      >
        <path d="M12 3v18M3 12h18" />
      </svg>
      <div
        data-parallax="-80"
        className="absolute right-[34%] top-[28%] hidden h-[28vh] w-px md:block bg-gradient-to-b from-transparent via-signal/40 to-transparent"
      />
      <i data-parallax="-200" className="absolute left-[30%] top-[40%] block h-2 w-2 rounded-full bg-signal/60" />
      <i data-parallax="-140" className="absolute right-[18%] top-[48%] block h-1.5 w-1.5 rounded-full bg-signal/50" />
      <i data-parallax="-300" className="absolute left-[55%] top-[78%] block h-2.5 w-2.5 rounded-full bg-signal/40" />
      {/* faint grid, fading out toward the edges */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--hair)_1px,transparent_1px),linear-gradient(90deg,var(--hair)_1px,transparent_1px)] bg-[size:56px_56px] opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]" />

      {/* film grain (stops the gradients from banding) */}
      <div className="svc-grain absolute inset-0" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_55%,var(--background))]" />
    </div>
  );
}

// In front of the content: a few big, faint shapes that move faster than
// everything else, so the scene feels deep. Never blocks clicks.
export function ServicesForeground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        data-parallax="-110"
        data-rotate="25"
        className="absolute -bottom-[10%] -left-[8%] h-[26vmax] w-[26vmax] rounded-full border border-signal/15"
      />
      <div
        data-parallax="-300"
        className="absolute bottom-[12%] right-[5%] hidden h-24 w-24 rounded-full md:block bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--signal)_45%,transparent),transparent)]"
      />
    </div>
  );
}

