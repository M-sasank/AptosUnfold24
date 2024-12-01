'use client'

import { Button } from "@/components/ui/button"
import { Home, Share2, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface LeaderboardEntry {
  id: number
  name: string
  image: string
  timeTaken: number
  completionPercentage: number
}

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const entriesPerPage = 5
  
  // Mock data
  const leaderboardData: LeaderboardEntry[] = [
    { id: 1, name: "Flashlight", image: "/placeholder.svg", timeTaken: 645, completionPercentage: 54 },
    { id: 2, name: "Torch", image: "/placeholder.svg", timeTaken: 127, completionPercentage: 11 },
    { id: 3, name: "Light", image: "/placeholder.svg", timeTaken: 34, completionPercentage: 3 },
    { id: 4, name: "Star", image: "/placeholder.svg", timeTaken: 31, completionPercentage: 3 },
    { id: 5, name: "Pencil", image: "/placeholder.svg", timeTaken: 30, completionPercentage: 3 },
    { id: 6, name: "Bill Cipher", image: "/placeholder.svg", timeTaken: 26, completionPercentage: 2 },
  ]

  const totalPages = Math.ceil(leaderboardData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const currentEntries = leaderboardData.slice(startIndex, startIndex + entriesPerPage)

  return (
    <div className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px] p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-12 h-12 relative">
            <img 
              src="/placeholder.svg"
              alt="Game icon"
              fill
              className="object-cover border-2 border-black rounded-lg"
            />
          </div>
          <div>
            <h1 className="pixel-font text-xl font-bold">Flashlight</h1>
            <p className="pixel-font text-sm text-gray-700">By u/BobGoblin</p>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {currentEntries.map((entry) => (
            <div 
              key={entry.id}
              className="bg-white/90 backdrop-blur-sm border-2 border-black rounded-lg p-2 flex items-center gap-3"
            >
              <div className="w-10 h-10 relative flex-shrink-0">
                <img 
                  src={entry.image}
                  alt={entry.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h3 className="pixel-font font-bold">{entry.name}</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="pixel-font text-sm">{entry.timeTaken}s</span>
                </div>
                <div className="w-16 text-right">
                  <span className="pixel-font text-sm font-bold">{entry.completionPercentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-2 border-black"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="pixel-font">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-2 border-black"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Footer Stats */}
        <p className="text-center pixel-font text-sm text-gray-700">
          1.2k guesses by 775 players
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            variant="outline"
            className="w-32 pixel-font border-2 border-black flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            HOME
          </Button>
          <Button 
            className="w-32 pixel-font bg-black hover:bg-gray-800 flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            SHARE
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

