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
              {/* Gradient ring: behind the portrait, faded out below the shoulders */}
              <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="absolute top-[16%] left-1/2 z-0 aspect-square w-[92%] -translate-x-1/2 overflow-visible [mask-image:linear-gradient(to_bottom,#000_48%,transparent_64%)]"
              >
                <defs>
                  <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ffa21f" />
                    <stop offset="1" stopColor="#ff2d86" />
                  </linearGradient>
                  <filter id="ring-blur" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" />
                  </filter>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="6"
                  opacity="0.85"
                  filter="url(#ring-blur)"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth="2.2"
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