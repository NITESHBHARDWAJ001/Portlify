import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';
import { FiTrash2, FiMove, FiCopy, FiSettings } from 'react-icons/fi';
import { useCanvasStore } from '../../store/canvasStore';
import { getVariantComponent } from '../../utils/componentRegistry';
import BlockRenderer from './BlockRenderer';
import { cn } from '../../utils/helpers';

export default function SectionRenderer({ section, isPreviewMode }) {
  const {
    deleteSection,
    selectSection,
    selectedSection,
    addSection,
  } = useCanvasStore();

  const [hovered, setHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const { setNodeRef: setDropRef } = useDroppable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    if (!isPreviewMode) selectSection(section);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteSection(section.id);
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();
    addSection(section.type, section.variant, { ...(section.content || {}) });
  };

  const isSelected = selectedSection?.id === section.id;

  // ─── Variant dispatch ──────────────────────────────────────────────────
  const VariantComponent = section.variant
    ? getVariantComponent(section.type, section.variant)
    : null;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'relative',
        outline: isSelected && !isPreviewMode ? '2px solid #6366f1' : '2px solid transparent',
        outlineOffset: -2,
        opacity: isDragging ? 0.45 : 1,
        transition: 'outline 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ─── Hover controls ────────────────────────────────────────────── */}
      {!isPreviewMode && (hovered || isSelected) && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 20,
            display: 'flex',
            gap: 4,
            background: 'rgba(13,13,26,0.9)',
            borderRadius: 8,
            padding: '4px 6px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle */}
          <button
            {...attributes}
            {...listeners}
            title="Drag to reorder"
            style={{
              padding: '4px 6px',
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'grab',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FiMove size={13} />
          </button>

          {/* Duplicate */}
          <button
            onClick={handleDuplicate}
            title="Duplicate section"
            style={{
              padding: '4px 6px',
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#d1d5db')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#888')}
          >
            <FiCopy size={13} />
          </button>

          {/* Select / Settings */}
          <button
            onClick={handleSelect}
            title="Edit section content"
            style={{
              padding: '4px 6px',
              background: isSelected ? '#6366f1' : 'transparent',
              border: 'none',
              color: isSelected ? '#fff' : '#888',
              cursor: 'pointer',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseOver={(e) => { if (!isSelected) e.currentTarget.style.color = '#d1d5db'; }}
            onMouseOut={(e) => { if (!isSelected) e.currentTarget.style.color = '#888'; }}
          >
            <FiSettings size={13} />
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            title="Delete section"
            style={{
              padding: '4px 6px',
              background: 'transparent',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#f87171')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#888')}
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      )}

      {/* ─── Section content ────────────────────────────────────────────── */}
      <div
        ref={setDropRef}
        onClick={handleSelect}
        style={{
          ...section.style,
        }}
      >
        {VariantComponent ? (
          // New variant-based section-as-block model
          <VariantComponent
            content={section.content || {}}
            isEditing={!isPreviewMode}
          />
        ) : (
          // Legacy component-array model
          <div
            className={cn(
              'section-components',
              section.layout === 'grid' && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4',
              section.layout === 'flex' && 'flex flex-wrap gap-4 p-4',
              section.layout === 'absolute' && 'relative'
            )}
          >
            {(section.components || []).map((component) => (
              <BlockRenderer
                key={component.id}
                component={component}
                isPreviewMode={isPreviewMode}
              />
            ))}

            {(!section.components || section.components.length === 0) && !isPreviewMode && (
              <div className="p-8 text-center text-gray-400 border-2 border-dashed border-gray-300 rounded min-h-[80px]">
                Drop components here
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

