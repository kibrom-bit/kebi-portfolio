import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import {
  profile as defaultProfile,
  projects as defaultProjects,
  skillCategories as defaultSkillCategories,
  experiences as defaultExperiences,
  mockEndpoints as defaultMockEndpoints,
  Project,
} from '../data/portfolioData';

export type BackgroundPattern = 'grid' | 'dots' | 'mesh' | 'none';

export type ThemePreset = 'obsidian' | 'midnight' | 'cyber' | 'cosmic' | 'light';

export interface ThemeConfig {
  preset: ThemePreset;
  accentColor: string; // e.g. '#3b82f6'
  accentGlow: string; // e.g. 'rgba(59, 130, 246, 0.15)'
  bgApp: string;
  bgSurface: string;
  bgSurfaceHover: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  bgPattern: BackgroundPattern;
  glowIntensity: number; // 0 to 1
}

export interface ProfileData {
  name: string;
  handle: string;
  title: string;
  tagline: string;
  status: string;
  statusActive: boolean;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  telegram: string;
  resume: string;
  bio: string;
  roles: string[];
  stats: { value: string; label: string }[];
}

export const PRESET_THEMES: Record<ThemePreset, Omit<ThemeConfig, 'preset' | 'bgPattern' | 'glowIntensity'>> = {
  obsidian: {
    accentColor: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.15)',
    bgApp: '#08090a',
    bgSurface: '#111316',
    bgSurfaceHover: '#181b20',
    borderSubtle: '#23272f',
    textPrimary: '#f3f4f6',
    textSecondary: '#9ca3af',
  },
  midnight: {
    accentColor: '#38bdf8',
    accentGlow: 'rgba(56, 189, 248, 0.15)',
    bgApp: '#060d1a',
    bgSurface: '#0b162c',
    bgSurfaceHover: '#112244',
    borderSubtle: '#1e335a',
    textPrimary: '#f0f9ff',
    textSecondary: '#94a3b8',
  },
  cyber: {
    accentColor: '#10b981',
    accentGlow: 'rgba(16, 185, 129, 0.15)',
    bgApp: '#0a0e14',
    bgSurface: '#111822',
    bgSurfaceHover: '#182230',
    borderSubtle: '#212e3e',
    textPrimary: '#f0fdf4',
    textSecondary: '#94a3b8',
  },
  cosmic: {
    accentColor: '#a855f7',
    accentGlow: 'rgba(168, 85, 247, 0.18)',
    bgApp: '#0d0915',
    bgSurface: '#181026',
    bgSurfaceHover: '#231838',
    borderSubtle: '#33234f',
    textPrimary: '#faf5ff',
    textSecondary: '#c084fc',
  },
  light: {
    accentColor: '#2563eb',
    accentGlow: 'rgba(37, 99, 235, 0.12)',
    bgApp: '#ffffff',
    bgSurface: '#f8fafc',
    bgSurfaceHover: '#f1f5f9',
    borderSubtle: '#e2e8f0',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
  },
};

export const ACCENT_SWATCHES = [
  { name: 'Electric Blue', hex: '#3b82f6', glow: 'rgba(59, 130, 246, 0.16)' },
  { name: 'Neon Violet', hex: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.16)' },
  { name: 'Matrix Emerald', hex: '#10b981', glow: 'rgba(16, 185, 129, 0.16)' },
  { name: 'Cyber Cyan', hex: '#06b6d4', glow: 'rgba(6, 182, 212, 0.16)' },
  { name: 'Solar Amber', hex: '#f59e0b', glow: 'rgba(245, 158, 11, 0.16)' },
  { name: 'Neon Rose', hex: '#ec4899', glow: 'rgba(236, 72, 153, 0.16)' },
];

const INITIAL_PROFILE: ProfileData = {
  ...defaultProfile,
  roles: [
    'Full-Stack Software Engineer',
    'API-First System Designer',
    'Flutter Mobile Developer',
    'ARM Embedded Engineer',
    'Clean Architecture Advocate',
  ],
  stats: [
    { value: '4+', label: 'Years Building' },
    { value: '10+', label: 'Projects Shipped' },
    { value: '5+', label: 'Tech Domains' },
    { value: '99.97%', label: 'API Uptime (Best)' },
  ],
};

const INITIAL_THEME: ThemeConfig = {
  preset: 'obsidian',
  accentColor: '#3b82f6',
  accentGlow: 'rgba(59, 130, 246, 0.15)',
  bgApp: '#08090a',
  bgSurface: '#111316',
  bgSurfaceHover: '#181b20',
  borderSubtle: '#23272f',
  textPrimary: '#f3f4f6',
  textSecondary: '#9ca3af',
  bgPattern: 'grid',
  glowIntensity: 0.8,
};

interface PortfolioContextType {
  profile: ProfileData;
  projects: Project[];
  skillCategories: typeof defaultSkillCategories;
  experiences: typeof defaultExperiences;
  mockEndpoints: typeof defaultMockEndpoints;
  themeConfig: ThemeConfig;
  isCustomizerOpen: boolean;
  openCustomizer: () => void;
  closeCustomizer: () => void;
  toggleCustomizer: () => void;
  updateProfile: (updates: Partial<ProfileData>) => void;
  updateThemeConfig: (updates: Partial<ThemeConfig>) => void;
  setThemePreset: (preset: ThemePreset) => void;
  setAccentColor: (accent: { hex: string; glow?: string }) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  resetToDefaults: () => void;
  exportJson: () => string;
  importJson: (jsonStr: string) => boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'kebi_portfolio_profile_v2',
  PROJECTS: 'kebi_portfolio_projects_v2',
  THEME: 'kebi_portfolio_theme_v2',
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return { ...INITIAL_PROFILE, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to load profile from localStorage', e);
    }
    return INITIAL_PROFILE;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load projects from localStorage', e);
    }
    return defaultProjects;
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved) return { ...INITIAL_THEME, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Failed to load theme from localStorage', e);
    }
    return INITIAL_THEME;
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Apply theme to DOM variables in real time
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bg-app', themeConfig.bgApp);
    root.style.setProperty('--bg-surface', themeConfig.bgSurface);
    root.style.setProperty('--bg-surface-hover', themeConfig.bgSurfaceHover);
    root.style.setProperty('--border-subtle', themeConfig.borderSubtle);
    root.style.setProperty('--color-primary', themeConfig.accentColor);
    root.style.setProperty('--color-accent', themeConfig.accentColor);
    root.style.setProperty('--border-glow', themeConfig.accentColor);
    root.style.setProperty('--spotlight-color', themeConfig.accentGlow);
    root.style.setProperty('--text-primary', themeConfig.textPrimary);
    root.style.setProperty('--text-secondary', themeConfig.textSecondary);

    if (themeConfig.preset === 'light') {
      root.classList.remove('dark');
      root.style.setProperty(
        '--grid-image',
        'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)'
      );
    } else {
      root.classList.add('dark');
      root.style.setProperty(
        '--grid-image',
        'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)'
      );
    }

    try {
      localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(themeConfig));
    } catch (e) {
      console.error('Failed to persist theme', e);
    }
  }, [themeConfig]);

  // Save profile changes
  const updateProfile = useCallback((updates: Partial<ProfileData>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist profile', e);
      }
      return updated;
    });
  }, []);

  // Save project changes
  const updateProjectsInternal = useCallback((newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(newProjects));
    } catch (e) {
      console.error('Failed to persist projects', e);
    }
  }, []);

  const addProject = useCallback(
    (newProj: Project) => {
      updateProjectsInternal([newProj, ...projects]);
    },
    [projects, updateProjectsInternal]
  );

  const updateProject = useCallback(
    (id: string, updates: Partial<Project>) => {
      updateProjectsInternal(
        projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    [projects, updateProjectsInternal]
  );

  const deleteProject = useCallback(
    (id: string) => {
      updateProjectsInternal(projects.filter((p) => p.id !== id));
    },
    [projects, updateProjectsInternal]
  );

  const updateThemeConfig = useCallback((updates: Partial<ThemeConfig>) => {
    setThemeConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const setThemePreset = useCallback((preset: ThemePreset) => {
    const presetData = PRESET_THEMES[preset];
    setThemeConfig((prev) => ({
      ...prev,
      ...presetData,
      preset,
    }));
  }, []);

  const setAccentColor = useCallback(({ hex, glow }: { hex: string; glow?: string }) => {
    setThemeConfig((prev) => ({
      ...prev,
      accentColor: hex,
      accentGlow: glow || `${hex}25`,
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.THEME);
    setProfile(INITIAL_PROFILE);
    setProjects(defaultProjects);
    setThemeConfig(INITIAL_THEME);
  }, []);

  const exportJson = useCallback(() => {
    const data = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      profile,
      projects,
      themeConfig,
    };
    return JSON.stringify(data, null, 2);
  }, [profile, projects, themeConfig]);

  const importJson = useCallback(
    (jsonStr: string) => {
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.profile) updateProfile(parsed.profile);
        if (Array.isArray(parsed.projects)) updateProjectsInternal(parsed.projects);
        if (parsed.themeConfig) setThemeConfig(parsed.themeConfig);
        return true;
      } catch (e) {
        console.error('Invalid JSON imported', e);
        return false;
      }
    },
    [updateProfile, updateProjectsInternal]
  );

  const openCustomizer = useCallback(() => setIsCustomizerOpen(true), []);
  const closeCustomizer = useCallback(() => setIsCustomizerOpen(false), []);
  const toggleCustomizer = useCallback(() => setIsCustomizerOpen((prev) => !prev), []);

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        projects,
        skillCategories: defaultSkillCategories,
        experiences: defaultExperiences,
        mockEndpoints: defaultMockEndpoints,
        themeConfig,
        isCustomizerOpen,
        openCustomizer,
        closeCustomizer,
        toggleCustomizer,
        updateProfile,
        updateThemeConfig,
        setThemePreset,
        setAccentColor,
        addProject,
        updateProject,
        deleteProject,
        resetToDefaults,
        exportJson,
        importJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
