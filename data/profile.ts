import type { Localized } from "./types";

export const profile = {
  /** Second line of the hero title (gradient). */
  role: {
    fr: "Ingénieur Logiciel",
    en: "Software Engineer",
  } satisfies Localized<string>,

  /** Paragraph on the left of the hero. */
  tagline: {
    fr: "Je donne des yeux aux machines : vision 3D, capteurs et data, de la conception au déploiement.",
    en: "I give machines eyes: 3D vision, sensors and data, from design to deployment.",
  } satisfies Localized<string>,
} as const;

/** Figures shown on the right of the hero (labels live in messages/*.json). */
export const heroStats = [
  { id: "experiences", value: 6 },
  { id: "projects", value: 7 },
] as const;