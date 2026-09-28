import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { useIntersectionObserver } from '../../hooks';
import { profile } from '../../data/portfolioData';
import { ArrowDown, Download, ChevronRight } from 'lucide-react';

const ROLES = [
  'Full-Stack Software Engineer',
  'API-First System Designer',
  'Flutter Mobile Developer',
  'ARM Embedded Engineer',
  'Clean Architecture Advocate',
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
});

const HeroSection: React.FC = () => {
  const { setActiveSection } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isIntersecting) setActiveSection('hero');
  }, [isIntersecting, setActiveSection]);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIdx];
    const delay = isDeleting ? 40 : 65;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplayText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setIsDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, roleIdx]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-app"
    >
      {/* Grid overlay */}
      <div className="grid-overlay opacity-60" />

      {/* Ambient orbs */}
      <div className="absolute -top-64 -left-64 w-[640px] h-[640px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-64 -right-64 w-[640px] h-[640px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Status badge */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-badge border border-brand-primary/30 bg-brand-primary/10 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-emerald" />
              </span>
              <span className="text-brand-emerald font-medium">{profile.status}</span>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1 {...fadeUp(0.1)} className="font-display font-bold tracking-tight leading-tight mb-6">
            <span className="block text-5xl md:text-7xl text-content-primary mb-2">
              Hi, I'm{' '}
              <span className="text-gradient-brand animate-gradient-text">Kibrom Abebe.</span>
            </span>
            <span className="block text-2xl md:text-3xl text-content-secondary font-normal mt-4">
              <span className="text-brand-accent font-mono">{displayText}</span>
              <span className="inline-block w-0.5 h-7 bg-brand-accent ml-1 animate-blink-caret" />
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg md:text-xl text-content-secondary leading-relaxed max-w-2xl mb-10"
          >
            {profile.tagline}
          </motion.p>

          {/* Stats row */}
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-8 mb-10">
            {[
              { value: '4+', label: 'Years Building' },
              { value: '10+', label: 'Projects Shipped' },
              { value: '5+', label: 'Tech Domains' },
              { value: '99.97%', label: 'API Uptime (Best)' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-display font-bold text-content-primary">{stat.value}</span>
                <span className="text-xs text-content-muted mt-0.5 font-mono">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4">
            <button
              onClick={scrollToProjects}
              className="btn-primary group"
            >
              Explore Case Studies
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            {...fadeUp(0.6)}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-content-muted"
          >
            <span className="text-xs font-mono">scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;