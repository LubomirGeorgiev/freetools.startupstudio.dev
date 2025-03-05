"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const carouselItems = [
  {
    id: 1,
    title: "Next Gen Video",
    subtitle: "with 360 Cam",
    cta: "Shop Now",
    image: "/placeholder.svg?height=200&width=100",
    bgColor: "bg-blue-50",
    ctaColor: "text-blue-400",
  },
  {
    id: 2,
    title: "Top Rated Gadgets",
    subtitle: "are on Sale",
    cta: "Shop Now",
    image: "/placeholder.svg?height=200&width=100",
    bgColor: "bg-amber-50",
    ctaColor: "text-amber-400",
  },
  {
    id: 3,
    title: "Catch Big Deals",
    subtitle: "on Earbuds",
    cta: "Shop Now",
    image: "/placeholder.svg?height=200&width=100",
    bgColor: "bg-green-50",
    ctaColor: "text-green-400",
  },
]

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((current) => (current === carouselItems.length - 1 ? 0 : current + 1))
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current === 0 ? carouselItems.length - 1 : current - 1))
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide]) // Added nextSlide to dependencies

  return (
    <div className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Headphones Feature Section - Now on the left */}
        <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-white">
            <div className="absolute right-0 top-0 w-[80%] h-[80%] rounded-full bg-red-100 opacity-50 translate-x-1/4 -translate-y-1/4"></div>

            <div className="relative z-10 h-full flex flex-col justify-center px-8">
              <p className="text-xl text-gray-600 mb-2">World of music with</p>
              <h2 className="text-5xl font-bold text-gray-800 mb-4">Headphones</h2>
              <p className="text-lg text-gray-600 mb-8">Choose between top brands</p>

              <Link
                href="#"
                className="inline-flex items-center justify-center bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-md w-max transition-colors"
              >
                Shop Now <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Carousel Section - Now on the right */}
        <div className="relative h-[500px] md:h-[600px]">
          {carouselItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ${index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <div className={`h-full w-full rounded-2xl p-8 flex flex-col justify-between ${item.bgColor}`}>
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-medium text-gray-700">{item.title}</h2>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{item.subtitle}</h3>
                    <Link href="#" className={`inline-flex items-center ${item.ctaColor} hover:underline`}>
                      {item.cta} <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  <div className="relative h-40 w-40">
                    <Image src="/image.jpg" alt={item.title} fill className="object-contain rounded-2xl" />
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
                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeIndex ? "bg-gray-800" : "bg-gray-300"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronRight className="h-5 w-5 transform rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

