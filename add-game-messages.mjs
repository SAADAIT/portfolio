import { readFileSync, writeFileSync } from "node:fs";

const content = {
    fr: {
        navGames: "Jeux",
        section: {
            badge: "Jeux",
            title: "Joue à mes <accent>jeux</accent>",
            description: "Des petits jeux que je programme moi-même, jouables directement dans ton navigateur.",
            play: "Jouer",
        },
        game: {
            back: "Retour au portfolio",
            hint: "Clique dans le jeu pour jouer au clavier.",
            builtWith: "Développé en {tech}.",
            openNewTab: "Ouvrir dans un nouvel onglet",
            notConfigured: "Le jeu n'est pas encore relié : ajoute l'adresse du jeu dans la variable NEXT_PUBLIC_GAME_TYPING_URL, puis relance le site.",
        },
    },
    en: {
        navGames: "Games",
        section: {
            badge: "Games",
            title: "Play my <accent>games</accent>",
            description: "Small games I program myself, playable right in your browser.",
            play: "Play",
        },
        game: {
            back: "Back to portfolio",
            hint: "Click inside the game to play with your keyboard.",
            builtWith: "Built with {tech}.",
            openNewTab: "Open in a new tab",
            notConfigured: "The game is not connected yet: set its address in the NEXT_PUBLIC_GAME_TYPING_URL variable, then restart the site.",
        },
    },
};

for (const locale of["fr", "en"]) {
    const path = `messages/${locale}.json`;
    const messages = JSON.parse(readFileSync(path, "utf8"));

    messages.Nav = {...messages.Nav, games: content[locale].navGames };
    messages.GamesSection = content[locale].section;
    messages.Games = content[locale].game;

    writeFileSync(path, JSON.stringify(messages, null, 2) + "\n", "utf8");
    console.log(`${path}: OK -> ${Object.keys(messages).join(", ")}`);
}