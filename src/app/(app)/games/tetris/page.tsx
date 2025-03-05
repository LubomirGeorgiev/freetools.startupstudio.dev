import { Metadata } from "next";
import { TetrisGame } from "@/components/games/tetris";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Tetris Game | Free Tools",
  description: "Play the classic Tetris game - arrange falling tetrominoes to create complete lines",
};

export default function TetrisPage() {
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
        <h1 className="text-4xl font-bold tracking-tight mb-2">Tetris Game</h1>
        <p className="text-muted-foreground text-lg">
          A classic block-stacking puzzle game where you arrange falling tetrominoes to create complete lines.
        </p>
      </div>

      <Card className="p-6 mb-8">
        <TetrisGame />
      </Card>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <p>
              Tetris is a classic puzzle game where you arrange falling blocks (tetrominoes) to create complete horizontal lines.
              When a line is completed, it disappears, and you earn points. The game ends when the blocks reach the top of the screen.
            </p>
            <div>
              <h3 className="text-xl font-medium mb-2">Controls:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use <strong>Left/Right Arrow Keys</strong> to move the tetromino horizontally</li>
                <li>Use <strong>Down Arrow Key</strong> to accelerate the tetromino&apos;s descent</li>
                <li>Use <strong>Up Arrow Key</strong> to rotate the tetromino</li>
                <li>Press <strong>Space</strong> for a hard drop (instantly places the tetromino at the bottom)</li>
                <li>Press <strong>P</strong> to pause or resume the game</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Rules:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Complete horizontal lines to clear them and score points</li>
                <li>Clearing multiple lines at once awards more points</li>
                <li>The game speeds up as you level up</li>
                <li>The game ends when the blocks stack up to the top of the playing field</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
