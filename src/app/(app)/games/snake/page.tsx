import { Metadata } from "next";
import { SnakeGame } from "@/components/games/snake";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Snake Game | Free Tools",
  description: "Play the classic Snake game - control a growing snake as you collect food and avoid collisions",
};

export default function SnakePage() {
  return (
    <div className="container py-10">
      <div className="mb-6">
        <Link
          href="/games"
          className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Snake Game</h1>
        <p className="text-muted-foreground text-lg">
          Control a growing snake as you collect food and avoid collisions with walls and yourself.
        </p>
      </div>

      <Card className="p-6 mb-8">
        <SnakeGame />
      </Card>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <p>
              Snake is a classic arcade game where you control a snake that grows longer as it eats food.
              The goal is to eat as much food as possible without colliding with the walls or your own body.
            </p>
            <div>
              <h3 className="text-xl font-medium mb-2">Controls:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the <strong>Arrow Keys</strong> to change the snake&apos;s direction</li>
                <li>Press <strong>P</strong> to pause or resume the game</li>
                <li>Mobile users can use the on-screen direction buttons</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Rules:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>The snake moves continuously in the current direction</li>
                <li>Eating food (red squares) increases your score and makes the snake longer</li>
                <li>The game ends if the snake hits a wall or itself</li>
                <li>The snake speeds up as your score increases</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
