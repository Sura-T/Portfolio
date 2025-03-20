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
          Education
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
          <icosahedronGeometry args={[0.4]} />
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
          <tetrahedronGeometry args={[0.4]} />
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

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const educationData = [
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "Adama Science and Technology University",
      year: "2021 - 2026",
      description: "Focus on Software Engineering and Web Technologies",
      achievements: ["OOP, Data Structure and Algorithm, Web Technologies, Software Architecture, Linux, OS, Networking, Database, etc"]
    },
    {
      degree: "Software Engineering",
      school: "ALX Africa",
      year: "2023 - 2024",
      description: "Focus on Software Engineering and Web Technologies",
      achievements: ["Shell, Git, HTML, CSS, JavaScript, Python, Flask, Django, SQL, ORM, API, React, Redux, Node.js, Express, MongoDB, etc"]
    }
  ];

  return (
    <section id="education" className="min-h-screen py-20 relative overflow-hidden">
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
          className="space-y-12"
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-6 bg-gray-900 ring-1 ring-gray-900/5 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {edu.degree}
                  </h3>
                  <span className="text-gray-400 mt-2 md:mt-0">{edu.year}</span>
                </div>
                <h4 className="text-xl text-gray-300 mb-2">{edu.school}</h4>
                <p className="text-gray-400 mb-4">{edu.description}</p>
                <ul className="space-y-2">
                  {edu.achievements.map((achievement) => (
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