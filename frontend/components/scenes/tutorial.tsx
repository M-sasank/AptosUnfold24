'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
// import img from 'next/img'

interface TutorialSlide {
  id: number
  title: string
  description: string
  img: string
}

const tutorialData: TutorialSlide[] = [
  {
    id: 1,
    title: "Welcome to Pixelary!",
    description: "Learn how to play and become a pixel art master!",
    img: "/placeholder.svg?height=300&width=300"
  },
  {
    id: 2,
    title: "Draw Your Masterpiece",
    description: "Use the tools provided to create your pixel art within the time limit.",
    img: "/placeholder.svg?height=300&width=300"
  },
  {
    id: 3,
    title: "Guess Other's Art",
    description: "Try to guess what others have drawn to earn points and climb the leaderboard!",
    img: "/placeholder.svg?height=300&width=300"
  },
  {
    id: 4,
    title: "Have Fun!",
    description: "Remember, the goal is to have fun and improve your pixel art skills!",
    img: "/placeholder.svg?height=300&width=300"
  }
]

export default function Tutorial() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % tutorialData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + tutorialData.length) % tutorialData.length)
  }

  return (
    <div className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px] p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Tutorial Card */}
        <div className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-lg overflow-hidden">
          {/* img Section */}
          <div className="aspect-square relative border-b-4 border-black">
            <img 
              src={tutorialData[currentSlide].img}
              alt={tutorialData[currentSlide].title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Content Section */}
          <div className="p-4 space-y-3">
            <h2 className="pixel-font text-2xl font-bold text-center">
              {tutorialData[currentSlide].title}
            </h2>
            <p className="pixel-font text-center">
              {tutorialData[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center px-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="border-2 border-black"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="pixel-font">
            {currentSlide + 1} / {tutorialData.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="border-2 border-black"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Home Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline"
            className="w-32 pixel-font border-2 border-black flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            HOME
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .pixel-font {
          font-family: monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}

