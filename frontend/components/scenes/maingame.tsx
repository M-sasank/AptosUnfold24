//imports  
import { useEffect, useState } from "react";
import * as THREE from "three";
import { CylinderGeometry, MeshStandardMaterial, Mesh, PointLight, PlaneGeometry, SpotLight } from "three";

export default function MainGame() {
    const [cubeRef, setCubeRef] = useState(null);
    const [cameraAngle, setCameraAngle] = useState(0);
    
    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#fed4b8");
        
        // Camera setup - positioned for top-down view
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 10, 5);
        camera.lookAt(0, 0, 0);
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
        renderer.outputEncoding = THREE.sRGBEncoding; // Better color accuracy
        document.body.appendChild(renderer.domElement);
        
        // Cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xff8f6c,
            roughness: 0.5,
            metalness: 0.1
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        scene.add(cube);
        setCubeRef(cube);
        
        // Floor
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffd18c,
            roughness: 0.8,
            metalness: 0
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        // Flashlight body (main cylinder)
        const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32);
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2b2b2b,
            roughness: 0.3,
            metalness: 0.8
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(-4, 1, -4);
        body.castShadow = true;
        scene.add(body);

        // Flashlight head (wider cylinder)
        const headGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 32);
        const headMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3b3b3b,
            roughness: 0.3,
            metalness: 0.8
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(-4, 1.5, -4);
        head.castShadow = true;
        scene.add(head);

        // Battery compartment
        const batteryGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.4, 32);
        const batteryMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xaa0000,
            roughness: 0.4,
            metalness: 0.6
        });
        const battery = new THREE.Mesh(batteryGeometry, batteryMaterial);
        battery.position.set(-4, 0.6, -4);
        battery.castShadow = true;
        scene.add(battery);

        // Lens (transparent disc)
        const lensGeometry = new THREE.CircleGeometry(0.25, 32);
        const lensMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            roughness: 0.1,
            metalness: 0.9
        });
        const lens = new THREE.Mesh(lensGeometry, lensMaterial);
        lens.position.set(-4, 1.65, -4);
        lens.rotation.x = -Math.PI / 2;
        scene.add(lens);

        // Vertical screen wall
        const wallGeometry = new THREE.PlaneGeometry(6, 4);
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            side: THREE.DoubleSide,
            roughness: 0.9,
            metalness: 0
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(4, 2, 0);
        wall.rotation.y = -Math.PI / 2;
        wall.receiveShadow = true;
        scene.add(wall);
        
        // Main scene light
        const mainLight = new THREE.DirectionalLight(0xffffff, 3);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        scene.add(mainLight);

        // Powerful spotlight for shadows
        const powerSpot = new THREE.SpotLight(0xffffff, 19.5);
        powerSpot.position.set(-8, 0, -4);
        powerSpot.target.position.set(4, 2, 0);
        powerSpot.angle = Math.PI / 4;
        powerSpot.penumbra = 0.2;
        powerSpot.decay = 1.5;
        powerSpot.distance = 20;
        powerSpot.castShadow = true;
        powerSpot.shadow.mapSize.width = 2048;
        powerSpot.shadow.mapSize.height = 2048;
        powerSpot.shadow.bias = -0.0001;
        scene.add(powerSpot);
        scene.add(powerSpot.target);

        // Ambient light for base illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        // Create horizontal slider for rotation control
        const rotationSlider = document.createElement('input');
        rotationSlider.type = 'range';
        rotationSlider.min = '0';
        rotationSlider.max = '360';
        rotationSlider.value = '0';
        rotationSlider.style.position = 'absolute';
        rotationSlider.style.bottom = '20px';
        rotationSlider.style.left = '50%';
        rotationSlider.style.transform = 'translateX(-50%)';
        rotationSlider.style.width = '300px';
        document.body.appendChild(rotationSlider);

        // Create vertical slider for zoom control
        const zoomSlider = document.createElement('input');
        zoomSlider.type = 'range';
        zoomSlider.min = '5';
        zoomSlider.max = '20';
        zoomSlider.value = '10';
        zoomSlider.style.position = 'absolute';
        zoomSlider.style.top = '50%';
        zoomSlider.style.right = '20px';
        zoomSlider.style.transform = 'translateY(-50%) rotate(-90deg)';
        zoomSlider.style.width = '200px';
        document.body.appendChild(zoomSlider);
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (cubeRef) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            }
            
            // Update camera position based on both sliders
            const angle = (parseFloat(rotationSlider.value) * Math.PI) / 180;
            const distance = parseFloat(zoomSlider.value);
            camera.position.x = distance * Math.sin(angle);
            camera.position.z = distance * Math.cos(angle);
            camera.lookAt(0, 0, 0);
            
            renderer.render(scene, camera);
        };
        animate();
        
        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.removeChild(renderer.domElement);
            document.body.removeChild(rotationSlider);
            document.body.removeChild(zoomSlider);
        };
    }, []); // Empty dependency array since we're using sliders
}
