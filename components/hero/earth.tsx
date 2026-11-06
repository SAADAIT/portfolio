"use client";

import { useEffect, useRef } from "react";

import { LAND_MASK, MASK_COLS, MASK_ROWS } from "@/data/globe-land";
import { cn } from "@/lib/utils";

const TAU = Math.PI * 2;
const DOT_COUNT = 4000;
/** Camera looks at the globe from slightly above the equator. */
const VIEW_TILT = (16 * Math.PI) / 180;
/** Radians per second: one full turn in about two minutes. */
const ROTATION_SPEED = 0.052;

type LandPoint = { sinLat: number; cosLat: number; lon: number };

type RingDot = { speed: number; phase: number; color: string };

type Ring = {
  /** Radii relative to the canvas width. */
  rx: number;
  ry: number;
  tilt: number;
  dots: RingDot[];
};

const RINGS: readonly Ring[] = [
  {
    rx: 0.45,
    ry: 0.09,
    tilt: -0.16,
    dots: [
      { speed: 0.5, phase: 2.2, color: "#ff9d3d" },
      { speed: 0.5, phase: 5.3, color: "#ffffff" },
    ],
  },
  {
    rx: 0.43,
    ry: 0.105,
    tilt: 0.22,
    dots: [
      { speed: -0.35, phase: 0.9, color: "#ff8a1f" },
      { speed: -0.35, phase: 3.6, color: "#ff4d94" },
    ],
  },
];

/** Dot colors, brighter toward the center of the disk. */
const DOT_STYLES = Array.from(
  { length: 16 },
  (_, i) => `rgba(214,190,255,${(0.2 + (0.8 * i) / 15).toFixed(2)})`,
);

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

/** Dotted globe with two glowing orbit rings, drawn on a canvas. */
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

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let visible = true;
    let rotation = 0.3;
    let clock = 0;

    const cosTilt = Math.cos(VIEW_TILT);
    const sinTilt = Math.sin(VIEW_TILT);

    function drawRingArc(ring: Ring, from: number, to: number, alpha: number) {
      if (!ctx) return;
      const cx = width / 2;
      const cy = height / 2;
      const rx = ring.rx * width;
      const ry = ring.ry * width;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(ring.tilt);
      const gradient = ctx.createLinearGradient(-rx, 0, rx, 0);
      gradient.addColorStop(0, "#ffa21f");
      gradient.addColorStop(1, "#ff2d86");
      ctx.strokeStyle = gradient;

      // Soft halo, then the thin line
      ctx.globalAlpha = alpha * 0.28;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, from, to);
      ctx.stroke();

      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, from, to);
      ctx.stroke();
      ctx.restore();
    }

    function drawRingDots(ring: Ring, front: boolean) {
      if (!ctx) return;
      const cx = width / 2;
      const cy = height / 2;
      const rx = ring.rx * width;
      const ry = ring.ry * width;
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
        ctx.arc(cx + x * cos - y * sin, cy + x * sin + y * cos, 2.6, 0, TAU);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawGlobe() {
      if (!ctx) return;
      const cx = width / 2;
      const cy = height / 2;
      const radius = width * 0.25;

      // Sphere body
      const body = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.4,
        radius * 0.1,
        cx,
        cy,
        radius,
      );
      body.addColorStop(0, "#6a3fc0");
      body.addColorStop(0.55, "#3b1d70");
      body.addColorStop(1, "#1a0c38");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.fillStyle = body;
      ctx.fill();

      ctx.save();
      ctx.clip();

      // Land dots (orthographic projection)
      for (const point of land) {
        const lon = point.lon - rotation;
        const cosLon = Math.cos(lon);
        const z = sinTilt * point.sinLat + cosTilt * point.cosLat * cosLon;
        if (z <= 0.02) continue;

        const x = point.cosLat * Math.sin(lon);
        const y = cosTilt * point.sinLat - sinTilt * point.cosLat * cosLon;
        ctx.fillStyle = DOT_STYLES[Math.min(15, Math.floor(z * 16))] ?? DOT_STYLES[15]!;
        ctx.beginPath();
        ctx.arc(cx + radius * x, cy - radius * y, 0.7 + 1.1 * z, 0, TAU);
        ctx.fill();
      }

      // Light from the top left, shadow toward the bottom right
      const shade = ctx.createRadialGradient(
        cx - radius * 0.4,
        cy - radius * 0.45,
        radius * 0.2,
        cx,
        cy,
        radius * 1.05,
      );
      shade.addColorStop(0, "rgba(255,255,255,0.10)");
      shade.addColorStop(0.5, "rgba(0,0,0,0)");
      shade.addColorStop(1, "rgba(10,4,24,0.55)");
      ctx.fillStyle = shade;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.restore();

      // Glowing rim
      ctx.save();
      ctx.shadowColor = "rgba(178,102,255,0.85)";
      ctx.shadowBlur = 16;
      ctx.strokeStyle = "rgba(190,130,255,0.9)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TAU);
      ctx.stroke();
      ctx.restore();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

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
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
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