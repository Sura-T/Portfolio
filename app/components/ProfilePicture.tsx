'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const ProfilePicture = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-scale');
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-64 h-64 mx-auto">
      {/* Background gradient ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
      
      {/* Profile picture container */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
        <Image
          src="/image/surafel.webp"
          alt="Surafel Takele"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-float" />
      <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default ProfilePicture; 