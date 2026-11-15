import type { Localized } from "./types";

export type Game = {
  /** URL slug: /games/<id> */
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  tech: string;
  /** Address of the deployed game (a separate project). Empty when not configured. */
  url: string;
};

export const games: readonly Game[] = [
  {
    id: "typing",
    title: { fr: "Défi de frappe", en: "Typing challenge" },
    description: {
      fr: "Recopie le texte le plus vite possible, sans faute. Vitesse en mots par minute, précision et record personnel.",
      en: "Retype the text as fast as you can, without mistakes. Speed in words per minute, accuracy and personal best.",
    },
    tech: "Java · TeaVM",
    // Set NEXT_PUBLIC_GAME_TYPING_URL in .env.local and in the Vercel settings
    url: process.env.NEXT_PUBLIC_GAME_TYPING_URL || "",
  },
];

export function getGame(id: string): Game | undefined {
  return games.find((game) => game.id === id);
}