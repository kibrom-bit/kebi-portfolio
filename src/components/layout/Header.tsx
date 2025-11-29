import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useScrollPosition } from '../../hooks';
import { GradientText } from '../ui/AdvancedComponents';

// Import the portfolio logo
import portfolioLogo from './portfolio.png';

export const Header: React.FC = () => {
  const { theme, toggleTheme, setCursorVariant, activeSection, setActiveSection, isMenuOpen, toggleMenu } = useApp();
  const scrollPosition = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 20);
    
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [scrollPosition]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  // Set home as default active section on initial load
  useEffect(() => {
    if (scrollPosition === 0) {
      setActiveSection('home');
    }
  }, [scrollPosition, setActiveSection]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/30 dark:border-gray-700/30' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo with Subtle Design */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('home')}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <div className="relative">
              {/* Subtle Logo Container */}
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg p-0.5 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-gray-200/50 dark:border-gray-600/50">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                  <img 
                    src={portfolioLogo} 
                    alt="Kebi - Full Stack Developer"
                    className="w-8 h-8 object-contain filter brightness-110 contrast-110"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Initials */}
                  <div 
                    className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600 rounded-md"
                    style={{ display: 'none' }}
                  >
                    <span className="text-white font-semibold text-sm">K</span>
                  </div>
                </div>
              </div>
              
              {/* Subtle Active Indicator */}
              {activeSection === 'home' && !isScrolled && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full border border-white dark:border-gray-900 animate-pulse"></div>
              )}
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 tracking-tight leading-tight">
                Kebi.js
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-normal tracking-wide">
                Developer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className={`relative px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-500/60 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <span className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors">🌙</span>
              ) : (
                <span className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors">☀️</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:hidden p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 relative"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute left-0 top-1 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2.5 bg-gray-600' : 'bg-gray-500 dark:bg-gray-400'
                }`}></span>
                <span className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'bg-gray-500 dark:bg-gray-400'
                }`}></span>
                <span className={`absolute left-0 top-4 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2.5 bg-gray-600' : 'bg-gray-500 dark:bg-gray-400'
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-80 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left p-3 rounded-lg transition-all duration-300 font-medium ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Subtle Progress Bar */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-300"
            style={{
              width: `${Math.min((scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`
            }}
          ></div>
        </div>
      )}
    </header>
  );
};

export default Header;