"use client";

import { useEffect, useRef } from "react";

import { LAND_MASK, MASK_COLS, MASK_ROWS } from "@/data/globe-land";
import { cn } from "@/lib/utils";

const TAU = Math.PI * 2;
const GOLDEN_ANGLE = 2.399963;
const DOT_COUNT = 4000;
/** Camera looks at the globe from slightly above the equator. */
const VIEW_TILT = (16 * Math.PI) / 180;
/** Radians per second: one full turn in about two minutes. */
const ROTATION_SPEED = 0.052;
/** Starting longitude of the view: the Americas, like on the mockup. */
const START_ROTATION = -1.3;
/** Globe radius relative to the canvas width. */
const RADIUS_RATIO = 0.215;
/** Number of stars around the globe. */
const STAR_COUNT = 56;
const STAR_COLORS = [
  "#ffb36b",
  "#ff7a59",
  "#ff4d94",
  "#ffffff",
  "#b79cff",
  "#8f7bff",
] as const;

type LandPoint = { sinLat: number; cosLat: number; lon: number };

type RingDot = { speed: number; phase: number; color: string };

type Ring = {
  /** Radii relative to the globe radius. */
  rx: number;
  ry: number;
  tilt: number;
  from: string;
  to: string;
  dots: RingDot[];
};

type Star = {
  kind: "dot" | "orb" | "sparkle";
  /** Distance from the center, from 0 (globe) to 1 (edge of the canvas). */
  u: number;
  angle: number;
  /** Orbit speed in radians per second. */
  drift: number;
  size: number;
  color: string;
  phase: number;
  pulse: number;
};

const RINGS: readonly Ring[] = [
  {
    rx: 1.38,
    ry: 0.29,
    tilt: -0.3,
    from: "#ffa21f",
    to: "#ff2d86",
    dots: [
      { speed: 0.55, phase: 2.4, color: "#ffb347" },
      { speed: 0.55, phase: 5.4, color: "#ffffff" },
    ],
  },
  {
    rx: 1.34,
    ry: 0.36,
    tilt: 0.2,
    from: "#ff2d86",
    to: "#a78bfa",
    dots: [
      { speed: -0.4, phase: 0.8, color: "#ff4d94" },
      { speed: -0.4, phase: 3.7, color: "#ffa21f" },
    ],
  },
];

/** Land dots go from warm on the orange side to lavender on the violet side. */
const PALETTES = [
  [255, 198, 150],
  [240, 180, 215],
  [206, 184, 255],
] as const;

const DOT_STYLES = PALETTES.map(([r, g, b]) =>
  Array.from(
    { length: 16 },
    (_, i) => `rgba(${r},${g},${b},${(0.22 + (0.78 * i) / 15).toFixed(2)})`,
  ),
);

/** Small deterministic PRNG: the sky is identical on every render. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Spreads the stars evenly around the globe (spiral layout), outside of it. */
function buildStars(minU: number): Star[] {
  const random = mulberry32(7);

  return Array.from({ length: STAR_COUNT }, (_, i) => {
    const kind: Star["kind"] =
      i % 9 === 0 ? "sparkle" : i % 4 === 1 ? "orb" : "dot";
    const u = Math.min(
      0.96,
      Math.sqrt(minU * minU + ((1 - minU * minU) * (i + 0.5)) / STAR_COUNT),
    );
    const size =
      kind === "sparkle"
        ? 5 + random() * 4
        : kind === "orb"
          ? 1.5 + random() * 1.2
          : 0.6 + random() * 0.8;

    return {
      kind,
      u,
      angle: i * GOLDEN_ANGLE + random() * 0.4,
      drift: 0.04 - 0.025 * u,
      size,
      color: STAR_COLORS[Math.floor(random() * STAR_COLORS.length)] ?? "#ffffff",
      phase: random() * TAU,
      pulse: 1.2 + random() * 2,
    };
  });
}

function decodeMask(): Uint8Array {
  const binary = atob(LAND_MASK);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Spreads dots evenly on a sphere (Fibonacci lattice) and keeps the land ones. */
function buildLandPoints(): LandPoint[] {
  const mask = decodeMask();
  const points: LandPoint[] = [];
  const golden = Math.PI * (1 + Math.sqrt(5));

  for (let k = 0; k < DOT_COUNT; k++) {
    const sinLat = 1 - (2 * (k + 0.5)) / DOT_COUNT;
    const lat = Math.asin(sinLat);
    const latDeg = (lat * 180) / Math.PI;
    const lonDeg =
      ((((golden * (k + 0.5) * 180) / Math.PI + 180) % 360) + 360) % 360 - 180;

    const col = Math.min(MASK_COLS - 1, Math.max(0, Math.floor((lonDeg + 180) / 2)));
    const row = Math.min(MASK_ROWS - 1, Math.max(0, Math.floor((90 - latDeg) / 2)));
    const index = row * MASK_COLS + col;

    if (((mask[index >> 3] ?? 0) >> (index & 7)) & 1) {
      points.push({
        sinLat,
        cosLat: Math.cos(lat),
        lon: (lonDeg * Math.PI) / 180,
      });
    }
  }
  return points;
}

type EarthProps = { className?: string };

/** Dotted globe, half orange and half violet, with orbit rings and a starry sky. */
export function Earth({ className }: EarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const land = buildLandPoints();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let frame = 0;
    let last = 0;
    let visible = true;
    let rotation = START_ROTATION;
    let clock = 0;

    const cosTilt = Math.cos(VIEW_TILT);
    const sinTilt = Math.sin(VIEW_TILT);

    function drawHalo() {
      if (!ctx) return;

      // Violet glow around the whole globe
      const violet = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.75);
      violet.addColorStop(0, "rgba(150,90,255,0.3)");
      violet.addColorStop(1, "rgba(150,90,255,0)");
      ctx.fillStyle = violet;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.75, 0, TAU);
      ctx.fill();

      // Warmer glow on the orange side
      const ox = cx - radius * 0.55;
      const orange = ctx.createRadialGradient(ox, cy, radius * 0.5, ox, cy, radius * 1.6);
      orange.addColorStop(0, "rgba(255,140,60,0.22)");
      orange.addColorStop(1, "rgba(255,140,60,0)");
      ctx.fillStyle = orange;
      ctx.beginPath();
      ctx.arc(ox, cy, radius * 1.6, 0, TAU);
      ctx.fill();
    }

    function drawStars() {
      if (!ctx) return;
      const scale = width / 320;
      const ex = (width / 2) * 0.94;
      const ey = (height / 2) * 0.94;

      for (const star of stars) {
        const angle = star.angle + clock * star.drift;
        const x = cx + star.u * ex * Math.cos(angle);
        const y = cy + star.u * ey * Math.sin(angle);
        const twinkle = 0.5 + 0.5 * Math.sin(clock * star.pulse + star.phase);

        ctx.save();
        ctx.fillStyle = star.color;

        if (star.kind === "dot") {
          ctx.globalAlpha = 0.35 + 0.55 * twinkle;
          ctx.beginPath();
          ctx.arc(x, y, star.size * scale, 0, TAU);
          ctx.fill();
        } else if (star.kind === "orb") {
          ctx.globalAlpha = 0.55 + 0.45 * twinkle;
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 12 * scale;
          ctx.beginPath();
          ctx.arc(x, y, star.size * scale, 0, TAU);
          ctx.fill();
        } else {
          // Four-pointed sparkle
          const s = star.size * scale * (0.75 + 0.35 * twinkle);
          ctx.globalAlpha = 0.6 + 0.4 * twinkle;
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 14 * scale;
          ctx.translate(x, y);
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.18, 0, TAU);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function drawRingArc(ring: Ring, from: number, to: number, alpha: number) {
      if (!ctx) return;
      const rx = ring.rx * radius;
      const ry = ring.ry * radius;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ring.tilt);
      const gradient = ctx.createLinearGradient(-rx, 0, rx, 0);
      gradient.addColorStop(0, ring.from);
      gradient.addColorStop(1, ring.to);
      ctx.strokeStyle = gradient;

      // Soft halo, then the thin line
      ctx.globalAlpha = alpha * 0.3;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, from, to);
      ctx.stroke();

      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, from, to);
      ctx.stroke();
      ctx.restore();
    }

    function drawRingDots(ring: Ring, front: boolean) {
      if (!ctx) return;
      const rx = ring.rx * radius;
      const ry = ring.ry * radius;
      const cos = Math.cos(ring.tilt);
      const sin = Math.sin(ring.tilt);

      for (const dot of ring.dots) {
        const angle = dot.phase + clock * dot.speed;
        // On screen, the lower half of an ellipse is the near side
        if (Math.sin(angle) >= 0 !== front) continue;
        const x = rx * Math.cos(angle);
        const y = ry * Math.sin(angle);

        ctx.save();
        ctx.shadowColor = dot.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(cx + x * cos - y * sin, cy + x * sin + y * cos, 2.7, 0, TAU);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawGlobe() {
      if (!ctx) return;

      // Sphere body: orange on the left half, violet on the right half
      const body = ctx.createLinearGradient(
        cx - radius,
        cy + radius * 0.25,
        cx + radius,
        cy - radius * 0.25,
      );
      body.addColorStop(0, "#b4451d");
      body.addColorStop(0.38, "#7a2d6c");
      body.addColorStop(0.58, "#43208a");
      body.addColorStop(1, "#190d46");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.fillStyle = body;
      ctx.fill();

      ctx.save();
      ctx.clip();

      // Warm light bleeding in from the left edge
      const warm = ctx.createRadialGradient(
        cx - radius * 0.95,
        cy + radius * 0.1,
        0,
        cx - radius * 0.95,
        cy + radius * 0.1,
        radius * 1.1,
      );
      warm.addColorStop(0, "rgba(255,130,50,0.45)");
      warm.addColorStop(1, "rgba(255,130,50,0)");
      ctx.fillStyle = warm;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // Land dots (orthographic projection)
      for (const point of land) {
        const lon = point.lon - rotation;
        const cosLon = Math.cos(lon);
        const z = sinTilt * point.sinLat + cosTilt * point.cosLat * cosLon;
        if (z <= 0.02) continue;

        const x = point.cosLat * Math.sin(lon);
        const y = cosTilt * point.sinLat - sinTilt * point.cosLat * cosLon;
        const palette = DOT_STYLES[x < -0.25 ? 0 : x < 0.2 ? 1 : 2] ?? DOT_STYLES[2]!;
        ctx.fillStyle = palette[Math.min(15, Math.floor(z * 16))] ?? palette[15]!;
        ctx.beginPath();
        ctx.arc(cx + radius * x, cy - radius * y, 0.7 + 1.1 * z, 0, TAU);
        ctx.fill();
      }

      // Soft highlight on top, shadow toward the edge
      const shade = ctx.createRadialGradient(
        cx - radius * 0.2,
        cy - radius * 0.5,
        radius * 0.2,
        cx,
        cy,
        radius * 1.05,
      );
      shade.addColorStop(0, "rgba(255,255,255,0.08)");
      shade.addColorStop(0.55, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(10,4,24,0.5)");
      ctx.fillStyle = shade;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.restore();

      // Glowing rim: orange on the left half, violet on the right half
      ctx.save();
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 16;

      ctx.shadowColor = "rgba(255,140,60,0.9)";
      ctx.strokeStyle = "#ffa24d";
      ctx.beginPath();
      ctx.arc(cx, cy, radius, Math.PI / 2, Math.PI * 1.5);
      ctx.stroke();

      ctx.shadowColor = "rgba(150,100,255,0.9)";
      ctx.strokeStyle = "#9d7bff";
      ctx.beginPath();
      ctx.arc(cx, cy, radius, -Math.PI / 2, Math.PI / 2);
      ctx.stroke();
      ctx.restore();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Sky first, so the globe and its rings hide whatever is behind them
      drawStars();
      drawHalo();

      // Far side of the rings, hidden by the globe
      for (const ring of RINGS) {
        drawRingArc(ring, Math.PI, TAU, 0.55);
        drawRingDots(ring, false);
      }

      drawGlobe();

      // Near side of the rings, in front of the globe
      for (const ring of RINGS) {
        drawRingArc(ring, 0, Math.PI, 1);
        drawRingDots(ring, true);
      }
    }

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      cx = width / 2;
      cy = height / 2;
      radius = width * RADIUS_RATIO;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Keep every star outside of the globe, whatever the canvas shape
      const minU = Math.min(0.9, (radius * 1.14) / (Math.min(width, height) / 2 * 0.94));
      stars = buildStars(minU);
      draw();
    }

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      if (!visible) {
        last = now;
        return;
      }
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      rotation += delta * ROTATION_SPEED;
      clock += delta;
      draw();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pause when scrolled out of view
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    visibilityObserver.observe(canvas);

    resize();
    if (!reduceMotion) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none block", className)}
    />
  );
}