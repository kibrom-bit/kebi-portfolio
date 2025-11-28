import React, { createContext, useContext, useEffect, useReducer, useCallback, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface AppState {
  theme: Theme;
  loading: LoadingState;
  activeSection: string;
  cursorVariant: 'default' | 'hover' | 'click';
  isMenuOpen: boolean;
}

type AppAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_LOADING'; payload: LoadingState }
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'SET_CURSOR_VARIANT'; payload: AppState['cursorVariant'] }
  | { type: 'TOGGLE_MENU' };

const initialState: AppState = {
  theme: 'light',
  loading: 'idle',
  activeSection: 'home',
  cursorVariant: 'default',
  isMenuOpen: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'SET_CURSOR_VARIANT':
      return { ...state, cursorVariant: action.payload };
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    default:
      return state;
  }
};

interface AppContextType extends AppState {
  toggleTheme: () => void;
  setLoading: (state: LoadingState) => void;
  setActiveSection: (section: string) => void;
  setCursorVariant: (variant: AppState['cursorVariant']) => void;
  toggleMenu: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch({ type: 'SET_THEME', payload: 'dark' });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
  }, [state.theme]);

  const setLoading = useCallback((loadingState: LoadingState) => {
    dispatch({ type: 'SET_LOADING', payload: loadingState });
  }, []);

  const setActiveSection = useCallback((section: string) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  }, []);

  const setCursorVariant = useCallback((variant: AppState['cursorVariant']) => {
    dispatch({ type: 'SET_CURSOR_VARIANT', payload: variant });
  }, []);

  const toggleMenu = useCallback(() => {
    dispatch({ type: 'TOGGLE_MENU' });
  }, []);

  const value: AppContextType = {
    ...state,
    toggleTheme,
    setLoading,
    setActiveSection,
    setCursorVariant,
    toggleMenu,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};