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
  industries: string[];
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
    slug: "audio-summarizer",
    name: "Audio Summarizer",
    industries: ["Legal"],
    description: "Upload your audio and get a summary of the content.",
    imageUrl: "/image.jpg",
  },
  {
    id: "2",
    slug: "post-generator",
    name: "Post Generator",
    industries: ["Marketing"],
    description: "Enter your idea and create, update or generate a post for your social media.",
    imageUrl: "/image.jpg",
  },
  {
    id: "3",
    slug: "image-to-text",
    name: "Image to Text",
    industries: ["Graphic Design"],
    description: "Convert images to text with AI-powered tools to improve quality and resolution.",
    imageUrl: "/image.jpg",
  },
];


