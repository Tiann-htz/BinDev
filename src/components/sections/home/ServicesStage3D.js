"use client";

/* eslint-disable react-hooks/immutability --
   Intentional: React Three Fiber's useFrame runs outside React's render, every
   frame, and moving textures/lights there (screenTex.offset, sheen.offset) is
   the documented way to animate. It never changes what React renders, so the
   React Compiler's "no mutation after render" rule doesn't apply here. */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, PerformanceMonitor, Preload, RoundedBox } from "@react-three/drei";
import useTheme from "@/components/ui/useTheme";

// STEP 6 adds light effects: a sheen that slides over the glass, and reflections that slide over the metal.
// STEP 5: three devices, one per scene, all built from code, filmed by one camera that moves left to right.
//   scene 1 (progress 0 to 1/3)   laptop    website
//   scene 2 (progress 1/3 to 2/3) phone     web app dashboard
//   scene 3 (progress 2/3 to 1)   monitor   custom system
// `progress` is the whole Services scroll timeline, 0 to 1.
// LIGHT THEME: the screens are redrawn with the light palette, the studio turns
// into a bright soft-box room, and the contact shadow gets softer.

const SCENES = 3;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (v) => v * v * (3 - 2 * v);

// ---------- colors, one set per theme (same values as the site tokens in globals.css) ----------

function makePalette(c) {
  return { ...c, a: (alpha) => `rgba(${c.rgb},${alpha})` };
}
const PALETTES = {
  dark: makePalette({
    rgb: "184,255,61",
    ink: "#0B0F14", // screen background
    text: "#EAEFF7",
    muted: "#9BA6B5",
    surface: "#121821", // cards
    hair: "#1F2530",
    chip: "#1B222C", // quiet chips and empty cells
    outline: "#2A3340",
    green: "#B8FF3D",
    greenDeep: "#7FB82A",
    onGreen: "#0B0F14", // text on a green button
    btnBg: "#0B0F14", // the "Let's talk" button sitting on the green banner
    btnFg: "#EAEFF7",
    glassCoat: 1, // how strongly the glass reflects the studio (coat and specular)
    glassSpec: 1,
    sheen: 1, // strength of the sliding shine
  }),
  light: makePalette({
    rgb: "77,124,15",
    ink: "#EBF0F5",
    text: "#0B0F14",
    muted: "#4B5666",
    surface: "#FFFFFF",
    hair: "#D0D8E2",
    chip: "#DDE4EC",
    outline: "#B9C3CF",
    green: "#4D7C0F",
    greenDeep: "#3B6209",
    onGreen: "#FFFFFF",
    btnBg: "#FFFFFF",
    btnFg: "#0B0F14",
    glassCoat: 0.15, // the bright room would wash the screen out, so the glass reflects less
    glassSpec: 0.2,
    sheen: 0.5,
  }),
};

// ---------- drawing helpers (canvas 2D, used as screen textures) ----------

const FONT = (w, s) => `${w} ${s}px system-ui, -apple-system, "Segoe UI", sans-serif`;
const MONO = (w, s) => `${w} ${s}px ui-monospace, "SFMono-Regular", Menlo, monospace`;

function rr(g, x, y, w, h, r) {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
}
function fillRR(g, x, y, w, h, r, fill, stroke) {
  rr(g, x, y, w, h, r);
  if (fill) {
    g.fillStyle = fill;
    g.fill();
  }
  if (stroke) {
    g.strokeStyle = stroke;
    g.lineWidth = 2;
    g.stroke();
  }
}
function check(g, cx, cy, s, color) {
  g.strokeStyle = color;
  g.lineWidth = s * 0.28;
  g.lineCap = "round";
  g.lineJoin = "round";
  g.beginPath();
  g.moveTo(cx - s * 0.5, cy + s * 0.02);
  g.lineTo(cx - s * 0.12, cy + s * 0.4);
  g.lineTo(cx + s * 0.55, cy - s * 0.36);
  g.stroke();
}
function newCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}
function toTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
// white rounded rectangle on black. Used as alphaMap so screens get round corners.
function makeMask(w, h, r) {
  const c = newCanvas(w, h);
  const g = c.getContext("2d");
  g.fillStyle = "#000";
  g.fillRect(0, 0, w, h);
  g.fillStyle = "#fff";
  rr(g, 0, 0, w, h, r);
  g.fill();
  return new THREE.CanvasTexture(c);
}

// a soft diagonal band of light. It slides across the glass as the camera moves.
function makeSheenTexture() {
  const c = newCanvas(256, 256);
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0.28, "rgba(255,255,255,0)");
  grad.addColorStop(0.5, "rgba(255,255,255,0.2)");
  grad.addColorStop(0.72, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.center.set(0.5, 0.5);
  t.rotation = 0.6; // diagonal
  return t;
}

// a screen texture is rebuilt when the theme changes, so free the old one
function useDispose(tex) {
  useEffect(() => () => tex.dispose(), [tex]);
}

// ---------- screen contents ----------

// laptop: a tall "website". The screen shows half of it and slides down.
function makeWebsiteTexture(P) {
  const W = 1280;
  const H = 1600;
  const c = newCanvas(W, H);
  const g = c.getContext("2d");
  g.fillStyle = P.ink;
  g.fillRect(0, 0, W, H);

  fillRR(g, 56, 40, 44, 44, 11, P.green);
  g.fillStyle = P.text;
  g.font = FONT(700, 30);
  g.fillText("BinDev", 114, 74);
  g.fillStyle = P.muted;
  g.font = FONT(500, 22);
  ["Services", "Work", "Pricing", "About"].forEach((t, i) => g.fillText(t, 600 + i * 120, 70));
  fillRR(g, 1020, 34, 204, 56, 28, P.green);
  g.fillStyle = P.onGreen;
  g.font = FONT(700, 21);
  g.fillText("Book a free call", 1046, 69);

  g.fillStyle = P.muted;
  g.font = FONT(600, 18);
  g.fillText("BINDEV / SOFTWARE STUDIO", 56, 200);
  g.fillStyle = P.text;
  g.font = FONT(800, 96);
  ["Websites and", "web apps that", "run your business."].forEach((t, i) => g.fillText(t, 56, 310 + i * 106));
  g.fillStyle = P.muted;
  g.font = FONT(400, 28);
  g.fillText("A small team building clean, fast, reliable", 56, 660);
  g.fillText("software for small businesses.", 56, 700);
  fillRR(g, 56, 750, 280, 76, 38, P.green);
  g.fillStyle = P.onGreen;
  g.font = FONT(700, 25);
  g.fillText("Book a free call", 94, 797);
  fillRR(g, 360, 750, 280, 76, 38, null, P.outline);
  g.fillStyle = P.text;
  g.fillText("See our services", 398, 797);

  g.fillStyle = P.text;
  g.font = FONT(800, 58);
  g.fillText("What we can build", 56, 1000);
  [
    ["Websites", "Starting at $175"],
    ["Web apps", "Priced per project"],
    ["Custom software", "Priced per project"],
  ].forEach(([t, s], i) => {
    const x = 56 + i * 396;
    fillRR(g, x, 1050, 372, 250, 22, P.surface, P.hair);
    fillRR(g, x + 28, 1080, 52, 52, 14, P.a(0.22));
    g.fillStyle = P.text;
    g.font = FONT(700, 34);
    g.fillText(t, x + 28, 1200);
    g.fillStyle = P.muted;
    g.font = FONT(400, 24);
    g.fillText(s, x + 28, 1244);
  });

  const grad = g.createLinearGradient(56, 1370, 1224, 1560);
  grad.addColorStop(0, P.green);
  grad.addColorStop(1, P.greenDeep);
  fillRR(g, 56, 1370, 1168, 190, 28, grad);
  g.fillStyle = P.onGreen;
  g.font = FONT(800, 54);
  g.fillText("Have a project in mind?", 100, 1478);
  fillRR(g, 940, 1428, 232, 74, 37, P.btnBg);
  g.fillStyle = P.btnFg;
  g.font = FONT(700, 24);
  g.fillText("Let's talk", 996, 1474);

  const tex = toTexture(c);
  tex.repeat.set(1, 0.5);
  tex.offset.set(0, 0.5);
  return tex;
}

// phone: a tall dashboard app. 720 x 2400, the screen shows 1560 of it.
const PHONE_W = 720;
const PHONE_H = 2400;
const PHONE_VIEW = 1560;
function makeDashboardTexture(P) {
  const c = newCanvas(PHONE_W, PHONE_H);
  const g = c.getContext("2d");
  g.fillStyle = P.ink;
  g.fillRect(0, 0, PHONE_W, PHONE_H);

  // status bar + dynamic island
  g.fillStyle = P.text;
  g.font = FONT(700, 30);
  g.fillText("9:41", 60, 70);
  fillRR(g, 262, 34, 196, 58, 29, "#000");

  // header
  fillRR(g, 40, 150, 56, 56, 14, P.green);
  g.fillStyle = P.text;
  g.font = FONT(800, 46);
  g.fillText("Dashboard", 116, 196);
  g.beginPath();
  g.arc(650, 178, 30, 0, Math.PI * 2);
  g.fillStyle = P.a(0.25);
  g.fill();

  // stat cards
  [
    ["Revenue", "$12.4k", "+8.2%"],
    ["Orders", "248", "+12%"],
  ].forEach(([l, v, d], i) => {
    const x = 40 + i * 328;
    fillRR(g, x, 260, 312, 190, 26, P.surface, P.hair);
    g.fillStyle = P.muted;
    g.font = FONT(500, 26);
    g.fillText(l, x + 28, 316);
    g.fillStyle = P.text;
    g.font = FONT(800, 58);
    g.fillText(v, x + 28, 392);
    g.fillStyle = P.green;
    g.font = FONT(700, 24);
    g.fillText(d, x + 28, 430);
  });

  // chart
  fillRR(g, 40, 480, 640, 400, 28, P.surface, P.hair);
  g.fillStyle = P.text;
  g.font = FONT(700, 32);
  g.fillText("Sales this week", 70, 540);
  const bars = [0.35, 0.55, 0.42, 0.7, 0.5, 0.88, 0.64];
  bars.forEach((v, i) => {
    const bh = 230 * v;
    fillRR(g, 74 + i * 84, 840 - bh, 56, bh, 12, i === 5 ? P.green : P.a(0.45));
  });

  // recent orders
  g.fillStyle = P.text;
  g.font = FONT(800, 40);
  g.fillText("Recent orders", 40, 960);
  ["Maria S.", "Daniel R.", "Aisha K.", "Jun P.", "Leah T.", "Marco V."].forEach((n, i) => {
    const y = 1000 + i * 120;
    fillRR(g, 40, y, 640, 100, 24, P.surface, P.hair);
    g.beginPath();
    g.arc(94, y + 50, 26, 0, Math.PI * 2);
    g.fillStyle = P.a(0.22);
    g.fill();
    g.fillStyle = P.text;
    g.font = FONT(700, 30);
    g.fillText(n, 140, y + 46);
    g.fillStyle = P.muted;
    g.font = FONT(400, 24);
    g.fillText(`Order #${1042 + i}`, 140, y + 78);
    fillRR(g, 536, y + 28, 120, 44, 22, i % 3 === 0 ? P.a(0.2) : P.chip);
    g.fillStyle = i % 3 === 0 ? P.green : P.muted;
    g.font = FONT(700, 22);
    g.fillText(i % 3 === 0 ? "Paid" : "Pending", 560, y + 58);
  });

  // bookings
  g.fillStyle = P.text;
  g.font = FONT(800, 40);
  g.fillText("Bookings", 40, 1790);
  fillRR(g, 40, 1830, 640, 460, 28, P.surface, P.hair);
  for (let r = 0; r < 4; r++) {
    for (let col = 0; col < 7; col++) {
      const on = (r * 7 + col) % 4 === 0;
      fillRR(g, 70 + col * 84, 1870 + r * 100, 62, 76, 14, on ? P.a(0.35) : P.chip);
    }
  }

  const tex = toTexture(c);
  tex.repeat.set(1, PHONE_VIEW / PHONE_H);
  tex.offset.set(0, 1 - PHONE_VIEW / PHONE_H); // top of the page
  return tex;
}

// monitor: a custom system. The steps complete one by one as we scroll.
function makeSystemTexture(P) {
  const W = 1920;
  const H = 1080;
  const c = newCanvas(W, H);
  const g = c.getContext("2d");
  const tex = toTexture(c);
  const steps = ["Customer places an order", "Stock is checked automatically", "Invoice is sent out", "Report is ready for you"];

  const draw = (done) => {
    g.fillStyle = P.ink;
    g.fillRect(0, 0, W, H);

    g.fillStyle = P.text;
    g.font = FONT(800, 44);
    g.fillText("Your system", 80, 76);
    g.beginPath();
    g.arc(1676, 62, 9, 0, Math.PI * 2);
    g.fillStyle = P.green;
    g.fill();
    g.fillStyle = P.text;
    g.font = MONO(500, 28);
    g.fillText("running", 1700, 72);
    g.fillStyle = P.hair;
    g.fillRect(0, 120, W, 3);

    steps.forEach((label, i) => {
      const y = 190 + i * 190;
      const isDone = i < done;
      fillRR(g, 80, y, 900, 150, 26, P.surface, P.hair);
      fillRR(g, 112, y + 38, 74, 74, 18, P.a(0.16));
      g.fillStyle = P.green;
      g.font = MONO(700, 30);
      g.fillText(`0${i + 1}`, 128, y + 86);
      g.fillStyle = isDone ? P.text : P.muted;
      g.font = FONT(700, 38);
      g.fillText(label, 218, y + 88);
      g.beginPath();
      g.arc(926, y + 75, 28, 0, Math.PI * 2);
      if (isDone) {
        g.fillStyle = P.green;
        g.fill();
        check(g, 926, y + 75, 26, P.onGreen);
      } else {
        g.strokeStyle = P.outline;
        g.lineWidth = 4;
        g.stroke();
      }
      if (i < steps.length - 1) {
        g.fillStyle = i < done - 1 ? P.green : P.outline;
        g.fillRect(147, y + 150, 4, 40);
      }
    });

    [
      ["Orders", "248"],
      ["Revenue", "$12.4k"],
      ["Stock", "98%"],
    ].forEach(([l, v], i) => {
      const x = 1040 + i * 280;
      fillRR(g, x, 190, 260, 160, 26, P.surface, P.hair);
      g.fillStyle = P.muted;
      g.font = FONT(500, 26);
      g.fillText(l, x + 28, 244);
      g.fillStyle = i === 1 ? P.green : P.text;
      g.font = FONT(800, 58);
      g.fillText(v, x + 28, 312);
    });

    fillRR(g, 1040, 380, 800, 580, 30, P.surface, P.hair);
    g.fillStyle = P.text;
    g.font = FONT(700, 34);
    g.fillText("Orders this month", 1076, 444);
    const bars = [0.3, 0.45, 0.38, 0.6, 0.5, 0.72, 0.55, 0.85, 0.66, 0.92, 0.7, 0.8];
    bars.forEach((v, i) => {
      const bh = 380 * v;
      fillRR(g, 1080 + i * 62, 920 - bh, 40, bh, 10, i === 9 ? P.green : P.a(0.42));
    });

    tex.needsUpdate = true;
  };

  draw(0);
  return { tex, draw };
}

// ---------- camera path: left to right ----------
// The devices stand side by side in the world. The camera slides from one to
// the next (with a slow orbit), so it feels like one continuous shot.

const DEV_X = [0, 6, 12]; // where each device stands
const FRAME_SHIFT = 1.45; // on wide screens the camera looks a bit left of the device, so it sits on the right

// where the camera is, and how far into a move it is (0 = still, 1 = mid-move)
function camState(t) {
  let x = DEV_X[0];
  let travel = 0;
  for (let i = 0; i < SCENES - 1; i++) {
    const k = clamp01((t - (i + 0.8)) / 0.35); // each move starts near the end of a scene
    const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; // ease in-out
    x += (DEV_X[i + 1] - DEV_X[i]) * e;
    travel = Math.max(travel, Math.sin(Math.PI * k));
  }
  return { x, travel };
}

function CameraRig({ progress }) {
  useFrame((state) => {
    const t = progress.current * SCENES;
    const { x, travel } = camState(t);
    const wide = state.size.width / state.size.height > 1.2;
    const tx = x - (wide ? FRAME_SHIFT : 0); // the point the camera looks at

    const az = -0.26 + 0.52 * (t / SCENES); // slow orbit, left side to right side
    const dist = 5 - 0.5 * travel; // small push-in during a move
    const cam = state.camera;
    cam.position.set(tx + Math.sin(az) * dist, 0.35 + 0.1 * travel, Math.cos(az) * dist);
    cam.up.set(0.03 * travel, 1, 0); // tiny roll during a move
    cam.lookAt(tx, 0.1, 0);

    // the studio lights slowly turn, so the reflections slide across the metal and glass
    state.scene.environmentRotation.y = -0.4 + t * 0.45;
  });
  return null;
}

// ---------- each device: placement, intro, active check ----------

function place(group, state, p, i, cfg) {
  const t = p * SCENES;
  const dx = DEV_X[i] - camState(t).x;
  const visible = Math.abs(dx) < 5.2; // only draw devices the camera can see
  group.visible = visible;
  if (!visible) return null;

  const local = clamp01(t - i); // 0 to 1 inside this device's own scene
  // only the laptop has an intro; the camera brings the others.
  // It slides in from the right, level and at its final height, so it is never cut off by the bottom edge.
  const k = i === 0 ? clamp01(p / 0.11) : 1;
  const enter = 1 - Math.pow(1 - k, 3); // starts fast, settles softly

  const wide = state.size.width / state.size.height > 1.2;
  const c = wide ? cfg.wide : cfg.narrow;
  group.scale.setScalar(c.s);
  // start far enough right to be fully off screen: wider screens need a bigger offset
  const hide = 1.2 + 1.9 * (state.size.width / state.size.height);
  group.position.set(DEV_X[i] + (1 - enter) * hide, c.y, 0);
  group.rotation.set(0, c.ry - (1 - enter) * 0.3 + local * 0.3, c.rz || 0);
  return { local, t, scale: c.s, near: Math.abs(dx) <= 3 };
}
// the contact shadow follows whichever device is showing
function followShadow(shadow, group, floorY, scale) {
  if (shadow.current) {
    shadow.current.position.set(group.position.x, group.position.y + floorY * scale, group.position.z);
  }
}

const ALUMINIUM = { color: "#cfd4db", metalness: 1, roughness: 0.32 };
const TITANIUM = { color: "#9a9da4", metalness: 1, roughness: 0.3 };
const GLASS = {
  color: "#000000",
  roughness: 0.05,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
};

// ---------- device 1: laptop ----------

const LAPTOP = {
  wide: { y: -0.75, s: 0.9, ry: -0.3 },
  narrow: { y: -1.15, s: 0.72, ry: -0.3 },
};

function Laptop({ progress, shadow, P }) {
  const group = useRef(null);
  const keys = useRef(null);
  const screenTex = useMemo(() => makeWebsiteTexture(P), [P]);
  const sheen = useMemo(() => makeSheenTexture(), []);
  const openAngle = THREE.MathUtils.degToRad(105);
  useDispose(screenTex);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    let i = 0;
    for (let r = 0; r < 5; r++) {
      for (let col = 0; col < 14; col++) {
        m.setPosition(-0.95 + col * 0.146, 0.087, -0.56 + r * 0.15);
        keys.current.setMatrixAt(i++, m);
      }
    }
    keys.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const r = place(g, state, progress.current, 0, LAPTOP);
    if (!r) return;
    const s = smooth(clamp01((r.local - 0.15) / 0.66));
    screenTex.offset.y = 0.5 - 0.5 * s; // the page scrolls inside the screen
    sheen.offset.x = 0.95 - 1.9 * clamp01((r.t + 0.5) / 1.7);
    if (r.near) followShadow(shadow, g, 0.001, r.scale);
  });

  return (
    <group ref={group}>
      <RoundedBox args={[2.4, 0.08, 1.55]} radius={0.03} smoothness={4} position={[0, 0.04, 0]}>
        <meshStandardMaterial {...ALUMINIUM} />
      </RoundedBox>
      {/* dark well under the keys, so they read as keycaps */}
      <mesh position={[0, 0.0815, -0.29]}>
        <boxGeometry args={[2.16, 0.003, 0.86]} />
        <meshStandardMaterial color="#0c0e12" roughness={0.7} metalness={0.2} />
      </mesh>
      <instancedMesh ref={keys} args={[undefined, undefined, 70]}>
        <boxGeometry args={[0.125, 0.012, 0.125]} />
        <meshStandardMaterial color="#303743" roughness={0.38} metalness={0.2} />
      </instancedMesh>
      <mesh position={[0, 0.0815, 0.5]}>
        <boxGeometry args={[0.85, 0.003, 0.46]} />
        <meshStandardMaterial color="#aab0b9" metalness={1} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.08, -0.775]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 1.9, 24]} />
        <meshStandardMaterial color="#1a1d23" metalness={0.8} roughness={0.4} />
      </mesh>
      <group position={[0, 0.08, -0.775]} rotation={[-openAngle, 0, 0]}>
        <RoundedBox args={[2.4, 0.045, 1.55]} radius={0.02} smoothness={4} position={[0, 0.0225, 0.775]}>
          <meshStandardMaterial {...ALUMINIUM} />
        </RoundedBox>
        <mesh position={[0, -0.0008, 0.775]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.34, 1.49]} />
          <meshStandardMaterial color="#050607" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.0016, 0.775]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.2, 1.375]} />
          <meshBasicMaterial map={screenTex} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.0024, 0.775]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.34, 1.49]} />
          <meshPhysicalMaterial {...GLASS} clearcoat={P.glassCoat} specularIntensity={P.glassSpec} />
        </mesh>
        <mesh position={[0, -0.0032, 0.775]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.2, 1.375]} />
          <meshBasicMaterial map={sheen} opacity={P.sheen} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

// ---------- device 2: phone ----------

const PHONE = {
  wide: { y: -0.1, s: 1.2, ry: -0.3, rz: 0.05 },
  narrow: { y: -0.85, s: 0.7, ry: -0.3, rz: 0.04 },
};

function Phone({ progress, shadow, P }) {
  const group = useRef(null);
  const screenTex = useMemo(() => makeDashboardTexture(P), [P]);
  const sheen = useMemo(() => makeSheenTexture(), []);
  const screenMask = useMemo(() => makeMask(228, 498, 28), []);
  const bezelMask = useMemo(() => makeMask(237, 507, 32), []);
  const maxOffset = 1 - PHONE_VIEW / PHONE_H;
  useDispose(screenTex);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const r = place(g, state, progress.current, 1, PHONE);
    if (!r) return;
    const s = smooth(clamp01((r.local - 0.2) / 0.6));
    screenTex.offset.y = maxOffset * (1 - s); // the app scrolls
    sheen.offset.x = 0.95 - 1.9 * clamp01((r.t - 0.5) / 1.7);
    if (r.near) followShadow(shadow, g, -0.86, r.scale);
  });

  return (
    <group ref={group}>
      <RoundedBox args={[0.82, 1.72, 0.1]} radius={0.12} smoothness={6}>
        <meshStandardMaterial {...TITANIUM} />
      </RoundedBox>
      {/* side buttons */}
      <mesh position={[0.418, 0.35, 0]}>
        <boxGeometry args={[0.014, 0.3, 0.035]} />
        <meshStandardMaterial {...TITANIUM} />
      </mesh>
      <mesh position={[-0.418, 0.45, 0]}>
        <boxGeometry args={[0.014, 0.16, 0.035]} />
        <meshStandardMaterial {...TITANIUM} />
      </mesh>
      <mesh position={[-0.418, 0.2, 0]}>
        <boxGeometry args={[0.014, 0.16, 0.035]} />
        <meshStandardMaterial {...TITANIUM} />
      </mesh>
      {/* bezel, screen, glass */}
      <mesh position={[0, 0, 0.0505]}>
        <planeGeometry args={[0.79, 1.69]} />
        <meshBasicMaterial color="#020203" alphaMap={bezelMask} alphaTest={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.0512]}>
        <planeGeometry args={[0.76, 1.66]} />
        <meshBasicMaterial map={screenTex} alphaMap={screenMask} alphaTest={0.5} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.0519]}>
        <planeGeometry args={[0.76, 1.66]} />
        <meshPhysicalMaterial {...GLASS} clearcoat={P.glassCoat} specularIntensity={P.glassSpec} alphaMap={screenMask} alphaTest={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.0526]}>
        <planeGeometry args={[0.76, 1.66]} />
        <meshBasicMaterial map={sheen} opacity={P.sheen} alphaMap={screenMask} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ---------- device 3: monitor ----------

const MONITOR = {
  wide: { y: -0.85, s: 0.72, ry: -0.2 },
  narrow: { y: -1.3, s: 0.5, ry: -0.2 },
};

function Monitor({ progress, shadow, P }) {
  const group = useRef(null);
  const sys = useMemo(() => makeSystemTexture(P), [P]);
  const sheen = useMemo(() => makeSheenTexture(), []);
  const done = useRef(0);
  useDispose(sys.tex);

  // a new texture starts on step 0, so make the next frame redraw the current step
  useEffect(() => {
    done.current = -1;
  }, [sys]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const r = place(g, state, progress.current, 2, MONITOR);
    if (!r) return;
    // steps complete one by one (4 redraws in total, so it stays cheap)
    const s = smooth(clamp01((r.local - 0.25) / 0.5));
    const d = Math.min(4, Math.floor(s * 4.999));
    if (d !== done.current) {
      done.current = d;
      sys.draw(d);
    }
    sheen.offset.x = 0.95 - 1.9 * clamp01((r.t - 1.5) / 1.7);
    if (r.near) followShadow(shadow, g, 0.001, r.scale);
  });

  return (
    <group ref={group}>
      {/* stand */}
      <RoundedBox args={[0.95, 0.035, 0.55]} radius={0.015} smoothness={3} position={[0, 0.0175, 0]}>
        <meshStandardMaterial {...ALUMINIUM} />
      </RoundedBox>
      <RoundedBox args={[0.16, 0.62, 0.05]} radius={0.02} smoothness={3} position={[0, 0.345, -0.04]}>
        <meshStandardMaterial {...ALUMINIUM} />
      </RoundedBox>
      {/* panel */}
      <group position={[0, 1.415, 0]}>
        <RoundedBox args={[3.0, 1.76, 0.07]} radius={0.03} smoothness={4}>
          <meshStandardMaterial {...ALUMINIUM} />
        </RoundedBox>
        <mesh position={[0, 0, 0.0356]}>
          <planeGeometry args={[2.94, 1.7]} />
          <meshStandardMaterial color="#050607" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.0362]}>
          <planeGeometry args={[2.86, 1.61]} />
          <meshBasicMaterial map={sys.tex} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.0368]}>
          <planeGeometry args={[2.94, 1.7]} />
          <meshPhysicalMaterial {...GLASS} clearcoat={P.glassCoat} specularIntensity={P.glassSpec} />
        </mesh>
        <mesh position={[0, 0, 0.0374]}>
          <planeGeometry args={[2.86, 1.61]} />
          <meshBasicMaterial map={sheen} opacity={P.sheen} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

// ---------- studio lighting (soft boxes, nothing to download) ----------
// dark: black studio with bright strips.
// light: the same soft boxes inside a bright grey room, so the metal reflects a
// light studio instead of a black one.

function Lights({ theme }) {
  const light = theme === "light";
  return (
    <>
      <Environment key={theme} resolution={256} frames={1}>
        {light && <color attach="background" args={["#a9b2bd"]} />}
        <Lightformer form="rect" intensity={light ? 2.4 : 3.2} position={[0, 4, 3]} scale={[9, 3, 1]} />
        <Lightformer form="rect" intensity={light ? 1.6 : 2} position={[-5, 1.5, 1]} rotation-y={Math.PI / 2} scale={[5, 2, 1]} />
        <Lightformer form="rect" intensity={light ? 4 : 6} position={[5, 1, -2]} rotation-y={-Math.PI / 2} scale={[7, 1.2, 1]} />
        <Lightformer form="rect" intensity={light ? 0.9 : 1.2} position={[0, -2, 4]} scale={[8, 1, 1]} />
      </Environment>
      <directionalLight position={[3, 4, 5]} intensity={light ? 0.6 : 0.8} />
    </>
  );
}

// `active`: false while the section is far off screen, so we stop drawing.
// `onFail`: called if the GPU is taken away, so the page can show the static image instead.
export default function ServicesStage3D({ progress, active = true, onFail }) {
  const shadow = useRef(null); // one shadow that follows whichever device is showing
  const [lite, setLite] = useState(false); // frame rate dropped: draw fewer pixels
  const theme = useTheme();
  const P = PALETTES[theme];

  return (
    <Canvas
      dpr={lite ? 1 : [1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.35, 5], fov: 35 }}
      onCreated={({ camera, gl }) => {
        camera.lookAt(0, 0.1, 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onFail?.();
        });
      }}
    >
      <PerformanceMonitor onDecline={() => setLite(true)} />
      <Lights theme={theme} />
      <CameraRig progress={progress} />
      <Laptop progress={progress} shadow={shadow} P={P} />
      <Phone progress={progress} shadow={shadow} P={P} />
      <Monitor progress={progress} shadow={shadow} P={P} />
      <ContactShadows
        ref={shadow}
        opacity={theme === "light" ? 0.38 : 0.6}
        color={theme === "light" ? "#1a2230" : "#000000"}
        scale={6}
        blur={2.4}
        far={2.6}
        resolution={256}
      />
      {/* compile shaders and upload textures for all 3 devices up front, so nothing stutters when one first appears */}
      <Preload all />
    </Canvas>
  );
}
