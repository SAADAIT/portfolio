import { ArrowDown, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeroCanvas } from "@/components/three/hero-canvas";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-dvh items-center overflow-hidden pt-24 pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-background via-background/70 to-transparent lg:via-background/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-background to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t("badge")}
            </p>
          </Reveal>

          {/* No entrance animation on the h1: it is the LCP element */}
          <h1
            id="hero-title"
            className="mt-8 text-6xl leading-[0.95] font-semibold sm:text-7xl lg:text-8xl"
          >
            Saad
            <br />
            <span className="text-gradient">Ait Bendra</span>
          </h1>

          <Reveal delay={0.1}>
            <p className="mt-6 font-mono text-sm tracking-[0.2em] text-accent uppercase">
              {t("role")}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
              {t("tagline")}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className={buttonStyles("primary")}>
              {t("ctaProjects")}
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a href="#contact" className={buttonStyles("secondary")}>
              {t("ctaContact")}
            </a>
          </Reveal>

          <Reveal delay={0.4} className="mt-10">
            <SocialLinks />
          </Reveal>
        </div>
      </div>

      <a
        href="#about"
        aria-label={t("scroll")}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-foreground sm:block"
      >
        <ArrowDown aria-hidden className="size-5 animate-bounce" />
      </a>
    </section>
  );
}