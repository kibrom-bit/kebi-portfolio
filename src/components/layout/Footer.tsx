import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { GradientText } from '../ui/AdvancedComponents';

export const Footer: React.FC = () => {
  const { setCursorVariant } = useApp();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { name: 'Email', url: 'mailto:hello@example.com', icon: '✉️' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">JD</span>
              </div>
              <GradientText className="text-2xl font-black">
                YourName.dev
              </GradientText>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md mb-6">
              Crafting exceptional digital experiences with modern technologies, 
              clean code, and user-centered design principles.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(link.href.substring(1));
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Let's Connect
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p className="flex items-center space-x-3">
                <span>📧</span>
                <span>hello@yourname.dev</span>
              </p>
              <p className="flex items-center space-x-3">
                <span>📍</span>
                <span>Based in Your City</span>
              </p>
              <p className="flex items-center space-x-3">
                <span>💼</span>
                <span>Available for projects</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>Built with</span>
              <span className="flex items-center space-x-2">
                <span className="text-red-500">❤️</span>
                <span>React</span>
                <span>•</span>
                <span>TypeScript</span>
                <span>•</span>
                <span>Tailwind CSS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;