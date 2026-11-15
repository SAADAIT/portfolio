import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { games, getGame } from "@/data/games";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    games.map((game) => ({ locale, slug: game.id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const game = getGame(slug);
  if (!game || !hasLocale(routing.locales, locale)) return {};

  return {
    title: game.title[locale],
    description: game.description[locale],
  };
}

export default async function GamePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const game = getGame(slug);
  if (!game) notFound();

  const t = await getTranslations("Games");
  // The game reads ?lang=fr|en to pick its language
  const src = game.url ? `${game.url}?lang=${locale}` : null;

  return (
    <main id="main" className="mx-auto w-full max-w-4xl px-6 pt-24 pb-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {t("back")}
      </Link>

      <h1 className="mt-6 text-4xl font-extrabold">{game.title[locale]}</h1>
      <p className="mt-3 max-w-2xl text-muted">{game.description[locale]}</p>

      {src ? (
        <>
          <iframe
            src={src}
            title={game.title[locale]}
            loading="lazy"
            className="mt-8 h-[44rem] w-full rounded-3xl border border-border bg-background sm:h-[38rem]"
          />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
            <p>
              {t("hint")} {t("builtWith", { tech: game.tech })}
            </p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              {t("openNewTab")}
              <ExternalLink aria-hidden className="size-4" />
            </a>
          </div>
        </>
      ) : (
        <p className="mt-8 rounded-3xl border border-border bg-surface p-6 text-muted">
          {t("notConfigured")}
        </p>
      )}
    </main>
  );
}