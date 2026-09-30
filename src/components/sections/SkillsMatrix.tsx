import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { useApp } from '../../contexts/AppContext';
import { skillCategories } from '../../data/portfolioData';
import { Monitor, Server, Database, Cpu, GitBranch, Layers, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Monitor, Server, Database, Cpu, GitBranch,
};

const categoryBadgeStyle: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue: {
    border: 'border-blue-500/30 hover:border-blue-500/60',
    bg: 'bg-blue-500/10 group-hover:bg-blue-500/15',
    text: 'text-blue-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
  },
  violet: {
    border: 'border-violet-500/30 hover:border-violet-500/60',
    bg: 'bg-violet-500/10 group-hover:bg-violet-500/15',
    text: 'text-violet-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
  },
  emerald: {
    border: 'border-emerald-500/30 hover:border-emerald-500/60',
    bg: 'bg-emerald-500/10 group-hover:bg-emerald-500/15',
    text: 'text-emerald-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-500/60',
    bg: 'bg-amber-500/10 group-hover:bg-amber-500/15',
    text: 'text-amber-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  },
  rose: {
    border: 'border-rose-500/30 hover:border-rose-500/60',
    bg: 'bg-rose-500/10 group-hover:bg-rose-500/15',
    text: 'text-rose-400',
    glow: 'group-hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]',
  },
};

const SkillsMatrix: React.FC = () => {
  const { setActiveSection } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (isIntersecting) setActiveSection('skills');
  }, [isIntersecting, setActiveSection]);

  // Aggregate all skills if 'all' is selected, or pick the active category
  const displayedSkills = activeCategory === 'all'
    ? skillCategories.flatMap((cat) => cat.skills.map((s) => ({ ...s, categoryColor: cat.color, categoryLabel: cat.label })))
    : (skillCategories.find((c) => c.id === activeCategory)?.skills.map((s) => ({
        ...s,
        categoryColor: skillCategories.find((c) => c.id === activeCategory)?.color || 'blue',
        categoryLabel: skillCategories.find((c) => c.id === activeCategory)?.label || '',
      })) || []);

  return (
    <section id="skills" ref={ref} className="section-wrapper bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-tag">
            <span className="w-4 h-px bg-brand-primary" />
            Technical Stack
          </p>
          <h2 className="section-title">
            Skills & <span className="text-gradient-brand">Technologies</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            A comprehensive overview of languages, frameworks, and system engineering tools I utilize in production.
          </p>
        </motion.div>

        {/* Category Filter Tabs - Simple & Modern Devpost Style */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-border-subtle">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-surface border border-border-subtle text-content-secondary hover:text-content-primary hover:bg-surface-hover'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Technologies</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
              {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </span>
          </button>

          {skillCategories.map((cat) => {
            const CatIcon = iconMap[cat.icon];
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-surface border border-border-subtle text-content-secondary hover:text-content-primary hover:bg-surface-hover'
                }`}
              >
                {CatIcon && <CatIcon className="w-3.5 h-3.5 shrink-0" />}
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-surface-subtle text-content-muted'}`}>
                  {cat.skills.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clean Tech Cards Grid - No boring progress lines */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5"
        >
          {displayedSkills.map((skill, idx) => {
            const style = categoryBadgeStyle[skill.categoryColor] || categoryBadgeStyle.blue;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.3) }}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`group relative p-4 rounded-2xl border ${style.border} bg-surface transition-all duration-200 cursor-default ${style.glow}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-semibold text-sm text-content-primary tracking-tight">
                    {skill.name}
                  </span>
                  <Sparkles className={`w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity ${style.text}`} />
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-border-subtle/50 text-[11px] font-mono">
                  <span className={`px-2 py-0.5 rounded-md ${style.bg} ${style.text} text-[10px]`}>
                    {skill.categoryLabel || 'Stack'}
                  </span>
                  <span className="text-content-muted text-[10px]">
                    Production
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
