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
          Certifications
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
          <torusGeometry args={[0.4, 0.1, 16, 100]} />
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
          <ringGeometry args={[0.3, 0.4, 32]} />
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

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const certificationsData = [
    {
      id: 1,
      name: "Software Engineering-Backend specialization",
      issuer: "ALX Africa",
      date: "2024",
      credentialId: "https://intranet.alxswe.com/certificates/Me9BHCTN2X",
      skills: ["Full-stack development", "CI/CD", "DevOps", "Web responsiveness", "APIs", "Microservices", "Databases" ]
    },
    {
      id: 2,
      name: "365 Data Science Certificate",
      issuer: "365 Data Science",
      date: "2024",
      credentialId: "https://learn.365datascience.com/c/5581a054d7/",
      skills: ["Statistics", "Probability", "ML in Python", "SQL", "Deep Learning", "Mathematics", "Probability" ]
    },
    {
      id: 3,
      name: "AI Career Essentials",
      issuer: "ALX Africa",
      date: "2024",
      credentialId: "https://intranet.alxswe.com/certificates/NM2PZJh9e7",
      skills: ["AI Tools", "AI Ethics", "AI in Business", "AI in Society", "Workplace Skills"]
    }
  ];

  return (
    <section id="certifications" className="min-h-screen py-20 relative overflow-hidden">
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
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-6 bg-gray-900 ring-1 ring-gray-900/5 rounded-lg h-full">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {cert.name}
                </h3>
                <div className="text-gray-400 mb-4">
                  <p>{cert.issuer}</p>
                  <p>Issued: {cert.date}</p>
                  <p className="text-sm">ID: {cert.credentialId}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}