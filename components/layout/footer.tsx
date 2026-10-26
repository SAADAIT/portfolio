import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonStyles } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { navSections, siteConfig } from "@/data/site";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-semibold tracking-tight">
            <span className="text-gradient">SAB</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{t("builtWith")}</p>
        </div>

        <nav aria-label={t("navLabel")} className="md:col-span-4">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navSections.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {tNav(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-end">
          <SocialLinks />
          <a href="#main" className={buttonStyles("secondary", "px-4 py-2")}>
            <ArrowUp aria-hidden className="size-4" />
            {t("backToTop")}
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-muted">
          {t("copyright", { year, name: siteConfig.name })}
        </p>
      </div>
    </footer>
  );
}