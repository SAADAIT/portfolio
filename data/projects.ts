export {};
import type { Localized } from "./types";

export type ProjectCategory = "fullstack" | "iot" | "data" | "rd";

export type Project = {
  id: string;
  category: ProjectCategory;
  year: string;
  /** Shown first and larger in the projects grid. */
  featured: boolean;
  title: Localized<string>;
  description: Localized<string>;
  context: Localized<string>;
  role: Localized<string>;
  stack: string[];
  /** TODO: add measurable results (only shown when provided). */
  results?: Localized<string[]>;
  /** TODO: add a screenshot in /public/projects/ and set e.g. "/projects/x.png". */
  image?: string;
  /** TODO: add a public link (demo or repository) when one exists. */
  href?: string;
};

export const projects: readonly Project[] = [
  {
    id: "visionengine",
    category: "iot",
    year: "2026",
    featured: true,
    title: { fr: "VisionEngine App", en: "VisionEngine App" },
    description: {
      fr: "Solution IoT industrielle en edge computing sur Raspberry Pi 5 pour l'estimation de pesée d'animaux par vision 3D, avec une application fullstack de supervision et d'édition de ROI 3D interactives.",
      en: "Industrial edge-computing IoT solution on Raspberry Pi 5 that estimates animal weight through 3D vision, with a fullstack app to supervise and edit interactive 3D ROIs.",
    },
    context: {
      fr: "Stage de fin d'études chez Cooperl Innovation (Rennes), de mars à août 2026.",
      en: "Final-year internship at Cooperl Innovation (Rennes), March to August 2026.",
    },
    role: {
      fr: "Ingénieur développement logiciel : moteur de vision C++ (projection 3D-vers-2D, clustering OpenCV), application fullstack, monitoring IoT conteneurisé, architecture réseau hybride (MQTT, WebSockets) et conduite de projet Agile (Scrum).",
      en: "Software development engineer: C++ vision engine (3D-to-2D projection, OpenCV clustering), fullstack application, containerized IoT monitoring, hybrid network architecture (MQTT, WebSockets) and Agile (Scrum) project management.",
    },
    stack: [
      "React",
      "TypeScript",
      "React Three Fiber",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "C++",
      "OpenCV",
      "Raspberry Pi 5",
      "Docker",
      "InfluxDB",
      "Grafana",
      "MQTT",
      "WebSockets",
    ],
  },
  {
    id: "drone-rf",
    category: "rd",
    year: "2025",
    featured: true,
    title: {
      fr: "Localisation passive de drones",
      en: "Passive drone localization",
    },
    description: {
      fr: "Système de détection et de localisation de drones par analyse spectrale RF, fondé sur les mesures RSSI, ToA, TDoA et AoA.",
      en: "Drone detection and localization system based on RF spectrum analysis, using RSSI, ToA, TDoA and AoA measurements.",
    },
    context: {
      fr: "Stage ingénieur à la Military Technical Academy « Ferdinand I » (Bucarest, Roumanie), 2025.",
      en: "Engineering internship at the Military Technical Academy “Ferdinand I” (Bucharest, Romania), 2025.",
    },
    role: {
      fr: "Stagiaire ingénieur : développement du système de détection et de localisation par analyse spectrale RF.",
      en: "Engineering intern: development of the detection and localization system based on RF spectrum analysis.",
    },
    stack: ["PlutoSDR", "SDRangel", "MATLAB", "RSSI", "ToA", "TDoA", "AoA"],
  },
  {
    id: "ls2n",
    category: "data",
    year: "2025",
    featured: true,
    title: {
      fr: "Aide à la décision multicritère",
      en: "Multi-criteria decision support",
    },
    description: {
      fr: "Outil de sélection de projets durables avec un module de pondération automatique des critères par Machine Learning.",
      en: "Sustainable project selection tool with a Machine Learning module that weights criteria automatically.",
    },
    context: {
      fr: "Projet de R&D au laboratoire LS2N (Nantes), 2025.",
      en: "R&D project at the LS2N laboratory (Nantes), 2025.",
    },
    role: {
      fr: "Développement de l'outil de sélection et de son module de pondération automatique.",
      en: "Development of the selection tool and its automatic weighting module.",
    },
    stack: ["Python", "Scikit-learn"],
  },
  {
    id: "ptrans",
    category: "iot",
    year: "2024 – 2025",
    featured: false,
    title: {
      fr: "Système embarqué LoRa – Ptrans",
      en: "LoRa embedded system – Ptrans",
    },
    description: {
      fr: "Conception d'un système embarqué LoRa pour un boîtier radio mobile.",
      en: "Design of an embedded LoRa system for a mobile radio unit.",
    },
    context: {
      fr: "Projet Ptrans, Polytech Nantes et SIREHNA – Naval Group (2024 – 2025).",
      en: "Ptrans project, Polytech Nantes and SIREHNA – Naval Group (2024 – 2025).",
    },
    role: {
      fr: "Développeur embarqué : conception du système embarqué LoRa.",
      en: "Embedded developer: design of the embedded LoRa system.",
    },
    stack: ["STM32", "Raspberry Pi", "LoRa", "Python"],
  },
  {
    id: "scoring",
    category: "data",
    year: "2025",
    featured: false,
    title: { fr: "Scoring bancaire", en: "Bank scoring" },
    description: {
      fr: "Modèle de scoring bancaire avec feature engineering.",
      en: "Bank scoring model with feature engineering.",
    },
    context: {
      fr: "Projet académique, Polytech Nantes (2025).",
      en: "Academic project, Polytech Nantes (2025).",
    },
    role: {
      fr: "Analyse prédictive : modèle de scoring bancaire avec feature engineering.",
      en: "Predictive analytics: bank scoring model with feature engineering.",
    },
    stack: ["Python", "Pandas", "Scikit-learn"],
  },
  {
    id: "conway",
    category: "data",
    year: "2025",
    featured: false,
    title: { fr: "Jeu de la vie de Conway", en: "Conway's Game of Life" },
    description: {
      fr: "Prédiction par Machine Learning de la n-ième génération de matrices binaires issues du « Jeu de la vie » de Conway.",
      en: "Machine Learning prediction of the n-th generation of binary matrices from Conway's “Game of Life”.",
    },
    context: {
      fr: "Projet académique, Polytech Nantes (2025).",
      en: "Academic project, Polytech Nantes (2025).",
    },
    role: {
      fr: "Machine Learning : prédiction de la n-ième génération de matrices binaires.",
      en: "Machine Learning: predicting the n-th generation of binary matrices.",
    },
    stack: ["Python", "Machine Learning"],
  },
  {
    id: "hyblab",
    category: "fullstack",
    year: "2025",
    featured: false,
    title: { fr: "Hyblab – données publiques", en: "Hyblab – public data" },
    description: {
      fr: "Site interactif de visualisation de données publiques.",
      en: "Interactive website for visualizing public data.",
    },
    context: {
      fr: "Projet Hyblab, Polytech Nantes (2025).",
      en: "Hyblab project, Polytech Nantes (2025).",
    },
    role: {
      fr: "Développement d'un site interactif de visualisation de données publiques.",
      en: "Development of an interactive website for visualizing public data.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Node.js"],
  },
];

export const featuredProjects: readonly Project[] = projects.filter(
  (project) => project.featured,
);