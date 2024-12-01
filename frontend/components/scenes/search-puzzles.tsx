// @ts-ignore
// @ts-nocheck
'use client'

import { Button } from "@/components/ui/button"
// import { input } from "@/components/ui/input"
import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'
// import img from 'next/img'

interface Puzzle {
  id: number
  title: string
  description: string
  img: string
}

interface SearchPuzzlesProps {
  onBack: () => void
  onSelectGame: (puzzleId: number) => void
}

const trendingPuzzles: Puzzle[] = [
  {
    id: 1,
    title: "Space Adventure", 
    description: "Most played puzzle this week",
    img: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 2,
    title: "Pixel Dragon",
    description: "Trending among artists",
    img: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 3,
    title: "Retro City",
    description: "Featured puzzle of the day",
    img: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 4,
    title: "Pixel Forest",
    description: "Community favorite",
    img: "/placeholder.svg?height=200&width=200"
  }
]

const newPuzzles: Puzzle[] = [
  {
    id: 5,
    title: "Pixel Robot",
    description: "Just added today",
    img: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 6,
    title: "8-bit Castle",
    description: "New challenge",
    img: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 7,
    title: "Pixel Beach",
    description: "Fresh puzzle",
    img: "/placeholder.svg?height=200&width=200"
  },
  {
    id: 8,
    title: "Retro Car",
    description: "New addition",
    img: "/placeholder.svg?height=200&width=200"
  }
]

export default function SearchPuzzles({ onBack, onSelectGame }: SearchPuzzlesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesPerView = 3
  const maxSlide = Math.ceil(trendingPuzzles.length / slidesPerView) - 1

  const nextSlide = () => {
    setCurrentSlide(current => current === maxSlide ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrentSlide(current => current === 0 ? maxSlide : current - 1)
  }

  const visiblePuzzles = trendingPuzzles.slice(
    currentSlide * slidesPerView,
    (currentSlide * slidesPerView) + slidesPerView
  )

  return (
    <div className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px] p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost" 
          className="absolute top-4 left-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>

        {/* Search Bar */}
        <div className="relative">
          <input 
            type="search"
            placeholder="Search puzzles..."
            className="w-full pl-10 pr-4 h-12 pixel-font border-2 border-black rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>

        {/* Trending Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold pixel-font">Trending</h2>
          <div className="relative">
            <div className="flex gap-4 transition-transform duration-300" style={{transform: `translateX(-${currentSlide * 100}%)`}}>
              {visiblePuzzles.map((puzzle) => (
                <div key={puzzle.id} className="w-1/3 flex-shrink-0" onClick={() => onSelectGame(puzzle.id)}>
                  <div className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-lg overflow-hidden relative aspect-square cursor-pointer hover:opacity-80 transition-opacity">
                    <img 
                      src={puzzle.img}
                      alt={puzzle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                      {/* <h3 className="pixel-font text-lg font-bold text-white">{puzzle.title}</h3> */}
                      {/* <p className="pixel-font text-sm text-white/80">{puzzle.description}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 border-2 border-black rounded-full p-2"
              variant="outline"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 border-2 border-black rounded-full p-2"
              variant="outline"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* New Puzzles Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold pixel-font">New</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {newPuzzles.map((puzzle) => (
              <div 
                key={puzzle.id}
                onClick={() => onSelectGame(puzzle.id)}
                className="bg-white/90 backdrop-blur-sm border-4 border-black rounded-lg overflow-hidden relative aspect-square cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img 
                  src={puzzle.img}
                  alt={puzzle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                  {/* <p className="pixel-font text-lg font-bold text-white">{puzzle.title}</p> */}
                  <p className="pixel-font text-sm text-white/80">{puzzle.title}</p>
                </div>
              </div>
            ))}
          </div>
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
