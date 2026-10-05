import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { useApp } from '../../contexts/AppContext';
import { SectionReveal } from '../ui/SectionReveal';
import { skillCategories } from '../../data/portfolioData';
import { Monitor, Server, Database, Cpu, GitBranch, Layers } from 'lucide-react';
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Monitor, Server, Database, Cpu, GitBranch,
};

// Refined, modern color palette for glows and borders
const themeStyles: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  blue: { border: 'border-blue-500/20 hover:border-blue-500/50', bg: 'bg-blue-500/5 hover:bg-blue-500/10', text: 'text-blue-300', dot: 'bg-blue-400' },
  violet: { border: 'border-violet-500/20 hover:border-violet-500/50', bg: 'bg-violet-500/5 hover:bg-violet-500/10', text: 'text-violet-300', dot: 'bg-violet-400' },
  emerald: { border: 'border-emerald-500/20 hover:border-emerald-500/50', bg: 'bg-emerald-500/5 hover:bg-emerald-500/10', text: 'text-emerald-300', dot: 'bg-emerald-400' },
  amber: { border: 'border-amber-500/20 hover:border-amber-500/50', bg: 'bg-amber-500/5 hover:bg-amber-500/10', text: 'text-amber-300', dot: 'bg-amber-400' },
  rose: { border: 'border-rose-500/20 hover:border-rose-500/50', bg: 'bg-rose-500/5 hover:bg-rose-500/10', text: 'text-rose-300', dot: 'bg-rose-400' },
};

const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter categories based on selection
  const displayedCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="section-wrapper bg-transparent py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionReveal variant="rise">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-sm font-mono text-brand-primary mb-3">
                <span className="w-6 h-px bg-brand-primary/50" />
                System Architecture & Stack
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-content-primary mb-4">
                Skills & Technologies
              </h2>
              <p className="text-content-secondary text-base leading-relaxed">
                Tools and technologies I use to build scalable, high-performance applications from 0 to 1.
              </p>
            </div>

            {/* Horizontally scrollable tabs for mobile optimization */}
            <div className="flex overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 hide-scrollbar gap-2 w-full md:w-auto snap-x">
              <button
                onClick={() => setActiveCategory('all')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all snap-start whitespace-nowrap ${activeCategory === 'all'
                  ? 'bg-content-primary text-surface shadow-md'
                  : 'bg-surface border border-border-subtle text-content-secondary hover:text-content-primary hover:bg-surface-hover'
                  }`}
              >
                <Layers className="w-4 h-4" />
                <span>Overview</span>
              </button>

              {skillCategories.map((cat) => {
                const CatIcon = iconMap[cat.icon];
                const isActive = cat.id === activeCategory;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all snap-start whitespace-nowrap ${isActive
                      ? 'bg-content-primary text-surface shadow-md'
                      : 'bg-surface border border-border-subtle text-content-secondary hover:text-content-primary hover:bg-surface-hover'
                      }`}
                  >
                    {CatIcon && <CatIcon className="w-4 h-4 shrink-0" />}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Bento Grid Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((category, idx) => {
              const Icon = iconMap[category.icon];
              const style = themeStyles[category.color] || themeStyles.blue;

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`group relative p-6 rounded-3xl border border-border-subtle bg-surface/50 backdrop-blur-sm hover:border-border-strong transition-colors flex flex-col h-full`}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${style.bg} ${style.text}`}>
                        {Icon && <Icon className="w-5 h-5" />}
                      </div>
                      <h3 className="font-semibold text-content-primary text-lg">
                        {category.label}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-content-muted">
                      {category.skills.length} tools
                    </span>
                  </div>

                  {/* Skills Pills / Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill, skillIdx) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (idx * 0.1) + (skillIdx * 0.05) }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${style.border} ${style.bg} transition-all duration-300 hover:-translate-y-0.5 cursor-default`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        <span className="text-sm font-medium text-content-secondary group-hover:text-content-primary">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Global style for hiding scrollbar on the tabs */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};

export default SkillsMatrix;