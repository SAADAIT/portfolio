/** Services shown in "What I can do" (texts live in messages/*.json). */
export const serviceIds = [
  "fullstack",
  "iot",
  "vision",
  "data",
  "rf",
  "project",
] as const;

export type ServiceId = (typeof serviceIds)[number];