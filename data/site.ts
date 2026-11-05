/**
 * Global site configuration.
 * Replace every TODO value before going to production.
 */
export const siteConfig = {
  name: "Saad Ait Bendra",
  firstName: "Saad",
  shortName: "SAB",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "saadaitbendrafr@gmail.com",
  // TODO: replace with your real profile URLs
  github: "https://github.com/TODO",
  linkedin: "https://www.linkedin.com/in/saad-ait-bendra-5830061b7/",
  // TODO: put your real CV in /public/cv.pdf
  cvPath: "/cv.pdf",
  cvFileName: "CV-Saad-Ait-Bendra.pdf",
  // TODO: cut-out portrait (transparent PNG) in /public/photo.png, then set "/photo.png"
  photo: "/photo.png",
} as const;

/** Section ids, in page order. Used by the navbar and the scroll spy. */
export const navSections = [
  "home",
  "services",
  "skills",
  "projects",
  "journey",
  "hobbies",
  "contact",
] as const;

export type NavSection = (typeof navSections)[number];

export const socialLinks = [
  { id: "github", href: siteConfig.github },
  { id: "linkedin", href: siteConfig.linkedin },
  { id: "email", href: `mailto:${siteConfig.email}` },
] as const;

export type SiteConfig = typeof siteConfig;