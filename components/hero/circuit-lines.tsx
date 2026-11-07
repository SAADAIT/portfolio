type Ribbon = { d: string; width: number; opacity: number; gradient: string };

const ribbons: readonly Ribbon[] = [
  {
    d: "M-60 610 C 180 530 380 500 640 585 S 1020 700 1260 610 S 1500 545 1580 520",
    width: 3,
    opacity: 1,
    gradient: "wave-main",
  },
  {
    d: "M-60 662 C 260 612 520 648 770 668 S 1190 625 1580 566",
    width: 1.6,
    opacity: 0.75,
    gradient: "wave-alt",
  },
  {
    d: "M-60 568 C 110 548 250 508 400 526",
    width: 2,
    opacity: 0.9,
    gradient: "wave-warm",
  },
];

const swooshes = [
  { d: "M-20 160 C 90 128 170 132 250 158", color: "#ff8a3d", opacity: 0.55 },
  { d: "M1250 150 C 1360 128 1450 92 1540 40", color: "#ff4d94", opacity: 0.6 },
  { d: "M1300 215 C 1390 190 1470 160 1540 125", color: "#ff8a3d", opacity: 0.45 },
];

const dots = [
  { x: 90, y: 232, delay: "0s" },
  { x: 250, y: 158, delay: "1.4s" },
  { x: 1448, y: 70, delay: "0.7s" },
  { x: 1470, y: 142, delay: "2.1s" },
  { x: 560, y: 592, delay: "1s" },
  { x: 1180, y: 636, delay: "1.8s" },
];

/** Decorative backdrop: glowing wave ribbons and thin swooshes. */
export function CircuitLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1496 733"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    >
      <defs>
        <linearGradient
          id="wave-main"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1496"
          y2="0"
        >
          <stop offset="0" stopColor="#ffa21f" />
          <stop offset="0.5" stopColor="#ff2d86" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient
          id="wave-alt"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1496"
          y2="0"
        >
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#ff2d86" />
          <stop offset="1" stopColor="#ffa21f" />
        </linearGradient>
        <linearGradient
          id="wave-warm"
          gradientUnits="userSpaceOnUse"
          x1="-60"
          y1="0"
          x2="400"
          y2="0"
        >
          <stop offset="0" stopColor="#ffd45a" />
          <stop offset="1" stopColor="#ff7a3d" />
        </linearGradient>
        <filter id="wave-blur" x="-10%" y="-100%" width="120%" height="300%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {ribbons.map((ribbon) => (
        <g key={ribbon.d} fill="none" strokeLinecap="round">
          <path
            d={ribbon.d}
            stroke={`url(#${ribbon.gradient})`}
            strokeWidth={ribbon.width * 4}
            opacity={ribbon.opacity * 0.55}
            filter="url(#wave-blur)"
          />
          <path
            d={ribbon.d}
            stroke={`url(#${ribbon.gradient})`}
            strokeWidth={ribbon.width}
            opacity={ribbon.opacity}
          />
        </g>
      ))}

      <g fill="none" strokeLinecap="round" strokeWidth="1.3">
        {swooshes.map((swoosh) => (
          <path
            key={swoosh.d}
            d={swoosh.d}
            stroke={swoosh.color}
            opacity={swoosh.opacity}
          />
        ))}
      </g>

      {dots.map((dot) => (
        <g
          key={`${dot.x}-${dot.y}`}
          className="animate-twinkle"
          style={{ animationDelay: dot.delay }}
        >
          <circle cx={dot.x} cy={dot.y} r="9" fill="#ff8a1f" opacity="0.22" />
          <circle cx={dot.x} cy={dot.y} r="3.2" fill="#ff9d3d" />
        </g>
      ))}
    </svg>
  );
}