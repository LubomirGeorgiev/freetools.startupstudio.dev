import "server-only";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getGameBySlug } from "../data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, GamepadIcon } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const game = getGameBySlug(params.slug);

  if (!game) {
    return {
      title: "Game Not Found | Free Tools",
    };
  }

  return {
    title: `${game.name} | Free Tools`,
    description: game.description,
  };
}

export default function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const game = getGameBySlug(params.slug);

  if (!game) {
    notFound();
  }

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
        <h1 className="text-4xl font-bold tracking-tight mb-2">{game.name}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {game.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-lg">{game.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image
              src={game.imageUrl}
              alt={game.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <GamepadIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Ready to Play?</h2>
                <Button size="lg" className="px-8">
                  Start Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              {game.slug === "tetris" ? (
                <>
                  Use the arrow keys to move and rotate the falling blocks. Complete horizontal lines to clear them and score points.
                  The game speeds up as you progress, and ends when the blocks reach the top of the screen.
                </>
              ) : game.slug === "snake" ? (
                <>
                  Use the arrow keys to control the direction of the snake. Eat the food to grow longer, but avoid hitting the walls
                  or your own tail. The game gets more challenging as your snake grows longer.
                </>
              ) : (
                <>
                  Instructions for this game will be available soon. Check back later for detailed gameplay instructions.
                </>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Game Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-muted-foreground mb-1">Difficulty</p>
              <p className="text-2xl font-bold">
                {game.slug === "tetris" ? "Medium" : game.slug === "snake" ? "Easy" : "Varies"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-muted-foreground mb-1">Play Time</p>
              <p className="text-2xl font-bold">
                {game.slug === "tetris" ? "5-15 min" : game.slug === "snake" ? "2-10 min" : "Varies"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <p className="text-muted-foreground mb-1">Players</p>
              <p className="text-2xl font-bold">1</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
