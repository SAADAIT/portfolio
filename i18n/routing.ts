import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // Always expose /fr and /en
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];