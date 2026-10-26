import { Brain, Cpu, Layers, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { CountUp } from "@/components/ui/count-up";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { pillars, stats, type Pillar } from "@/data/about";

const pillarIcons: Record<Pillar, LucideIcon> = {
  fullstack: Layers,
  iot: Cpu,
  data: Brain,
};

export function About() {
  const t = useTranslations("About");

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          id="about-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            <Reveal>
              <p>{t("p1")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{t("p2")}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>{t("p3")}</p>
            </Reveal>
          </div>

          <ul className="grid gap-4 lg:col-span-5">
            {pillars.map((key, index) => {
              const Icon = pillarIcons[key];
              return (
                <li key={key}>
                  <Reveal delay={index * 0.1}>
                    <GlassCard className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-strong ring-1 ring-border">
                        <Icon aria-hidden className="size-5 text-accent" />
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {t(`pillars.${key}.title`)}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {t(`pillars.${key}.text`)}
                        </p>
                      </div>
                    </GlassCard>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <li key={stat.id}>
              <Reveal delay={index * 0.08}>
                <GlassCard className="text-center">
                  <p className="font-display text-5xl font-semibold">
                    <CountUp to={stat.value} className="text-gradient" />
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {t(`stats.${stat.id}`)}
                  </p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}