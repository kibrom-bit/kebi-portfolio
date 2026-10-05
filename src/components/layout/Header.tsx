import React, { useEffect, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useAdmin } from '../../contexts/AdminContext';
import { useScrollPosition } from '../../hooks';
import { CommandPalette } from '../ui/CommandPalette';
import { Download, Sliders } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'philosophy', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const { activeSection, setActiveSection, isMenuOpen, toggleMenu } = useApp();
  const { profile, openCustomizer } = usePortfolio();
  const { isAdmin, isPreviewMode } = useAdmin();
  const scrollPosition = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollPosition > 30);
  }, [scrollPosition]);

  // Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
    if (isMenuOpen) toggleMenu();
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle/40 backdrop-blur-sm"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center shadow-glow-blue">
                <span className="text-white font-display font-bold text-sm">
                  {profile.name.charAt(0) || 'K'}
                </span>
              </div>
              <span className="font-display font-semibold text-content-primary">
                {profile.name.split(' ')[0] || 'Kibrom'}
                <span className="text-brand-primary">.dev</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeSection === item.id
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-content-secondary hover:text-content-primary hover:bg-surface-hover'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-px left-3 right-3 h-px bg-brand-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5">
              {/* Studio Customize button - Only shown for Admin */}
              {isAdmin && !isPreviewMode && (
                <button
                  onClick={openCustomizer}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                             text-brand-primary bg-brand-primary/10 border border-brand-primary/30
                             hover:bg-brand-primary/20 active:scale-95 transition-all duration-200"
                  title="Customize Background, Projects & Profile directly"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>
              )}

              {/* Resume download */}
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-button text-xs font-semibold
                           bg-brand-primary text-white hover:opacity-90 active:scale-95 transition-all duration-200 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2.5 rounded-lg bg-surface-subtle border border-border-subtle transition-all"
                aria-label="Toggle menu"
              >
                <div className="w-4 h-4 flex flex-col justify-center gap-1">
                  <span className={`block h-0.5 bg-content-secondary rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`block h-0.5 bg-content-secondary rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 bg-content-secondary rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-400 ${isMenuOpen ? 'max-h-96 mt-3' : 'max-h-0'}`}>
            <div className="bg-surface border border-border-subtle rounded-xl p-2 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ${activeSection === item.id
                      ? 'text-brand-primary bg-brand-primary/10'
                      : 'text-content-secondary hover:text-content-primary hover:bg-surface-hover'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 pt-2 pb-1 border-t border-border-subtle mt-1 flex flex-col gap-2">
                {isAdmin && !isPreviewMode && (
                  <button
                    onClick={() => {
                      openCustomizer();
                      if (isMenuOpen) toggleMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-brand-primary/15 text-brand-primary border border-brand-primary/30"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    Customize Site (Studio)
                  </button>
                )}
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-ghost text-center text-xs py-2.5 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Read progress bar */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 w-full h-px bg-border-subtle">
            <div
              className="h-full bg-brand-primary transition-all duration-150"
              style={{
                width: `${Math.min((scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`,
              }}
            />
          </div>
        )}
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
};

export default Header;