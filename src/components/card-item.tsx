"use client";

import { Card, CardHeader, CardFooter, Image } from "@heroui/react";


interface CardProps {
  title: string;
  description: string;
  category: string;
  image: string;
}

export const CardItem = ({ title, description, category, image }: CardProps) => {
  return (
    <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
      <CardHeader className="absolute z-10 top-1 flex-col items-start gap-2">
        <p className="text-tiny text-black/60 uppercase font-bold bg-white/70 px-2 py-1 rounded-full">{category}</p>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src={image}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-white/20">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <h2>{title}</h2>
            <p className="text-sm text-white/60 line-clamp-1">{description}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
