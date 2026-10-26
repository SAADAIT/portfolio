/** Key figures shown in the About section (labels live in messages/*.json). */
export const stats = [
  { id: "experiences", value: 6 },
  { id: "projects", value: 7 },
  { id: "domains", value: 3 },
  { id: "languages", value: 3 },
] as const;

/** Areas of expertise (titles and texts live in messages/*.json). */
export const pillars = ["fullstack", "iot", "data"] as const;

export type Pillar = (typeof pillars)[number];