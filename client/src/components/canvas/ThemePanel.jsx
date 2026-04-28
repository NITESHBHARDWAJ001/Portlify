import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import { themes, themeFolders } from '../../themes';
import { useCanvasStore } from '../../store/canvasStore';

export default function ThemePanel({ isOpen, onClose }) {
  const { activeTheme, setTheme } = useCanvasStore();
  const [activeFolder, setActiveFolder] = useState('all');

  const visibleThemes = activeFolder === 'all'
    ? themes
    : themes.filter((t) => t.folder === activeFolder);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 39 }} onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 320,
              width: 310,
              height: '100vh',
              background: '#12121e',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              overflowY: 'auto',
              zIndex: 40,
              boxShadow: '-8px 0 32px rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.25rem 1.25rem 0', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', margin: 0 }}>🎨 Themes</h2>
                  <p style={{ color: '#555', fontSize: 11, marginTop: 3, margin: '3px 0 0' }}>
                    {themes.length} themes in {themeFolders.length - 1} collections
                  </p>
                </div>
                <button
                  onClick={onClose}
                  style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#888', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <FiX size={14} />
                </button>
              </div>

              {/* Folder tabs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {themeFolders.map((folder) => {
                  const isActive = activeFolder === folder.id;
                  const count = folder.id === 'all' ? themes.length : themes.filter((t) => t.folder === folder.id).length;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setActiveFolder(folder.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 8,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 11,
                        fontWeight: 600,
                        background: isActive ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                        color: isActive ? '#a5b4fc' : '#666',
                        outline: isActive ? '1px solid rgba(99,102,241,0.4)' : 'none',
                        transition: 'all 0.15s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <span>{folder.emoji}</span>
                      <span>{folder.label}</span>
                      <span style={{ opacity: 0.6, fontSize: 9 }}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme grid */}
            <div style={{ padding: '1rem 1.25rem', flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                {visibleThemes.map((theme) => {
                  const isActive = activeTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setTheme(theme.id)}
                      style={{
                        background: theme.colors.bg,
                        border: `2px solid ${isActive ? theme.colors.primary : 'transparent'}`,
                        borderRadius: 12,
                        padding: '0.7rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        position: 'relative',
                        outline: 'none',
                        transition: 'transform 0.15s, border-color 0.2s',
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = `${theme.colors.primary}60`;
                        e.currentTarget.style.transform = 'scale(1.03)';
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.transform = '';
                      }}
                    >
                      {isActive && (
                        <div style={{ position: 'absolute', top: 5, right: 5, width: 17, height: 17, borderRadius: '50%', background: theme.colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FiCheck size={9} color={theme.colors.primaryFg} />
                        </div>
                      )}
                      {/* Gradient preview bar */}
                      <div style={{ height: 28, borderRadius: 7, background: theme.colors.gradient, marginBottom: 8, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 60%, ${theme.colors.bg}40)` }} />
                      </div>
                      {/* Color dots */}
                      <div style={{ display: 'flex', gap: 3, marginBottom: 7 }}>
                        {theme.preview.map((color) => (
                          <div key={color} style={{ width: 12, height: 12, borderRadius: '50%', background: color, border: `1px solid ${theme.colors.border}`, flexShrink: 0 }} />
                        ))}
                      </div>
                      <div style={{ color: theme.colors.text, fontWeight: 700, fontSize: 11, marginBottom: 2 }}>
                        {theme.emoji} {theme.name}
                      </div>
                      <div style={{ color: theme.colors.textMuted, fontSize: 9, textTransform: 'capitalize', opacity: 0.7 }}>
                        {theme.fontHeading}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active theme info */}
              {activeTheme && (() => {
                const t = themes.find((th) => th.id === activeTheme);
                if (!t) return null;
                return (
                  <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ color: '#777', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Active — {t.name}</div>
                    <div style={{ height: 6, borderRadius: 4, background: t.colors.gradient, marginBottom: 10 }} />
                    <div style={{ color: '#aaa', fontSize: 11, marginBottom: 3 }}>
                      <span style={{ color: '#555' }}>Heading · </span>{t.fontHeading}
                    </div>
                    <div style={{ color: '#aaa', fontSize: 11 }}>
                      <span style={{ color: '#555' }}>Body · </span>{t.fontBody}
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

