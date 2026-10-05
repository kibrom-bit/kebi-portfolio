import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import {
  profile as defaultProfile,
  projects as defaultProjects,
  skillCategories as defaultSkillCategories,
  experiences as defaultExperiences,
  mockEndpoints as defaultMockEndpoints,
  Project,
} from '../data/portfolioData';
import {
  generatePublishedJson,
  generatePortfolioDataTs,
  triggerFileDownload,
} from '../utils/publishHelper';

export type BackgroundPattern = 'grid' | 'dots' | 'mesh' | 'none';

export type ThemePreset = 'obsidian' | 'midnight' | 'cyber' | 'cosmic' | 'light';

export interface ThemeConfig {
  preset: ThemePreset;
  accentColor: string; // e.g. '#3b82f6' — drives UI text/borders only
  accentGlow: string; // e.g. 'rgba(59, 130, 246, 0.15)' — drives UI glow/spotlight
  bgGlowColor: string; // e.g. 'rgba(59, 130, 246, 0.12)' — drives background orbs, never changed by swatch picker
  bgImage: string; // URL or base64 data URI for background image
  bgImageOpacity: number; // 0–1 opacity for the bg image overlay
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

export const PRESET_THEMES: Record<ThemePreset, Omit<ThemeConfig, 'preset' | 'bgPattern' | 'glowIntensity' | 'bgImage' | 'bgImageOpacity'>> = {
  obsidian: {
    accentColor: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.15)',
    bgGlowColor: 'rgba(59, 130, 246, 0.12)',
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
    bgGlowColor: 'rgba(56, 189, 248, 0.10)',
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
    bgGlowColor: 'rgba(16, 185, 129, 0.10)',
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
    bgGlowColor: 'rgba(168, 85, 247, 0.13)',
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
    bgGlowColor: 'rgba(37, 99, 235, 0.08)',
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
  bgGlowColor: 'rgba(59, 130, 246, 0.12)',
  bgImage: '',
  bgImageOpacity: 0.15,
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
  // Publishing capabilities
  hasUnpublishedChanges: boolean;
  lastPublishedAt: string | null;
  publishEdits: () => { success: boolean; json: string; tsCode: string; message: string };
  downloadPublishedJson: () => void;
  downloadPublishedTs: () => void;
  revertToPublished: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'kebi_portfolio_profile_v2',
  PROJECTS: 'kebi_portfolio_projects_v2',
  THEME: 'kebi_portfolio_theme_v2',
  PUBLISHED_SNAPSHOT: 'kebi_portfolio_published_v2',
  LAST_PUBLISHED: 'kebi_portfolio_published_at_v2',
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
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState(false);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.LAST_PUBLISHED);
    } catch {
      return null;
    }
  });

  // Try to load officially published portfolio-data.json if present
  useEffect(() => {
    // Only attempt if not already explicitly overridden by local owner storage
    const hasLocalEdits = localStorage.getItem(STORAGE_KEYS.PROFILE) || localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!hasLocalEdits) {
      fetch('/portfolio-data.json')
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('No published json found');
        })
        .then((data) => {
          if (data && data.profile) {
            setProfile((prev) => ({ ...prev, ...data.profile }));
          }
          if (data && Array.isArray(data.projects)) {
            setProjects(data.projects);
          }
          if (data && data.themeConfig) {
            setThemeConfig((prev) => ({ ...prev, ...data.themeConfig }));
          }
          if (data && data.publishedAt) {
            setLastPublishedAt(data.publishedAt);
          }
        })
        .catch(() => {
          // Normal fallback: using defaults
        });
    }
  }, []);

  // Check if current state has unpublished changes
  useEffect(() => {
    try {
      const publishedStr = localStorage.getItem(STORAGE_KEYS.PUBLISHED_SNAPSHOT);
      if (!publishedStr) {
        // If never published, check if diff from defaults
        const isModified =
          JSON.stringify(profile) !== JSON.stringify(INITIAL_PROFILE) ||
          JSON.stringify(projects) !== JSON.stringify(defaultProjects) ||
          JSON.stringify(themeConfig) !== JSON.stringify(INITIAL_THEME);
        setHasUnpublishedChanges(isModified);
        return;
      }
      const published = JSON.parse(publishedStr);
      const isDiff =
        JSON.stringify(published.profile) !== JSON.stringify(profile) ||
        JSON.stringify(published.projects) !== JSON.stringify(projects) ||
        JSON.stringify(published.themeConfig) !== JSON.stringify(themeConfig);
      setHasUnpublishedChanges(isDiff);
    } catch {
      setHasUnpublishedChanges(false);
    }
  }, [profile, projects, themeConfig]);

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
    // NOTE: bgGlowColor is intentionally NOT updated here.
    // The background orbs are locked to the preset's glow color and must
    // not change when the user picks a UI accent swatch.
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
    localStorage.removeItem(STORAGE_KEYS.PUBLISHED_SNAPSHOT);
    localStorage.removeItem(STORAGE_KEYS.LAST_PUBLISHED);
    setProfile(INITIAL_PROFILE);
    setProjects(defaultProjects);
    setThemeConfig(INITIAL_THEME);
    setHasUnpublishedChanges(false);
    setLastPublishedAt(null);
  }, []);

  // Revert working edits back to last published snapshot
  const revertToPublished = useCallback(() => {
    try {
      const publishedStr = localStorage.getItem(STORAGE_KEYS.PUBLISHED_SNAPSHOT);
      if (publishedStr) {
        const published = JSON.parse(publishedStr);
        if (published.profile) {
          setProfile(published.profile);
          localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(published.profile));
        }
        if (Array.isArray(published.projects)) {
          setProjects(published.projects);
          localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(published.projects));
        }
        if (published.themeConfig) {
          setThemeConfig(published.themeConfig);
          localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(published.themeConfig));
        }
        setHasUnpublishedChanges(false);
      } else {
        resetToDefaults();
      }
    } catch (e) {
      console.error('Failed to revert to published snapshot', e);
    }
  }, [resetToDefaults]);

  // Publish edits: locks in current state as the official published snapshot and prepares export assets
  const publishEdits = useCallback(() => {
    const now = new Date().toISOString();
    const jsonStr = generatePublishedJson(profile, themeConfig, projects);
    const tsCode = generatePortfolioDataTs(profile, projects);

    try {
      localStorage.setItem(
        STORAGE_KEYS.PUBLISHED_SNAPSHOT,
        JSON.stringify({ profile, projects, themeConfig, publishedAt: now })
      );
      localStorage.setItem(STORAGE_KEYS.LAST_PUBLISHED, now);
      setLastPublishedAt(now);
      setHasUnpublishedChanges(false);
      return {
        success: true,
        json: jsonStr,
        tsCode,
        message: 'Changes published successfully to local release registry!',
      };
    } catch (e) {
      console.error('Publish error', e);
      return {
        success: false,
        json: jsonStr,
        tsCode,
        message: 'Failed to record publish snapshot.',
      };
    }
  }, [profile, themeConfig, projects]);

  const downloadPublishedJson = useCallback(() => {
    const jsonStr = generatePublishedJson(profile, themeConfig, projects);
    triggerFileDownload(jsonStr, 'portfolio-data.json', 'application/json');
  }, [profile, themeConfig, projects]);

  const downloadPublishedTs = useCallback(() => {
    const tsCode = generatePortfolioDataTs(profile, projects);
    triggerFileDownload(tsCode, 'portfolioData.ts', 'text/typescript');
  }, [profile, projects]);

  const exportJson = useCallback(() => {
    return generatePublishedJson(profile, themeConfig, projects);
  }, [profile, themeConfig, projects]);

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
        hasUnpublishedChanges,
        lastPublishedAt,
        publishEdits,
        downloadPublishedJson,
        downloadPublishedTs,
        revertToPublished,
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
