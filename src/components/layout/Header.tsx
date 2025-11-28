import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useScrollPosition } from '../../hooks';
import { GradientText } from '../ui/AdvancedComponents';

export const Header: React.FC = () => {
  const { theme, toggleTheme, setCursorVariant, activeSection, setActiveSection, isMenuOpen, toggleMenu } = useApp();
  const scrollPosition = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 50);
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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('home')}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">JD</span>
            </div>
            <GradientText className="text-xl font-black tracking-tight">
              YourName.dev
            </GradientText>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className={`relative font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <span className="w-5 h-5 text-yellow-500">🌙</span>
              ) : (
                <span className="w-5 h-5 text-blue-400">☀️</span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-3' : ''
                }`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-3' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left p-3 rounded-xl transition-all duration-300 font-medium ${
                    activeSection === item.id
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;