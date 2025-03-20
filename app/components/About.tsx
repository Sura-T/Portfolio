'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';

function FloatingText() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <Center>
        <Text3D
          font="/fonts/inter_bold.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.01}
          bevelSize={0.01}
          bevelSegments={5}
        >
          About Me
          <meshPhongMaterial 
            color="#8b5cf6"
            emissive="#4c1d95"
            specular="#ffffff"
            shininess={100}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

function FloatingShapes() {
  return (
    <>
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={1}
        position={[-2, 1, 0]}
      >
        <mesh>
          <octahedronGeometry args={[0.4]} />
          <meshPhongMaterial
            color="#ec4899"
            emissive="#831843"
            specular="#ffffff"
            shininess={100}
          />
        </mesh>
      </Float>
      <Float
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={1.5}
        position={[2, -1, 0]}
      >
        <mesh>
          <dodecahedronGeometry args={[0.4]} />
          <meshPhongMaterial
            color="#3b82f6"
            emissive="#1e3a8a"
            specular="#ffffff"
            shininess={100}
          />
        </mesh>
      </Float>
      <Float
        speed={2.5}
        rotationIntensity={1.5}
        floatIntensity={0.5}
        position={[0, 2, 0]}
      >
        <mesh>
          <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />
          <meshPhongMaterial
            color="#10b981"
            emissive="#064e3b"
            specular="#ffffff"
            shininess={100}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="h-[30vh] mb-12">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight
              position={[-10, 10, -10]}
              angle={0.3}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <FloatingText />
            <FloatingShapes />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div>

        <motion.div
          ref={containerRef}
          style={{ y, opacity }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-6 bg-gray-900 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  Full Stack Developer & Tech Innovator
                </h3>
              </div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              With over 2 years of experience in full-stack development, I specialize in building scalable web applications and innovative solutions. My passion lies in creating elegant, efficient code and solving complex technical challenges.
            </p>

            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ x: 10, color: "#8b5cf6" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-purple-400">▹</span>
                <span className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                  Specialized in Next.js, React, Node.js, and Cloud Architecture
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ x: 10, color: "#8b5cf6" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-purple-400">▹</span>
                <span className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                  Experience with microservices and distributed systems
                </span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ x: 10, color: "#8b5cf6" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-purple-400">▹</span>
                <span className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                  Strong background in documentation and system design
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: "2+", label: "Years Experience" },
              { number: "15+", label: "Projects Completed" },
              { number: "10+", label: "Happy Clients" },
              { number: "99%", label: "Success Rate" }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-1 rounded-2xl backdrop-blur-xl"
              >
                <div className="bg-gray-900/90 p-6 rounded-xl h-full">
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-2">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 