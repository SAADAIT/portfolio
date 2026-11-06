import { Cpu, Database, Radio, TrendingUp, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Tile = { Icon: LucideIcon; left: string; top: string; delay: string };

const tiles: readonly Tile[] = [
  { Icon: Cpu, left: "26.7%", top: "11%", delay: "0s" },
  { Icon: Radio, left: "71%", top: "10%", delay: "1.1s" },
  { Icon: Database, left: "21%", top: "36%", delay: "2s" },
  { Icon: TrendingUp, left: "82%", top: "36%", delay: "0.6s" },
];

/** Illustration of an IoT system: cloud, chip platform and connected devices. */
export function IotScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[480/450] w-full max-w-[30rem]",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 480 450"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <linearGradient id="iot-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffa21f" />
            <stop offset="1" stopColor="#ff2d86" />
          </linearGradient>
          <linearGradient id="iot-chip" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d24bd0" />
            <stop offset="1" stopColor="#7a35d8" />
          </linearGradient>
          <linearGradient id="iot-beam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff2d86" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffa21f" stopOpacity="0.2" />
          </linearGradient>
          <filter id="iot-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="iot-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Links between the devices and the chip */}
        <g fill="none" stroke="#ff8a3d" strokeOpacity="0.4" strokeWidth="1">
          <path d="M128 78 V135 L190 205" />
          <path d="M342 72 V140 L300 200" />
          <path d="M102 192 H160 L200 238" />
          <path d="M396 192 H340 L300 238" />
          <path d="M138 280 H70 L40 310 H0" />
          <path d="M362 280 H430 L458 308 H480" />
        </g>
        {[
          [190, 205],
          [300, 200],
          [200, 238],
          [300, 238],
          [0, 310],
          [480, 308],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#ff9d3d" />
        ))}

        {/* Glow under the platform */}
        <ellipse
          cx="250"
          cy="292"
          rx="140"
          ry="46"
          fill="#ff2d86"
          opacity="0.28"
          filter="url(#iot-blur)"
        />

        {/* Cloud */}
        <path
          d="M170 150 C146 150 138 124 158 114 C152 90 182 78 202 90 C212 60 262 56 280 86 C304 76 336 94 328 120 C350 126 348 150 322 150 Z"
          fill="none"
          stroke="url(#iot-brand)"
          strokeWidth="5"
          opacity="0.8"
          filter="url(#iot-glow)"
        />
        <path
          d="M170 150 C146 150 138 124 158 114 C152 90 182 78 202 90 C212 60 262 56 280 86 C304 76 336 94 328 120 C350 126 348 150 322 150 Z"
          fill="#241338"
          fillOpacity="0.9"
          stroke="url(#iot-brand)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text
          x="248"
          y="128"
          textAnchor="middle"
          fontSize="44"
          fontWeight="800"
          fill="#fff"
        >
          IoT
        </text>

        {/* Data beams from the chip to the cloud */}
        <g stroke="url(#iot-beam)" strokeWidth="1.4" strokeDasharray="3 4">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={214 + i * 11} y1="158" x2={214 + i * 11} y2="224" />
          ))}
        </g>

        {/* Isometric platform */}
        <polygon points="138,272 250,328 250,342 138,286" fill="#1f1236" />
        <polygon points="362,272 250,328 250,342 362,286" fill="#241540" />
        <polygon
          points="250,216 362,272 250,328 138,272"
          fill="#2a1a45"
          stroke="#7c4dd6"
          strokeOpacity="0.8"
          strokeWidth="1"
        />
        <polygon
          points="250,220 326,258 250,296 174,258"
          fill="#33194f"
          stroke="url(#iot-brand)"
          strokeWidth="2"
        />
        <polygon
          points="250,223 296,246 250,269 204,246"
          fill="url(#iot-chip)"
          stroke="#ffb457"
          strokeWidth="1.5"
        />
        <polygon
          points="250,233 276,246 250,259 224,246"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.55"
          strokeWidth="1"
        />

        {/* Wi-Fi device */}
        <g transform="translate(84 308)">
          <ellipse cx="0" cy="18" rx="17" ry="6" fill="#1c1030" />
          <rect x="-17" y="-14" width="34" height="32" rx="6" fill="#2a1a45" />
          <ellipse cx="0" cy="-14" rx="17" ry="6" fill="#3a2060" />
          <rect x="-8" y="2" width="16" height="3" rx="1.5" fill="#ff8a3d" />
          <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M-12 -34 Q0 -46 12 -34" />
            <path d="M-7 -28 Q0 -35 7 -28" />
          </g>
          <circle cx="0" cy="-22" r="2" fill="#fff" />
        </g>

        {/* Laptop */}
        <g transform="translate(228 380)">
          <polygon
            points="-46,-40 36,-56 36,4 -46,22"
            fill="#1b1030"
            stroke="#7c4dd6"
            strokeWidth="0.8"
          />
          <g transform="translate(-40 -26) skewY(-11)">
            <rect x="0" y="26" width="9" height="12" fill="url(#iot-brand)" />
            <rect x="14" y="16" width="9" height="22" fill="url(#iot-brand)" />
            <rect x="28" y="22" width="9" height="16" fill="url(#iot-brand)" />
            <rect x="42" y="6" width="9" height="32" fill="url(#iot-brand)" />
          </g>
          <polygon
            points="-50,26 -46,22 36,4 52,14 -36,38"
            fill="#2a1a45"
            stroke="#7c4dd6"
            strokeWidth="0.6"
          />
        </g>

        {/* Cube sensor */}
        <g transform="translate(378 352)">
          <polygon points="0,-24 26,-11 0,2 -26,-11" fill="#5a35a8" />
          <polygon points="-26,-11 0,2 0,32 -26,19" fill="#3a2275" />
          <polygon points="26,-11 0,2 0,32 26,19" fill="#2b1859" />
          <ellipse
            cx="13"
            cy="15"
            rx="6"
            ry="7"
            fill="none"
            stroke="#ff8a3d"
            strokeWidth="2"
          />
        </g>
      </svg>

      {tiles.map(({ Icon, left, top, delay }) => (
        <span
          key={left + top}
          aria-hidden
          className="animate-float-y absolute grid aspect-square w-[12.5%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/10 bg-[#2a1a36]/80 text-[#d9cdee] shadow-[0_12px_32px_-12px_rgba(255,45,134,0.5)] backdrop-blur"
          style={{ left, top, animationDelay: delay }}
        >
          <Icon className="size-1/2" strokeWidth={1.6} />
        </span>
      ))}
    </div>
  );
}