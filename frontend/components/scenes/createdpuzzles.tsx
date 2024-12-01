// @ts-ignore
// @ts-nocheck

'use client'

import { Button } from "@/components/ui/button"
import { Home, Plus } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  img: string
  plays: number
  fastestTime: string
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Pixel Cat",
    description: "A cute cat drawn in pixel art style",
    img: "/placeholder.svg?height=200&width=200",
    plays: 245,
    fastestTime: "0:42"
  },
  {
    id: 2,
    title: "Space Invader", 
    description: "Classic alien from the arcade game",
    img: "/placeholder.svg?height=200&width=200",
    plays: 189,
    fastestTime: "0:55"
  },
  {
    id: 3,
    title: "Retro Console",
    description: "Old-school gaming device",
    img: "/placeholder.svg?height=200&width=200",
    plays: 167,
    fastestTime: "1:02"
  },
  {
    id: 4,
    title: "Pixel Landscape",
    description: "Beautiful scenery in pixels",
    img: "/placeholder.svg?height=200&width=200",
    plays: 203,
    fastestTime: "0:48"
  },
  {
    id: 5,
    title: "8-bit Hero",
    description: "Adventurer from a classic RPG",
    img: "/placeholder.svg?height=200&width=200",
    plays: 156,
    fastestTime: "1:15"
  },
  {
    id: 6,
    title: "Pixel Food",
    description: "Delicious pixel art cuisine",
    img: "/placeholder.svg?height=200&width=200",
    plays: 178,
    fastestTime: "0:58"
  }
]

export default function CreatedPuzzles() {
  return (
    <div className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px] p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center pixel-font mb-6">My Projects</h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="bg-white/90 backdrop-blur-sm border-2 md:border-4 border-black rounded-lg overflow-hidden relative"
            >
              <div className="aspect-square relative">
                <img 
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 md:p-3 bg-black/70">
                <h2 className="pixel-font text-sm md:text-lg font-bold text-white truncate">{project.title}</h2>
                <p className="pixel-font text-xs md:text-sm text-white/80 mb-1 md:mb-2 line-clamp-1">{project.description}</p>
                <div className="flex justify-between text-white/90 pixel-font text-xs md:text-sm">
                  <span>👥 {project.plays}</span>
                  <span>⚡ {project.fastestTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 md:gap-4 mt-6 md:mt-8">
          <Button 
            variant="outline"
            className="w-24 md:w-32 pixel-font border-2 border-black flex items-center gap-1 md:gap-2 text-xs md:text-base"
          >
            <Home className="w-3 h-3 md:w-4 md:h-4" />
            HOME
          </Button>
          <Button 
            className="w-24 md:w-32 pixel-font bg-black hover:bg-gray-800 flex items-center gap-1 md:gap-2 text-xs md:text-base"
          >
            <Plus className="w-3 h-3 md:w-4 md:h-4" />
            NEW
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
