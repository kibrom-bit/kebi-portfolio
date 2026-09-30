import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Key, X, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { usePortfolio } from '../../contexts/PortfolioContext';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, changePasskey } = useAdmin();
  const { openCustomizer } = usePortfolio();

  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isChangingPasskey, setIsChangingPasskey] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [changeSuccess, setChangeSuccess] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!pin.trim()) {
      setErrorMsg('Please enter your admin passkey');
      return;
    }

    const success = login(pin);
    if (success) {
      setPin('');
      openCustomizer();
    } else {
      setErrorMsg('Invalid passkey. Please try again.');
    }
  };

  const handleChangePasskeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setChangeSuccess(null);

    if (newPin.trim().length < 4) {
      setErrorMsg('New passkey must be at least 4 characters');
      return;
    }

    const success = changePasskey(currentPin, newPin);
    if (success) {
      setChangeSuccess('Passkey updated successfully! Use new key to login.');
      setCurrentPin('');
      setNewPin('');
      setTimeout(() => {
        setIsChangingPasskey(false);
        setChangeSuccess(null);
      }, 2000);
    } else {
      setErrorMsg('Current passkey incorrect.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-hidden relative"
        >
          {/* Top Banner Glow */}
          <div className="h-1.5 w-full bg-gradient-to-r from-brand-primary via-purple-500 to-emerald-400" />

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-content-primary flex items-center gap-2">
                  Portfolio Studio Portal
                </h3>
                <p className="text-xs text-content-muted font-mono">
                  Owner authentication & customization access
                </p>
              </div>
            </div>

            {!isChangingPasskey ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-content-secondary mb-1.5">
                    Admin Passkey / PIN
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-content-muted">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoFocus
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        setErrorMsg(null);
                      }}
                      placeholder="Enter passkey..."
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-content-primary placeholder-content-muted/60 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-content-muted hover:text-content-primary"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-mono"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <div className="flex items-center justify-end text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPasskey(true);
                      setErrorMsg(null);
                    }}
                    className="text-brand-primary hover:underline font-mono text-[11px]"
                  >
                    Change passkey
                  </button>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full btn-primary py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20"
                  >
                    <Key className="w-4 h-4" />
                    Unlock Studio & Customizer
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleChangePasskeySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-medium text-content-secondary mb-1">
                    Current Passkey
                  </label>
                  <input
                    type="password"
                    value={currentPin}
                    onChange={(e) => setCurrentPin(e.target.value)}
                    placeholder="Enter current passkey"
                    className="w-full px-3 py-2 rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-content-secondary mb-1">
                    New Passkey
                  </label>
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="New secret passkey (min 4 chars)"
                    className="w-full px-3 py-2 rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary text-xs font-mono"
                  />
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                {changeSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{changeSuccess}</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPasskey(false);
                      setErrorMsg(null);
                    }}
                    className="btn-ghost text-xs py-2 px-3"
                  >
                    Back to Login
                  </button>
                  <button type="submit" className="btn-primary text-xs py-2 px-3">
                    Save New Passkey
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="px-6 py-3 border-t border-border-subtle bg-surface-subtle/50 text-[11px] font-mono text-content-muted flex items-center justify-end">
            <span>Press Esc to close</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
