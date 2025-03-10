import { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";
import HeroCarousel from "@/components/hero-carousel";
import ToolCard from "@/components/tool-card";
import GameCard from "@/components/game-card";
import { tools, games } from "@/app/data";
import GroupTitle from "@/components/group-title";
import PageEnd from "@/components/page-end";
import { DialogContent, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="lg" className="gap-2">
            <span className="text-lg"> <Icon icon="fluent-color:premium-28" /></span>
            Get Free Credits
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-yellow-500"><Icon icon="fluent-color:ribbon-star-32" className="text-6xl" /></span>
            You&apos;ve used all your free credits!
          </DialogTitle>
          <DialogDescription className="space-y-4 pt-2">
            <div className="text-base text-muted-foreground">
              Register today and get 5 additional credits each day, plus access to premium features!
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button className="gap-2" asChild>
                <Link href="/sign-up">
                  Create account
                  <span className="text-lg">→</span>
                </Link>
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <HeroCarousel />
      <GroupTitle title="Tools" url="tools" />
      <div className="container mx-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            slug={tool.slug}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
          />
        ))}
      </div>
      <GroupTitle title="Games" url="games" />
      <div className="container mx-auto py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
      <PageEnd />
    </div>
  );
}
