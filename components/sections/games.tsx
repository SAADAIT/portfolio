import { Gamepad2, Play } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { buttonStyles } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { games } from "@/data/games";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function Games() {
  const t = useTranslations("GamesSection");
  const locale = useLocale() as Locale;

  return (
    <section
      id="games"
      aria-labelledby="games-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          id="games-title"
          icon={Gamepad2}
          badge={t("badge")}
          title={t.rich("title", {
            accent: (chunks) => <span className="text-gradient">{chunks}</span>,
          })}
          description={t("description")}
          className="mb-12 sm:mb-16"
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <li key={game.id}>
              <Reveal delay={index * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-from/50">
                  <span className="grid size-12 place-items-center rounded-2xl bg-surface-2 text-accent ring-1 ring-border">
                    <Gamepad2 aria-hidden className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold">
                    {game.title[locale]}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {game.description[locale]}
                  </p>
                  <div className="mt-5">
                    <Chip>{game.tech}</Chip>
                  </div>
                  <Link
                    href={`/games/${game.id}`}
                    className={buttonStyles("primary", "mt-6 self-start px-5 py-2.5")}
                  >
                    <Play aria-hidden className="size-4" />
                    {t("play")}
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}