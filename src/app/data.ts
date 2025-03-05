
export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

export interface Game {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export const industries: Industry[] = [
  {
    id: "1",
    slug: "/marketing",
    name: "Marketing",
    description: "Marketing",
    icon: "solar:pie-chart-2-outline",
    count: 1,
  },
  {
    id: "2",
    slug: "/legal",
    name: "Legal",
    description: "Legal",
    icon: "solar:chart-outline",
    count: 1,
  },
  {
    id: "3",
    slug: "/e-commerce",
    name: "E-commerce",
    description: "E-commerce",
    icon: "solar:gift-linear",
    count: 3,
  },
  {
    id: "4",
    slug: "/healthcare",
    name: "Healthcare",
    description: "Healthcare",
    icon: "solar:bill-list-outline",
    count: 2,
  },
  {
    id: "5",
    slug: "/finance",
    name: "Finance",
    description: "Finance",
    icon: "solar:settings-outline",
    count: 1,
  },
];

export const games: Game[] = [
  {
    id: "1",
    slug: "tetris",
    name: "Tetris",
    description: "A classic block-stacking puzzle game where you arrange falling tetrominoes to create complete lines.",
    imageUrl: "/games/tetris.jpg",
    tags: ["puzzle", "classic", "arcade"],
  },
  {
    id: "2",
    slug: "snake",
    name: "Snake",
    description: "Control a growing snake as you collect food and avoid collisions with walls and yourself.",
    imageUrl: "/games/retro-snake.png",
    tags: ["arcade", "classic", "strategy"],
  },
];


export const tools: Tool[] = [
  {
    id: "1",
    slug: "audio-summerizer",
    name: "Audio Summerizer",
    description: "Upload your audio and get a summary of the content.",
    category: "Content Creation",
    imageUrl: "/image.jpg",
  },
  {
    id: "2",
    slug: "post-generator",
    name: "Post Generator",
    description: "Enter your idea and create, update or generate a post for your social media.",
    category: "Social Media",
    imageUrl: "/image.jpg",
  },
];


