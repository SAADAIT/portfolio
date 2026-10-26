"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { HeroFallback } from "./hero-fallback";

// The 3D chunk is only downloaded when the scene is actually rendered
const HeroScene = dynamic(
  () => import("./hero-scene").then((module) => module.HeroScene),
  { ssr: false, loading: () => <HeroFallback /> },
);

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

function canRender3D(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const nav = navigator as NavigatorWithHints;
  if (nav.connection?.saveData) return false;

  // Skip the scene on small, low-power devices
  const smallScreen = window.matchMedia("(max-width: 767px)").matches;
  const lowPower =
    (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  if (smallScreen && lowPower) return false;

  // WebGL availability
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return gl !== null;
  } catch {
    return false;
  }
}

export function HeroCanvas() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(canRender3D());
  }, []);

  return enabled ? <HeroScene /> : <HeroFallback />;
}