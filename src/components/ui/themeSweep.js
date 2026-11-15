// Matrix rain for the theme switch: columns of code characters fall from the
// top of the screen to the bottom, each column at its own speed. Above every
// falling head the new theme is already showing, below it the old theme is
// still there, so the reveal edge is jagged, not a straight line.
//
// How it works: document.startViewTransition() keeps a picture of the old page
// and puts the new page on top of it. We cut the new page with a clip-path
// that has one step per column, and we draw the characters (and the glowing
// edge) on a canvas that follows the same steps. Both are computed from the
// same numbers, so they stay together. A short flash at the start adds some
// punch.
//
// If the browser has no View Transitions, or the visitor asked for less
// motion, runThemeSweep() returns false and ThemeToggle uses its plain fade.
//
// The CSS that turns off the browser's own crossfade is in globals.css
// (search for "ascii-sweep").

const DURATION = 2100; // ms. Heads fall in the first ~75%, trails fade after that
const STEPS = 100; // points sampled for the clip-path animation (about one per 20ms)
const CHARS = "0101{}[]()<>/\\;:=+-*#$%&@~^"; // 0 and 1 twice, so they show more often

let running = false;

// Small integer hash -> number from 0 to 1. Gives every cell its own
// "random" value without calling Math.random() thousands of times per frame.
function hash(n) {
  n = (n ^ 61) ^ (n >>> 16);
  n = n + (n << 3);
  n = n ^ (n >>> 4);
  n = Math.imul(n, 0x27d4eb2d);
  n = n ^ (n >>> 15);
  return (n >>> 0) / 4294967296;
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Gentle ease: half straight, half sine. The rain starts and ends softly but
// is not slow in the middle. ease(0) = 0 and ease(1) = 1.
const ease = (t) => 0.5 * t + 0.25 * (1 - Math.cos(Math.PI * t));

function readSignal() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--signal")
    .trim();
  return value || "#9BE500";
}

// Same mono font the site already uses (the font-mono class)
function readMonoFont() {
  const probe = document.createElement("span");
  probe.className = "font-mono";
  probe.style.cssText = "position:absolute;visibility:hidden";
  document.body.appendChild(probe);
  const family = getComputedStyle(probe).fontFamily;
  probe.remove();
  return family || "monospace";
}

// Returns true if the effect handled the switch (or is already running),
// false if the caller should do the plain fade itself.
export function runThemeSweep(applyTheme) {
  if (typeof document === "undefined") return false;
  if (typeof document.startViewTransition !== "function") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (running) return true;
  running = true;

  const root = document.documentElement;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const small = W < 640;
  const CELL_W = small ? 9 : 12;
  const CELL_H = small ? 15 : 19;
  const FONT_SIZE = small ? 13 : 17;
  const cols = Math.ceil(W / CELL_W);
  const rows = Math.ceil(H / CELL_H);
  const SPAN = H + CELL_H * 2; // how far a head travels to fully uncover its column
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // One random "personality" per column: when it starts falling, how fast, and
  // how long its trail is. The delay mixes a slow wave (so neighbours fall
  // about together, in big waves) with some per-column randomness (so the edge
  // is jagged). Everything finishes before t = 1.
  const seed = (Math.random() * 100000) | 0;
  const trailMax = Math.max(5, Math.min(22, Math.floor((0.4 * SPAN) / CELL_H)));
  const trailMin = Math.min(6, trailMax);
  const delay = new Float32Array(cols);
  const dur = new Float32Array(cols);
  const trail = new Uint8Array(cols); // in cells
  for (let c = 0; c < cols; c++) {
    const wave = 0.5 + 0.25 * Math.sin(c * 0.07 + seed) + 0.25 * Math.sin(c * 0.19 + seed * 0.3);
    delay[c] = 0.1 * wave + 0.1 * hash(seed + c * 17 + 3);
    dur[c] = 0.46 + 0.1 * hash(seed + c * 29 + 5);
    trail[c] = trailMin + Math.floor(hash(seed + c * 43 + 11) * (trailMax - trailMin + 1));
  }

  // t is the time from 0 to 1. "local" is how far column c has fallen:
  // 0 = not started, 1 = its head has uncovered the whole column.
  const localAt = (c, t) => (t - delay[c]) / dur[c];

  // The new page is visible above the heads: a polygon with one step per column
  function polygonAt(t) {
    let points = "0px 0px";
    for (let c = 0; c < cols; c++) {
      const y = (clamp01(localAt(c, t)) * SPAN).toFixed(1);
      const x0 = c * CELL_W;
      points += `, ${x0}px ${y}px, ${x0 + CELL_W}px ${y}px`;
    }
    return `polygon(${points}, ${cols * CELL_W}px 0px)`;
  }

  let newColor = readSignal();
  let headColor = "#ffffff";
  const fontFamily = readMonoFont();

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  canvas.style.cssText =
    "position:fixed;top:0;left:0;pointer-events:none;z-index:2147483000;" +
    `width:${W}px;height:${H}px;`;
  // Its own layer, so the clip-path on the new page does not cut the characters
  canvas.style.setProperty("view-transition-name", "ascii-sweep");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = `700 ${FONT_SIZE}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  let frameId = 0;
  let start = 0;
  let finished = false;
  const animations = []; // the clip-path animation, cancelled when done

  const charAt = (n) => CHARS[(hash(n) * CHARS.length) | 0];

  function draw(now) {
    const progress = Math.min(1, (now - start) / DURATION);
    const t = ease(progress); // gentle ease: soft start, soft finish
    const tick = Math.floor(now / 120); // trail characters change about 8 times a second
    const fastTick = Math.floor(now / 45); // heads change faster

    ctx.clearRect(0, 0, W, H);
    ctx.shadowBlur = 0;
    ctx.fillStyle = newColor;

    // Flash at the very start
    if (t < 0.14) {
      ctx.globalAlpha = 0.16 * (1 - t / 0.14);
      ctx.fillRect(0, 0, W, H);
    }

    // Trails: characters stay in place and fade out the farther the head is
    for (let c = 0; c < cols; c++) {
      const local = localAt(c, t);
      if (local <= 0) continue;
      const edge = local * SPAN; // y of this column's head
      const trailPx = trail[c] * CELL_H;
      if (edge - trailPx > H) continue; // trail has left the screen

      const x = c * CELL_W + CELL_W / 2;
      const headRow = Math.floor((edge - CELL_H / 2) / CELL_H);
      const rTop = Math.max(0, Math.floor((edge - trailPx) / CELL_H));
      const rBottom = Math.min(rows - 1, headRow - 1);

      for (let r = rTop; r <= rBottom; r++) {
        const y = r * CELL_H + CELL_H / 2;
        const dist = edge - y;
        const k = dist / trailPx; // 0 next to the head, 1 at the end of the trail
        if (k >= 1) continue;
        if (hash(c * 977 + r * 31 + seed) > 0.92 - 0.45 * k) continue; // gaps
        ctx.globalAlpha = Math.pow(1 - k, 1.5) * 0.85;
        ctx.fillText(charAt(c * 7919 + r * 104729 + tick * 31 + seed), x, y);
      }
    }

    // Glowing line along the jagged edge
    ctx.beginPath();
    let drawing = false;
    for (let c = 0; c < cols; c++) {
      const local = localAt(c, t);
      if (local <= 0 || local > 1) {
        drawing = false;
        continue;
      }
      const y = local * SPAN;
      const x0 = c * CELL_W;
      if (drawing) ctx.lineTo(x0, y);
      else ctx.moveTo(x0, y);
      ctx.lineTo(x0 + CELL_W, y);
      drawing = true;
    }
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = newColor;
    ctx.lineWidth = 2;
    ctx.shadowColor = newColor;
    ctx.shadowBlur = 14;
    ctx.stroke();

    // Heads: bright characters with a glow
    ctx.fillStyle = headColor;
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 16;
    for (let c = 0; c < cols; c++) {
      const local = localAt(c, t);
      if (local <= 0) continue;
      const headRow = Math.floor((local * SPAN - CELL_H / 2) / CELL_H);
      if (headRow < 0 || headRow > rows - 1) continue;
      const x = c * CELL_W + CELL_W / 2;
      const y = headRow * CELL_H + CELL_H / 2;
      ctx.fillText(charAt(c * 131 + headRow * 7 + fastTick * 17 + seed), x, y);
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;

    if (progress < 1) frameId = requestAnimationFrame(draw);
  }

  function finish() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frameId);
    animations.forEach((animation) => animation.cancel());
    canvas.remove();
    running = false;
  }

  const transition = document.startViewTransition(() => {
    applyTheme();
    newColor = readSignal(); // the new theme's accent color
    // Bright core on a dark page, dark core on a light page
    headColor = root.getAttribute("data-theme") === "dark" ? "#f2ffd1" : "#0f1f06";
  });

  transition.ready.then(() => {
    const frames = [];
    for (let i = 0; i < STEPS; i++) {
      frames.push({ clipPath: polygonAt(ease(i / (STEPS - 1))) });
    }
    animations.push(
      root.animate(frames, {
        duration: DURATION,
        easing: "linear",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }),
    );

    start = performance.now();
    frameId = requestAnimationFrame(draw);
  }, finish);

  transition.finished.then(finish, finish);
  return true;
}
