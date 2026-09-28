import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks';
import { useApp } from '../../contexts/AppContext';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Mail, FolderGit2, Link2, Send, Check, MapPin, Clock, MessageSquare } from 'lucide-react';

const ContactSection: React.FC = () => {
  const { setActiveSection } = useApp();
  const { profile } = usePortfolio();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', type: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (isIntersecting) setActiveSection('contact');
  }, [isIntersecting, setActiveSection]);

  // Live clock (EAT = UTC+3)
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const eat = new Date(now.getTime() + 3 * 60 * 60 * 1000);
      setTime(eat.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send (hook up EmailJS or Resend here)
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1600);
  };

  const directContacts = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, color: 'text-blue-400' },
    { icon: <FolderGit2 className="w-4 h-4" />, label: 'GitHub', value: profile.github.replace('https://github.com/', '@'), href: profile.github, color: 'text-content-secondary' },
    { icon: <Link2 className="w-4 h-4" />, label: 'LinkedIn', value: profile.name, href: profile.linkedin, color: 'text-blue-500' },
    { icon: <MessageSquare className="w-4 h-4" />, label: 'Telegram', value: profile.telegram.replace('https://t.me/', '@'), href: profile.telegram, color: 'text-sky-400' },
  ];

  return (
    <section id="contact" ref={ref} className="section-wrapper bg-transparent">
      <div className="grid-overlay opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-tag">
            <span className="w-4 h-px bg-brand-primary" />
            Get In Touch
          </p>
          <h2 className="section-title">
            Let's{' '}
            <span className="text-gradient-brand">Build Together</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            Open to full-stack engineering roles, collaborative projects, and freelance opportunities. I respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard className="p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center">
                    <Check className="w-8 h-8 text-brand-emerald" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-content-primary">Message Sent!</h3>
                  <p className="text-content-secondary max-w-xs">
                    Thanks for reaching out. I'll get back to you at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', type: '', message: '' }); }}
                    className="btn-ghost text-sm mt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-content-secondary mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Kibrom Abebe"
                        value={formData.name}
                        onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-border-subtle text-content-primary placeholder:text-content-muted text-sm
                                   focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-content-secondary mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-border-subtle text-content-primary placeholder:text-content-muted text-sm
                                   focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-content-secondary mb-1.5">Opportunity Type</label>
                    <select
                      required
                      value={formData.type}
                      onChange={(e) => setFormData((f) => ({ ...f, type: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-border-subtle text-content-primary text-sm
                                 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                    >
                      <option value="">Select a category...</option>
                      <option value="fulltime">Full-Time Engineering Role</option>
                      <option value="contract">Contract / Freelance Project</option>
                      <option value="collab">Open Source Collaboration</option>
                      <option value="other">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-content-secondary mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about the role, project scope, tech stack, and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-surface-subtle border border-border-subtle text-content-primary placeholder:text-content-muted text-sm resize-none
                                 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full justify-center disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </SpotlightCard>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Location & time */}
            <SpotlightCard spotlightColor="rgba(16,185,129,0.08)" className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-brand-emerald" />
                <span className="font-medium text-content-primary text-sm">Location & Availability</span>
              </div>
              <p className="text-sm text-content-secondary mb-2">{profile.location}</p>
              <div className="flex items-center gap-2 text-xs font-mono text-content-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>Local time: </span>
                <span className="text-brand-emerald font-semibold">{time}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-brand-emerald" />
                </span>
                <span className="text-xs text-brand-emerald font-medium">Available for new opportunities</span>
              </div>
            </SpotlightCard>

            {/* Direct contacts */}
            <SpotlightCard spotlightColor="rgba(59,130,246,0.08)" className="p-5">
              <h4 className="font-medium text-content-primary text-sm mb-4">Direct Connect</h4>
              <div className="space-y-3">
                {directContacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-surface-subtle hover:bg-surface-hover border border-border-subtle hover:border-brand-primary/40 transition-all group"
                  >
                    <span className={`${c.color}`}>{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-content-muted font-mono">{c.label}</div>
                      <div className="text-xs text-content-primary truncate group-hover:text-brand-accent transition-colors">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </SpotlightCard>

            {/* Response SLA */}
            <div className="px-5 py-4 rounded-xl border border-border-subtle bg-surface-subtle/50 text-xs text-content-muted font-mono text-center">
              ⚡ Typical response time: <span className="text-content-primary font-semibold">{'< 24 hours'}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;