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
          Volunteer
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
          <sphereGeometry args={[0.4, 32, 32]} />
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
          <octahedronGeometry args={[0.4]} />
          <meshPhongMaterial
            color="#3b82f6"
            emissive="#1e3a8a"
            specular="#ffffff"
            shininess={100}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function Volunteer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const volunteerData = [
    {
      organization: "CSEC ASTU",
      role: "Social Media Manager",
      period: "2024 - Present",
      description: "Managing social media accounts and creating content",
      achievements: ["Increased followers by 50%", "Launched 2 successful campaigns", "Engaged with 100+ users daily"]
    },
    {
      organization: "ASTU Space Science and Technology Club",
      role: "Public Relations Officer",
      period: "2023 - 2024",
      description: "Promoting club activities and events",
      achievements: ["Organized 3 successful events", "Increased membership by 30%", "Managed club's social media accounts"]
    },
    {
      organization: "CSEC ASTU",
      role: "Competitive Programmer",
      period: "2022 - present",
      description: "Participating in competitive programming contests and mentoring juniors",
      achievements: ["Gave lectures on Data Structure and Algorithms, and Problem Solving", "Mentored 3+ students"]
    }
  ];

  return (
    <section id="volunteer" className="min-h-screen py-20 relative overflow-hidden">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {volunteerData.map((vol, index) => (
            <motion.div
              key={`${vol.organization}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-6 bg-gray-900 ring-1 ring-gray-900/5 rounded-lg h-full">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {vol.organization}
                </h3>
                <div className="text-gray-400 mb-4">
                  <p className="text-lg text-gray-300">{vol.role}</p>
                  <p>{vol.period}</p>
                </div>
                <p className="text-gray-300 mb-4">{vol.description}</p>
                <ul className="space-y-2">
                  {vol.achievements.map((achievement) => (
                    <motion.li
                      key={achievement}
                      className="flex items-center space-x-3 text-gray-300"
                      whileHover={{ x: 10, color: "#8b5cf6" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-purple-400">▹</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 