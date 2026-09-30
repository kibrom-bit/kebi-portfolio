import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  isPreviewMode: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (pin: string) => boolean;
  logout: () => void;
  togglePreviewMode: () => void;
  changePasskey: (oldPin: string, newPin: string) => boolean;
  setPasskeyDirect: (newPin: string) => boolean;
  hasCustomPasskey: boolean;
}

const STORAGE_KEYS = {
  AUTH_SESSION: 'kebi_admin_session_v2',
  AUTH_LOCAL_LEGACY: 'kebi_admin_remember_v1',
  PASSKEY: 'kebi_admin_passkey_v1',
};

const DEFAULT_PASSKEY = 'kebi2025';

// Clear legacy persistence immediately
try {
  localStorage.removeItem('kebi_admin_remember_v1');
  localStorage.removeItem('kebi_admin_session_v1');
} catch {}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true';
    } catch {
      return false;
    }
  });

  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const getStoredPasskey = useCallback((): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PASSKEY) || DEFAULT_PASSKEY;
    } catch {
      return DEFAULT_PASSKEY;
    }
  }, []);

  const hasCustomPasskey = Boolean(localStorage.getItem(STORAGE_KEYS.PASSKEY));

  const openAuthModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const login = useCallback((pin: string): boolean => {
    const currentPass = getStoredPasskey();
    if (pin.trim() === currentPass) {
      setIsAdmin(true);
      setIsPreviewMode(false);
      setIsAuthModalOpen(false);
      try {
        sessionStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
      } catch (e) {
        console.error('Storage access error', e);
      }
      return true;
    }
    return false;
  }, [getStoredPasskey]);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setIsPreviewMode(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    } catch (e) {
      console.error('Storage clear error', e);
    }
    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode((prev) => !prev);
  }, []);

  const changePasskey = useCallback((oldPin: string, newPin: string): boolean => {
    const currentPass = getStoredPasskey();
    if (oldPin.trim() === currentPass && newPin.trim().length >= 4) {
      try {
        localStorage.setItem(STORAGE_KEYS.PASSKEY, newPin.trim());
        return true;
      } catch (e) {
        console.error('Failed to save new passkey', e);
        return false;
      }
    }
    return false;
  }, [getStoredPasskey]);

  const setPasskeyDirect = useCallback((newPin: string): boolean => {
    if (newPin.trim().length >= 4) {
      try {
        localStorage.setItem(STORAGE_KEYS.PASSKEY, newPin.trim());
        return true;
      } catch (e) {
        console.error('Failed to set passkey', e);
        return false;
      }
    }
    return false;
  }, []);

  // Listen for #admin or /admin in URL
  useEffect(() => {
    const checkAdminRoute = () => {
      const isHashAdmin = window.location.hash.toLowerCase() === '#admin';
      const isPathAdmin = window.location.pathname.toLowerCase().endsWith('/admin');
      if (isHashAdmin || isPathAdmin) {
        if (!isAdmin) {
          setIsAuthModalOpen(true);
        }
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, [isAdmin]);

  // Global shortcut: Ctrl+Shift+A or Cmd+Shift+A to open Admin modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) {
          // If already admin, toggle between preview and admin
          setIsPreviewMode((prev) => !prev);
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isPreviewMode,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        togglePreviewMode,
        changePasskey,
        setPasskeyDirect,
        hasCustomPasskey,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
