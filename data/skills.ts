export {};
import type { Localized } from "./types";
import { projects } from "./projects";

export type SkillIcon = "code" | "cpu" | "brain" | "database" | "wrench";

export type SkillCategory = {
  id: string;
  icon: SkillIcon;
  title: Localized<string>;
  items: string[];
};

export const skillCategories: readonly SkillCategory[] = [
  {
    id: "web",
    icon: "code",
    title: { fr: "Développement & Web", en: "Development & Web" },
    items: [
      "Python",
      "C/C++",
      "Java",
      "TypeScript",
      "React",
      "HTML/CSS",
      "JavaScript",
      "Node.js",
      "NestJS",
      "Three.js",
    ],
  },
  {
    id: "embedded",
    icon: "cpu",
    title: { fr: "Systèmes embarqués & IoT", en: "Embedded Systems & IoT" },
    items: [
      "Raspberry Pi 5",
      "STM32",
      "MQTT",
      "LoRa",
      "Docker",
      "OpenCV",
      "InfluxDB",
      "Grafana",
      "UART",
      "MATLAB",
    ],
  },
  {
    id: "data",
    icon: "brain",
    title: { fr: "Data Science & IA", en: "Data Science & AI" },
    items: [
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Feature Engineering",
    ],
  },
  {
    id: "databases",
    icon: "database",
    title: { fr: "Bases de données", en: "Databases" },
    items: ["PostgreSQL", "Prisma ORM", "MySQL", "Oracle SQL", "DuckDB"],
  },
  {
    id: "tools",
    icon: "wrench",
    title: { fr: "Outils & Méthodologie", en: "Tools & Methodology" },
    items: ["Git", "GitLab", "Jira", "Agile (Scrum)", "VS Code"],
  },
];

/** Skills shown as pills next to the portrait. */
export const highlightedSkills = [
  "React",
  "TypeScript",
  "NestJS",
  "Python",
  "C++",
  "Raspberry Pi 5",
  "OpenCV",
  "Machine Learning",
] as const;

/** Technologies highlighted on the home page. */
export const featuredStack = [
  "React",
  "TypeScript",
  "Python",
  "C++",
  "Docker",
  "MQTT",
] as const;

export type Tool = { name: string; abbr: string };

/** Tools shown as cards. The number displayed is computed from the projects. */
export const tools: readonly Tool[] = [
  { name: "Python", abbr: "Py" },
  { name: "Scikit-learn", abbr: "Sk" },
  { name: "TypeScript", abbr: "TS" },
  { name: "React", abbr: "Re" },
  { name: "C++", abbr: "C+" },
];

/** Number of projects whose stack contains the given tool. */
export function countProjectsUsing(tool: string): number {
  return projects.filter((project) => project.stack.includes(tool)).length;
}