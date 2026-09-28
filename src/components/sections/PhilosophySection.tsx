import React, { useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { useApp } from '../../contexts/AppContext';
import { profile } from '../../data/portfolioData';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Layers, Code2, Zap, CheckCircle } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Layers,
  Code2,
  Zap,
};

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  blue:    { text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30',   glow: 'rgba(59,130,246,0.12)' },
  violet:  { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30', glow: 'rgba(139,92,246,0.12)' },
  emerald: { text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30',glow: 'rgba(16,185,129,0.12)' },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const PhilosophySection: React.FC = () => {
  const { setActiveSection } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) setActiveSection('philosophy');
  }, [isIntersecting, setActiveSection]);

  return (
    <section id="philosophy" ref={ref} className="section-wrapper bg-app">
      <div className="grid-overlay opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header mx-auto text-center max-w-2xl mb-16"
        >
          <p className="section-tag justify-center">
            <span className="w-4 h-px bg-brand-primary" />
            About & Philosophy
            <span className="w-4 h-px bg-brand-primary" />
          </p>
          <h2 className="section-title text-center">
            Engineering{' '}
            <span className="text-gradient-brand">Philosophy</span>
          </h2>
          <p className="section-subtitle text-center">{profile.bio}</p>
        </motion.div>

        {/* Principle Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {profile.philosophyPrinciples.map((principle) => {
            const Icon = iconMap[principle.icon];
            const colors = colorMap[principle.color] ?? colorMap.blue;
            return (
              <motion.div key={principle.id} variants={cardVariants}>
                <SpotlightCard
                  className="h-full p-6 flex flex-col gap-5"
                  spotlightColor={colors.glow}
                >
                  {/* Icon badge */}
                  <div className={`inline-flex w-11 h-11 rounded-xl items-center justify-center ${colors.bg} border ${colors.border}`}>
                    {Icon && <Icon className={`w-5 h-5 ${colors.text}`} />}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-lg text-content-primary leading-snug">
                    {principle.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-content-secondary leading-relaxed flex-1">
                    {principle.description}
                  </p>

                  {/* Points */}
                  <ul className="space-y-2 mt-auto pt-4 border-t border-border-subtle">
                    {principle.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs text-content-muted">
                        <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${colors.text}`} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
