"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import ToolCard from "./tool-card";

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

export default function ToolCarousel({ tools }: ToolCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isScrollingVertically, setIsScrollingVertically] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 4; // Default for SSR
    if (window.innerWidth >= 1536) return 6; // 2xl
    if (window.innerWidth >= 1280) return 5; // xl
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 3; // md
    if (window.innerWidth >= 640) return 2; // sm
    return 1.5; // xs - showing 1.5 cards
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());

      // Ensure currentIndex is still valid after resize
      const maxIndex = Math.max(0, tools.length - getVisibleCards());
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    };

    handleResize(); // Initialize on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tools.length, currentIndex]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isAnimating) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setStartX(clientX);
    setStartY(clientY);
    setIsDragging(true);
    setIsScrollingVertically(false);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || isAnimating) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    // Determine scroll direction after small threshold
    if (!isScrollingVertically && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      setIsScrollingVertically(true);
      setIsDragging(false);
      return;
    }

    if (!isScrollingVertically) {
      e.preventDefault();

      // Limit drag when at the edges
      if ((currentIndex === 0 && deltaX > 0) ||
        (currentIndex >= tools.length - visibleCards && deltaX < 0)) {
        setDragX(deltaX * 0.3); // Resistance effect
      } else {
        setDragX(deltaX);
      }
    }
  };

  const handleDragEnd = () => {
    if (!isDragging || isAnimating) return;

    const threshold = window.innerWidth * 0.1;
    if (Math.abs(dragX) > threshold) {
      if (dragX > 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      } else if (dragX < 0 && currentIndex < tools.length - visibleCards) {
        goToSlide(currentIndex + 1);
      }
    } else {
      // Snap back to current position
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }

    setIsDragging(false);
    setDragX(0);
  };

  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const nextSlide = () => {
    if (currentIndex < tools.length - visibleCards && !isAnimating) {
      goToSlide(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0 && !isAnimating) {
      goToSlide(currentIndex - 1);
    }
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(tools.length / Math.floor(visibleCards));
  const currentPage = Math.ceil((currentIndex + 1) / Math.floor(visibleCards));

  return (
    <div className="relative max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
      <div
        ref={containerRef}
        className="overflow-hidden touch-pan-y"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="flex gap-4 will-change-transform"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / visibleCards)}% + ${dragX}px))`,
            width: `${(tools.length * 100) / visibleCards}%`,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {tools.map((tool) => (
            <div
              key={tool.slug}
              className="w-[66.666%] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 flex-shrink-0 px-2"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            >
              <ToolCard {...tool} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination indicators */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-1.5">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${index + 1 === currentPage
                ? 'w-6 bg-blue-500'
                : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
              onClick={() => goToSlide(index * Math.floor(visibleCards))}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}

      {currentIndex > 0 && (
        <Button
          isIconOnly
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-90 hover:opacity-100 shadow-md"
          onPress={prevSlide}
          variant="light"
          disabled={isAnimating}
        >
          <Icon icon="lucide:chevron-left" width={24} />
        </Button>
      )}

      {currentIndex < tools.length - visibleCards && (
        <Button
          isIconOnly
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-90 hover:opacity-100 shadow-md"
          onPress={nextSlide}
          variant="light"
          disabled={isAnimating}
        >
          <Icon icon="lucide:chevron-right" width={24} />
        </Button>
      )}
    </div>
  );
}