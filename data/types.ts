import type { Locale } from "@/i18n/routing";

/** A value available in every supported locale. */
export type Localized<T> = Record<Locale, T>;