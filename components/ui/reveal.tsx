"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { easeOutExpo } from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, handy to stagger siblings. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
};

/** Fade + translate on scroll. Renders a plain div with reduced motion. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}