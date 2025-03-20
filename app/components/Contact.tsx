'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, OrbitControls } from '@react-three/drei';

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
          Get In Touch
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

function FloatingIcons() {
  return (
    <>
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={1}
        position={[-2, 1, 0]}
      >
        <mesh>
          <sphereGeometry args={[0.3, 32, 32]} />
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
          <boxGeometry args={[0.4, 0.4, 0.4]} />
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Add your form submission logic here
      // Example: Send to an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send email logic
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'surafeltakele09@gmail.com',
          subject: 'New Contact Form Submission',
          text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
        }),
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 relative overflow-hidden">
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
            <FloatingIcons />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="relative w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300 transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="relative w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300 transition-all duration-300"
                  required
                />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="relative w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300 transition-all duration-300"
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full
                         hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50
                         ${submitStatus === 'success' ? 'bg-green-500' : ''}
                         ${submitStatus === 'error' ? 'bg-red-500' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 
                 submitStatus === 'success' ? 'Message Sent!' :
                 submitStatus === 'error' ? 'Error Sending' :
                 'Send Message'}
              </button>
            </motion.div>
          </motion.form>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex justify-center space-x-6"
          >
            {[
              { name: 'GitHub', url: 'https://github.com/sura-t', icon: '🐙' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/surafel-takele-a01038236/', icon: '💼' },
              { name: 'Twitter', url: 'https://twitter.com/surafeltakele09', icon: '🐦' }
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
              >
                <span>{social.icon}</span>
                <span>{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}