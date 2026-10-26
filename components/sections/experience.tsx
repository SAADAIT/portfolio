import { MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Chip } from "@/components/ui/chip";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experiences } from "@/data/experiences";
import type { Locale } from "@/i18n/routing";

export function Experience() {
  const t = useTranslations("Experience");
  const locale = useLocale() as Locale;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          id="experience-title"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <ol className="relative space-y-8 border-l border-border pl-8 sm:pl-10">
          {experiences.map((exp) => (
            <li key={exp.id} className="relative">
              <span
                aria-hidden
                className="bg-accent-gradient absolute top-8 -left-8 size-3 -translate-x-1/2 rounded-full ring-4 ring-background sm:-left-10"
              />
              <Reveal>
                <GlassCard className="p-6 sm:p-8">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {exp.role[locale]}
                    </h3>
                    <p className="shrink-0 font-mono text-xs tracking-wider text-accent uppercase">
                      {exp.period[locale]}
                    </p>
                  </div>

                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
                    <span className="font-medium text-foreground">
                      {exp.company}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm">
                      <MapPin aria-hidden className="size-3.5" />
                      {exp.location[locale]}
                    </span>
                  </p>

                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted sm:text-base">
                    {exp.missions[locale].map((mission) => (
                      <li key={mission} className="flex gap-3">
                        <span
                          aria-hidden
                          className="bg-accent-gradient mt-2.5 h-0.5 w-3 shrink-0 rounded-full"
                        />
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>

                  <ul
                    aria-label={t("technologies")}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {exp.tags.map((tag) => (
                      <li key={tag}>
                        <Chip>{tag}</Chip>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}