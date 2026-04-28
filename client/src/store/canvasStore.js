import { create } from 'zustand';

const defaultCanvasLayout = {
  sections: [],
  globalBackground: {
    type: 'color',
    value: '#ffffff'
  },
  responsive: {
    desktop: {},
    tablet: {},
    mobile: {}
  }
};

export const useCanvasStore = create((set, get) => ({
  canvasLayout: defaultCanvasLayout,
  selectedComponent: null,
  selectedSection: null,
  history: [],
  historyIndex: -1,
  deviceMode: 'desktop', // desktop, tablet, mobile
  zoomLevel: 100,
  isPreviewMode: false,
  activeTheme: 'midnight',

  // Canvas operations
  setCanvasLayout: (layout) => {
    set({ canvasLayout: layout });
    get().addToHistory(layout);
  },

  updateCanvasLayout: (updater) => {
    const current = get().canvasLayout;
    const updated = typeof updater === 'function' ? updater(current) : updater;
    set({ canvasLayout: updated });
    get().addToHistory(updated);
  },

  resetCanvas: () => {
    set({ 
      canvasLayout: defaultCanvasLayout,
      selectedComponent: null,
      selectedSection: null,
      history: [],
      historyIndex: -1
    });
  },

  // Theme
  setTheme: (themeId) => {
    set({ activeTheme: themeId });
  },

  // Section operations
  // Supports both legacy call: addSection({ type, title, components })
  // and new variant call: addSection(type, variant, content)
  addSection: (typeOrObject, variant, content) => {
    const { canvasLayout } = get();
    let newSection;

    if (typeof typeOrObject === 'string') {
      // New variant-based model
      newSection = {
        id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: typeOrObject,
        variant: variant || null,
        content: content || {},
        components: [],
        style: {},
        order: canvasLayout.sections.length,
      };
    } else {
      // Legacy object model
      const section = typeOrObject;
      newSection = {
        id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: section.type || 'section',
        title: section.title || '',
        variant: section.variant || null,
        content: section.content || {},
        components: section.components || [],
        style: section.style || {},
        order: canvasLayout.sections.length,
      };
    }

    const updated = {
      ...canvasLayout,
      sections: [...canvasLayout.sections, newSection],
    };

    set({ canvasLayout: updated });
    get().addToHistory(updated);
    return newSection.id;
  },

  updateSection: (sectionId, updates) => {
    const { canvasLayout } = get();
    const updated = {
      ...canvasLayout,
      sections: canvasLayout.sections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    };

    set({ canvasLayout: updated });
    get().addToHistory(updated);
  },

  updateSectionContent: (sectionId, contentUpdates) => {
    const { canvasLayout } = get();
    const updated = {
      ...canvasLayout,
      sections: canvasLayout.sections.map((section) =>
        section.id === sectionId
          ? { ...section, content: { ...section.content, ...contentUpdates } }
          : section
      ),
    };
    set({ canvasLayout: updated });
    get().addToHistory(updated);
  },

  deleteSection: (sectionId) => {
    const { canvasLayout } = get();
    const updated = {
      ...canvasLayout,
      sections: canvasLayout.sections.filter(s => s.id !== sectionId)
    };

    set({ canvasLayout: updated, selectedSection: null });
    get().addToHistory(updated);
  },

  reorderSections: (sections) => {
    const { canvasLayout } = get();
    const updated = {
      ...canvasLayout,
      sections: sections.map((section, index) => ({ ...section, order: index }))
    };

    set({ canvasLayout: updated });
    get().addToHistory(updated);
  },

  // Component operations
  addComponent: (sectionId, component) => {
    const { canvasLayout } = get();
    const newComponent = {
      id: `component-${Date.now()}`,
      type: component.type,
      content: component.content || {},
      style: component.style || {},
      props: component.props || {},
      position: component.position || { x: 0, y: 0 }
    };

    const updated = {
      ...canvasLayout,
      sections: canvasLayout.sections.map(section =>
        section.id === sectionId
          ? { ...section, components: [...section.components, newComponent] }
          : section
      )
    };

    set({ canvasLayout: updated });
    get().addToHistory(updated);
    return newComponent.id;
  },

  updateComponent: (componentId, updates) => {
    const { canvasLayout } = get();
    const updated = {
      ...canvasLayout,
      sections: canvasLayout.sections.map(section => ({
        ...section,
        components: section.components.map(comp =>
          comp.id === componentId ? { ...comp, ...updates } : comp
        )
      }))
    };

    set({ canvasLayout: updated });
    get().addToHistory(updated);
  },

  deleteComponent: (componentId) => {
    const { canvasLayout } = get();
    const updated = {
      ...canvasLayout,
      sections: canvasLayout.sections.map(section => ({
        ...section,
        components: section.components.filter(c => c.id !== componentId)
      }))
    };

    set({ canvasLayout: updated, selectedComponent: null });
    get().addToHistory(updated);
  },

  // Selection
  selectComponent: (component) => {
    set({ selectedComponent: component, selectedSection: null });
  },

  selectSection: (section) => {
    set({ selectedSection: section, selectedComponent: null });
  },

  clearSelection: () => {
    set({ selectedComponent: null, selectedSection: null });
  },

  // History operations
  addToHistory: (layout) => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(layout)));
    
    // Limit history to 50 items
    if (newHistory.length > 50) {
      newHistory.shift();
    }

    set({ 
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ 
        canvasLayout: history[newIndex],
        historyIndex: newIndex
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({ 
        canvasLayout: history[newIndex],
        historyIndex: newIndex
      });
    }
  },

  canUndo: () => {
    return get().historyIndex > 0;
  },

  canRedo: () => {
    const { history, historyIndex } = get();
    return historyIndex < history.length - 1;
  },

  // Device mode
  setDeviceMode: (mode) => {
    set({ deviceMode: mode });
  },

  // Zoom
  setZoomLevel: (level) => {
    set({ zoomLevel: Math.max(25, Math.min(200, level)) });
  },

  zoomIn: () => {
    const { zoomLevel } = get();
    set({ zoomLevel: Math.min(200, zoomLevel + 10) });
  },

  zoomOut: () => {
    const { zoomLevel } = get();
    set({ zoomLevel: Math.max(25, zoomLevel - 10) });
  },

  resetZoom: () => {
    set({ zoomLevel: 100 });
  },

  // Preview mode
  togglePreviewMode: () => {
    set({ isPreviewMode: !get().isPreviewMode });
  },

  setPreviewMode: (mode) => {
    set({ isPreviewMode: mode });
  },

  // Background
  setGlobalBackground: (background) => {
    const { canvasLayout } = get();
    const updated = {
      ...canvasLayout,
      globalBackground: background
    };

    set({ canvasLayout: updated });
    get().addToHistory(updated);
  },
}));
