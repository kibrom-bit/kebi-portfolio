import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sliders, Eye, EyeOff, LogOut } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { usePortfolio } from '../../contexts/PortfolioContext';

export const AdminBar: React.FC = () => {
  const { isAdmin, isPreviewMode, togglePreviewMode, logout } = useAdmin();
  const { openCustomizer, hasUnpublishedChanges, lastPublishedAt } = usePortfolio();

  if (!isAdmin) return null;

  return (
    <AnimatePresence>
      {!isPreviewMode ? (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-3 left-1/2 -translate-x-1/2 z-[80] w-[95%] max-w-4xl"
        >
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-surface/95 backdrop-blur-xl border border-brand-primary/40 shadow-2xl shadow-brand-primary/10 text-xs">
            {/* Left badge */}
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-primary/15 text-brand-primary font-mono font-semibold border border-brand-primary/30">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Studio</span>
              </span>

              {hasUnpublishedChanges ? (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Unpublished Edits
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Published {lastPublishedAt ? '· Live' : '· Default'}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={openCustomizer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold bg-brand-primary text-white hover:brightness-110 active:scale-95 transition-all shadow-md shadow-brand-primary/25"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Open Customizer</span>
              </button>

              <button
                onClick={togglePreviewMode}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium bg-surface-subtle text-content-secondary border border-border-subtle hover:text-content-primary hover:border-brand-primary/50 transition-all"
                title="Preview portfolio exactly as public visitors see it"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Public Preview</span>
              </button>

              <button
                onClick={logout}
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-content-muted hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                title="Lock Studio & Exit Admin"
                aria-label="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline ml-1">Lock</span>
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Preview Mode Indicator Banner */
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-3 px-4 py-2 rounded-full bg-surface/95 backdrop-blur-xl border border-amber-500/50 shadow-2xl text-xs font-mono text-amber-400"
        >
          <span className="flex items-center gap-1.5">
            <EyeOff className="w-3.5 h-3.5 text-amber-400" />
            <span>Visitor Preview Mode (Read-Only)</span>
          </span>
          <button
            onClick={togglePreviewMode}
            className="px-2.5 py-1 rounded-full bg-brand-primary text-white text-[11px] font-sans font-semibold hover:brightness-110 transition-all"
          >
            Return to Admin Studio
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
