import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { useApp } from '../../contexts/AppContext';
import { skillCategories } from '../../data/portfolioData';
import { Monitor, Server, Database, Cpu, GitBranch } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Monitor, Server, Database, Cpu, GitBranch,
};

const colorMap: Record<string, { accent: string; bar: string; tagBg: string; tagText: string }> = {
  blue:    { accent: 'text-blue-400',   bar: 'bg-blue-500',   tagBg: 'bg-blue-500/10',   tagText: 'text-blue-400' },
  violet:  { accent: 'text-violet-400', bar: 'bg-violet-500', tagBg: 'bg-violet-500/10', tagText: 'text-violet-400' },
  emerald: { accent: 'text-emerald-400',bar: 'bg-emerald-500',tagBg: 'bg-emerald-500/10',tagText: 'text-emerald-400' },
  amber:   { accent: 'text-amber-400',  bar: 'bg-amber-500',  tagBg: 'bg-amber-500/10',  tagText: 'text-amber-400' },
  rose:    { accent: 'text-rose-400',   bar: 'bg-rose-500',   tagBg: 'bg-rose-500/10',   tagText: 'text-rose-400' },
};

const SkillsMatrix: React.FC = () => {
  const { setActiveSection } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  useEffect(() => {
    if (isIntersecting) setActiveSection('skills');
  }, [isIntersecting, setActiveSection]);

  const active = skillCategories.find((c) => c.id === activeCategory) ?? skillCategories[0];
  const colors = colorMap[active.color] ?? colorMap.blue;
  const Icon = iconMap[active.icon];

  return (
    <section id="skills" ref={ref} className="section-wrapper dark:bg-surface/30 bg-gray-50/60">
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
            Technical Skills
          </p>
          <h2 className="section-title">
            Skills <span className="text-gradient-brand">Matrix</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            A categorized taxonomy of my technical stack — from pixel-perfect UIs to bare-metal embedded firmware.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Category selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            {skillCategories.map((cat) => {
              const CatIcon = iconMap[cat.icon];
              const catColors = colorMap[cat.color] ?? colorMap.blue;
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                    isActive
                      ? `border-brand-primary/40 bg-brand-primary/8 ${catColors.accent}`
                      : 'border-border-subtle bg-surface hover:bg-surface-hover text-content-secondary hover:text-content-primary'
                  }`}
                >
                  {CatIcon && (
                    <CatIcon className={`w-4 h-4 shrink-0 ${isActive ? catColors.accent : ''}`} />
                  )}
                  <span className="font-medium text-sm">{cat.label}</span>
                  {isActive && (
                    <span className="ml-auto text-xs font-mono text-content-muted">{cat.skills.length}</span>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Skills panel */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="dark:bg-surface bg-white rounded-2xl border border-border-subtle p-6 shadow-sm"
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.tagBg} border border-current/20`}>
                {Icon && <Icon className={`w-5 h-5 ${colors.accent}`} />}
              </div>
              <div>
                <h3 className="font-display font-semibold text-content-primary">{active.label}</h3>
                <p className="text-xs text-content-muted font-mono">{active.skills.length} technologies</p>
              </div>
            </div>

            {/* Skill bars */}
            <div className="space-y-5">
              {active.skills.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-content-primary">{skill.name}</span>
                    <span className={`text-xs font-mono ${colors.accent}`}>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${colors.bar} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border-subtle">
              {active.skills.map((s) => (
                <span
                  key={s.name}
                  className={`px-2.5 py-1 rounded-badge text-xs font-mono ${colors.tagBg} ${colors.tagText} border border-current/20`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
