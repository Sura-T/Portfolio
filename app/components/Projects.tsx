'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: "Enat Health Center",
    description: "This is a modern, responsive Health Center website built with ReactJS, showcasing a highly efficient and user-friendly UI/UX. The project focuses on providing a seamless user experience across devices with optimized rendering and smooth navigation.",
    image: "/image/enatHealth.png",
    tech: ["React", "TailwindCSS", "UX/UI"],
    link: "https://github.com/Sura-T/health-center-premium",
    demoLink: "https://health-center-premium-zsk7.vercel.app/",
    featured: true
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js, showcasing my projects, skills, and experience. Designed with responsive layouts, smooth animations, and optimized performance to provide an engaging user experience across all devices.",
    image: "/image/portfolio.png",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    link: "https://github.com/yourusername/ecommerce-micro",
    demoLink: "https://ecommerce-microservices-demo.com",
    featured: true
  },
  {
    title: "Savoria Restaurant",
    description: "A stylish and responsive restaurant website built with HTML, CSS, and JavaScript, featuring a dynamic menu, smooth animations, and an elegant design for an inviting user experience.",
    image: "/image/restaurant.png",
    tech: ["HTML", "CSS", "JavaScript", "UX/UI"],
    link: "https://github.com/Sura-T/Restaurant",
    demoLink: "https://restaurant-pi-sandy-51.vercel.app/",
    featured: true
  }
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // 3D card tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <div 
        className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 rounded-2xl p-1 backdrop-blur-xl 
                   hover:from-purple-600/80 hover:to-pink-600/80 transition-all duration-300"
      >
        <div 
          className="bg-gray-900/90 rounded-xl p-6 h-full transform-gpu transition-transform duration-300
                     group-hover:scale-[0.98]"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div 
            className="relative h-48 mb-6 rounded-lg overflow-hidden"
            style={{
              transform: "translateZ(75px)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 z-10" />
            <Image
              src={project.image}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>

          <h3 
            className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            style={{
              transform: "translateZ(50px)",
            }}
          >
            {project.title}
          </h3>

          <p 
            className="text-gray-300 mb-6"
            style={{
              transform: "translateZ(25px)",
            }}
          >
            {project.description}
          </p>

          <div 
            className="flex flex-wrap gap-2 mb-6"
            style={{
              transform: "translateZ(25px)",
            }}
          >
            {project.tech.map((tech: string) => (
              <span 
                key={tech}
                className="px-3 py-1 text-sm rounded-full bg-white/10 text-gray-300 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                       text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 
                       transition-all duration-300"
              style={{
                transform: "translateZ(50px)",
              }}
            >
              View Project
            </a>
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                         text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 
                         transition-all duration-300"
                style={{
                  transform: "translateZ(50px)",
                }}
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Showcasing innovative solutions and technical excellence through real-world applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More Projects Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/Sura-T"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 rounded-full bg-white/10 text-white 
                     hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            View More on GitHub
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}