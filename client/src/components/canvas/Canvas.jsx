import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useCanvasStore } from '../../store/canvasStore';
import { ThemeContext, getTheme, loadThemeFonts } from '../../themes';
import SectionRenderer from './SectionRenderer';
import VariantPicker from './VariantPicker';
import { cn } from '../../utils/helpers';
import { defaultContent, blockMeta } from '../../utils/componentRegistry';
import { useEffect } from 'react';

export default function Canvas() {
  const {
    canvasLayout,
    addSection,
    addComponent,
    zoomLevel,
    isPreviewMode,
    deviceMode,
    activeTheme,
    clearSelection,
  } = useCanvasStore();

  const { setNodeRef } = useDroppable({ id: 'canvas' });
  const theme = getTheme(activeTheme);

  // Load Google Fonts whenever theme changes
  useEffect(() => {
    loadThemeFonts(theme);
  }, [theme]);

  // Between-section "+" picker state
  const [addPickerOpen, setAddPickerOpen] = useState(false);
  const [insertIndex, setInsertIndex] = useState(null);
  const [addPickerType, setAddPickerType] = useState(null);
  const [hoverBetween, setHoverBetween] = useState(null);

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event;
      if (!over) return;
      if (active.data.current?.type === 'component') {
        const componentType = active.data.current.componentType;
        const sectionId = over.id;
        if (sectionId !== 'canvas') {
          addComponent(sectionId, {
            type: componentType,
            content: active.data.current.defaultProps || {},
          });
        }
      }
    },
  });

  const deviceStyles = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto',
    mobile: 'w-[375px] mx-auto',
  };

  // CSS variables for theme
  const themeVars = {
    '--theme-bg': theme.colors.bg,
    '--theme-surface': theme.colors.surface,
    '--theme-primary': theme.colors.primary,
    '--theme-primary-fg': theme.colors.primaryFg,
    '--theme-secondary': theme.colors.secondary,
    '--theme-accent': theme.colors.accent,
    '--theme-text': theme.colors.text,
    '--theme-text-muted': theme.colors.textMuted,
    '--theme-text-subtle': theme.colors.textSubtle,
    '--theme-border': theme.colors.border,
    '--theme-card-bg': theme.colors.cardBg,
    '--theme-gradient': theme.colors.gradient,
    '--theme-font-heading': theme.fontHeading,
    '--theme-font-body': theme.fontBody,
  };

  const handleBetweenAdd = (index, type) => {
    if (!type) {
      setInsertIndex(index);
      setAddPickerType('hero'); // default; VariantPicker will show picker
      setAddPickerOpen(true);
    }
  };

  const handleVariantSelect = (variantId) => {
    if (addPickerType) {
      addSection(addPickerType, variantId, defaultContent[addPickerType] || {});
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div
        ref={setNodeRef}
        className={cn(
          'canvas-container flex-1 overflow-auto p-8',
          !isPreviewMode && 'canvas-grid'
        )}
        style={{
          background: '#1a1a2e',
          zoom: `${zoomLevel}%`,
        }}
        onClick={() => clearSelection()}
      >
        <div
          className={cn(
            'canvas-content shadow-2xl min-h-screen transition-all duration-300',
            deviceStyles[deviceMode]
          )}
          style={{
            backgroundColor: theme.colors.bg,
            ...themeVars,
          }}
        >
          <SortableContext
            items={canvasLayout.sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {canvasLayout.sections.map((section, index) => (
              <div key={section.id} style={{ position: 'relative' }}>
                {/* Between-section "+ Add" button */}
                {!isPreviewMode && index === 0 && (
                  <BetweenAddButton
                    visible={hoverBetween === `before-${index}`}
                    onMouseEnter={() => setHoverBetween(`before-${index}`)}
                    onMouseLeave={() => setHoverBetween(null)}
                    onClick={(e) => { e.stopPropagation(); setInsertIndex(index); setAddPickerOpen(true); }}
                  />
                )}
                <SectionRenderer
                  key={section.id}
                  section={section}
                  isPreviewMode={isPreviewMode}
                />
                {!isPreviewMode && (
                  <BetweenAddButton
                    visible={hoverBetween === `after-${index}`}
                    onMouseEnter={() => setHoverBetween(`after-${index}`)}
                    onMouseLeave={() => setHoverBetween(null)}
                    onClick={(e) => { e.stopPropagation(); setInsertIndex(index + 1); setAddPickerOpen(true); }}
                  />
                )}
              </div>
            ))}
          </SortableContext>

          {/* Empty state */}
          {canvasLayout.sections.length === 0 && !isPreviewMode && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                gap: '1rem',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: `${theme.colors.primary}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <FiPlus size={28} color={theme.colors.primary} />
              </div>
              <p style={{ color: theme.colors.text, fontWeight: 700, fontSize: '1.25rem' }}>
                Your canvas is empty
              </p>
              <p style={{ color: theme.colors.textMuted, fontSize: '0.95rem' }}>
                Click a block from the left panel to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Between-section add picker */}
      {addPickerOpen && (
        <BlockTypePicker
          onSelect={(type) => { setAddPickerType(type); }}
          onVariantSelect={handleVariantSelect}
          onClose={() => { setAddPickerOpen(false); setInsertIndex(null); setAddPickerType(null); }}
        />
      )}
    </ThemeContext.Provider>
  );
}

// ─── Between-section add button ──────────────────────────────────────────────
function BetweenAddButton({ visible, onMouseEnter, onMouseLeave, onClick }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 100,
          background: visible ? '#6366f1' : 'rgba(99,102,241,0)',
          color: visible ? '#fff' : 'transparent',
          fontSize: 12,
          fontWeight: 600,
          border: `1px solid ${visible ? '#6366f1' : 'rgba(99,102,241,0)'}`,
          transition: 'all 0.15s',
        }}
      >
        <FiPlus size={12} /> Add section
      </div>
    </div>
  );
}

// ─── Block type quick-pick (opens then goes to VariantPicker) ────────────────
function BlockTypePicker({ onSelect, onVariantSelect, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const { activeTheme } = useCanvasStore();
  if (selectedType) {
    return (
      <VariantPicker
        type={selectedType}
        onSelect={(variantId) => {
          onVariantSelect(variantId);
          onClose();
        }}
        onClose={() => setSelectedType(null)}
      />
    );
  }

  const theme = getTheme(activeTheme);
  const types = Object.entries(blockMeta).filter(([, m]) => m.variants?.length > 0);

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#13131f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2rem', width: 420, maxWidth: '92vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: '#fff', fontWeight: 800, marginBottom: '1.5rem', fontSize: '1.2rem' }}>Add a section</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {types.map(([type, meta]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '1rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = theme.colors.primary; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{meta.icon}</div>
              <div style={{ color: '#e5e7eb', fontWeight: 700, fontSize: 13 }}>{meta.name}</div>
              <div style={{ color: '#555', fontSize: 11, marginTop: 2 }}>{meta.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

