/**
 * Global site configuration.
 * Replace every TODO value before going to production.
 */
export const siteConfig = {
  name: "Saad Ait Bendra",
  shortName: "SAB",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "saadaitbendrafr@gmail.com",
  // TODO: replace with your real profile URLs
  github: "https://github.com/saadaitbendra",
  linkedin: "https://www.linkedin.com/in/saad-ait-bendra-5830061b7/",
  // TODO: put your real CV in /public/cv.pdf
  cvPath: "/cv.pdf",
  cvFileName: "CV-Saad-Ait-Bendra.pdf",
} as const;

/** Section ids, in page order. Used by the navbar, scroll spy and footer. */
export const navSections = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
] as const;

export type NavSection = (typeof navSections)[number];

export const socialLinks = [
  { id: "github", href: siteConfig.github },
  { id: "linkedin", href: siteConfig.linkedin },
  { id: "email", href: `mailto:${siteConfig.email}` },
] as const;

export type SiteConfig = typeof siteConfig;