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
  return (
    <section id="experience" className="section-wrapper bg-app">
      <div className="grid-overlay opacity-25" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <SectionReveal variant="rise">
          <div className="section-header">
            <p className="section-tag">
              <span className="w-4 h-px bg-brand-primary" />
              Work &amp; Leadership
            </p>
            <h2 className="section-title text-content-primary">
              Experience Timeline
            </h2>
            <p className="section-subtitle max-w-xl">
              Chronological record of engineering projects, student union leadership, and technical initiatives.
            </p>
          </div>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative ml-4 md:ml-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => {
              const cfg = categoryConfig[exp.category] ?? categoryConfig.engineering;
              const Icon = cfg.icon;
              return (
                <CardReveal key={exp.id} index={idx} className="relative pl-8 md:pl-12">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1 -translate-x-1/2 w-8 h-8 rounded-xl border-2 flex items-center justify-center bg-black ${cfg.border}`}>
                    <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                  </div>

                  {/* Card: explicitly deep black with crisp, high-visibility text */}
                  <div className="bg-[#090a0b] rounded-2xl border border-zinc-800/90 p-6 md:p-7 hover:border-brand-primary/40 transition-all duration-300 group shadow-xl">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-white text-base md:text-lg group-hover:text-brand-primary transition-colors">
                            {exp.role}
                          </h3>
                          {exp.isCurrent && (
                            <span className="px-2 py-0.5 rounded-badge text-[10px] font-mono font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-zinc-300 mt-1">
                          {exp.organization}
                          <span className="text-zinc-500 font-normal"> · {exp.location}</span>
                        </p>
                      </div>
                      <span className="text-xs font-mono text-zinc-300 shrink-0 bg-zinc-900/90 px-3 py-1.5 rounded-lg border border-zinc-800">
                        {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                      {exp.summary}
                    </p>

                    {/* Leadership scope */}
                    {exp.leadershipScope && (
                      <div className={`flex items-start gap-2.5 p-3 rounded-xl mb-4 ${cfg.bg} border ${cfg.border}`}>
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${cfg.color}`} />
                        <p className={`text-xs font-medium leading-relaxed ${cfg.color}`}>
                          {exp.leadershipScope}
                        </p>
                      </div>
                    )}

                    {/* Accomplishments */}
                    <ul className="space-y-2.5 mb-5">
                      {exp.accomplishments.map((a) => (
                        <li key={a} className="flex items-start gap-2.5 text-sm text-zinc-200">
                          <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${cfg.color}`} />
                          <span className="leading-snug">{a}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 pt-3.5 border-t border-zinc-800/80">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900/90 text-zinc-200 border border-zinc-800 hover:border-brand-primary hover:text-white transition-colors"
                        >
                          {t}
                        </span>
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
