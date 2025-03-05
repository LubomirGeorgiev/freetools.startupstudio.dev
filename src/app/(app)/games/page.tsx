import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { games } from "./data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Games | Free Tools",
  description: "Play fun browser-based games built with React and TypeScript",
};

export default function GamesPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Browser Games</h1>
        <p className="text-muted-foreground text-lg">
          Fun browser-based games built with React, TypeScript, and modern UI libraries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 place-items-center">
        {games.map((game) => (
          <Card key={game.id} className="overflow-hidden flex flex-col h-full w-full max-w-[260px]">
            <div className="relative w-full h-48">
              <Image
                src={game.imageUrl}
                alt={game.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/games/${game.slug}`}>Play Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
