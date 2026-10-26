import type { Localized } from "./types";

export type Experience = {
  id: string;
  company: string;
  role: Localized<string>;
  period: Localized<string>;
  location: Localized<string>;
  missions: Localized<string[]>;
  tags: string[];
};

export const experiences: readonly Experience[] = [
  {
    id: "cooperl",
    company: "Cooperl Innovation",
    role: {
      fr: "Ingénieur Développement Logiciel – Stage de fin d'études",
      en: "Software Development Engineer – Final-year internship",
    },
    period: { fr: "Mars 2026 – Août 2026", en: "March 2026 – August 2026" },
    location: { fr: "Rennes, France", en: "Rennes, France" },
    missions: {
      fr: [
        "Conception et déploiement d'une solution IoT industrielle (Edge Computing) sur Raspberry Pi 5 pour l'estimation de pesée d'animaux par vision 3D.",
        "Développement fullstack de « VisionEngine App » pour la supervision et l'édition de ROI 3D interactives.",
        "Optimisation du moteur de vision C++ avec projection 3D-vers-2D et clustering OpenCV pour une détection ultra-rapide.",
        "Mise en place d'un monitoring IoT conteneurisé et d'une architecture réseau hybride (MQTT, WebSockets).",
        "Conduite de projet Agile (Scrum), Jira et gestion des versions avec GitLab.",
      ],
      en: [
        "Designed and deployed an industrial IoT solution (Edge Computing) on Raspberry Pi 5 to estimate animal weight using 3D vision.",
        "Built the fullstack “VisionEngine App” for supervising and editing interactive 3D ROIs.",
        "Optimized the C++ vision engine with 3D-to-2D projection and OpenCV clustering for ultra-fast detection.",
        "Set up containerized IoT monitoring and a hybrid network architecture (MQTT, WebSockets).",
        "Led the project using Agile (Scrum), Jira and GitLab version control.",
      ],
    },
    tags: [
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
      "Scrum",
      "Jira",
      "GitLab",
    ],
  },
  {
    id: "mta",
    company: "Military Technical Academy “Ferdinand I”",
    role: {
      fr: "Stagiaire ingénieur – Localisation passive de drones",
      en: "Engineering Intern – Passive Drone Localization",
    },
    period: { fr: "2025", en: "2025" },
    location: { fr: "Bucarest, Roumanie", en: "Bucharest, Romania" },
    missions: {
      fr: [
        "Développement d'un système de détection et localisation de drones par analyse spectrale RF : RSSI, ToA, TDoA et AoA.",
      ],
      en: [
        "Developed a drone detection and localization system based on RF spectrum analysis: RSSI, ToA, TDoA and AoA.",
      ],
    },
    tags: ["PlutoSDR", "SDRangel", "MATLAB", "RSSI", "ToA", "TDoA", "AoA"],
  },
  {
    id: "ls2n",
    company: "Laboratoire LS2N",
    role: {
      fr: "Projet de R&D – Aide à la décision multicritère",
      en: "R&D Project – Multi-criteria Decision Support",
    },
    period: { fr: "2025", en: "2025" },
    location: { fr: "Nantes, France", en: "Nantes, France" },
    missions: {
      fr: [
        "Développement d'un outil de sélection de projets durables avec module de pondération automatique via Machine Learning.",
      ],
      en: [
        "Developed a sustainable project selection tool with an automatic weighting module based on Machine Learning.",
      ],
    },
    tags: ["Python", "Scikit-learn"],
  },
  {
    id: "sirehna",
    company: "Polytech Nantes & SIREHNA – Naval Group",
    role: {
      fr: "Développeur embarqué – Projet Ptrans",
      en: "Embedded Developer – Ptrans Project",
    },
    period: { fr: "2024 – 2025", en: "2024 – 2025" },
    location: { fr: "Nantes, France", en: "Nantes, France" },
    missions: {
      fr: ["Conception d'un système embarqué LoRa pour un boîtier radio mobile."],
      en: ["Designed an embedded LoRa system for a mobile radio unit."],
    },
    tags: ["STM32", "Raspberry Pi", "LoRa", "Python"],
  },
  {
    id: "academic-data",
    company: "Polytech Nantes",
    role: {
      fr: "Data Analyst & Développeur – Projets académiques",
      en: "Data Analyst & Developer – Academic Projects",
    },
    period: { fr: "2025", en: "2025" },
    location: { fr: "Nantes, France", en: "Nantes, France" },
    missions: {
      fr: [
        "Analyse prédictive : modèle de scoring bancaire avec feature engineering.",
        "Machine Learning : prédiction de la n-ième génération de matrices binaires issues du « Jeu de la vie » de Conway.",
        "Projet Hyblab : site interactif de visualisation de données publiques.",
      ],
      en: [
        "Predictive analytics: bank scoring model with feature engineering.",
        "Machine Learning: predicting the n-th generation of binary matrices from Conway's “Game of Life”.",
        "Hyblab project: interactive website for visualizing public data.",
      ],
    },
    tags: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Machine Learning",
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
    ],
  },
  {
    id: "lamda-tech",
    company: "LAMDA TECH",
    role: { fr: "Développeur web", en: "Web Developer" },
    period: { fr: "2023", en: "2023" },
    location: { fr: "Nantes, France", en: "Nantes, France" },
    missions: {
      fr: [
        "Développement de modules web et amélioration d'interfaces utilisateur.",
      ],
      en: ["Developed web modules and improved user interfaces."],
    },
    tags: ["Drupal", "HTML", "CSS", "JavaScript", "SQL"],
  },
];