import React, { useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks';
import { useApp } from '../../contexts/AppContext';
import { experiences } from '../../data/portfolioData';
import { Briefcase, Users, Code2, CheckCircle } from 'lucide-react';
import { SectionReveal, CardReveal } from '../ui/SectionReveal';

const categoryConfig: Record<string, { icon: React.FC<{ className?: string }>; color: string; bg: string; border: string }> = {
  engineering: { icon: Code2,   color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/30' },
  leadership:  { icon: Users,   color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  research:    { icon: Briefcase,color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/30' },
};

const formatDate = (str: string | null) => {
  if (!str) return 'Present';
  const [year, month] = str.split('-');
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ExperienceTimeline: React.FC = () => {
  const { setActiveSection } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) setActiveSection('experience');
  }, [isIntersecting, setActiveSection]);

  return (
    <section id="experience" ref={ref} className="section-wrapper bg-app">
      <div className="grid-overlay opacity-25" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <SectionReveal variant="rise">
          <div className="section-header">
            <p className="section-tag">
              <span className="w-4 h-px bg-brand-primary" />
              Work &amp; Leadership
            </p>
            <h2 className="section-title">
              Experience{' '}
              <span className="text-brand-primary">Timeline</span>
            </h2>
            <p className="section-subtitle max-w-xl">
              Chronological record of engineering projects, student union leadership, and technical initiatives.
            </p>
          </div>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative ml-4 md:ml-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border-subtle" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => {
              const cfg = categoryConfig[exp.category] ?? categoryConfig.engineering;
              const Icon = cfg.icon;
              return (
                <CardReveal key={exp.id} index={idx} className="relative pl-8 md:pl-12">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 -translate-x-1/2 w-8 h-8 rounded-xl border-2 flex items-center justify-center ${cfg.bg} ${cfg.border}`}>
                    <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                  </div>

                  {/* Card */}
                  <div className="dark:bg-surface bg-white rounded-2xl border border-border-subtle p-6 hover:border-brand-primary/30 transition-all duration-300 group shadow-sm">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-semibold text-content-primary">{exp.role}</h3>
                          {exp.isCurrent && (
                            <span className="px-2 py-0.5 rounded-badge text-[10px] font-mono font-medium bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-content-secondary mt-0.5">
                          {exp.organization}
                          <span className="text-content-muted"> · {exp.location}</span>
                        </p>
                      </div>
                      <span className="text-xs font-mono text-content-muted shrink-0 bg-surface-subtle px-3 py-1.5 rounded-lg border border-border-subtle">
                        {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-content-secondary leading-relaxed mb-4">{exp.summary}</p>

                    {/* Leadership scope */}
                    {exp.leadershipScope && (
                      <div className={`flex items-start gap-2 p-3 rounded-lg mb-4 ${cfg.bg} border ${cfg.border}`}>
                        <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${cfg.color}`} />
                        <p className={`text-xs font-medium ${cfg.color}`}>{exp.leadershipScope}</p>
                      </div>
                    )}

                    {/* Accomplishments */}
                    <ul className="space-y-2 mb-4">
                      {exp.accomplishments.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-content-secondary">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${cfg.color}`} />
                          {a}
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-subtle">
                      {exp.technologies.map((t) => (
                        <span key={t} className="tech-badge">{t}</span>
                      ))}
                    </div>
                  </div>
                </CardReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
