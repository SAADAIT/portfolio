import {
  Award,
  Brain,
  Code,
  Cpu,
  Database,
  Layers,
  Wrench,
  Wrench as ToolsIcon,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Chip } from "@/components/ui/chip";
import { CountUp } from "@/components/ui/count-up";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { heroStats } from "@/data/profile";
import {
  countProjectsUsing,
  highlightedSkills,
  skillCategories,
  tools,
  type SkillIcon,
} from "@/data/skills";
import type { Locale } from "@/i18n/routing";

const categoryIcons: Record<SkillIcon, LucideIcon> = {
  code: Code,
  cpu: Cpu,
  brain: Brain,
  database: Database,
  wrench: Wrench,
};

const experiencesCount =
  heroStats.find((stat) => stat.id === "experiences")?.value ?? 0;

export function Skills() {
  const t = useTranslations("Skills");
  const locale = useLocale() as Locale;

  const accent = (chunks: React.ReactNode) => (
    <span className="text-gradient">{chunks}</span>
  );

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Skills that stand out */}
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="skills-title"
              align="left"
              icon={Award}
              badge={t("badge")}
              title={t.rich("title", { accent })}
              description={t("description")}
            />

            <Reveal delay={0.1}>
              <ul
                aria-label={t("highlightsLabel")}
                className="mt-8 grid grid-cols-2 gap-3"
              >
                {highlightedSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-surface px-4 py-2.5 text-center text-sm font-medium"
                  >
                    {skill}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-5">
                <ProgressRing size={112} stroke={7}>
                  <span className="text-3xl font-extrabold">
                    <CountUp to={experiencesCount} className="text-gradient" />
                  </span>
                </ProgressRing>
                <p className="max-w-[14rem] text-sm text-muted">
                  {t("ringLabel")}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="bg-accent-gradient absolute -inset-3 rounded-[2.5rem] opacity-30 blur-2xl"
            />
            <div className="bg-accent-gradient relative rounded-[2rem] p-1.5">
              <div className="overflow-hidden rounded-[1.6rem] bg-surface">
                <ProfilePhoto
                  fit="cover"
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="aspect-[4/5] w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Expertise in tools */}
        <div className="mt-28 sm:mt-36">
          <SectionHeading
            id="tools-title"
            icon={ToolsIcon}
            badge={t("toolsBadge")}
            title={t.rich("toolsTitle", { accent })}
            description={t("toolsNote")}
            className="mb-12"
          />

          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {tools.map((tool, index) => {
              const count = countProjectsUsing(tool.name);
              return (
                <li key={tool.name}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <div className="h-full rounded-3xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent-from/50">
                      <span className="text-gradient mx-auto grid size-14 place-items-center rounded-2xl bg-surface-2 text-lg font-extrabold ring-1 ring-border">
                        {tool.abbr}
                      </span>
                      <p className="mt-4 font-semibold">{tool.name}</p>
                      <p className="text-gradient mt-3 text-5xl font-extrabold">
                        {count}
                      </p>
                      <p className="text-sm text-muted">
                        {t("projectsCount", { count })}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Full stack, grouped */}
        <div className="mt-28 sm:mt-36">
          <SectionHeading
            id="stack-title"
            icon={Layers}
            badge={t("stackBadge")}
            title={t.rich("stackTitle", { accent })}
            className="mb-12"
          />

          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => {
              const Icon = categoryIcons[category.icon];
              return (
                <li key={category.id}>
                  <Reveal delay={index * 0.06} className="h-full">
                    <div className="h-full rounded-3xl border border-border bg-surface p-6">
                      <span className="grid size-11 place-items-center rounded-2xl bg-surface-2 text-accent ring-1 ring-border">
                        <Icon aria-hidden className="size-5" />
                      </span>
                      <h3 className="mt-5 text-lg font-bold">
                        {category.title[locale]}
                      </h3>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <li key={item}>
                            <Chip>{item}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}