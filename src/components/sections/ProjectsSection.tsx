import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { useAdmin } from '../../contexts/AdminContext';
import { SpotlightCard } from '../ui/SpotlightCard';
import { SectionReveal, CardReveal } from '../ui/SectionReveal';
import { Project } from '../../data/portfolioData';
import {
  FolderGit2,
  ExternalLink,
  ChevronRight,
  X,
  Plus,
  Lock,
  Globe,
  Terminal,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

const accentMap: Record<string, { glow: string; text: string; bg: string; border: string; previewGrad: string }> = {
  blue: {
    glow: 'rgba(59,130,246,0.15)',
    text: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    previewGrad: 'from-blue-950/40 via-surface to-surface-subtle',
  },
  violet: {
    glow: 'rgba(139,92,246,0.15)',
    text: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    previewGrad: 'from-violet-950/40 via-surface to-surface-subtle',
  },
  emerald: {
    glow: 'rgba(16,185,129,0.15)',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    previewGrad: 'from-emerald-950/40 via-surface to-surface-subtle',
  },
  amber: {
    glow: 'rgba(245,158,11,0.15)',
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    previewGrad: 'from-amber-950/40 via-surface to-surface-subtle',
  },
};

// Component to render the home page preview of the project's associated link
const ProjectLinkPreview: React.FC<{ project: Project; colors: (typeof accentMap)['blue'] }> = ({
  project,
  colors,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const targetUrl = project.liveUrl || project.githubUrl || `https://github.com/kibrom-bit/${project.id}`;

  // Clean display domain
  const displayHost = (() => {
    try {
      const u = new URL(targetUrl);
      return u.hostname + (u.pathname.length > 1 && u.pathname.length < 24 ? u.pathname : '');
    } catch {
      return targetUrl.replace(/^https?:\/\//, '');
    }
  })();

  const isLive = Boolean(project.liveUrl);

  return (
    <div className="relative w-full rounded-xl border border-border-subtle bg-surface-subtle overflow-hidden group/preview shadow-inner">
      {/* Browser Chrome Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border-subtle/80 bg-surface/90 backdrop-blur-sm text-[10px] font-mono text-content-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-amber-400/80 inline-block" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/80 inline-block" />
        </div>

        {/* Address bar */}
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-subtle border border-border-subtle/60 text-[10px] text-content-muted max-w-[200px] truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{displayHost}</span>
        </div>

        <div className="flex items-center gap-1 text-content-muted">
          <Globe className="w-3 h-3 opacity-60" />
        </div>
      </div>

      {/* Preview Viewport */}
      <div className={`relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br ${colors.previewGrad} flex items-center justify-center`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
          />
        ) : !imgFailed && project.liveUrl ? (
          <img
            src={`https://api.microlink.io?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
            alt={project.title}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top filter brightness-[0.98] transition-transform duration-500 group-hover/preview:scale-105"
            loading="lazy"
          />
        ) : (
          /* High-Fidelity Stylized Web UI Mockup */
          <div className="w-full h-full p-4 flex flex-col justify-between bg-surface/80 relative select-none">
            {/* Mock website header */}
            <div className="flex items-center justify-between border-b border-border-subtle/40 pb-2">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-md ${colors.bg} flex items-center justify-center`}>
                  <Terminal className={`w-2.5 h-2.5 ${colors.text}`} />
                </div>
                <span className="text-[11px] font-bold font-display text-content-primary truncate max-w-[140px]">
                  {project.title.split('—')[0]}
                </span>
              </div>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                {project.category}
              </span>
            </div>

            {/* Mock website body layout */}
            <div className="space-y-1.5 py-2">
              <div className="h-3 bg-content-primary/10 rounded w-3/4 animate-pulse" />
              <div className="h-2 bg-content-muted/20 rounded w-full" />
              <div className="h-2 bg-content-muted/15 rounded w-5/6" />
            </div>

            {/* Mock website footer bar */}
            <div className="flex items-center justify-between pt-2 border-t border-border-subtle/30 text-[10px] font-mono text-content-muted">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Service
              </span>
              <span className="text-content-muted/60">{project.techStack[0]}</span>
            </div>
          </div>
        )}

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="btn-primary text-xs py-2 px-4 shadow-xl flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <span>{isLive ? 'Visit Live Website' : 'Explore Project Repository'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

const FeaturedProjects: React.FC = () => {
  const { projects, profile, openCustomizer } = usePortfolio();
  const { isAdmin, isPreviewMode } = useAdmin();
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="projects" className="section-wrapper bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <SectionReveal variant="rise">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="section-header mb-0">
              <p className="section-tag">
                <span className="w-4 h-px bg-brand-primary" />
                Featured Work ({projects.length})
              </p>
              <h2 className="section-title text-content-primary">
                Software Projects
              </h2>
              <p className="section-subtitle max-w-xl">
                Live web applications, backend services, and systems architecture with live previews and source code.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {isAdmin && !isPreviewMode && (
                <button
                  onClick={openCustomizer}
                  className="btn-primary text-xs py-2.5 px-4 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add / Manage Projects
                </button>
              )}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm py-2.5"
              >
                <FolderGit2 className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </SectionReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const colors = accentMap[project.accentColor] ?? accentMap.blue;
            return (
              <CardReveal key={project.id} index={idx}>
                <SpotlightCard
                  className="h-full flex flex-col p-5 gap-4 cursor-pointer group"
                  spotlightColor={colors.glow}
                  onClick={() => setSelected(project)}
                >
                  {/* Associated Link Home Page Preview */}
                  <ProjectLinkPreview project={project} colors={colors} />

                  {/* Card Title & Category */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {project.category}
                      </span>
                      <span className="text-[11px] text-content-muted font-mono">{project.timeline}</span>
                    </div>

                    <h3 className="font-display font-semibold text-content-primary text-base leading-snug group-hover:text-brand-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Tagline / Description */}
                  <p className="text-xs text-content-secondary leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border-subtle">
                    {project.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="tech-badge text-[11px] py-0.5 px-2">{t}</span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="tech-badge text-[11px] py-0.5 px-2">+{project.techStack.length - 4}</span>
                    )}
                  </div>

                  {/* Action Row */}
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-xs font-medium ${colors.text} flex items-center gap-1 group-hover:underline`}>
                      Architecture & Details
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-surface-subtle hover:bg-surface-hover border border-border-subtle transition-colors"
                          title="View Source Code"
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
                          className="p-1.5 rounded-lg bg-surface-subtle hover:bg-surface-hover border border-border-subtle transition-colors"
                          title="Open Live Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-content-secondary" />
                        </a>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              </CardReveal>
            );
          })}
        </div>
      </div>

      {/* ── Case Study Deep Dive Modal ── */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selected && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                  className="w-full max-w-3xl max-h-[90vh] bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-y-auto relative my-auto p-6 md:p-8 space-y-6"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-5 right-5 p-2 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors z-10"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Header */}
                  <div>
                    <span className="text-xs font-mono uppercase text-brand-primary tracking-wider font-semibold">
                      {selected.category} · {selected.timeline}
                    </span>
                    <h2 className="text-2xl font-bold font-display text-content-primary mt-1">
                      {selected.title}
                    </h2>
                    <p className="text-sm text-content-secondary mt-2 leading-relaxed">
                      {selected.tagline}
                    </p>
                  </div>

                  {/* Associated Live Link Banner */}
                  {(selected.liveUrl || selected.githubUrl) && (
                    <div className="p-3.5 rounded-xl border border-brand-primary/30 bg-brand-primary/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-content-primary">
                        <Globe className="w-4 h-4 text-brand-primary" />
                        <span className="truncate max-w-md">{selected.liveUrl || selected.githubUrl}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {selected.liveUrl && (
                          <a
                            href={selected.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                          >
                            <span>Open Live Site</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {selected.githubUrl && (
                          <a
                            href={selected.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5"
                          >
                            <FolderGit2 className="w-3.5 h-3.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Problem Statement */}
                  {selected.problemStatement && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-content-muted mb-2 font-bold">
                        Problem Statement & Constraints
                      </h4>
                      <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle text-xs text-content-secondary leading-relaxed">
                        {selected.problemStatement}
                      </div>
                    </div>
                  )}

                  {/* System Architecture */}
                  {selected.architectureDescription && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-content-muted mb-2 font-bold flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-brand-primary" />
                        System Architecture Flow
                      </h4>
                      <div className="p-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5 font-mono text-xs text-brand-primary leading-relaxed">
                        {selected.architectureDescription}
                      </div>
                    </div>
                  )}

                  {/* Architectural Trade-offs */}
                  {selected.tradeoffs && selected.tradeoffs.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-content-muted mb-2 font-bold">
                        Architectural Trade-offs & Decisions
                      </h4>
                      <div className="space-y-3">
                        {selected.tradeoffs.map((t, i) => (
                          <div key={i} className="p-4 rounded-xl border border-border-subtle bg-surface-subtle space-y-2 text-xs">
                            <div className="font-semibold text-content-primary">{t.decision}</div>
                            <div className="grid sm:grid-cols-2 gap-2 text-[11px] font-mono">
                              <div className="p-2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <strong>Chosen:</strong> {t.chosen}
                              </div>
                              <div className="p-2 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                                <strong>Rejected:</strong> {t.rejected}
                              </div>
                            </div>
                            <p className="text-content-secondary text-xs pt-1">{t.rationale}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack List */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-content-muted mb-2 font-bold">
                      Technologies & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.techStack.map((tech) => (
                        <span key={tech} className="tech-badge py-1 px-2.5 text-xs font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default FeaturedProjects;