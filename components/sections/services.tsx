"use client";

import {
  Brain,
  Briefcase,
  Cpu,
  Eye,
  Layers,
  Radio,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { serviceIds, type ServiceId } from "@/data/services";
import { cn } from "@/lib/utils";

const icons: Record<ServiceId, LucideIcon> = {
  fullstack: Layers,
  iot: Cpu,
  vision: Eye,
  data: Brain,
  rf: Radio,
  project: Users,
};

export function Services() {
  const t = useTranslations("Services");
  // The highlighted card follows the pointer, the first one by default
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          id="services-title"
          icon={Briefcase}
          badge={t("badge")}
          title={t.rich("title", {
            accent: (chunks) => <span className="text-gradient">{chunks}</span>,
          })}
          description={t("description")}
          className="mb-12 sm:mb-16"
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceIds.map((id, index) => {
            const Icon = icons[id];
            const on = index === active;

            return (
              <li key={id}>
                <Reveal delay={index * 0.06} className="h-full">
                  <article
                    onMouseEnter={() => setActive(index)}
                    className={cn(
                      "h-full rounded-3xl border p-7 transition-all duration-300",
                      on
                        ? "bg-accent-gradient border-transparent text-on-accent shadow-[0_24px_60px_-24px_var(--glow)]"
                        : "border-border bg-surface",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-12 place-items-center rounded-2xl transition-colors duration-300",
                        on
                          ? "bg-on-accent/10 text-on-accent"
                          : "bg-surface-2 text-accent ring-1 ring-border",
                      )}
                    >
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold">
                      {t(`items.${id}.title`)}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed transition-colors duration-300",
                        on ? "text-on-accent/80" : "text-muted",
                      )}
                    >
                      {t(`items.${id}.text`)}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}