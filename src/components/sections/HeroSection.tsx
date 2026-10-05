import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import kebiImg from '../../sections/kebi.png';
import { MapPin, Mail, CheckCircle2, Terminal } from 'lucide-react';
import { SectionReveal } from '../ui/SectionReveal';

// Crisp brand SVGs
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.84 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
  </svg>
);

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

/** Cycles through roles with a smooth fade-swap — no typewriter */
const RoleCycler: React.FC<{ roles: string[] }> = ({ roles }) => {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (roles.length <= 1) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx((i) => (i + 1) % roles.length);
        setFading(false);
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span
      className="transition-opacity duration-400 ease-in-out text-brand-primary font-mono"
      style={{ opacity: fading ? 0 : 1 }}
    >
      {roles[idx]}
    </span>
  );
};

const HeroSection: React.FC = () => {
  const { profile } = usePortfolio();

  const roles =
    profile.roles && profile.roles.length > 0
      ? profile.roles
      : ['Full-Stack Software Engineer'];

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-transparent pt-28 pb-16"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-12 items-center">

            {/* Profile Avatar Column */}
            <SectionReveal variant="glide" delay={0}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="relative">
                  {/* Clean avatar — no glow ring */}
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-border-subtle bg-surface shadow-2xl">
                    <img
                      src={kebiImg}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Verified badge */}
                  <div
                    className="absolute bottom-2 right-2 p-1.5 rounded-full bg-brand-primary text-white border-2 border-surface shadow-lg"
                    title="Verified Developer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Handle & Location */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-center md:justify-start gap-1.5 text-content-muted font-mono text-xs">
                    <Terminal className="w-3.5 h-3.5 text-brand-primary" />
                    <span>@{profile.handle || 'kebi'}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-1.5 text-content-secondary text-xs">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{profile.location || 'Mekelle, Ethiopia'}</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Profile Details Column */}
            <SectionReveal variant="rise" delay={120}>
              <div className="text-center md:text-left">
                {/* Main Heading — single color, no gradient */}
                <h1 className="font-display font-extrabold tracking-tight leading-tight mb-3">
                  <span className="block text-4xl sm:text-5xl lg:text-6xl text-content-primary">
                    Hi, I'm{' '}
                    <span className="text-brand-primary">{profile.name}</span>
                  </span>
                </h1>

                {/* Role display — smooth fade swap, no typewriter */}
                <div className="text-xl sm:text-2xl text-content-secondary font-medium mb-5 min-h-[36px] flex items-center justify-center md:justify-start">
                  <RoleCycler roles={roles} />
                </div>

                {/* Tagline */}
                <p className="text-base sm:text-lg text-content-secondary leading-relaxed max-w-2xl mb-8">
                  {profile.tagline}
                </p>

                {/* Social pills */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-border-subtle bg-surface hover:bg-surface-hover hover:border-brand-primary text-content-secondary hover:text-content-primary transition-all duration-200"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-content-primary" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-border-subtle bg-surface hover:bg-surface-hover hover:border-blue-400 text-content-secondary hover:text-content-primary transition-all duration-200"
                    >
                      <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {profile.telegram && (
                    <a
                      href={profile.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-border-subtle bg-surface hover:bg-surface-hover hover:border-cyan-400 text-content-secondary hover:text-content-primary transition-all duration-200"
                    >
                      <TelegramIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Telegram</span>
                    </a>
                  )}

                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border border-border-subtle bg-surface hover:bg-surface-hover hover:border-emerald-400 text-content-secondary hover:text-content-primary transition-all duration-200"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{profile.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </SectionReveal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;