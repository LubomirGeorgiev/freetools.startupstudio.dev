"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { tools } from "@/app/data"
import { Icon } from "@iconify/react"

// Get the last 3 tools from the tools array
const lastThreeTools = tools.slice(-3);

// Map the tools to carousel items format
const carouselItems = lastThreeTools.map((tool, index) => ({
  id: tool.id,
  title: tool.name,
  subtitle: tool.industries[0],
  cta: "Try Now",
  icon: tool.icon,
  bgColor: [
    "bg-blue-100 dark:bg-blue-950",
    "bg-amber-100 dark:bg-amber-950",
    "bg-green-100 dark:bg-green-950",
  ][index],
  ctaColor: [
    "text-blue-600 dark:text-blue-400",
    "text-amber-600 dark:text-amber-400",
    "text-green-600 dark:text-green-400",
  ][index],
  description: tool.description,
  slug: tool.slug,
}));

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current === carouselItems.length - 1 ? 0 : current + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? carouselItems.length - 1 : current - 1))
  }, [])

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Section */}
        <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="absolute right-0 top-0 w-[80%] h-[80%] rounded-full bg-blue-200 dark:bg-blue-900 opacity-50 translate-x-1/4 -translate-y-1/4"></div>

            <div className="relative z-10 h-full flex flex-col justify-center px-8">
              <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Free AI Tools to Boost Your Productivity</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Access 100+ free AI-powered tools to automate workflows, optimize processes, and transform operations.</p>

              <Link
                href="/tools"
                className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-md w-max transition-colors"
              >
                Explore Tools <Icon icon="lucide:arrow-right" className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative h-[500px] md:h-[600px]">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ${index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <div className={`h-full w-full rounded-2xl p-8 flex flex-col justify-between ${item.bgColor}`}>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 max-w-md">
                    <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-200">{item.title}</h2>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{item.subtitle}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                    <Link href={`/tools/${item.slug}`} className={`inline-flex items-center ${item.ctaColor} hover:underline`}>
                      {item.cta} <Icon icon="lucide:arrow-right" className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  <div className="relative h-40 w-40">
                    <Icon icon={item.icon} className="text-7xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeIndex ? "bg-gray-800 dark:bg-gray-200" : "bg-gray-300 dark:bg-gray-600"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-800"
            aria-label="Previous slide"
          >
            <Icon icon="lucide:arrow-left" className="h-5 w-5 transform rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-800"
            aria-label="Next slide"
          >
            <Icon icon="lucide:arrow-right" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
