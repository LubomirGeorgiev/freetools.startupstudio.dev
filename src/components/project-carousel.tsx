'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Icon } from '@iconify/react';
import ToolCard from './tool-card';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  industries: string[];
  icon: string;
}

interface ToolCarouselProps {
  tools: Tool[];
}


export function ProjectCarousel({ tools }: ToolCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = Math.ceil(tools.length / (isMobile ? 1.5 : 3));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8">Explore More Projects</h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (isMobile ? 66.66 : 100)}%)` }}
          >
            {tools.map((tool, index) => (
              <div key={tool.slug} className={`w-full md:w-1/3 ${isMobile ? 'w-2/3' : ''} flex-shrink-0 px-2`}>

                <ToolCard slug={tool.slug} name={tool.name} description={tool.description} icon={tool.icon} />

              </div>
            ))}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2"
          onClick={prevSlide}
        >
          <Icon icon="lucide:chevron-left" className="h-4 w-4" />
          <span className="sr-only">Previous projects</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2"
          onClick={nextSlide}
        >
          <Icon icon="lucide:chevron-right" className="h-4 w-4" />
          <span className="sr-only">Next projects</span>
        </Button>
      </div>
    </div>
  );
}
