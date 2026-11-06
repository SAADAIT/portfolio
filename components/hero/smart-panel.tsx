import { Activity, Cloud, Settings, Wifi, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const keywords = [
  { id: "connect", Icon: Wifi },
  { id: "analyze", Icon: Activity },
  { id: "automate", Icon: Settings },
  { id: "innovate", Icon: Cloud },
] as const satisfies readonly { id: string; Icon: LucideIcon }[];

function Chart() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 90"
      className="mt-3 h-24 w-full overflow-visible"
    >
      <defs>
        <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffa21f" />
          <stop offset="1" stopColor="#ff2d86" />
        </linearGradient>
      </defs>
      <g fill="#b79cf0" opacity="0.25">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) =>
          [0, 1, 2, 3].map((j) => (
            <circle key={`${i}-${j}`} cx={14 + i * 30} cy={14 + j * 20} r="1" />
          )),
        )}
      </g>
      <path
        d="M0 72 C40 66 60 44 100 54 S160 32 200 50 S252 38 300 8"
        fill="none"
        stroke="url(#chart-line)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {[
        [100, 54],
        [200, 50],
        [262, 30],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} className="animate-twinkle">
          <circle cx={x} cy={y} r="8" fill="#ff8a1f" opacity="0.25" />
          <circle cx={x} cy={y} r="3.5" fill="#ff9d3d" />
        </g>
      ))}
    </svg>
  );
}

function Globe() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 200"
      className="h-44 w-auto shrink-0 overflow-visible"
    >
      <defs>
        <radialGradient id="globe-body" cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#6b3fb5" />
          <stop offset="1" stopColor="#28143f" />
        </radialGradient>
        <linearGradient id="globe-orbit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffa21f" />
          <stop offset="1" stopColor="#ff2d86" />
        </linearGradient>
        <pattern
          id="globe-dots"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3.5" cy="3.5" r="1.1" fill="#b79cf0" />
        </pattern>
        <clipPath id="globe-clip">
          <circle cx="110" cy="100" r="66" />
        </clipPath>
        <mask id="globe-land">
          <rect width="220" height="200" fill="#000" />
          <g fill="#fff">
            <ellipse cx="86" cy="84" rx="26" ry="20" />
            <ellipse cx="96" cy="124" rx="14" ry="22" />
            <ellipse cx="140" cy="78" rx="30" ry="16" />
            <ellipse cx="146" cy="116" rx="16" ry="14" />
          </g>
        </mask>
      </defs>

      <circle cx="110" cy="100" r="66" fill="url(#globe-body)" />
      <rect
        width="220"
        height="200"
        fill="url(#globe-dots)"
        mask="url(#globe-land)"
        clipPath="url(#globe-clip)"
        opacity="0.6"
      />
      <g fill="none" stroke="#fff" strokeOpacity="0.1">
        <ellipse cx="110" cy="100" rx="66" ry="22" />
        <ellipse cx="110" cy="100" rx="30" ry="66" />
      </g>

      <g fill="none" stroke="url(#globe-orbit)" strokeWidth="1.6">
        <ellipse
          cx="110"
          cy="100"
          rx="104"
          ry="30"
          transform="rotate(-14 110 100)"
        />
        <ellipse
          cx="110"
          cy="100"
          rx="98"
          ry="26"
          transform="rotate(22 110 100)"
          opacity="0.7"
        />
      </g>
      {[
        [13, 114],
        [194, 64],
        [173, 144],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} className="animate-twinkle">
          <circle cx={x} cy={y} r="7" fill="#ff8a1f" opacity="0.3" />
          <circle cx={x} cy={y} r="3" fill="#ffb457" />
        </g>
      ))}
    </svg>
  );
}

/** Right side of the hero: floating card, globe and the four key words. */
export function SmartPanel({ className }: { className?: string }) {
  const t = useTranslations("Hero");

  return (
    <div className={cn("flex flex-col items-center gap-10", className)}>
      <div className="w-full max-w-[22rem] rounded-2xl border border-white/15 bg-[#19122b]/70 p-5 shadow-[0_30px_80px_-30px_rgba(255,45,134,0.45)] backdrop-blur [transform:perspective(900px)_rotateY(-16deg)_rotateX(4deg)_rotateZ(-2deg)]">
        <p className="text-lg font-bold">{t("smartTitle")}</p>
        <p className="mt-0.5 text-sm text-muted">{t("smartTags")}</p>
        <Chart />
      </div>

      <div className="flex items-center gap-4">
        <Globe />
        <ul aria-label={t("keywordsLabel")} className="space-y-3.5">
          {keywords.map(({ id, Icon }) => (
            <li key={id} className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full border border-white/10 bg-[#341940]/70 text-[#d9cdee]">
                <Icon aria-hidden className="size-5" strokeWidth={1.6} />
              </span>
              <span className="text-base">{t(`keywords.${id}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Compact version for small screens, where the illustrations are hidden. */
export function HeroKeywords({ className }: { className?: string }) {
  const t = useTranslations("Hero");

  return (
    <ul
      aria-label={t("keywordsLabel")}
      className={cn("flex flex-wrap justify-center gap-3", className)}
    >
      {keywords.map(({ id, Icon }) => (
        <li
          key={id}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-[#341940]/60 px-4 py-2 text-sm"
        >
          <Icon aria-hidden className="size-4 text-accent" strokeWidth={1.8} />
          {t(`keywords.${id}`)}
        </li>
      ))}
    </ul>
  );
}