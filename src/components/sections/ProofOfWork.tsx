import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockEndpoints } from '../../data/portfolioData';
import { SpotlightCard } from '../ui/SpotlightCard';
import { SectionReveal } from '../ui/SectionReveal';
import { Play, CheckCircle2, Clock, AlertCircle, Zap } from 'lucide-react';

type EndpointStatus = 'idle' | 'loading' | 'done';

const methodColors: Record<string, string> = {
  GET: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  POST: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  PUT: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  DELETE: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
};

const ArchDiagramNode: React.FC<{ label: string; color: string; delay?: number }> = ({ label, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border text-center ${color}`}
  >
    {label}
  </motion.div>
);


const ProofOfWork: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [status, setStatus] = useState<EndpointStatus>('idle');
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);

  const active = mockEndpoints[selectedIdx];

  const executeRequest = () => {
    setStatus('loading');
    setElapsedMs(null);
    const start = Date.now();
    setTimeout(() => {
      setElapsedMs(Date.now() - start - active.latencyMs * 4 + active.latencyMs);
      setStatus('done');
    }, active.latencyMs * 6);
  };

  return (
    <section id="proof-of-work" className="section-wrapper dark:bg-surface/20 bg-gray-50/60">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <SectionReveal variant="rise">
          <div className="section-header">
            <p className="section-tag">
              <span className="w-4 h-px bg-brand-primary" />
              Proof of Work
            </p>
            <h2 className="section-title text-content-primary">
              Live API & Architecture Explorer
            </h2>
            <p className="section-subtitle max-w-xl">
              Test real mock endpoints from my backend projects and visualize the system topology pipeline.
            </p>
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ── API Playground ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard className="p-6 flex flex-col gap-5 h-full">
              {/* Panel header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="font-display font-semibold text-content-primary">Live API Sandbox</span>
                </div>
                <span className="text-[11px] font-mono text-content-muted">Mock NestJS Backend</span>
              </div>

              {/* Endpoint selector tabs */}
              <div className="flex flex-wrap gap-2">
                {mockEndpoints.map((ep, idx) => (
                  <button
                    key={ep.id}
                    onClick={() => { setSelectedIdx(idx); setStatus('idle'); setElapsedMs(null); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${
                      selectedIdx === idx
                        ? methodColors[ep.method]
                        : 'text-content-muted border-border-subtle hover:border-brand-primary hover:text-content-primary'
                    }`}
                  >
                    <span className="font-bold">{ep.method}</span>
                  </button>
                ))}
              </div>

              {/* Endpoint info */}
              <div>
                <div className="text-sm font-medium text-content-primary mb-1">{active.name}</div>
                <p className="text-xs text-content-secondary">{active.description}</p>
              </div>

              {/* Request row */}
              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-subtle border border-border-subtle font-mono text-xs overflow-hidden">
                  <span className={`font-bold ${methodColors[active.method].split(' ')[0]} shrink-0`}>{active.method}</span>
                  <span className="text-content-primary truncate">{active.path}</span>
                </div>
                <button
                  onClick={executeRequest}
                  disabled={status === 'loading'}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-button bg-brand-primary hover:opacity-90 active:scale-95 text-white text-xs font-semibold transition-all disabled:opacity-50"
                >
                  {status === 'loading'
                    ? <><Zap className="w-3.5 h-3.5 animate-spin" /> Running</>
                    : <><Play className="w-3.5 h-3.5 fill-current" /> Execute</>}
                </button>
              </div>

              {/* Response panel */}
              <div className="flex-1 rounded-xl bg-black/40 border border-border-subtle p-4 font-mono text-xs overflow-x-auto">
                {/* Status bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-subtle/40 text-[11px]">
                  <div className="flex items-center gap-4">
                    <span className={`flex items-center gap-1.5 ${status === 'done' ? 'text-emerald-400' : 'text-content-muted'}`}>
                      {status === 'done' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      {status === 'done' ? `${active.statusCode} OK` : status === 'loading' ? 'Executing…' : 'Awaiting execution'}
                    </span>
                    {elapsedMs !== null && (
                      <span className="flex items-center gap-1 text-content-muted">
                        <Clock className="w-3 h-3" />
                        {elapsedMs}ms
                      </span>
                    )}
                  </div>
                  <span className="text-content-muted">application/json</span>
                </div>

                {/* Response body */}
                <AnimatePresence mode="wait">
                  {status === 'done' && (
                    <motion.pre
                      key="response"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-content-primary leading-relaxed whitespace-pre-wrap"
                    >
                      {JSON.stringify(active.response, null, 2)}
                    </motion.pre>
                  )}
                  {status === 'loading' && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      {[80, 65, 90, 50].map((w, i) => (
                        <div key={i} className={`h-3 rounded bg-surface-subtle animate-pulse-slow`} style={{ width: `${w}%` }} />
                      ))}
                    </motion.div>
                  )}
                  {status === 'idle' && (
                    <motion.span key="idle" className="text-content-muted">
                      {'// Click "Execute" to send a mock request and inspect the response'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ── Architecture Visualizer ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard
              spotlightColor="rgba(139,92,246,0.10)"
              className="p-6 flex flex-col gap-6 h-full"
            >
              <div className="pb-4 border-b border-border-subtle">
                <h3 className="font-display font-semibold text-content-primary mb-1">System Topology</h3>
                <p className="text-xs text-content-secondary">Frontend → Gateway → Service Layer → Data Layer</p>
              </div>

              {/* Pipeline diagram */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Client layer */}
                <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-content-muted mb-3">Client Layer</div>
                  <div className="flex gap-2 flex-wrap">
                    <ArchDiagramNode label="React SPA" color="text-blue-400 bg-blue-500/10 border-blue-500/30" delay={0.1} />
                    <ArchDiagramNode label="Next.js SSR" color="text-blue-400 bg-blue-500/10 border-blue-500/30" delay={0.15} />
                    <ArchDiagramNode label="Flutter App" color="text-sky-400 bg-sky-500/10 border-sky-500/30" delay={0.2} />
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="flex flex-col items-center gap-0.5 text-content-muted text-[11px] font-mono">
                    <div className="w-px h-6 bg-border-glow/50" />
                    <span className="text-brand-primary text-xs">HTTPS / WSS</span>
                    <div className="w-px h-6 bg-border-glow/50" />
                  </div>
                </div>

                {/* API Gateway */}
                <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/20">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-content-muted mb-3">API Gateway (NestJS)</div>
                  <div className="flex gap-2 flex-wrap">
                    <ArchDiagramNode label="JWT Guard" color="text-violet-400 bg-violet-500/10 border-violet-500/30" delay={0.3} />
                    <ArchDiagramNode label="Rate Limiter" color="text-violet-400 bg-violet-500/10 border-violet-500/30" delay={0.35} />
                    <ArchDiagramNode label="Service Router" color="text-violet-400 bg-violet-500/10 border-violet-500/30" delay={0.4} />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-border-glow/30" />
                </div>

                {/* Services */}
                <div className="grid grid-cols-3 gap-2">
                  {['Auth Svc', 'Student Svc', 'Records Svc'].map((svc, i) => (
                    <ArchDiagramNode key={svc} label={svc} color="text-amber-400 bg-amber-500/10 border-amber-500/30" delay={0.5 + i * 0.05} />
                  ))}
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-border-glow/30" />
                </div>

                {/* Data layer */}
                <div className="grid grid-cols-2 gap-2">
                  <ArchDiagramNode label="PostgreSQL (Prisma)" color="text-emerald-400 bg-emerald-500/10 border-emerald-500/30" delay={0.65} />
                  <ArchDiagramNode label="Redis Cache" color="text-emerald-400 bg-emerald-500/10 border-emerald-500/30" delay={0.7} />
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-border-subtle text-[11px] font-mono">
                {[
                  { color: 'bg-blue-500', label: 'Client' },
                  { color: 'bg-violet-500', label: 'Gateway' },
                  { color: 'bg-amber-500', label: 'Services' },
                  { color: 'bg-emerald-500', label: 'Data' },
                ].map((l) => (
                  <span key={l.label} className="flex items-center gap-1.5 text-content-muted">
                    <span className={`w-2 h-2 rounded-full ${l.color}`} />
                    {l.label}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProofOfWork;
