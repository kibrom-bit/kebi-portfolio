import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  usePortfolio,
  ACCENT_SWATCHES,
  ThemePreset,
  BackgroundPattern,
} from '../../contexts/PortfolioContext';
import { useAdmin } from '../../contexts/AdminContext';
import { Project } from '../../data/portfolioData';
import {
  X,
  Sliders,
  Palette,
  User,
  Briefcase,
  Mail,
  RotateCcw,
  Copy,
  Check,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  Sparkles,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Globe,
  RefreshCw,
  Shield,
  Key,
} from 'lucide-react';

type Tab = 'theme' | 'profile' | 'projects' | 'contact' | 'publish';

export const CustomizerDrawer: React.FC = () => {
  const { isAdmin, changePasskey } = useAdmin();
  const {
    profile,
    projects,
    themeConfig,
    isCustomizerOpen,
    closeCustomizer,
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
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<Tab>('theme');
  const [copied, setCopied] = useState(false);
  const [copiedTs, setCopiedTs] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Passkey change state (for when already logged in)
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [passkeyChangeMsg, setPasskeyChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // GitHub Publish Sync state
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem('kebi_gh_token') || '');
  const [githubRepo, setGithubRepo] = useState(() => localStorage.getItem('kebi_gh_repo') || 'kibrom-bit/kebi-portfolio');
  const [githubBranch, setGithubBranch] = useState(() => localStorage.getItem('kebi_gh_branch') || 'main');
  const [isGithubSyncing, setIsGithubSyncing] = useState(false);
  const [githubSyncResult, setGithubSyncResult] = useState<{ success: boolean; msg: string } | null>(null);

  // New/Edit Project Form state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    tagline: '',
    category: 'fullstack',
    featured: true,
    techStack: [],
    liveUrl: '',
    githubUrl: '',
    role: 'Lead Architect',
    timeline: '2025',
    problemStatement: '',
    architectureDescription: '',
    metrics: [{ label: 'Metric', value: '100%', description: 'Key outcome' }],
    tradeoffs: [],
    accentColor: 'blue',
  });
  const [techInput, setTechInput] = useState('');
  const [newRoleInput, setNewRoleInput] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleUpdateMetric = (index: number, field: 'label' | 'value' | 'description', val: string) => {
    setProjectForm((prev) => {
      const current = prev.metrics && prev.metrics.length > 0
        ? prev.metrics.map((m) => ({ ...m }))
        : [{ label: 'Impact', value: '10x', description: 'Performance improvement' }];
      if (!current[index]) {
        current[index] = { label: '', value: '', description: '' };
      }
      current[index] = { ...current[index], [field]: val };
      return { ...prev, metrics: current };
    });
  };

  const handleAddMetric = () => {
    setProjectForm((prev) => ({
      ...prev,
      metrics: [
        ...(prev.metrics && prev.metrics.length > 0
          ? prev.metrics
          : [{ label: 'Impact', value: '10x', description: 'Performance improvement' }]),
        { label: 'Metric', value: '100%', description: 'Outcome' },
      ],
    }));
  };

  const handleRemoveMetric = (index: number) => {
    setProjectForm((prev) => {
      const current = (prev.metrics || []).filter((_, i) => i !== index);
      return {
        ...prev,
        metrics: current.length > 0
          ? current
          : [{ label: 'Impact', value: '10x', description: 'Performance improvement' }],
      };
    });
  };

  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      id: `custom-proj-${Date.now()}`,
      title: '',
      tagline: '',
      category: 'fullstack',
      featured: true,
      techStack: ['React', 'TypeScript', 'Node.js'],
      liveUrl: '',
      githubUrl: '',
      role: 'Full-Stack Engineer',
      timeline: '2025',
      problemStatement: '',
      architectureDescription: '',
      metrics: [{ label: 'Impact', value: '10x', description: 'Performance improvement' }],
      tradeoffs: [],
      accentColor: 'blue',
    });
    setTechInput('React, TypeScript, Node.js');
    setIsProjectFormOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      ...proj,
      metrics: proj.metrics && proj.metrics.length > 0
        ? proj.metrics.map((m) => ({ ...m }))
        : [{ label: 'Impact', value: '10x', description: 'Performance improvement' }],
      problemStatement: proj.problemStatement || '',
      architectureDescription: proj.architectureDescription || '',
      role: proj.role || 'Full-Stack Software Engineer',
      timeline: proj.timeline || '2025',
    });
    setTechInput(proj.techStack ? proj.techStack.join(', ') : '');
    setIsProjectFormOpen(true);
  };

  const handleSaveProject = () => {
    if (!projectForm.title) {
      alert('Project title is required');
      return;
    }
    const stack = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const savedMetrics = (projectForm.metrics && projectForm.metrics.length > 0)
      ? projectForm.metrics
        .filter((m) => m.label.trim() || m.value.trim())
        .map((m) => ({
          label: m.label.trim() || 'Impact',
          value: m.value.trim() || '10x',
          description: m.description?.trim() || 'Performance improvement',
        }))
      : [{ label: 'Impact', value: '10x', description: 'Performance improvement' }];

    const completeProject: Project = {
      id: editingProjectId || `project-${Date.now()}`,
      title: projectForm.title || 'Untitled Project',
      tagline: projectForm.tagline || 'Engineered scalable solution',
      category: projectForm.category || 'fullstack',
      featured: projectForm.featured ?? true,
      timeline: projectForm.timeline || '2025',
      techStack: stack.length > 0 ? stack : ['TypeScript', 'React'],
      metrics: savedMetrics.length > 0 ? savedMetrics : [
        { label: 'Impact', value: '10x', description: 'Performance improvement' },
      ],
      problemStatement: projectForm.problemStatement || 'Enterprise engineering challenge.',
      architectureDescription:
        projectForm.architectureDescription || 'Modular Clean Architecture.',
      tradeoffs: projectForm.tradeoffs || [],
      role: projectForm.role || 'Full-Stack Software Engineer',
      liveUrl: projectForm.liveUrl,
      githubUrl: projectForm.githubUrl,
      accentColor: projectForm.accentColor || 'blue',
    };

    if (editingProjectId) {
      updateProject(editingProjectId, completeProject);
      showToast('Project updated successfully');
    } else {
      addProject(completeProject);
      showToast('New project created and added');
    }
    setIsProjectFormOpen(false);
  };

  const handleCopyCode = () => {
    const json = exportJson();
    navigator.clipboard.writeText(json);
    setCopied(true);
    showToast('Export JSON copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublishNow = () => {
    const res = publishEdits();
    if (res.success) {
      showToast('🚀 Changes published to active registry!');
    }
  };

  const handleCopyTs = () => {
    const res = publishEdits();
    navigator.clipboard.writeText(res.tsCode);
    setCopiedTs(true);
    showToast('TypeScript portfolioData.ts copied!');
    setTimeout(() => setCopiedTs(false), 2200);
  };

  const handlePushToGithub = async () => {
    if (!githubToken.trim()) {
      setGithubSyncResult({ success: false, msg: 'Please provide a GitHub Personal Access Token.' });
      return;
    }
    setIsGithubSyncing(true);
    setGithubSyncResult(null);

    try {
      localStorage.setItem('kebi_gh_token', githubToken.trim());
      localStorage.setItem('kebi_gh_repo', githubRepo.trim());
      localStorage.setItem('kebi_gh_branch', githubBranch.trim());

      const res = publishEdits();
      const filePath = 'public/portfolio-data.json';
      const apiUrl = `https://api.github.com/repos/${githubRepo.trim()}/contents/${filePath}?ref=${githubBranch.trim()}`;

      // Check current file SHA
      let currentSha: string | undefined;
      try {
        const getRes = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${githubToken.trim()}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });
        if (getRes.ok) {
          const fileData = await getRes.json();
          currentSha = fileData.sha;
        }
      } catch (err) {
        // file might not exist yet
      }

      // Convert json to utf-8 base64
      const utf8Bytes = new TextEncoder().encode(res.json);
      let binary = '';
      utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
      const base64Content = btoa(binary);

      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `chore(portfolio): publish updates from Studio [${new Date().toISOString()}]`,
          content: base64Content,
          branch: githubBranch.trim(),
          ...(currentSha ? { sha: currentSha } : {}),
        }),
      });

      if (!putRes.ok) {
        const errJson = await putRes.json();
        throw new Error(errJson.message || 'GitHub API returned error');
      }

      setGithubSyncResult({
        success: true,
        msg: `Successfully pushed to ${githubRepo}! Your hosting platform (Vercel/Netlify) will auto-deploy.`,
      });
      showToast('🚀 Pushed to GitHub repository!');
    } catch (e: any) {
      setGithubSyncResult({
        success: false,
        msg: e.message || 'Failed to push to GitHub. Verify token permissions.',
      });
    } finally {
      setIsGithubSyncing(false);
    }
  };

  const handleApplyImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importJson(importJsonText);
    if (ok) {
      showToast('Configuration imported successfully!');
      setIsImportModalOpen(false);
      setImportJsonText('');
    } else {
      alert('Invalid JSON structure. Please check and try again.');
    }
  };

  const handleAddRole = () => {
    if (!newRoleInput.trim()) return;
    updateProfile({
      roles: [...profile.roles, newRoleInput.trim()],
    });
    setNewRoleInput('');
    showToast('Role added to typewriter animation');
  };

  const handleRemoveRole = (idx: number) => {
    const updated = profile.roles.filter((_, i) => i !== idx);
    updateProfile({ roles: updated });
    showToast('Role removed');
  };

  if (!isAdmin) return null;

  return (
    <>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-6 z-[60] px-4 py-2.5 rounded-xl bg-surface border border-brand-primary text-content-primary shadow-xl font-mono text-xs flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Customizer Drawer */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCustomizer}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-surface border-l border-border-subtle shadow-2xl flex flex-col overflow-hidden text-content-primary"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle bg-surface-subtle/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-display tracking-tight flex items-center gap-2">
                      Live Studio Customizer
                      <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Live Preview
                      </span>
                    </h2>
                    <p className="text-xs text-content-muted">
                      Modify anything without writing code — changes save instantly.
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCustomizer}
                  className="p-2 rounded-lg text-content-muted hover:text-content-primary hover:bg-surface-hover transition-colors"
                  aria-label="Close Customizer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-border-subtle px-4 bg-surface gap-1 overflow-x-auto">
                {[
                  { id: 'theme', label: 'Theme & Mood', icon: Palette },
                  { id: 'profile', label: 'Profile & Hero', icon: User },
                  { id: 'projects', label: 'Projects', icon: Briefcase },
                  { id: 'contact', label: 'Contact', icon: Mail },
                  { id: 'publish', label: 'Publish & Deploy', icon: Rocket },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const isPublish = tab.id === 'publish';
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={`flex items-center gap-2 px-3 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${isActive
                        ? 'border-brand-primary text-brand-primary'
                        : 'border-transparent text-content-muted hover:text-content-primary'
                        }`}
                    >
                      <Icon className={`w-4 h-4 ${isPublish && hasUnpublishedChanges ? 'text-amber-400 animate-pulse' : ''}`} />
                      {tab.label}
                      {isPublish && hasUnpublishedChanges && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* ── TAB 1: THEME & BACKGROUND ─────────────────────────────────── */}
                {activeTab === 'theme' && (
                  <div className="space-y-6">
                    {/* Presets */}
                    <div>
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-content-secondary mb-3 block">
                        Background Mood Presets
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {(
                          [
                            { id: 'obsidian', name: 'Obsidian Black', desc: 'Deep high contrast' },
                            { id: 'midnight', name: 'Midnight Navy', desc: 'Oceanic dark space' },
                            { id: 'cyber', name: 'Cyber Slate', desc: 'Matrix industrial' },
                            { id: 'cosmic', name: 'Cosmic Violet', desc: 'Nebula galaxy glow' },
                            { id: 'light', name: 'Clean Light', desc: 'Crisp minimal white' },
                          ] as const
                        ).map((preset) => (
                          <button
                            key={preset.id}
                            onClick={() => {
                              setThemePreset(preset.id as ThemePreset);
                              showToast(`Applied ${preset.name} theme`);
                            }}
                            className={`p-3 text-left rounded-xl border transition-all ${themeConfig.preset === preset.id
                              ? 'border-brand-primary bg-brand-primary/10 shadow-sm ring-1 ring-brand-primary/50'
                              : 'border-border-subtle bg-surface-subtle hover:border-content-muted'
                              }`}
                          >
                            <div className="text-xs font-semibold">{preset.name}</div>
                            <div className="text-[10px] text-content-muted mt-0.5">{preset.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accent Colors */}
                    <div>
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-content-secondary mb-3 block">
                        Accent Color Palette
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {ACCENT_SWATCHES.map((swatch) => (
                          <button
                            key={swatch.hex}
                            onClick={() => {
                              setAccentColor({ hex: swatch.hex, glow: swatch.glow });
                              showToast(`Accent set to ${swatch.name}`);
                            }}
                            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${themeConfig.accentColor.toLowerCase() === swatch.hex.toLowerCase()
                              ? 'border-brand-primary ring-2 ring-brand-primary/40 bg-surface-hover'
                              : 'border-border-subtle hover:border-content-muted'
                              }`}
                          >
                            <span
                              className="w-7 h-7 rounded-full shadow-inner flex items-center justify-center text-white"
                              style={{ backgroundColor: swatch.hex }}
                            >
                              {themeConfig.accentColor.toLowerCase() === swatch.hex.toLowerCase() && (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </span>
                            <span className="text-[10px] font-mono text-content-muted truncate max-w-full">
                              {swatch.name.split(' ')[1] || swatch.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Custom Hex Color Picker */}
                      <div className="mt-3 flex items-center gap-3 p-3 rounded-xl border border-border-subtle bg-surface-subtle">
                        <input
                          type="color"
                          value={themeConfig.accentColor}
                          onChange={(e) => setAccentColor({ hex: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-semibold">Custom Accent Color</div>
                          <div className="text-[11px] font-mono text-content-muted">{themeConfig.accentColor}</div>
                        </div>
                        <input
                          type="text"
                          value={themeConfig.accentColor}
                          onChange={(e) => setAccentColor({ hex: e.target.value })}
                          className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-border-subtle bg-surface"
                        />
                      </div>
                    </div>

                    {/* Background Pattern */}
                    <div>
                      <label className="text-xs font-mono font-bold uppercase tracking-wider text-content-secondary mb-3 block">
                        Background Texture Pattern
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(
                          [
                            { id: 'grid', label: 'Subtle Grid' },
                            { id: 'dots', label: 'Matrix Dots' },
                            { id: 'mesh', label: 'Aurora Mesh' },
                            { id: 'none', label: 'Pure Clean' },
                          ] as const
                        ).map((pat) => (
                          <button
                            key={pat.id}
                            onClick={() => {
                              updateThemeConfig({ bgPattern: pat.id as BackgroundPattern });
                              showToast(`Pattern set to ${pat.label}`);
                            }}
                            className={`p-2.5 text-center text-xs font-semibold rounded-xl border transition-all ${themeConfig.bgPattern === pat.id
                              ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                              : 'border-border-subtle text-content-secondary hover:border-content-muted'
                              }`}
                          >
                            {pat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Glow Intensity */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-content-secondary">
                          Ambient Glow Orbs Intensity
                        </label>
                        <span className="text-xs font-mono text-brand-primary">
                          {Math.round(themeConfig.glowIntensity * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={themeConfig.glowIntensity}
                        onChange={(e) => updateThemeConfig({ glowIntensity: parseFloat(e.target.value) })}
                        className="w-full accent-brand-primary cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* ── TAB 2: PROFILE & HERO ──────────────────────────────────────── */}
                {activeTab === 'profile' && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">Your Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">Main Title / Headline</label>
                      <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => updateProfile({ title: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">Tagline / Bio Intro</label>
                      <textarea
                        rows={3}
                        value={profile.tagline}
                        onChange={(e) => updateProfile({ tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    {/* Status Badge */}
                    <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-content-primary">Availability Badge</label>
                        <button
                          onClick={() => updateProfile({ statusActive: !profile.statusActive })}
                          className={`px-2.5 py-1 text-xs font-mono rounded-full border transition-colors ${profile.statusActive
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30'
                            }`}
                        >
                          {profile.statusActive ? '● Status Active' : '○ Status Hidden'}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={profile.status}
                        onChange={(e) => updateProfile({ status: e.target.value })}
                        placeholder="e.g. Available for Full-Stack Roles"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-border-subtle bg-surface focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    {/* Dynamic Roles for Typewriter */}
                    <div className="space-y-3">
                      <label className="text-xs font-mono font-bold text-content-secondary block">
                        Typewriter Animated Roles ({profile.roles.length})
                      </label>
                      <div className="space-y-1.5">
                        {profile.roles.map((role, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle text-xs"
                          >
                            <span className="font-mono text-content-primary">{role}</span>
                            <button
                              onClick={() => handleRemoveRole(idx)}
                              className="text-red-400 hover:text-red-300 p-1"
                              title="Delete role"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newRoleInput}
                          onChange={(e) => setNewRoleInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                          placeholder="e.g. Next.js Specialist"
                          className="flex-1 px-3 py-2 text-xs rounded-lg border border-border-subtle bg-surface focus:border-brand-primary focus:outline-none"
                        />
                        <button
                          onClick={handleAddRole}
                          className="px-3 py-2 rounded-lg bg-brand-primary text-white text-xs font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Quick Stats Editor */}
                    <div className="space-y-3">
                      <label className="text-xs font-mono font-bold text-content-secondary block">
                        Hero Highlights & Counters
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {profile.stats.map((stat, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg border border-border-subtle bg-surface-subtle space-y-1">
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...profile.stats];
                                newStats[idx].value = e.target.value;
                                updateProfile({ stats: newStats });
                              }}
                              className="w-full px-2 py-1 text-sm font-bold font-mono rounded border border-border-subtle bg-surface"
                            />
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...profile.stats];
                                newStats[idx].label = e.target.value;
                                updateProfile({ stats: newStats });
                              }}
                              className="w-full px-2 py-0.5 text-[11px] text-content-muted rounded border border-border-subtle bg-surface"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB 3: PROJECTS MANAGER ────────────────────────────────────── */}
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono text-content-secondary">
                        {projects.length} Total Projects Loaded
                      </div>
                      <button
                        onClick={handleOpenAddProject}
                        className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add New Project
                      </button>
                    </div>

                    {/* Project List */}
                    <div className="space-y-2.5">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="p-3.5 rounded-xl border border-border-subtle bg-surface-subtle hover:border-brand-primary/50 transition-all flex flex-col gap-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="font-semibold text-sm flex items-center gap-2">
                                {proj.title}
                                {proj.featured && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-content-muted line-clamp-1 mt-0.5">
                                {proj.tagline}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEditProject(proj)}
                                className="p-1.5 rounded-lg text-content-muted hover:text-brand-primary hover:bg-surface transition-colors"
                                title="Edit Project"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete "${proj.title}"?`)) {
                                    deleteProject(proj.id);
                                    showToast('Project deleted');
                                  }
                                }}
                                className="p-1.5 rounded-lg text-content-muted hover:text-red-400 hover:bg-surface transition-colors"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-content-muted">
                            <span className="px-2 py-0.5 rounded bg-surface border border-border-subtle">
                              {proj.category}
                            </span>
                            {proj.techStack?.slice(0, 3).map((tech) => (
                              <span key={tech} className="px-2 py-0.5 rounded bg-surface border border-border-subtle">
                                {tech}
                              </span>
                            ))}
                            {proj.techStack && proj.techStack.length > 3 && (
                              <span>+{proj.techStack.length - 3} more</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── TAB 4: CONTACT & SOCIALS ──────────────────────────────────── */}
                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile({ email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">Location / Timezone</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => updateProfile({ location: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">GitHub Profile URL</label>
                      <input
                        type="url"
                        value={profile.github}
                        onChange={(e) => updateProfile({ github: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={profile.linkedin}
                        onChange={(e) => updateProfile({ linkedin: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">Telegram URL</label>
                      <input
                        type="url"
                        value={profile.telegram}
                        onChange={(e) => updateProfile({ telegram: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-content-secondary mb-1.5 block">Resume File / Link</label>
                      <input
                        type="text"
                        value={profile.resume}
                        onChange={(e) => updateProfile({ resume: e.target.value })}
                        placeholder="/assets/resume.pdf"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ── TAB 5: PUBLISH & DEPLOY ─────────────────────────────────── */}
                {activeTab === 'publish' && (
                  <div className="space-y-5 text-xs">
                    {/* Status Overview Card */}
                    <div className={`p-4 rounded-xl border ${hasUnpublishedChanges
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-emerald-500/30 bg-emerald-500/5'
                      }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          {hasUnpublishedChanges ? (
                            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                          <div>
                            <div className="font-bold font-mono text-content-primary">
                              {hasUnpublishedChanges
                                ? 'Unpublished Changes Pending'
                                : 'Portfolio is Fully Published'}
                            </div>
                            <div className="text-[11px] text-content-muted mt-0.5">
                              {hasUnpublishedChanges
                                ? 'You have draft customizations that have not been locked into release.'
                                : lastPublishedAt
                                  ? `Last published: ${new Date(lastPublishedAt).toLocaleString()}`
                                  : 'Using verified production blueprint defaults.'}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handlePublishNow}
                          className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-md shadow-brand-primary/20 shrink-0"
                        >
                          <Rocket className="w-3.5 h-3.5" />
                          <span>Publish Now</span>
                        </button>
                      </div>

                      {hasUnpublishedChanges && (
                        <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] font-mono text-amber-400/90">
                          <span>Draft edits are previewing live in your browser</span>
                          <button
                            onClick={() => {
                              if (window.confirm('Discard unsaved draft edits and revert to last published version?')) {
                                revertToPublished();
                                showToast('Reverted to last published snapshot');
                              }
                            }}
                            className="underline hover:text-amber-300"
                          >
                            Discard Drafts
                          </button>
                        </div>
                      )}
                    </div>

                    {/* How Publishing Works Explainer */}
                    <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle space-y-2">
                      <div className="text-xs font-bold font-mono uppercase text-content-primary flex items-center gap-2">
                        <Globe className="w-4 h-4 text-brand-primary" />
                        How Publishing Works on Hosted Sites
                      </div>
                      <p className="text-content-muted leading-relaxed text-[11px]">
                        When your portfolio is hosted on Vercel, Netlify, or GitHub Pages, visitors see the published data file. Choose your preferred method below to release your updates to all visitors worldwide:
                      </p>
                    </div>

                    {/* Option 1: 1-Click Code & JSON Assets */}
                    <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle space-y-3">
                      <div className="font-bold font-mono uppercase text-xs text-content-primary flex items-center justify-between">
                        <span>Option 1: Export Release Files</span>
                        <span className="text-[10px] text-brand-primary font-normal bg-brand-primary/10 px-2 py-0.5 rounded border border-brand-primary/20">Recommended</span>
                      </div>
                      <p className="text-[11px] text-content-muted">
                        Download the updated configuration file and place it in your project:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <button
                          onClick={downloadPublishedJson}
                          className="p-3 text-left rounded-xl border border-border-subtle bg-surface hover:border-brand-primary hover:bg-surface-hover transition-all flex flex-col justify-between group"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-content-primary group-hover:text-brand-primary">portfolio-data.json</span>
                            <Download className="w-3.5 h-3.5 text-content-muted group-hover:text-brand-primary" />
                          </div>
                          <span className="text-[10px] text-content-muted font-mono leading-tight">
                            Place in <code>/public</code> folder. All visitors automatically fetch this on load.
                          </span>
                        </button>

                        <button
                          onClick={downloadPublishedTs}
                          className="p-3 text-left rounded-xl border border-border-subtle bg-surface hover:border-brand-primary hover:bg-surface-hover transition-all flex flex-col justify-between group"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-content-primary group-hover:text-brand-primary">portfolioData.ts</span>
                            <Download className="w-3.5 h-3.5 text-content-muted group-hover:text-brand-primary" />
                          </div>
                          <span className="text-[10px] text-content-muted font-mono leading-tight">
                            Replace <code>src/data/portfolioData.ts</code> to compile static build in Git.
                          </span>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          onClick={handleCopyTs}
                          className="btn-ghost text-xs py-1.5 px-2.5 flex items-center gap-1.5"
                        >
                          {copiedTs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy TypeScript Code
                        </button>
                        <button
                          onClick={handleCopyCode}
                          className="btn-ghost text-xs py-1.5 px-2.5 flex items-center gap-1.5"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy JSON String
                        </button>
                      </div>
                    </div>

                    {/* Option 2: Direct GitHub Git Sync */}
                    <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle space-y-3">
                      <div className="font-bold font-mono uppercase text-xs text-content-primary flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4" />
                        <span>Option 2: Direct GitHub Auto-Publish</span>
                      </div>
                      <p className="text-[11px] text-content-muted leading-relaxed">
                        Push updates directly to your GitHub repository without touching terminal or Git. Triggers automatic deploy on Vercel/Netlify.
                      </p>

                      <div className="space-y-2.5 pt-1">
                        <div>
                          <label className="text-[10px] font-mono text-content-secondary block mb-1">
                            GitHub Repository (owner/repo)
                          </label>
                          <input
                            type="text"
                            value={githubRepo}
                            onChange={(e) => setGithubRepo(e.target.value)}
                            placeholder="kibrom-bit/kebi-portfolio"
                            className="w-full px-3 py-1.5 rounded-lg border border-border-subtle bg-surface text-xs font-mono focus:border-brand-primary focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-mono text-content-secondary block mb-1">
                              Branch
                            </label>
                            <input
                              type="text"
                              value={githubBranch}
                              onChange={(e) => setGithubBranch(e.target.value)}
                              placeholder="main"
                              className="w-full px-3 py-1.5 rounded-lg border border-border-subtle bg-surface text-xs font-mono focus:border-brand-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-content-secondary block mb-1">
                              Personal Access Token
                            </label>
                            <input
                              type="password"
                              value={githubToken}
                              onChange={(e) => setGithubToken(e.target.value)}
                              placeholder="ghp_xxxxxxxxxxxx"
                              className="w-full px-3 py-1.5 rounded-lg border border-border-subtle bg-surface text-xs font-mono focus:border-brand-primary focus:outline-none"
                            />
                          </div>
                        </div>

                        {githubSyncResult && (
                          <div
                            className={`p-2.5 rounded-lg text-xs font-mono ${githubSyncResult.success
                              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                              : 'bg-red-500/10 border border-red-500/30 text-red-400'
                              }`}
                          >
                            {githubSyncResult.msg}
                          </div>
                        )}

                        <button
                          onClick={handlePushToGithub}
                          disabled={isGithubSyncing}
                          className="btn-primary w-full text-xs py-2 flex items-center justify-center gap-2"
                        >
                          {isGithubSyncing ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Pushing Commit to GitHub...</span>
                            </>
                          ) : (
                            <>
                              <Rocket className="w-3.5 h-3.5" />
                              <span>Commit & Publish to GitHub Repo</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Security & Access - Change Passkey */}
                    <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle space-y-3">
                      <div className="font-bold font-mono uppercase text-xs text-content-primary flex items-center gap-2">
                        <Shield className="w-4 h-4 text-brand-primary" />
                        <span>Security & Access</span>
                      </div>
                      <p className="text-[11px] text-content-muted">
                        Change your studio access passkey below.
                      </p>

                      <div className="space-y-2">
                        <input
                          type="password"
                          value={currentPassInput}
                          onChange={(e) => { setCurrentPassInput(e.target.value); setPasskeyChangeMsg(null); }}
                          placeholder="Current passkey"
                          className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-xs font-mono focus:border-brand-primary focus:outline-none"
                        />
                        <input
                          type="password"
                          value={newPassInput}
                          onChange={(e) => { setNewPassInput(e.target.value); setPasskeyChangeMsg(null); }}
                          placeholder="New passkey (min 4 characters)"
                          className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface text-xs font-mono focus:border-brand-primary focus:outline-none"
                        />

                        {passkeyChangeMsg && (
                          <div className={`p-2.5 rounded-lg text-xs font-mono ${passkeyChangeMsg.type === 'success'
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                            }`}>
                            {passkeyChangeMsg.text}
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (newPassInput.trim().length < 4) {
                              setPasskeyChangeMsg({ type: 'error', text: 'New passkey must be at least 4 characters.' });
                              return;
                            }
                            const ok = changePasskey(currentPassInput, newPassInput);
                            if (ok) {
                              setPasskeyChangeMsg({ type: 'success', text: 'Passkey updated successfully!' });
                              setCurrentPassInput('');
                              setNewPassInput('');
                              showToast('Admin passkey updated');
                            } else {
                              setPasskeyChangeMsg({ type: 'error', text: 'Current passkey is incorrect.' });
                            }
                          }}
                          className="btn-primary w-full text-xs py-2 flex items-center justify-center gap-2"
                        >
                          <Key className="w-3.5 h-3.5" />
                          Update Passkey
                        </button>
                      </div>
                    </div>

                    {/* Import & Reset */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="btn-ghost text-xs py-1.5 px-3 flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Import JSON
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('Reset all customizations back to factory defaults?')) {
                            resetToDefaults();
                            showToast('Portfolio reset to defaults');
                          }
                        }}
                        className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Factory Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Project Add/Edit Modal */}
      <AnimatePresence>
        {isProjectFormOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface-subtle">
                <h3 className="font-bold text-sm font-display">
                  {editingProjectId ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={() => setIsProjectFormOpen(false)}
                  className="p-1 rounded text-content-muted hover:text-content-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                <div>
                  <label className="font-mono text-content-secondary block mb-1">Project Title *</label>
                  <input
                    type="text"
                    value={projectForm.title || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="e.g. Distributed Task Queue"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-content-secondary block mb-1">Tagline / Summary</label>
                  <textarea
                    rows={2}
                    value={projectForm.tagline || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                    placeholder="Sub-millisecond latency queue handling millions of events."
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-content-secondary block mb-1">Category</label>
                    <select
                      value={projectForm.category || 'fullstack'}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                    >
                      <option value="fullstack">Full-Stack</option>
                      <option value="backend">Backend & APIs</option>
                      <option value="mobile">Mobile (Flutter)</option>
                      <option value="embedded">Embedded / Low-Level</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-content-secondary block mb-1">Accent Accent</label>
                    <select
                      value={projectForm.accentColor || 'blue'}
                      onChange={(e) => setProjectForm({ ...projectForm, accentColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                    >
                      <option value="blue">Blue</option>
                      <option value="violet">Violet</option>
                      <option value="emerald">Emerald</option>
                      <option value="amber">Amber</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-content-secondary block mb-1">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="React, Next.js, Node.js, PostgreSQL, Docker"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-content-secondary block mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={projectForm.liveUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-content-secondary block mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Role & Timeline */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-content-secondary block mb-1">Role / Responsibility</label>
                    <input
                      type="text"
                      value={projectForm.role || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                      placeholder="e.g. Lead Full-Stack Engineer"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-content-secondary block mb-1">Timeline</label>
                    <input
                      type="text"
                      value={projectForm.timeline || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, timeline: e.target.value })}
                      placeholder="e.g. Jan 2025 – Present"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Key Metrics: Value (10x), Label (Impact), Description (Performance improvement) */}
                <div className="p-3.5 rounded-xl border border-border-subtle bg-surface-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="font-mono font-semibold text-content-primary block text-xs">
                        Impact & Performance Metrics
                      </label>
                      <span className="text-[11px] text-content-muted">
                        Shown on project cards & case study modal
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddMetric}
                      className="text-xs text-brand-primary hover:underline flex items-center gap-1 font-mono font-medium"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Metric
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(projectForm.metrics && projectForm.metrics.length > 0
                      ? projectForm.metrics
                      : [{ label: 'Impact', value: '10x', description: 'Performance improvement' }]
                    ).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg border border-border-subtle bg-surface space-y-2"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-content-muted">
                          <span className="font-medium text-content-secondary">Metric #{idx + 1}</span>
                          {(projectForm.metrics?.length || 0) > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMetric(idx)}
                              className="text-content-muted hover:text-rose-400 p-0.5"
                              title="Remove Metric"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="font-mono text-[10px] text-content-secondary block mb-0.5">
                              Value (e.g. 10x, 99.9%, &lt;180ms)
                            </label>
                            <input
                              type="text"
                              value={m.value}
                              onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                              placeholder="10x"
                              className="w-full px-2.5 py-1.5 rounded border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none font-mono text-xs"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-[10px] text-content-secondary block mb-0.5">
                              Label (e.g. Impact, Uptime)
                            </label>
                            <input
                              type="text"
                              value={m.label}
                              onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                              placeholder="Impact"
                              className="w-full px-2.5 py-1.5 rounded border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none text-xs"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="font-mono text-[10px] text-content-secondary block mb-0.5">
                            Description (e.g. Performance improvement)
                          </label>
                          <input
                            type="text"
                            value={m.description}
                            onChange={(e) => handleUpdateMetric(idx, 'description', e.target.value)}
                            placeholder="Performance improvement"
                            className="w-full px-2.5 py-1.5 rounded border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem Statement */}
                <div>
                  <label className="font-mono text-content-secondary block mb-1">Problem Statement</label>
                  <textarea
                    rows={3}
                    value={projectForm.problemStatement || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, problemStatement: e.target.value })}
                    placeholder="Describe the architectural friction, legacy constraints, or business problem solved..."
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none text-xs leading-relaxed"
                  />
                </div>

                {/* System Architecture */}
                <div>
                  <label className="font-mono text-content-secondary block mb-1">System Architecture</label>
                  <textarea
                    rows={2}
                    value={projectForm.architectureDescription || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, architectureDescription: e.target.value })}
                    placeholder="e.g. Client (Next.js) → Express / Prisma API → PostgreSQL / Cloudinary"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none font-mono text-[11px] leading-relaxed text-emerald-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-toggle"
                    checked={projectForm.featured ?? true}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="w-4 h-4 accent-brand-primary rounded"
                  />
                  <label htmlFor="featured-toggle" className="font-mono text-content-primary cursor-pointer">
                    Show as Featured Project on Homepage Bento Grid
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border-subtle bg-surface-subtle">
                <button
                  onClick={() => setIsProjectFormOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-content-secondary hover:bg-surface"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  className="btn-primary text-xs py-2 px-4"
                >
                  Save Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Import JSON Modal */}
      <AnimatePresence>
        {isImportModalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-surface border border-border-subtle rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm font-display">Import JSON Configuration</h3>
                <button onClick={() => setIsImportModalOpen(false)}>
                  <X className="w-4 h-4 text-content-muted" />
                </button>
              </div>
              <p className="text-xs text-content-muted">
                Paste a valid portfolio JSON export below to restore or apply settings:
              </p>
              <textarea
                rows={7}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"profile": {...}, "projects": [...], "themeConfig": {...}}'
                className="w-full p-3 font-mono text-xs rounded-xl border border-border-subtle bg-surface-subtle focus:border-brand-primary focus:outline-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-content-muted hover:bg-surface rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyImport}
                  className="btn-primary text-xs py-1.5 px-3"
                >
                  Apply Configuration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
