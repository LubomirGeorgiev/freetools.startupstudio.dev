import "server-only";

export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export const games: Game[] = [
  {
    id: "tetris",
    name: "Tetris",
    slug: "tetris",
    description: "A classic block-stacking puzzle game where you arrange falling tetrominoes to create complete lines.",
    imageUrl: "/games/tetris.jpg",
    tags: ["puzzle", "classic", "arcade"],
  },
  {
    id: "snake",
    name: "Snake",
    slug: "snake",
    description: "Control a growing snake as you collect food and avoid collisions with walls and yourself.",
    imageUrl: "/games/retro-snake.png",
    tags: ["arcade", "classic", "strategy"],
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}
