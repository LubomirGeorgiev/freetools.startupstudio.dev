export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  count: number;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  industries: string[];
  icon: string;
}

export interface Game {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  icon: string;
}

export const industries: Industry[] = [
  {
    id: "1",
    slug: "/marketing",
    name: "Marketing",
    description: "Marketing",
    count: 1,
  },
  {
    id: "2",
    slug: "/legal",
    name: "Legal",
    description: "Legal",
    count: 1,
  },
  {
    id: "3",
    slug: "/e-commerce",
    name: "E-commerce",
    description: "E-commerce",
    count: 3,
  },
  {
    id: "4",
    slug: "/healthcare",
    name: "Healthcare",
    description: "Healthcare",
    count: 2,
  },
  {
    id: "5",
    slug: "/finance",
    name: "Finance",
    description: "Finance",
    count: 1,
  },
];

export const games: Game[] = [
  {
    id: "1",
    slug: "tetris",
    name: "Tetris",
    description: "A classic block-stacking puzzle game where you arrange falling tetrominoes to create complete lines.",
    tags: ["puzzle", "classic", "arcade"],
    icon: "fluent:tetris-app-20-regular",
  },
  {
    id: "2",
    slug: "snake",
    name: "Snake",
    description: "Control a growing snake as you collect food and avoid collisions with walls and yourself.",
    tags: ["arcade", "classic", "strategy"],
    icon: "game-icons:snake",
  },
];

export const tools: Tool[] = [
  {
    id: "1",
    slug: "audio-summarizer",
    name: "Audio Summarizer",
    industries: ["Legal"],
    description: "Upload your audio and get a summary of the content.",
    icon: "streamline:ai-settings-spark-solid",
  },
  {
    id: "2",
    slug: "post-generator",
    name: "Post Generator",
    industries: ["Marketing"],
    description: "Enter your idea and create, update or generate a post for your social media.",
    icon: "streamline:ai-generate-variation-spark-solid",
  },
  {
    id: "3",
    slug: "image-to-text",
    name: "Image to Text",
    industries: ["Graphic Design"],
    description: "Convert images to text with AI-powered tools to improve quality and resolution.",
    icon: "hugeicons:ai-brain-03",
  },
];
