import { Card, CardHeader, CardFooter, Divider, Link } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface GameCardProps {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export default function GameCard({ slug, name, description, icon }: GameCardProps) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex items-center justify-center bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-100 rounded-md p-2">
          <Icon icon={icon} className="text-3xl" />
        </div>
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500 line-clamp-2">{description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter>
        <Link className="text-purple-500 hover:text-purple-600" href={`/games/${slug}`}>
          Play game <Icon icon="lucide:arrow-right" className="h-5 w-5 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
