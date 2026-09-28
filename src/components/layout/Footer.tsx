import React from 'react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { GitBranch, Link2, Mail, MessageCircle, Sliders } from 'lucide-react';

const Footer: React.FC = () => {
  const { profile, openCustomizer } = usePortfolio();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-surface/50 relative z-10">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand-primary flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs">
                {profile.name.charAt(0) || 'K'}
              </span>
            </div>
            <span className="font-display font-semibold text-content-primary text-sm">
              {profile.name.split(' ')[0] || 'Kibrom'}<span className="text-brand-primary">.dev</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="text-xs text-content-muted font-mono text-center">
              © {year} {profile.name} · Clean Architecture & High-Performance Web
            </p>
            <button
              onClick={openCustomizer}
              className="text-xs font-mono text-brand-primary hover:underline flex items-center gap-1"
            >
              <Sliders className="w-3 h-3" />
              Customize
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            {[
              { icon: <GitBranch className="w-4 h-4" />, href: profile.github, label: 'GitHub' },
              { icon: <Link2 className="w-4 h-4" />, href: profile.linkedin, label: 'LinkedIn' },
              { icon: <Mail className="w-4 h-4" />, href: `mailto:${profile.email}`, label: 'Email' },
              { icon: <MessageCircle className="w-4 h-4" />, href: profile.telegram, label: 'Telegram' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover border border-border-subtle transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;