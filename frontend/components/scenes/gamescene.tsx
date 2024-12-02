// @ts-ignore
// @ts-nocheck

'use client'

import { useState, useEffect } from 'react'
import React, { useRef } from 'react';
import { Clock, User, Square, Circle, Triangle, Pencil, ChevronLeft, Download } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import * as THREE from "three"
import { DragControls } from "three/examples/jsm/controls/DragControls.js";
import html2canvas from 'html2canvas';
export default function GameScreen({ onComplete, onBack, id }: { onComplete: () => void, onBack: () => void, id: number }) {
  const [timeLeft, setTimeLeft] = useState(75)
  const tools = [Pencil, Square, Circle, Triangle]
  const [cubeRef, setCubeRef] = useState(null)
  const [dragged, setDragged] = useState(false);
  const captureRef = useRef();
  const [photoUrl, setPhotoUrl] = useState(null); // Store the photo URL
// Function to take a screenshot using THREE.PerspectiveCamera
const takePhoto = () => {
    // Ensure that THREE.js scene and camera are set up properly
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#87d6fc");
    // const secondaryCamera = new THREE.OrthographicCamera(-3, 3, 2, -2, 1, 1000)
    // secondaryCamera.position.set(0, 0, 0)
    // secondaryCamera.lookAt(4, 2, 0)
    const camera = new THREE.OrthographicCamera(-3, 3, 2, -2, 1, 1000)
    camera.position.set(0, 0, 0)
    camera.lookAt(4, 2, 0)

    // Main renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add renderer to drawing area
    const drawingArea = document.getElementById('drawing-area');
    if (drawingArea) {
      drawingArea.appendChild(renderer.domElement);
    }

    // Rendering the scene from the perspective camera
    renderer.render(scene, camera);

    // Capture the rendered scene as an image
    const imageUrl = renderer.domElement.toDataURL();
    setPhotoUrl(imageUrl);

    // Optionally trigger a download link for the captured image
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'photo.png';
    link.click();
  };
  let viewArea =null
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])
//   const captureRef = useRef();

  // Function to take a screenshot
  const captureScreenshot = () => {
    html2canvas(captureRef.current).then((canvas) => {
      // Convert canvas to image URL
      const imageUrl = canvas.toDataURL();
      // Create an <a> tag to allow the user to download the image
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'screenshot.png'; // File name
      link.click(); // Trigger download
    });
  };
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color("#87d6fc")
    
    // Main camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 10, 5)
    camera.lookAt(0, 0, 0)

    // Secondary camera for 2D view
    const secondaryCamera = new THREE.OrthographicCamera(-3, 3, 2, -2, 1, 1000)
    secondaryCamera.position.set(0, 0, 0)
    secondaryCamera.lookAt(4, 2, 0)
    
    // Main renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth * 0.9, window.innerWidth * 0.9)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    
    // Add renderer to drawing area div
    const drawingArea = document.getElementById('drawing-area')
    if (drawingArea) {
      drawingArea.appendChild(renderer.domElement)
    }

    // Secondary renderer for 2D view
    const secondaryRenderer = new THREE.WebGLRenderer({ antialias: true })
    secondaryRenderer.setSize(150, 150)
    secondaryRenderer.domElement.className = "secondary-renderer-canvas"
    secondaryRenderer.shadowMap.enabled = true
    secondaryRenderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    // Add secondary renderer to 2D view div
    viewArea = document.getElementById('secondary-view')
    if (viewArea) {
      viewArea.appendChild(secondaryRenderer.domElement)
    }

    // Helper function to get random position
    const getRandomPosition = () => {
      return {
        x: Math.random() * 4 - 4, // Random between -4 and 4
        y: 0.5, // Slightly above floor
        z: Math.random() * 8 - 4 // Random between -4 and 4
      }
    }

    // Cube
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xff8f6c,
      roughness: 0.5,
      metalness: 0.1
    })
    const cube = new THREE.Mesh(geometry, material)
    const cubePos = getRandomPosition()
    cube.position.set(cubePos.x, cubePos.y, cubePos.z)
    cube.castShadow = true
    scene.add(cube)
    setCubeRef(cube)

    // Additional Cuboid
    const cuboidGeometry = new THREE.BoxGeometry(2, 1, 1)
    const cuboidMaterial = new THREE.MeshStandardMaterial({
      color: 0x6c9fff,
      roughness: 0.5,
      metalness: 0.1
    })
    const cuboid = new THREE.Mesh(cuboidGeometry, cuboidMaterial)
    const cuboidPos = getRandomPosition()
    cuboid.position.set(cuboidPos.x, cuboidPos.y, cuboidPos.z)
    cuboid.castShadow = true
    scene.add(cuboid)

    // Additional Circle (Cylinder with minimal height)
    const circleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32)
    const circleMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6c9f,
      roughness: 0.5,
      metalness: 0.1
    })
    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    const circlePos = getRandomPosition()
    circle.position.set(circlePos.x, circlePos.y, circlePos.z)
    circle.castShadow = true
    scene.add(circle)

    // Cone
    const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32)
    const coneMaterial = new THREE.MeshStandardMaterial({
      color: 0x9fff6c,
      roughness: 0.5,
      metalness: 0.1
    })
    const cone = new THREE.Mesh(coneGeometry, coneMaterial)
    const conePos = getRandomPosition()
    cone.position.set(conePos.x, conePos.y + 0.5, conePos.z) // Adjusted Y to account for cone height
    cone.castShadow = true
    scene.add(cone)

    // Additional Cube
    const cube2Geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
    const cube2Material = new THREE.MeshStandardMaterial({
      color: 0xff6cff,
      roughness: 0.5,
      metalness: 0.1
    })
    const cube2 = new THREE.Mesh(cube2Geometry, cube2Material)
    const cube2Pos = getRandomPosition()
    cube2.position.set(cube2Pos.x, cube2Pos.y, cube2Pos.z)
    cube2.castShadow = true
    scene.add(cube2)

    // Flashlight body (main cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32)
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2b2b2b,
      roughness: 0.3,
      metalness: 0.8
    })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.set(-4, 1, 0)
    body.rotation.z = Math.PI / 2 // Rotate 90 degrees around Z axis
    body.castShadow = false
    scene.add(body)

    // Flashlight head (wider cylinder)
    const headGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32)
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b3b3b,
      roughness: 0.3,
      metalness: 0.8
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.set(-3.5, 1, 0) // Moved right to align with rotated body
    head.rotation.z = Math.PI / 2
    head.castShadow = false
    scene.add(head)

    // Battery compartment
    const batteryGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 32)
    const batteryMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xaa0000,
      roughness: 0.4,
      metalness: 0.6
    })
    const battery = new THREE.Mesh(batteryGeometry, batteryMaterial)
    battery.position.set(-4.4, 1, 0) // Moved left to align with rotated body
    battery.rotation.z = Math.PI / 2
    battery.castShadow = false
    scene.add(battery)

    // Lens (transparent disc)
    const lensGeometry = new THREE.CircleGeometry(0.25, 32)
    const lensMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      metalness: 0.9
    })
    const lens = new THREE.Mesh(lensGeometry, lensMaterial)
    lens.position.set(-3.35, 1, 0) // Moved right to end of head
    lens.rotation.y = Math.PI / 2 // Rotated to face the screen
    scene.add(lens)

    // Vertical screen wall
    const wallGeometry = new THREE.PlaneGeometry(6, 5)
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      side: THREE.DoubleSide,
      roughness: 0.9,
      metalness: 0
    })
    const wall = new THREE.Mesh(wallGeometry, wallMaterial)
    wall.position.set(4, 2, 0)
    wall.rotation.y = -Math.PI / 2
    wall.receiveShadow = true
    scene.add(wall)

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(10, 10)
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7dd3fc,
      roughness: 0.8,
      metalness: 0
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = false
    scene.add(floor)

    // Lighting
    const mainLight = new THREE.DirectionalLight(0xffffff, 3)
    mainLight.position.set(5, 5, 5)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.width = 2048
    mainLight.shadow.mapSize.height = 2048
    mainLight.shadow.camera.near = 0.5
    mainLight.shadow.camera.far = 50
    scene.add(mainLight)

    // Powerful spotlight for shadows
    const powerSpot = new THREE.SpotLight(0xffffff, 19.5)
    powerSpot.position.set(-5, 1, 0)
    powerSpot.target.position.set(4, 2, 0)
    powerSpot.angle = Math.PI / 8 // Narrower angle for more cone-like shape
    powerSpot.penumbra = 0.1 // Sharper edge transition
    powerSpot.decay = 2 // Stronger falloff
    powerSpot.distance = 15 // Slightly shorter distance
    powerSpot.castShadow = true
    powerSpot.shadow.mapSize.width = 2048
    powerSpot.shadow.mapSize.height = 2048
    powerSpot.shadow.camera.near = 0.1
    powerSpot.shadow.camera.far = 20
    powerSpot.shadow.bias = -0.0001
    powerSpot.shadow.camera.fov = 30
    scene.add(powerSpot)
    scene.add(powerSpot.target)

    // Additional spotlight
    const spotLight = new THREE.SpotLight(0xffffff, 1)
    spotLight.position.set(-4, 1.65, -4)
    spotLight.target.position.set(4, 2, 0)
    spotLight.angle = Math.PI / 6
    spotLight.penumbra = 0.1
    spotLight.decay = 2
    spotLight.distance = 15
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 0.1
    spotLight.shadow.camera.far = 20
    spotLight.shadow.bias = -0.0001
    spotLight.shadow.camera.fov = 30
    scene.add(spotLight)
    scene.add(spotLight.target)

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    // Create sliders
    const rotationSlider = document.createElement('input')
    rotationSlider.type = 'range'
    rotationSlider.min = '0'
    rotationSlider.max = '360'
    rotationSlider.value = '0'
    rotationSlider.className = 'absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64'
    drawingArea?.appendChild(rotationSlider)

    const zoomSlider = document.createElement('input')
    zoomSlider.type = 'range'
    zoomSlider.min = '5'
    zoomSlider.max = '20'
    zoomSlider.value = '10'
    zoomSlider.className = 'absolute top-1/2 right-4 transform -translate-y-1/2 rotate-270 w-48'
    drawingArea?.appendChild(zoomSlider)

    // Drag controls
    const dragControls = new DragControls([cube, cuboid, circle, cone, cube2], camera, renderer.domElement);
    dragControls.addEventListener('dragend', function (event) {
      setDragged(!dragged);
    });
    dragControls.addEventListener('drag', function (event) {
      renderer.render(scene, camera);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
    //   if (cubeRef) {
    //     cube.rotation.x += 0.01
    //     cube.rotation.y += 0.01
    //   }
      
      // Update camera position based on sliders
      const angle = (parseFloat(rotationSlider.value) * Math.PI) / 180
      const distance = parseFloat(zoomSlider.value)
      camera.position.x = distance * Math.sin(angle)
      camera.position.z = distance * Math.cos(angle)
      camera.lookAt(0, 0, 0)
      
      // Render both views
      renderer.render(scene, camera)
      secondaryRenderer.render(scene, secondaryCamera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth * 0.9, window.innerWidth * 0.9)
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      drawingArea?.removeChild(renderer.domElement)
      drawingArea?.removeChild(rotationSlider)
      drawingArea?.removeChild(zoomSlider)
      viewArea?.removeChild(secondaryRenderer.domElement)
    }
  }, [])

  const handleCheck = () => {
    const secondaryView = document.getElementById('secondary-view');
    if (secondaryView) {
      const canvas = secondaryView.querySelector('canvas');
      if (canvas) {
        const dataURL = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = '2D_Drawing.png';
        link.click();
        link.remove(); // Ensure the link is removed after use to prevent memory leaks
      } else {
        console.error('Canvas in secondary view is not defined.');
      }
    } else {
      console.error('Secondary view is not defined.');
    }
  }
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => Math.min(50, Math.max(2, prevProgress + Math.random() * 10 - 5)).toFixed(0));
    }, 500);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div ref={captureRef} className="min-h-screen bg-sky-300 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px]">
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
          <div className="flex items-center gap-2">
            <span className="pixel-font font-bold">#{id}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="pixel-font font-bold">Player123</span>
          <User className="w-5 h-5" />
        </div>
      </div>
 
      {/* Comparison Section */}
      <button onClick={takePhoto}>Take Photo</button>
      {photoUrl && <img src={photoUrl} alt="Captured" />}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-col items-center w-[40%]">
            <div className="relative border-4 border-black rounded-lg overflow-hidden w-full" style={{aspectRatio: "4/3"}}>
              <div className="w-full h-full bg-white flex items-center justify-center">
                <div className="w-full h-full object-contain"></div>
              <img src="/target.jpg" alt="Target Image" className="object-cover" />
              </div>
            </div>
            <span className="text-sm pixel-font mt-2">Target</span>
          </div>
          
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute w-full h-full rounded-full border-4 border-black bg-white"></div>
            <span className="relative z-10 text-xl pixel-font font-bold">{`${progress}%`}</span>
            
          </div>

          <div  className="flex flex-col items-center w-[40%]">
            <div className="relative border-4 border-black rounded-lg overflow-hidden w-full" style={{aspectRatio: "4/3"}}>
              <div  id="secondary-view" className="w-full h-full bg-white flex items-center justify-center">
                <div className="w-full h-full object-contain"></div>
              </div>
            </div>
            <span className="text-sm pixel-font mt-2">Your drawing</span>
          </div>
        </div>
      </div>
      <button onClick={captureScreenshot}>Capture Screenshot</button>
      {/* Drawing Area */}
      <div className="p-4">
        <div id="drawing-area" className="w-full aspect-square relative border-4 border-black rounded-lg overflow-hidden bg-white">
        </div>
      </div>

     {/* Post Section */}
      <div className="p-4 text-center space-y-4">
        <div className="flex gap-4 justify-center">
          <Button 
            className="pixel-font bg-black hover:bg-gray-800 px-8"
            onClick={onComplete}
          >
            SUBMIT
          </Button>
          <Button 
            className="pixel-font bg-black hover:bg-gray-800 px-8"
            onClick={handleCheck}
          >
            CHECK
          </Button>
        </div>
      </div>

      <style jsx global>{`
        .pixel-font {
          font-family: monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .rotate-270 {
          transform: rotate(270deg);
        }
      `}</style>
    </div>
  )
}
