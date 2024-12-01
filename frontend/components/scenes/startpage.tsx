// @ts-ignore
// @ts-nocheck

'use client'

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Pencil } from 'lucide-react'

export default function PixelaryMenu({ onStart }: { onStart: () => void }) {
  // Click handlers
  const handleDraw = () => {
    onStart()
  }

  const handleMyDrawings = () => {
    console.log("My Drawings button clicked")
  }

  const handleLeaderboard = () => {
    console.log("Leaderboard button clicked")
  }

  const handleHowToPlay = () => {
    console.log("How To Play button clicked")
  }

  return (
    <div className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px]">
      <div className="container max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto">
            <Pencil className="w-full h-full transform rotate-45 text-yellow-400 [filter:drop-shadow(2px_2px_0_#000)]" />
          </div>
          <h1 className="text-4xl font-bold pixel-font">DreamScribe</h1>
          <p className="text-xl pixel-font">arrange to build shadows that tell stories </p>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleDraw}
            className="w-full bg-black hover:bg-gray-800 pixel-font text-xl py-6"
          >
            Solve Puzzles
          </Button>
          
          <Button 
            onClick={handleMyDrawings}
            variant="outline"
            className="w-full border-2 border-black hover:bg-gray-100 pixel-font text-xl py-6"
          >
            My puzzles
          </Button>
          
          <Button 
            onClick={handleLeaderboard}
            variant="outline"
            className="w-full border-2 border-black hover:bg-gray-100 pixel-font text-xl py-6"
          >
            LEADERBOARD
          </Button>
          
          <Button 
            onClick={handleHowToPlay}
            variant="outline"
            className="w-full border-2 border-black hover:bg-gray-100 pixel-font text-xl py-6"
          >
            HOW TO PLAY
          </Button>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <p className="text-xl pixel-font">Karma score →</p>
          <Progress value={33} className="h-2 border border-black" />
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('/path-to-pixel-font.woff2') format('woff2');
        }
        
        .pixel-font {
          font-family: 'PixelFont', monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}
