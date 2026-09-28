import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { CustomizerDrawer } from './components/customizer/CustomizerDrawer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import SkillsMatrix from './components/sections/SkillsMatrix';
import FeaturedProjects from './components/sections/ProjectsSection';
import ExperienceTimeline from './components/sections/ExperienceTimeline';
import ContactSection from './components/sections/ContactSection';
import './index.css';

function App() {
  return (
    <AppProvider>
      <PortfolioProvider>
        <div className="relative min-h-screen bg-app text-content-primary transition-colors duration-300 overflow-x-hidden">
          <BackgroundEffects />
          <Header />
          <main className="relative z-10">
            <HeroSection />
            <PhilosophySection />
            <SkillsMatrix />
            <FeaturedProjects />
            <ExperienceTimeline />
            <ContactSection />
          </main>
          <Footer />
          <CustomizerDrawer />
        </div>
      </PortfolioProvider>
    </AppProvider>
  );
}

export default App;