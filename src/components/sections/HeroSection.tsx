import React, { useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useIntersectionObserver } from '../../hooks';
import { GradientText, AnimatedCard, TypewriterText, ShimmerButton } from '../ui/AdvancedComponents';

export const HeroSection: React.FC = () => {
  const { setActiveSection, setCursorVariant } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      setActiveSection('home');
    }
  }, [isIntersecting, setActiveSection]);

  const roles = [
    'Senior Full Stack Engineer',
    'UI/UX Architect',
    'React Specialist',
    'TypeScript Expert',
    'System Designer'
  ];

  return (
    <section 
      id="home" 
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-[length:50px_50px]"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-300 rounded-full blur-3xl opacity-20 animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse-soft animation-delay-1000"></div>
      <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-15 animate-pulse-soft animation-delay-2000"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`transform transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          
          {/* Profile Image with Advanced Animation */}
          <div className="relative inline-block mb-12 group">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-purple-500 to-blue-500 rounded-full p-1 animate-spin-slow">
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-full"></div>
              </div>
              
              {/* Inner profile image placeholder */}
              <div className="absolute inset-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gradient">JD</span>
              </div>
              
              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white dark:border-gray-800 animate-ping"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
            </div>
            
            {/* Hover effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-gray-900 dark:text-white block">Hi, I'm</span>
            <GradientText className="block animate-gradient bg-300%">
              Your Name
            </GradientText>
          </h1>

          {/* Animated Role Text */}
          <div className="h-16 md:h-20 lg:h-24 flex items-center justify-center mb-8">
            <div className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light min-h-[1.5em]">
              <TypewriterText 
                text={roles[0]} 
                speed={80}
                className="border-r-2 border-primary-500 pr-1"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Crafting exceptional digital experiences with cutting-edge technologies, 
            performance optimization, and pixel-perfect design systems. 
            <span className="block mt-2 text-gradient font-medium">
              Transforming complex problems into elegant solutions.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <ShimmerButton 
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="text-lg"
            >
              Explore My Work
            </ShimmerButton>

            <button 
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:border-primary-500 hover:scale-105 hover:shadow-xl text-lg"
            >
              <span className="text-gradient">
                Let's Connect <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
            </button>
          </div>

          {/* Stats Bar */}
          <AnimatedCard className="max-w-2xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">50+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">5+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Years</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-gradient">99%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div 
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer"
          onClick={() => {
            const aboutSection = document.getElementById('about');
            aboutSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Background Orbs */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-primary-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-40 left-20 w-3 h-3 bg-purple-400 rounded-full animate-float animation-delay-1000 opacity-40"></div>
      <div className="absolute bottom-40 right-40 w-2 h-2 bg-blue-400 rounded-full animate-float animation-delay-2000 opacity-60"></div>
    </section>
  );
};