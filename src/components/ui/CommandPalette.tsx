import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command } from 'cmdk';
import {
  Search, FileText, Layers, FolderGit2, Briefcase, Send,
  Link2, Copy, Check, ExternalLink, Terminal,
  X, Hash, Sliders,
} from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onOpenChange }) => {
  const { profile, openCustomizer } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const navigateTo = useCallback((hash: string) => {
    onOpenChange(false);
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [onOpenChange]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onOpenChange(false);
    }, 1400);
  }, [onOpenChange, profile.email]);

  const downloadResume = useCallback(() => {
    onOpenChange(false);
    window.open(profile.resume, '_blank');
  }, [onOpenChange, profile.resume]);

  const handleOpenStudio = useCallback(() => {
    onOpenChange(false);
    setTimeout(() => openCustomizer(), 100);
  }, [onOpenChange, openCustomizer]);

  const openLink = useCallback((url: string) => {
    onOpenChange(false);
    window.open(url, '_blank', 'noopener');
  }, [onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-2xl shadow-black/80"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)' }}
          >
            <Command label="Kebi Portfolio Command Palette">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 border-b border-border-subtle">
                <Search className="w-4 h-4 text-content-muted shrink-0" />
                <Command.Input
                  autoFocus
                  placeholder="Navigate, search actions, or open links..."
                  className="flex-1 bg-transparent text-sm text-content-primary placeholder:text-content-muted outline-none border-0 py-4"
                />
                <button
                  onClick={() => onOpenChange(false)}
                  className="p-1 rounded-md text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <Command.List>
                <Command.Empty className="py-10 text-center text-sm text-content-muted">
                  No results. Try "API", "resume", or a section name.
                </Command.Empty>

                {/* Navigation */}
                <Command.Group heading="Navigate">
                  {[
                    { label: 'Hero & Positioning', hash: '#hero', icon: <Hash className="w-4 h-4 text-blue-400" /> },
                    { label: 'Engineering Philosophy', hash: '#philosophy', icon: <Layers className="w-4 h-4 text-violet-400" /> },
                    { label: 'Skills Matrix', hash: '#skills', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
                    { label: 'Featured Case Studies', hash: '#projects', icon: <FolderGit2 className="w-4 h-4 text-blue-400" /> },
                    { label: 'Experience Timeline', hash: '#experience', icon: <Briefcase className="w-4 h-4 text-sky-400" /> },
                    { label: 'Contact', hash: '#contact', icon: <Send className="w-4 h-4 text-rose-400" /> },
                  ].map((item) => (
                    <Command.Item
                      key={item.hash}
                      value={item.label}
                      onSelect={() => navigateTo(item.hash)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Actions */}
                <Command.Group heading="Actions">
                  <Command.Item value="customize website studio settings" onSelect={handleOpenStudio}>
                    <Sliders className="w-4 h-4 text-brand-primary" />
                    <span>Customize Site (Theme, Background, Projects)</span>
                    <span className="ml-auto text-[11px] text-brand-primary font-mono font-semibold">Studio</span>
                  </Command.Item>
                  <Command.Item value="download resume" onSelect={downloadResume}>
                    <FileText className="w-4 h-4 text-brand-primary" />
                    <span>Download Resume (PDF)</span>
                    <span className="ml-auto text-[11px] text-content-muted font-mono">PDF</span>
                  </Command.Item>
                  <Command.Item value="copy email address" onSelect={copyEmail}>
                    {copied
                      ? <Check className="w-4 h-4 text-emerald-400" />
                      : <Copy className="w-4 h-4 text-content-secondary" />}
                    <span>{copied ? 'Copied to clipboard!' : 'Copy Email Address'}</span>
                    <span className="ml-auto text-[11px] text-content-muted font-mono">{profile.email}</span>
                  </Command.Item>
                </Command.Group>

                {/* Links */}
                <Command.Group heading="Profiles">
                  <Command.Item value="github profile" onSelect={() => openLink(profile.github)}>
                    <FolderGit2 className="w-4 h-4 text-content-secondary" />
                    <span>GitHub — @kibrom-bit</span>
                    <ExternalLink className="ml-auto w-3.5 h-3.5 text-content-muted" />
                  </Command.Item>
                  <Command.Item value="linkedin profile" onSelect={() => openLink(profile.linkedin)}>
                    <Link2 className="w-4 h-4 text-blue-500" />
                    <span>LinkedIn Network</span>
                    <ExternalLink className="ml-auto w-3.5 h-3.5 text-content-muted" />
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-border-subtle bg-surface-subtle/50 text-[11px] font-mono text-content-muted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border-subtle">↵</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border-subtle">↑↓</kbd>
                    Navigate
                  </span>
                </div>
                <span>Esc to close</span>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
