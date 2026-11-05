import { ArrowRight, Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { buttonStyles } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { CountUp } from "@/components/ui/count-up";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { heroStats, profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { featuredStack } from "@/data/skills";
import type { Locale } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale() as Locale;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="bg-hero-glow relative isolate overflow-hidden pt-28 pb-16 lg:pt-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Left: pitch, actions and social links */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            <Reveal>
              <p className="leading-relaxed text-muted">
                {profile.tagline[locale]}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className={buttonStyles("primary", "px-5 py-2.5")}
                >
                  {t("ctaProjects")}
                  <ArrowRight aria-hidden className="size-4" />
                </a>
                <a
                  href={siteConfig.cvPath}
                  download={siteConfig.cvFileName}
                  className={buttonStyles("secondary", "px-5 py-2.5")}
                >
                  <Download aria-hidden className="size-4" />
                  {t("downloadCv")}
                </a>
              </div>
              <p className="mt-8 text-sm font-semibold">{t("followMe")}</p>
              <SocialLinks className="mt-3" />
            </Reveal>
          </div>

          {/* Center: portrait with the title overlapping it */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="relative mx-auto w-full max-w-xl">
              <div
                aria-hidden
                className="bg-accent-gradient absolute bottom-0 left-1/2 h-[80%] w-[85%] -translate-x-1/2 rounded-full opacity-25 blur-[90px]"
              />
              <ProfilePhoto
                fit="contain"
                priority
                sizes="(min-width: 1024px) 36rem, 90vw"
                className="h-[22rem] w-full [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)] sm:h-[30rem]"
              />
              {/* No entrance animation on the h1: it is the LCP element */}
              <h1
                id="hero-title"
                className="relative z-10 -mt-16 text-center text-5xl leading-[1.08] font-extrabold sm:-mt-24 sm:text-6xl lg:text-7xl"
              >
                <span className="block">
                  {t("greeting")} {siteConfig.firstName}
                </span>
                <span className="text-gradient block pb-2">
                  {profile.role[locale]}
                </span>
              </h1>
            </div>
          </div>

          {/* Right: key figures */}
          <div className="order-3 lg:col-span-3">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {heroStats.map((stat, index) => (
                <li key={stat.id}>
                  <Reveal delay={0.1 + index * 0.1}>
                    <div className="rounded-3xl border border-border bg-surface/80 p-6 backdrop-blur">
                      <p className="text-5xl font-extrabold">
                        <CountUp to={stat.value} className="text-gradient" />
                      </p>
                      <p className="mt-2 text-sm text-muted">
                        {t(`stats.${stat.id}`)}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technologies strip */}
        <Reveal delay={0.2}>
          <ul
            aria-label={t("techLabel")}
            className="mt-16 flex flex-wrap justify-center gap-3"
          >
            {featuredStack.map((tech) => (
              <li key={tech}>
                <Chip className="px-5 py-2.5 text-sm">{tech}</Chip>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}