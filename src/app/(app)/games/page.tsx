import "server-only";
import { Metadata } from "next";
import { games } from "@/app/data";
import GameCard from "@/components/game-card";
import { Icon } from "@iconify/react/dist/iconify.js";

export const metadata: Metadata = {
  title: "Browser Games - Free Tools for Startups",
  description: "Play fun browser-based games built with React and TypeScript.",
};

export default function GamesPage() {
  return (
    <div className="container mx-auto py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Browser Games</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Take a break and enjoy our collection of fun browser-based games built with
          React, TypeScript, and modern UI libraries.
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            slug={game.slug}
            name={game.name}
            description={game.description}
            icon={game.icon}
          />
        ))}
      </div>

      {/* Empty State */}
      {games.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Icon icon="lucide:gamepad-2" className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No games available yet</h2>
          <p className="text-muted-foreground">
            We&apos;re working on adding new games. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
