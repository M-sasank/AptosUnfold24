'use client'

import { Button } from "@/components/ui/button"
import { Clock, Sparkles } from 'lucide-react'
// import img from 'next/img'

export default function ResultPage({ onNewPuzzle, onCancel }: { onNewPuzzle: () => void, onCancel: () => void }) {
  const completionTime = 35
  const completionPercentage = 85

  const handlePost = () => {
    // Create Twitter intent
    const tweetText = "Hi";
const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
console.log(twitterUrl);
    window.open(twitterUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px] p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* img Container with Stats */}
        <div className="relative">
          <div className="aspect-square border-4 border-black rounded-lg overflow-hidden bg-white">
            <img 
              src="/placeholder.svg?height=400&width=400"
              alt="Your drawing result"
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
          
          {/* Time Overlay */}
          <div className="absolute top-4 right-4 bg-black/75 rounded-full px-3 py-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-white pixel-font">{completionTime}s</span>
          </div>
          
          {/* Completion Percentage */}
          <div className="absolute top-4 left-4 bg-black/75 rounded-full px-3 py-1">
            <span className="text-white pixel-font">{completionPercentage}%</span>
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-6">
          <p className="pixel-font text-xl font-bold">
            Post your dream work<br />and earn points!
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              className="pixel-font border-2 border-black px-8"
              onClick={onCancel}
            >
              CANCEL
            </Button>
            <Button 
              className="pixel-font bg-black hover:bg-gray-800 px-8"
              onClick={handlePost}
            >
              POST
            </Button>
          </div>
          
          {/* New Puzzle Button */}
          <Button 
            className="w-full pixel-font bg-black hover:bg-gray-800 py-6 text-lg flex items-center gap-2"
            onClick={onNewPuzzle}
          >
            <Sparkles className="w-5 h-5" />
            DRAW NEW PUZZLE
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
