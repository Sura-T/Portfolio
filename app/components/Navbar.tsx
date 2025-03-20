'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 overflow-x-hidden ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-black/95 backdrop-blur-md'
    }`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 hover:from-pink-600 hover:to-purple-400 transition-all duration-300">
              Surafel Takele
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              <Link href="#about" className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium group">
                <span className="relative z-10">About</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="#skills" className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium group">
                <span className="relative z-10">Skills</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="#projects" className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium group">
                <span className="relative z-10">Projects</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link href="#contact" className="relative text-gray-300 hover:text-white px-3 py-2 text-sm font-medium group">
                <span className="relative z-10">Contact</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none hover:bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full overflow-x-hidden">
          <div className="px-4 py-2 space-y-1 bg-black/95 backdrop-blur-md">
            <Link 
              href="#about" 
              onClick={handleLinkClick}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-all duration-300"
            >
              About
            </Link>
            <Link 
              href="#skills" 
              onClick={handleLinkClick}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-all duration-300"
            >
              Skills
            </Link>
            <Link 
              href="#projects" 
              onClick={handleLinkClick}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-all duration-300"
            >
              Projects
            </Link>
            <Link 
              href="#contact" 
              onClick={handleLinkClick}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-all duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 