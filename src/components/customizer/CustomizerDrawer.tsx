import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  usePortfolio,
  ACCENT_SWATCHES,
  ThemePreset,
  BackgroundPattern,
} from '../../contexts/PortfolioContext';
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
} from 'lucide-react';

type Tab = 'theme' | 'profile' | 'projects' | 'contact' | 'backup';

export const CustomizerDrawer: React.FC = () => {
  const {
    profile,
    projects,
    themeConfig,
    isCustomizerOpen,
    openCustomizer,
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
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<Tab>('theme');
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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

  const handleDownloadBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kebi-portfolio-config-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Configuration downloaded');
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

  return (
    <>
      {/* Floating Customize Trigger Button */}
      <motion.button
        id="open-studio-btn"
        onClick={openCustomizer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl border border-brand-primary/40 bg-surface/90 text-content-primary hover:border-brand-primary transition-all duration-300 group"
        aria-label="Customize Website"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary" />
        </span>
        <Sliders className="w-4 h-4 text-brand-primary group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-sm font-semibold tracking-wide">Customize Site</span>
        <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono font-bold tracking-wider rounded bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
          Studio
        </span>
      </motion.button>

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
                  { id: 'backup', label: 'Backup & Code', icon: Download },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={`flex items-center gap-2 px-3 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                        isActive
                          ? 'border-brand-primary text-brand-primary'
                          : 'border-transparent text-content-muted hover:text-content-primary'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
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
                            className={`p-3 text-left rounded-xl border transition-all ${
                              themeConfig.preset === preset.id
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
                            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                              themeConfig.accentColor.toLowerCase() === swatch.hex.toLowerCase()
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
                            className={`p-2.5 text-center text-xs font-semibold rounded-xl border transition-all ${
                              themeConfig.bgPattern === pat.id
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
                          className={`px-2.5 py-1 text-xs font-mono rounded-full border transition-colors ${
                            profile.statusActive
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

                {/* ── TAB 5: BACKUP, IMPORT & RESET ─────────────────────────────── */}
                {activeTab === 'backup' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-border-subtle bg-surface-subtle space-y-3">
                      <div className="text-xs font-bold font-mono uppercase text-content-primary">
                        Configuration Management
                      </div>
                      <p className="text-xs text-content-muted leading-relaxed">
                        Export your full configuration (custom theme, edited profile, projects, and contact info) as JSON to keep a backup or transfer to another device.
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <button
                          onClick={handleDownloadBackup}
                          className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download JSON Backup
                        </button>

                        <button
                          onClick={() => setIsImportModalOpen(true)}
                          className="btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          Import JSON Config
                        </button>

                        <button
                          onClick={handleCopyCode}
                          className="btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy JSON String
                        </button>
                      </div>
                    </div>

                    {/* Reset to Factory Defaults */}
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2">
                      <div className="text-xs font-bold font-mono uppercase text-red-400">
                        Reset to Defaults
                      </div>
                      <p className="text-xs text-content-muted">
                        Revert all profile data, projects, and theme customizations back to the original project state.
                      </p>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to reset all portfolio customizations back to original defaults?')) {
                            resetToDefaults();
                            showToast('Portfolio reset to factory blueprint');
                          }
                        }}
                        className="px-3 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset All Data to Blueprint Defaults
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
