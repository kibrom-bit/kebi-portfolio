import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { useApp } from '../../contexts/AppContext';
import { projects } from '../../data/portfolioData';
import { SpotlightCard } from '../ui/SpotlightCard';
import { FolderGit2, ExternalLink, ChevronRight, X, TrendingUp, Cpu, Layers, BarChart3 } from 'lucide-react';

const accentMap: Record<string, { glow: string; text: string; bg: string; border: string }> = {
  blue:    { glow: 'rgba(59,130,246,0.12)',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  violet:  { glow: 'rgba(139,92,246,0.12)',   text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  emerald: { glow: 'rgba(16,185,129,0.12)',   text: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/30' },
  amber:   { glow: 'rgba(245,158,11,0.12)',   text: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30' },
};

type Project = (typeof projects)[0];

const FeaturedProjects: React.FC = () => {
  const { setActiveSection } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (isIntersecting) setActiveSection('projects');
  }, [isIntersecting, setActiveSection]);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" ref={ref} className="section-wrapper bg-app">
      <div className="grid-overlay opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="section-header mb-0">
            <p className="section-tag">
              <span className="w-4 h-px bg-brand-primary" />
              Featured Work
            </p>
            <h2 className="section-title">
              Engineering{' '}
              <span className="text-gradient-brand">Case Studies</span>
            </h2>
            <p className="section-subtitle max-w-xl">
              Deep-dive breakdowns with architecture diagrams, impact metrics, and trade-off documentation.
            </p>
          </div>
          <a
            href="https://github.com/kibrom-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost shrink-0 text-sm"
          >
            <FolderGit2 className="w-4 h-4" />
            View All on GitHub
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {featured.map((project, idx) => {
            const colors = accentMap[project.accentColor] ?? accentMap.blue;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={idx === 0 ? 'md:col-span-2 xl:col-span-1' : ''}
              >
                <SpotlightCard
                  className="h-full flex flex-col p-6 gap-5 cursor-pointer"
                  spotlightColor={colors.glow}
                  onClick={() => setSelected(project)}
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-badge text-[11px] font-mono ${colors.bg} ${colors.text} border ${colors.border} mb-3`}>
                        {project.category.toUpperCase()}
                      </div>
                      <h3 className="font-display font-semibold text-content-primary text-lg leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-content-muted font-mono mt-1">{project.timeline}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 shrink-0 mt-1 ${colors.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200`} />
                  </div>

                  {/* Tagline */}
                  <p className="text-sm text-content-secondary leading-relaxed">{project.tagline}</p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className={`text-xl font-display font-bold ${colors.text}`}>{m.value}</span>
                        <span className="text-[11px] text-content-muted mt-0.5">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border-subtle">
                    {project.techStack.slice(0, 5).map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="tech-badge">+{project.techStack.length - 5}</span>
                    )}
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${colors.text} flex items-center gap-1`}>
                      View case study
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover border border-border-subtle transition-colors"
                        >
                          <FolderGit2 className="w-3.5 h-3.5 text-content-secondary" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover border border-border-subtle transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-content-secondary" />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}

          {/* Non-featured teaser */}
          {projects.filter((p) => !p.featured).map((project, idx) => {
            const colors = accentMap[project.accentColor] ?? accentMap.blue;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (featured.length + idx) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <SpotlightCard
                  className="flex flex-col p-5 gap-4 cursor-pointer"
                  spotlightColor={colors.glow}
                  onClick={() => setSelected(project)}
                >
                  <div className={`inline-flex w-10 h-10 rounded-xl items-center justify-center ${colors.bg} border ${colors.border}`}>
                    <Cpu className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-content-primary leading-snug">{project.title}</h3>
                    <p className="text-xs text-content-secondary mt-1.5 line-clamp-2">{project.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.techStack.slice(0, 3).map((t) => <span key={t} className="tech-badge">{t}</span>)}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Case Study Modal ── */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[998] flex items-center justify-center p-4">
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border-subtle bg-surface shadow-2xl"
            >
              {(() => {
                const colors = accentMap[selected.accentColor] ?? accentMap.blue;
                return (
                  <div className="p-8">
                    {/* Close */}
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute top-5 right-5 p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover border border-border-subtle text-content-muted hover:text-content-primary transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Project title */}
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-badge text-[11px] font-mono ${colors.bg} ${colors.text} border ${colors.border} mb-4`}>
                      {selected.category.toUpperCase()} · {selected.timeline}
                    </div>
                    <h2 className="font-display font-bold text-2xl text-content-primary mb-2">{selected.title}</h2>
                    <p className="text-content-secondary mb-8">{selected.tagline}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {selected.metrics.map((m) => (
                        <div key={m.label} className="p-4 rounded-xl bg-surface-subtle border border-border-subtle text-center">
                          <div className={`text-2xl font-display font-bold ${colors.text}`}>{m.value}</div>
                          <div className="text-xs font-medium text-content-primary mt-1">{m.label}</div>
                          <div className="text-[11px] text-content-muted mt-0.5">{m.description}</div>
                        </div>
                      ))}
                    </div>

                    {/* Problem */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className={`w-4 h-4 ${colors.text}`} />
                        <h4 className="font-semibold text-content-primary text-sm">Problem Statement</h4>
                      </div>
                      <p className="text-sm text-content-secondary leading-relaxed pl-6">{selected.problemStatement}</p>
                    </div>

                    {/* Architecture */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className={`w-4 h-4 ${colors.text}`} />
                        <h4 className="font-semibold text-content-primary text-sm">System Architecture</h4>
                      </div>
                      <div className="ml-6 p-4 rounded-xl bg-black/40 border border-border-subtle font-mono text-xs text-emerald-400 leading-relaxed">
                        {selected.architectureDescription}
                      </div>
                    </div>

                    {/* Trade-offs */}
                    {selected.tradeoffs?.length > 0 && (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                          <h4 className="font-semibold text-content-primary text-sm">Architectural Trade-offs</h4>
                        </div>
                        <div className="ml-6 space-y-3">
                          {selected.tradeoffs.map((t, i) => (
                            <div key={i} className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
                              <div className="font-medium text-content-primary text-sm mb-2">{t.decision}</div>
                              <div className="flex flex-col sm:flex-row gap-2 text-xs mb-2">
                                <span className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  ✓ {t.chosen}
                                </span>
                                <span className="flex-1 px-2.5 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                  ✗ {t.rejected}
                                </span>
                              </div>
                              <p className="text-[11px] text-content-muted leading-relaxed">{t.rationale}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Role */}
                    <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border} mb-6`}>
                      <span className="text-xs font-mono font-semibold uppercase tracking-widest text-content-muted block mb-1">My Role</span>
                      <p className={`text-sm font-medium ${colors.text}`}>{selected.role}</p>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selected.techStack.map((t) => <span key={t} className="tech-badge">{t}</span>)}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {selected.githubUrl && (
                        <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm">
                          <FolderGit2 className="w-4 h-4" /> GitHub
                        </a>
                      )}
                      {selected.liveUrl && (
                        <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedProjects;