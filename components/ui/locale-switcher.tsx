"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className="glass inline-flex rounded-full p-0.5 text-xs font-medium"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          disabled={isPending}
          className={cn(
            "rounded-full px-2.5 py-1.5 uppercase transition-colors",
            l === locale
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}