'use client';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Volunteer from './components/Volunteer';

export default function Home() {
  return (
    <main className="bg-gray-900 text-white overflow-x-hidden">
      <Hero />
      <About />
      <Projects />
      <Education />
      <Certifications />
      <Volunteer />
      <Contact />
    </main>
  );
}
