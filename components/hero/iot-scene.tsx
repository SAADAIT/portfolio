import {
  Cpu,
  Database,
  Home,
  Image as ImageIcon,
  Radio,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Tile = { Icon: LucideIcon; left: string; top: string; lift: string };

/** Left tiles rise while right tiles sink: a see-saw locked on one clock. */
const tiles: readonly Tile[] = [
  { Icon: Cpu, left: "31%", top: "17.6%", lift: "-8px" },
  { Icon: Radio, left: "77%", top: "17.6%", lift: "8px" },
  { Icon: Database, left: "21%", top: "46.5%", lift: "-8px" },
  { Icon: ImageIcon, left: "88%", top: "46.5%", lift: "8px" },
  { Icon: TrendingUp, left: "28%", top: "80.6%", lift: "-8px" },
  { Icon: Home, left: "78.6%", top: "81%", lift: "8px" },
];

const CLOUD =
  "M170 150 C146 150 138 124 158 114 C152 90 182 78 202 90 C212 60 262 56 280 86 C304 76 336 94 328 120 C350 126 348 150 322 150 Z";

/** Distance a piece travels at the peak of the shared breathing cycle. */
function lift(value: string): CSSProperties {
  return { "--lift": value } as CSSProperties;
}

function diamond(cx: number, cy: number, w: number, h: number): string {
  return `${cx},${cy - h} ${cx + w},${cy} ${cx},${cy + h} ${cx - w},${cy}`;
}

/** Side view of an IoT system: cloud, layered platform and connected devices. */
export function IotScene({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative aspect-[420/340] w-full max-w-[30rem]", className)}
    >
      <svg
        aria-hidden
        viewBox="0 0 420 340"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <linearGradient id="iot-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffa21f" />
            <stop offset="1" stopColor="#ff2d86" />
          </linearGradient>
          <linearGradient id="iot-cloud" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a1566" />
            <stop offset="1" stopColor="#170a30" />
          </linearGradient>
          <linearGradient id="iot-slab" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a1763" />
            <stop offset="1" stopColor="#1b0b34" />
          </linearGradient>
          <linearGradient id="iot-chip" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff5fa8" />
            <stop offset="1" stopColor="#8b3cf0" />
          </linearGradient>
          <linearGradient id="iot-beam" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ff2d86" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ff2d86" stopOpacity="0" />
          </linearGradient>
          <filter id="iot-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="iot-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* Links between the devices, the cloud and the platform */}
        <g fill="none" stroke="url(#iot-brand)" strokeOpacity="0.5" strokeWidth="1">
          <path d="M130 86 V102 L172 118" />
          <path d="M323 86 V96 L300 112" />
          <path d="M88 184 H150 L192 206" />
          <path d="M370 184 H320 L282 206" />
          <path d="M118 248 V240 L170 226" />
          <path d="M330 250 V240 L300 226" />
        </g>
        {[
          [172, 118],
          [300, 112],
          [192, 206],
          [282, 206],
          [170, 226],
          [300, 226],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#ff9d3d" />
        ))}

        {/* Glow on the ground under the platform */}
        <ellipse
          cx="235"
          cy="244"
          rx="132"
          ry="26"
          fill="#ff2d86"
          opacity="0.3"
          filter="url(#iot-blur)"
        />

        {/* Platform, layer by layer. Upper layers rise higher in the cycle. */}
        <g>
          <polygon points="117,214 235,248 235,260 117,226" fill="#1c0e36" />
          <polygon points="353,214 235,248 235,260 353,226" fill="#241242" />
          <polygon
            points={diamond(235, 214, 118, 34)}
            fill="url(#iot-slab)"
            stroke="url(#iot-brand)"
            strokeWidth="1.6"
          />
        </g>
        <g className="animate-breathe" style={lift("-4px")}>
          <polygon
            points={diamond(235, 206, 92, 26)}
            fill="#2a1050"
            fillOpacity="0.65"
            stroke="#ff4d94"
            strokeWidth="1.6"
          />
        </g>
        <g className="animate-breathe" style={lift("-8px")}>
          <polygon
            points={diamond(235, 198, 64, 18)}
            fill="#3a1465"
            fillOpacity="0.75"
            stroke="#ffa21f"
            strokeWidth="1.6"
          />
        </g>

        {/* Light beam between the platform and the cloud */}
        <g className="animate-beam">
          <polygon points="212,184 258,184 280,160 190,160" fill="url(#iot-beam)" />
          <g stroke="url(#iot-beam)" strokeWidth="1.2" strokeDasharray="3 4">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1={205 + i * 10} y1="164" x2={205 + i * 10} y2="184" />
            ))}
          </g>
        </g>

        <g className="animate-breathe" style={lift("-12px")}>
          <polygon
            points={diamond(235, 190, 34, 10)}
            fill="url(#iot-chip)"
            stroke="#fff"
            strokeOpacity="0.7"
            strokeWidth="1"
          />
        </g>

        {/* Cloud */}
        <g className="animate-breathe" style={lift("-6px")}>
          <g transform="translate(235 118) scale(0.72) translate(-244 -103)">
            <path
              d={CLOUD}
              fill="none"
              stroke="url(#iot-brand)"
              strokeWidth="10"
              opacity="0.6"
              filter="url(#iot-glow)"
            />
            <path
              d={CLOUD}
              fill="url(#iot-cloud)"
              stroke="url(#iot-brand)"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <text
              x="248"
              y="128"
              textAnchor="middle"
              fontSize="46"
              fontWeight="800"
              fill="#fff"
              style={{ fontFamily: "var(--font-display)" }}
            >
              IoT
            </text>
          </g>
        </g>

        {/* Small sparks */}
        {[
          [40, 110],
          [395, 92],
          [58, 300],
          [402, 304],
        ].map(([x, y], index) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2.4"
            fill="#ff9d3d"
            className="animate-twinkle"
            style={{ animationDelay: `${index * 0.8}s` }}
          />
        ))}
      </svg>

      {tiles.map(({ Icon, left, top, lift: distance }) => (
        <span
          key={left + top}
          aria-hidden
          className="absolute aspect-square w-[13%] -translate-x-1/2 -translate-y-1/2"
          style={{ left, top }}
        >
          <span
            className="animate-breathe block size-full rounded-2xl bg-gradient-to-br from-fuchsia-500/80 to-violet-500/80 p-px shadow-[0_0_28px_-4px_rgba(192,70,255,0.75)]"
            style={lift(distance)}
          >
            <span className="grid size-full place-items-center rounded-[15px] bg-[#1d0b38] text-[#efe4ff]">
              <Icon className="size-1/2" strokeWidth={1.5} />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}