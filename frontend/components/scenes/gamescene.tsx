// @ts-ignore
// @ts-nocheck

'use client'

import { useState, useEffect } from 'react'
import { Clock, User, Square, Circle, Triangle, Pencil, ChevronLeft } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
// import img from 'next/image'

export default function GameScreen({ onComplete, onBack }: { onComplete: () => void, onBack: () => void }) {
  const [timeLeft, setTimeLeft] = useState(75)
  const tools = [Pencil, Square, Circle, Triangle]
  
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px]">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-black/10 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-black/5"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="pixel-font font-bold">{timeLeft}s left</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="pixel-font font-bold">Player123</span>
          <User className="w-5 h-5" />
        </div>
      </div>
  {/* Post Section */}
  <div className="p-4 text-center space-y-4">
        {/* <h1 className="text-2xl pixel-font font-bold">That&apos;s a wrap!</h1>
        <p className="pixel-font">
          Post your drawing and earn points for every correct guess!
        </p> */}
        <div className="flex gap-4 justify-center">
          <Button 
            className="pixel-font bg-black hover:bg-gray-800 px-8"
            onClick={onComplete}
          >
            SUBMIT
          </Button>
        </div>
      </div>
      {/* Comparison Section */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center gap-4">
          <div className="w-1/2 aspect-square relative border-4 border-black rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg?height=200&width=200"
              alt="Target drawing"
              fill
              className="object-cover bg-white"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
              <span className="text-sm pixel-font text-white" style={{ fontFamily: "Pixelify Sans" }}>Target</span>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute w-full h-full rounded-full border-4 border-black bg-white"></div>
            <span className="relative z-10 text-xl pixel-font font-bold">33%</span>
          </div>

          <div className="w-1/2 aspect-square relative border-4 border-black rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg?height=200&width=200"
              alt="Your drawing"
              fill
              className="object-cover bg-white"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
              <span className="text-sm pixel-font text-white">Your drawing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drawing Area */}
      <div className="p-4">
        <div className="w-full aspect-square relative border-4 border-black rounded-lg overflow-hidden">
          <img 
            src="/placeholder.svg?height=400&width=400"
            alt="Drawing canvas"
            fill
            className="object-cover bg-white"
          />
        </div>
      </div>

    

      {/* Tool Selection */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t-4 border-black backdrop-blur-sm">
        <div className="p-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max px-4">
            {tools.map((Tool, i) => (
              <button
                key={i}
                className="w-12 h-12 bg-white border-4 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Tool className="w-6 h-6" />
              </button>
            ))}
            {[...Array(6)].map((_, i) => (
              <button
                key={`color-${i}`}
                className="w-12 h-12 bg-white border-4 border-black rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              />
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
