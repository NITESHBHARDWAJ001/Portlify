import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import {
  FiSave,
  FiDownload,
  FiEye,
  FiZoomIn,
  FiZoomOut,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiRotateCcw,
  FiRotateCw,
  FiGlobe,
} from 'react-icons/fi';
import { portfolioAPI } from '../utils/api';
import { useCanvasStore } from '../store/canvasStore';
import { useAuthStore } from '../store/authStore';
import Canvas from '../components/canvas/Canvas';
import ComponentLibrary from '../components/sidebar/ComponentLibrary';
import StylePanel from '../components/inspector/StylePanel';
import ThemePanel from '../components/canvas/ThemePanel';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';
import generateReadme from '../utils/markdownGenerator';
import { downloadFile } from '../utils/helpers';
import { defaultContent } from '../utils/componentRegistry';

export default function CanvasEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    canvasLayout,
    setCanvasLayout,
    addSection,
    togglePreviewMode,
    isPreviewMode,
    deviceMode,
    setDeviceMode,
    zoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    undo,
    redo,
    canUndo,
    canRedo,
    activeTheme,
    setTheme,
  } = useCanvasStore();

  const [portfolioTitle, setPortfolioTitle] = useState('Untitled Portfolio');
  const [portfolioId, setPortfolioId] = useState(id);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [themePanelOpen, setThemePanelOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadPortfolio(id);
    } else {
      // New portfolio — start with a centered hero section
      addSection('hero', 'centered', defaultContent.hero);
    }
  }, [id]);

  const loadPortfolio = async (portfolioId) => {
    try {
      const response = await portfolioAPI.getById(portfolioId);
      const portfolio = response.data.data.portfolio;
      setPortfolioTitle(portfolio.title);
      setCanvasLayout(portfolio.canvasLayout);
      setTheme(portfolio.canvasLayout?.theme || 'midnight');
    } catch (error) {
      console.error('Load portfolio error:', error);
      toast.error('Failed to load portfolio');
      navigate('/dashboard');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { title: portfolioTitle, canvasLayout: { ...canvasLayout, theme: activeTheme } };
      if (portfolioId) {
        await portfolioAPI.update(portfolioId, data);
        toast.success('Portfolio saved!');
      } else {
        const response = await portfolioAPI.create(data);
        const newId = response.data.data.portfolio._id;
        setPortfolioId(newId);
        navigate(`/editor/${newId}`, { replace: true });
        toast.success('Portfolio created!');
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  // Save the latest canvas data then toggle publish in one atomic action
  const handleSaveAndPublish = async () => {
    if (!portfolioId) {
      toast.error('Save your portfolio first before publishing.');
      return;
    }
    setPublishing(true);
    try {
      // 1. Persist latest canvas state
      const data = { title: portfolioTitle, canvasLayout: { ...canvasLayout, theme: activeTheme } };
      await portfolioAPI.update(portfolioId, data);
      // 2. Toggle publish (server enforces one-published-at-a-time)
      const res = await portfolioAPI.togglePublish(portfolioId);
      const isNowPublished = res.data.data.portfolio.isPublished;
      toast.success(isNowPublished ? 'Portfolio saved & published!' : 'Portfolio unpublished.');
    } catch (error) {
      console.error('Publish error:', error);
    } finally {
      setPublishing(false);
    }
  };

  const handleExportReadme = () => {
    const markdown = generateReadme(canvasLayout, user);
    downloadFile(markdown, `${portfolioTitle}-README.md`, 'text/markdown');
    toast.success('README downloaded!');
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(canvasLayout, null, 2);
    downloadFile(json, `${portfolioTitle}-layout.json`, 'application/json');
    toast.success('Layout exported!');
  };

  const toolbarBtnStyle = {
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#d1d5db',
    cursor: 'pointer',
    fontSize: 13,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    transition: 'background 0.15s',
  };

  return (
    <DndContext>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0d0d1a', color: '#e5e7eb' }}>
        {/* ── Toolbar ───────────────────────────────────────────────────── */}
        <header
          style={{
            background: '#161624',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '0.625rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexShrink: 0,
          }}
        >
          {/* Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ ...toolbarBtnStyle, fontWeight: 700 }} onClick={() => navigate('/dashboard')}>
              ← Back
            </button>

            <input
              value={portfolioTitle}
              onChange={(e) => setPortfolioTitle(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#e5e7eb',
                fontSize: 14,
                fontWeight: 600,
                width: 220,
                outline: 'none',
              }}
              placeholder="Portfolio Title"
            />
          </div>

          {/* Center – device + zoom + undo/redo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Undo/Redo */}
            <button style={toolbarBtnStyle} onClick={undo} disabled={!canUndo()} title="Undo">
              <FiRotateCcw size={14} />
            </button>
            <button style={toolbarBtnStyle} onClick={redo} disabled={!canRedo()} title="Redo">
              <FiRotateCw size={14} />
            </button>

            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

            {/* Device mode */}
            {[
              { mode: 'desktop', icon: <FiMonitor size={14} /> },
              { mode: 'tablet', icon: <FiTablet size={14} /> },
              { mode: 'mobile', icon: <FiSmartphone size={14} /> },
            ].map(({ mode, icon }) => (
              <button
                key={mode}
                style={{
                  ...toolbarBtnStyle,
                  background: deviceMode === mode ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)',
                  borderColor: deviceMode === mode ? '#6366f1' : 'rgba(255,255,255,0.1)',
                  color: deviceMode === mode ? '#818cf8' : '#888',
                }}
                onClick={() => setDeviceMode(mode)}
                title={mode}
              >
                {icon}
              </button>
            ))}

            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', margin: '0 4px' }} />

            {/* Zoom */}
            <button style={toolbarBtnStyle} onClick={zoomOut} title="Zoom Out"><FiZoomOut size={14} /></button>
            <span style={{ color: '#888', fontSize: 12, minWidth: 36, textAlign: 'center' }}>{zoomLevel}%</span>
            <button style={toolbarBtnStyle} onClick={zoomIn} title="Zoom In"><FiZoomIn size={14} /></button>
            <button style={{ ...toolbarBtnStyle, fontSize: 11 }} onClick={resetZoom}>Reset</button>
          </div>

          {/* Right – actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Themes button */}
            <button
              style={{
                ...toolbarBtnStyle,
                background: themePanelOpen ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)',
                borderColor: themePanelOpen ? '#6366f1' : 'rgba(255,255,255,0.1)',
                color: themePanelOpen ? '#818cf8' : '#d1d5db',
                fontWeight: 600,
              }}
              onClick={() => setThemePanelOpen((v) => !v)}
            >
              🎨 Themes
            </button>

            <button style={{ ...toolbarBtnStyle }} onClick={togglePreviewMode}>
              <FiEye size={14} />
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>

            <button style={{ ...toolbarBtnStyle }} onClick={handleExportReadme}>
              <FiDownload size={14} /> README
            </button>

            <button
              style={{
                ...toolbarBtnStyle,
                background: saving ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.85)',
                borderColor: '#6366f1',
                color: '#fff',
                fontWeight: 700,
              }}
              onClick={handleSave}
              disabled={saving || publishing}
            >
              <FiSave size={14} />
              {saving ? 'Saving…' : 'Save'}
            </button>

            {portfolioId && (
              <button
                style={{
                  ...toolbarBtnStyle,
                  background: publishing ? 'rgba(16,185,129,0.4)' : 'rgba(16,185,129,0.85)',
                  borderColor: '#10b981',
                  color: '#fff',
                  fontWeight: 700,
                }}
                onClick={handleSaveAndPublish}
                disabled={saving || publishing}
                title="Saves latest changes then publishes"
              >
                <FiGlobe size={14} />
                {publishing ? 'Publishing…' : 'Publish'}
              </button>
            )}
          </div>
        </header>

        {/* ── Main editor ──────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
          {!isPreviewMode && <ComponentLibrary />}

          <Canvas />

          {!isPreviewMode && <StylePanel />}
        </div>
      </div>

      {/* Theme panel (slides in beside StylePanel) */}
      <ThemePanel isOpen={themePanelOpen} onClose={() => setThemePanelOpen(false)} />

      <DragOverlay />
    </DndContext>
  );
}

