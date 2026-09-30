import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { AdminProvider } from './contexts/AdminContext';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { CustomizerDrawer } from './components/customizer/CustomizerDrawer';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
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
        <AdminProvider>
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
            <AdminAuthModal />
          </div>
        </AdminProvider>
      </PortfolioProvider>
    </AppProvider>
  );
}

export default App;