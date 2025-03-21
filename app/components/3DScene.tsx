'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
// import * as THREE from 'three';

function FloatingCube() {
  const meshRef = useRef();

  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh
        ref={meshRef}
        rotation={[0.5, 0.5, 0]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  return (
    <Float
      speed={1.2}
      rotationIntensity={1.5}
      floatIntensity={1.5}
      position={[-2, 0, 0]}
    >
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#ec4899"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus() {
  return (
    <Float
      speed={1.3}
      rotationIntensity={2}
      floatIntensity={1}
      position={[2, 0, 0]}
    >
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="h-[50vh] w-full">
      <Canvas
        camera={{ position: [0, 0, 5] }}
        className="bg-transparent"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[-10, 10, -10]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <FloatingCube />
        <FloatingSphere />
        <FloatingTorus />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
} 