import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { allBlockTypes, defaultContent, blockMeta } from '../../utils/componentRegistry';
import { useCanvasStore } from '../../store/canvasStore';
import { getTheme } from '../../themes';
import VariantPicker from '../canvas/VariantPicker';
import { cn } from '../../utils/helpers';

// ─── Mini CSS Thumbnail per block type ───────────────────────────────────────
function BlockThumbnail({ type, colors }) {
  const c = colors;
  const shared = {
    width: '100%',
    height: 72,
    borderRadius: 8,
    background: c.bg,
    overflow: 'hidden',
    position: 'relative',
  };

  if (type === 'hero') return (
    <div style={shared}>
      <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.primary }} />
        <div style={{ width: '55%', height: 6, background: c.text, borderRadius: 3, opacity: 0.8 }} />
        <div style={{ width: '38%', height: 4, background: c.textMuted, borderRadius: 3, opacity: 0.5 }} />
        <div style={{ display: 'flex', gap: 3 }}>
          <div style={{ width: 28, height: 7, borderRadius: 3, background: c.primary }} />
          <div style={{ width: 24, height: 7, borderRadius: 3, border: `1px solid ${c.border}` }} />
        </div>
      </div>
    </div>
  );

  if (type === 'projects') return (
    <div style={shared}>
      <div style={{ padding: 8, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: 22, background: `${c.primary}25` }} />
            <div style={{ padding: '3px 4px' }}>
              <div style={{ height: 3, background: c.text, borderRadius: 2, opacity: 0.5, marginBottom: 2 }} />
              <div style={{ height: 3, background: c.textMuted, borderRadius: 2, opacity: 0.3 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'skills') return (
    <div style={{ ...shared, padding: 8 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {['⚛️ React', '🟢 Node', '🔷 TS', '🍃 DB'].map((t) => (
          <span key={t} style={{ padding: '2px 7px', borderRadius: 100, background: c.cardBg, border: `1px solid ${c.border}`, fontSize: 9, color: c.textMuted, fontWeight: 600 }}>
            {t}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[80, 65, 75].map((w, i) => (
          <div key={i} style={{ height: 4, background: `${c.primary}15`, borderRadius: 100, overflow: 'hidden' }}>
            <div style={{ width: `${w}%`, height: '100%', background: c.gradient, borderRadius: 100 }} />
          </div>
        ))}
      </div>
    </div>
  );

  if (type === 'timeline') return (
    <div style={{ ...shared, padding: '8px 10px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.primary, marginTop: 2, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 4, background: c.text, borderRadius: 2, opacity: 0.7, marginBottom: 2 }} />
            <div style={{ height: 3, background: c.textMuted, borderRadius: 2, opacity: 0.4 }} />
          </div>
        </div>
      ))}
    </div>
  );

  if (type === 'contact') return (
    <div style={{ ...shared, padding: '8px 10px' }}>
      <div style={{ height: 5, width: '50%', background: c.text, borderRadius: 3, opacity: 0.8, marginBottom: 8 }} />
      {[0, 1].map((i) => (
        <div key={i} style={{ height: 12, background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 4, marginBottom: 5 }} />
      ))}
      <div style={{ height: 12, width: '40%', borderRadius: 4, background: c.primary }} />
    </div>
  );

  if (type === 'about') return (
    <div style={{ ...shared, padding: '8px 10px', display: 'flex', gap: 6 }}>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${c.primary}30`, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: 5, background: c.text, borderRadius: 3, opacity: 0.8, marginBottom: 4 }} />
        <div style={{ height: 4, background: c.textMuted, borderRadius: 3, opacity: 0.4, marginBottom: 3 }} />
        <div style={{ height: 4, background: c.textMuted, borderRadius: 3, opacity: 0.3 }} />
      </div>
    </div>
  );

  if (type === 'testimonials') return (
    <div style={{ ...shared, padding: 7, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 5, padding: '4px 5px' }}>
          <div style={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            {[0,1,2,3,4].map((s) => <div key={s} style={{ width: 5, height: 5, background: '#f59e0b', borderRadius: 1 }} />)}
          </div>
          <div style={{ height: 3, background: c.textMuted, borderRadius: 2, opacity: 0.4, marginBottom: 2 }} />
          <div style={{ height: 3, width: '80%', background: c.textMuted, borderRadius: 2, opacity: 0.3 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: c.gradient }} />
            <div style={{ height: 3, width: '55%', background: c.text, borderRadius: 2, opacity: 0.45 }} />
          </div>
        </div>
      ))}
    </div>
  );

  if (type === 'services') return (
    <div style={{ ...shared, padding: 7, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 5, padding: '5px 6px' }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: `${c.primary}25`, border: `1px solid ${c.border}`, marginBottom: 4 }} />
          <div style={{ height: 4, width: '75%', background: c.text, borderRadius: 2, opacity: 0.65, marginBottom: 3 }} />
          <div style={{ height: 3, background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
        </div>
      ))}
    </div>
  );

  if (type === 'stats') return (
    <div style={{ ...shared, padding: 7, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
      {['🚀 50+', '⭐ 4.9', '📦 200+', '🎯 98%'].slice(0, 4).map((label, i) => (
        <div key={i} style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 5, padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ height: 11, width: '65%', background: c.gradient, borderRadius: 3, marginBottom: 3, opacity: 0.8 }} />
          <div style={{ height: 3, width: '80%', background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
        </div>
      ))}
    </div>
  );

  if (type === 'cta') return (
    <div style={{ ...shared, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 5, padding: 10 }}>
      <div style={{ height: 8, width: '60%', background: c.text, borderRadius: 3, opacity: 0.8 }} />
      <div style={{ height: 4, width: '80%', background: c.textMuted, borderRadius: 3, opacity: 0.4 }} />
      <div style={{ display: 'flex', gap: 5 }}>
        <div style={{ width: 44, height: 10, borderRadius: 5, background: c.gradient }} />
        <div style={{ width: 36, height: 10, borderRadius: 5, border: `1px solid ${c.border}` }} />
      </div>
    </div>
  );

  // Fallback
  return (
    <div style={{ ...shared, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 24 }}>{blockMeta[type]?.icon || '📦'}</span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ComponentLibrary() {
  const { addSection, activeTheme } = useCanvasStore();
  const theme = getTheme(activeTheme);
  const c = theme.colors;

  const [search, setSearch] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerType, setPickerType] = useState(null);

  const filtered = allBlockTypes.filter(
    (b) => !search || b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlockClick = (type) => {
    const meta = blockMeta[type];
    if (meta?.variants?.length > 0) {
      setPickerType(type);
      setPickerOpen(true);
    } else {
      // No variants — add directly
      addSection(type, null, defaultContent[type] || {});
    }
  };

  const handleVariantSelect = (variantId) => {
    if (!pickerType) return;
    addSection(pickerType, variantId, defaultContent[pickerType] || {});
  };

  return (
    <>
      <div
        style={{
          width: 280,
          background: '#161624',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.25rem 1.25rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ color: '#e5e7eb', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
            Blocks
          </h2>
          <div style={{ position: 'relative' }}>
            <FiSearch
              size={14}
              style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#555', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="Search blocks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 10px 7px 30px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.05)',
                color: '#ccc',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Block list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          <p style={{ color: '#555', fontSize: 11, marginBottom: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Click to add a section
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {filtered.map((block) => (
              <DraggableBlock
                key={block.type}
                block={block}
                themeColors={c}
                onClick={() => handleBlockClick(block.type)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#555', fontSize: 13 }}>
              No blocks match "{search}"
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ color: '#444', fontSize: 11, margin: 0, textAlign: 'center' }}>
            Click a block · or drag to canvas
          </p>
        </div>
      </div>

      {/* VariantPicker Modal */}
      {pickerOpen && pickerType && (
        <VariantPicker
          type={pickerType}
          onSelect={handleVariantSelect}
          onClose={() => { setPickerOpen(false); setPickerType(null); }}
        />
      )}
    </>
  );
}

// ─── Draggable block card ────────────────────────────────────────────────────

function DraggableBlock({ block, themeColors, onClick }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `component-${block.type}`,
    data: {
      type: 'component',
      componentType: block.type,
      defaultProps: defaultContent[block.type] || {},
    },
  });

  const hasVariants = block.variants?.length > 0;

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isDragging ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background 0.15s, border-color 0.15s, transform 0.1s',
        opacity: isDragging ? 0.5 : 1,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.borderColor = `${themeColors.primary}50`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
    >
      {/* Thumbnail */}
      <div {...attributes} {...listeners} style={{ cursor: 'grab' }}>
        <BlockThumbnail type={block.type} colors={themeColors} />
      </div>

      {/* Footer row — click-to-add */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
        onClick={onClick}
      >
        <div>
          <span style={{ color: '#d1d5db', fontWeight: 600, fontSize: 12 }}>
            {block.icon} {block.name}
          </span>
          {hasVariants && (
            <span style={{ color: '#555', fontSize: 10, display: 'block', marginTop: 1 }}>
              {block.variants.length} layouts
            </span>
          )}
        </div>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: `${themeColors.primary}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FiPlus size={12} color={themeColors.primary} />
        </div>
      </div>
    </div>
  );
}

