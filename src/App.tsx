import React from 'react';
import { AppProvider } from './contexts/AppContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import SkillsMatrix from './components/sections/SkillsMatrix';
import FeaturedProjects from './components/sections/ProjectsSection';
import ProofOfWork from './components/sections/ProofOfWork';
import ExperienceTimeline from './components/sections/ExperienceTimeline';
import ContactSection from './components/sections/ContactSection';
import './index.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-app text-content-primary transition-colors duration-300">
        <Header />
        <main>
          <HeroSection />
          <PhilosophySection />
          <SkillsMatrix />
          <FeaturedProjects />
          <ProofOfWork />
          <ExperienceTimeline />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;