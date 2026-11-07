import { useLocale, useTranslations } from "next-intl";

import { CircuitLines } from "@/components/hero/circuit-lines";
import { IotScene } from "@/components/hero/iot-scene";
import { ScrollCue } from "@/components/hero/scroll-cue";
import { HeroKeywords, SmartPanel } from "@/components/hero/smart-panel";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale() as Locale;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="bg-hero relative isolate flex min-h-svh flex-col overflow-hidden pt-24 pb-8"
    >
      <CircuitLines />

      <div className="flex flex-1 items-center">
        <div className="mx-auto grid w-full max-w-[96rem] items-center gap-8 px-4 lg:grid-cols-[1fr_1.3fr_1fr] xl:px-8">
          {/* Left: IoT scene, seen from the side */}
          <IotScene className="animate-rise-in hidden justify-self-start [animation-delay:150ms] lg:block" />

          {/* Center: portrait, ring and title */}
          <div className="mx-auto w-full max-w-[34rem]">
            {/* isolate: z-indexes below only stack inside this block */}
            <div className="relative isolate mx-auto aspect-square w-full max-w-[28rem]">
              {/*
                Neon ring behind the portrait. Measured on the mockup: it is
                ~9% wider than the shoulders and centered at 60% of the box.
                The drawing area is larger than the ring (viewBox -40 -40 280 280,
                width 140%) so the glow is never cut off by the fade mask.
              */}
              <svg
                aria-hidden
                viewBox="-40 -40 280 280"
                className="pointer-events-none absolute top-[-10%] left-1/2 z-0 aspect-square w-[140%] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_53%,transparent_65%)]"
              >
                <defs>
                  <linearGradient
                    id="ring-gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="2"
                    y1="0"
                    x2="198"
                    y2="0"
                  >
                    <stop offset="0" stopColor="#ff9f2e" />
                    <stop offset="0.42" stopColor="#ff7a2a" />
                    <stop offset="0.58" stopColor="#f0207a" />
                    <stop offset="1" stopColor="#f50f9c" />
                  </linearGradient>
                  <filter id="ring-soft" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                  <filter id="ring-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2.4" />
                  </filter>
                </defs>
                {/* Wide soft halo */}
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="8"
                  opacity="0.95"
                  filter="url(#ring-soft)"
                />
                {/* Tight glow */}
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="3.4"
                  opacity="1"
                  filter="url(#ring-glow)"
                />
                {/* Bright core */}
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="1.25"
                />
              </svg>

              <ProfilePhoto
                fit="contain"
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="absolute inset-0 z-10 [mask-image:linear-gradient(to_bottom,#000_68%,transparent_97%)]"
              />
            </div>

            {/* No entrance animation on the h1: it is the LCP element */}
            <h1
              id="hero-title"
              className="relative z-20 -mt-12 text-center text-5xl leading-[1.05] font-extrabold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:-mt-16 sm:text-6xl xl:text-[4.25rem]"
            >
              {t("greeting")}{" "}
              <span className="text-gradient">{siteConfig.firstName}</span>
              <span className="sr-only">, {profile.role[locale]}</span>
            </h1>

            <div className="animate-rise-in [animation-delay:250ms]">
              {/* Hook: remove this paragraph to match the mockup exactly */}
              <p className="mx-auto mt-5 max-w-md text-center text-muted">
                {profile.tagline[locale]}
              </p>
              <HeroKeywords className="mt-8 lg:hidden" />
            </div>
          </div>

          {/* Right: smart systems card, Earth and key words */}
          <SmartPanel className="animate-rise-in hidden justify-self-end [animation-delay:350ms] lg:flex" />
        </div>
      </div>

      <ScrollCue href="#services" label={t("scroll")} />
    </section>
  );
}