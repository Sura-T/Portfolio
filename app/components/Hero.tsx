'use client';

import { motion } from 'framer-motion';

export default function Hero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div className="lg:w-1/2 text-center lg:text-left" variants={itemVariants}>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              variants={itemVariants}
            >
              Surafel Takele
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 text-lg md:text-xl mb-8"
              variants={itemVariants}
            >
              Full-Stack developer | Tech Innovator | Problem Solver
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <a 
                href="#projects" 
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              >
                View Projects
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 rounded-full border-2 border-purple-500 text-white font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Floating Languages and Frameworks */}
          <motion.div 
            className="lg:w-1/2 flex flex-wrap gap-4 justify-center lg:justify-end"
            variants={itemVariants}
          >
            {[
              'JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Next.js', 
              'Angular.js', 'Vue.js', 'Svelte', 'Ember.js', 'Tailwind CSS', 'Three.js', 
              'PostgreSQL', 'MongoDB', 'GraphQL', 'Docker', 'CI/CD', 'Linux', 'Git'
            ].map((tech) => (
              <motion.div 
                key={tech}
                className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-gray-300 backdrop-blur-sm"
                variants={floatingVariants}
                animate="animate"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-gray-400" />
        </div>
      </motion.div>
    </section>
  );
}