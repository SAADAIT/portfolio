type Dot = { x: number; y: number; delay: string };

const lines = [
  "M0 232 H46 L80 198 H170",
  "M0 497 H40 L80 460 H125",
  "M30 548 H150 L190 508 H275",
  "M0 705 L120 640 H330",
  "M1496 190 H1410 L1378 222 H1325",
  "M1496 256 H1452 L1420 288 H1380 V335",
  "M1496 518 H1452 L1412 558 H1335",
  "M1246 598 H1410 L1440 628 H1496",
];

const dots: Dot[] = [
  { x: 46, y: 233, delay: "0s" },
  { x: 170, y: 198, delay: "1.2s" },
  { x: 40, y: 497, delay: "0.6s" },
  { x: 275, y: 508, delay: "2s" },
  { x: 225, y: 638, delay: "0.3s" },
  { x: 1410, y: 190, delay: "1.6s" },
  { x: 1448, y: 256, delay: "0.9s" },
  { x: 1335, y: 558, delay: "2.4s" },
  { x: 1308, y: 598, delay: "0.2s" },
];

/** Decorative circuit traces, glowing dots and the horizon arc. */
export function CircuitLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1496 733"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    >
      <defs>
        <linearGradient id="arc-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffa21f" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#ff2d86" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.8" />
        </linearGradient>
        <filter id="arc-blur" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <g fill="none" stroke="#ff8a3d" strokeOpacity="0.32" strokeWidth="1">
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {dots.map((dot) => (
        <g
          key={`${dot.x}-${dot.y}`}
          className="animate-twinkle"
          style={{ animationDelay: dot.delay }}
        >
          <circle cx={dot.x} cy={dot.y} r="9" fill="#ff8a1f" opacity="0.22" />
          <circle cx={dot.x} cy={dot.y} r="3.5" fill="#ff9d3d" />
        </g>
      ))}

      {/* Horizon arc under the title */}
      <path
        d="M-40 705 Q748 515 1536 705"
        fill="none"
        stroke="url(#arc-gradient)"
        strokeWidth="6"
        opacity="0.55"
        filter="url(#arc-blur)"
      />
      <path
        d="M-40 705 Q748 515 1536 705"
        fill="none"
        stroke="url(#arc-gradient)"
        strokeWidth="2"
      />
    </svg>
  );
}