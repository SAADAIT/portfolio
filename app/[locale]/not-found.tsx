import { useTranslations } from "next-intl";

import { buttonStyles } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="main"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <p className="text-gradient font-display text-8xl font-semibold">404</p>
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="max-w-md text-muted">{t("description")}</p>
      <Link href="/" className={buttonStyles("primary")}>
        {t("back")}
      </Link>
    </main>
  );
}