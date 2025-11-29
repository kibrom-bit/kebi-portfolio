import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useIntersectionObserver } from '../../hooks';
import { GradientText, AnimatedCard, TypewriterText, ShimmerButton } from '../ui/AdvancedComponents';

// Import the image
import profileImage from './kebi.jpg';

export const HeroSection: React.FC = () => {
  const { setActiveSection, setCursorVariant } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Senior Full Stack Engineer',
    'UI/UX Architect',
    'React Specialist',
    'TypeScript Expert',
    'System Designer'
  ];

  // Auto-rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Set home as default active section
  useEffect(() => {
    setActiveSection('home');
  }, [setActiveSection]);

  return (
    <section 
      id="home" 
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-indigo-900/5"
    >
      {/* Clean geometric background */}
      <div className="absolute inset-0">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Column - Content */}
          <div className={`transform transition-all duration-1000 space-y-8 ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Available for new projects
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-white block">Hi, I'm</span>
                <GradientText className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600">
                  Kibrom Abebe
                </GradientText>
              </h1>
              
              <div className="h-20 flex items-start">
                <div className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light">
                  <TypewriterText 
                    key={currentRoleIndex}
                    text={roles[currentRoleIndex]} 
                    speed={50}
                    className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              I architect and build scalable digital solutions using cutting-edge technologies. 
              Specializing in <span className="text-blue-600 dark:text-blue-400 font-semibold">React</span>, 
              <span className="text-purple-600 dark:text-purple-400 font-semibold"> Node.js</span>, and 
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold"> Cloud Platforms</span>.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">5+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">99%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Client Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <ShimmerButton 
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  projectsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="flex-1 text-center justify-center"
              >
                View My Work
              </ShimmerButton>
              
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="flex-1 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300 hover:border-blue-500 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
              >
                Get In Touch
              </button>
            </div>

            {/* Tech Stack */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">TECH STACK</p>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Tailwind', 'AWS', 'PostgreSQL'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className={`transform transition-all duration-1000 delay-300 relative ${
            isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative">
              {/* Main Image Container - Fixed position, no rotation */}
              <div className="relative mx-auto w-80 h-80 md:w-96 md:h-96">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                
                {/* Image with modern frame */}
                <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
                  <img 
                    src={profileImage} 
                    alt="Kibrom Abebe - Senior Full Stack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg animate-bounce animation-delay-1000"></div>
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl">
                <div className="text-sm font-semibold">5+ Years</div>
                <div className="text-xs opacity-90">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 border-2 border-gray-400/30 rounded-full flex justify-center cursor-pointer backdrop-blur-sm bg-white/30 dark:bg-gray-800/30"
          onClick={() => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="w-1 h-3 bg-gray-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};