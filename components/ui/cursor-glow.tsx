"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const SIZE = 600;

/** Soft light following the mouse. Desktop only, off with reduced motion. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches) return;

    setEnabled(true);
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - SIZE / 2);
      y.set(event.clientY - SIZE / 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-10 rounded-full"
      style={{
        x: springX,
        y: springY,
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, var(--glow) 0%, transparent 65%)",
      }}
    />
  );
}