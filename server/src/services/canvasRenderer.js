/**
 * Canvas Renderer Service
 * Handles canvas layout processing and validation
 */

// Validate canvas layout structure
export const validateCanvasLayout = (layout) => {
  const errors = [];

  if (!layout || typeof layout !== 'object') {
    errors.push('Canvas layout must be an object');
    return { valid: false, errors };
  }

  if (!Array.isArray(layout.sections)) {
    errors.push('sections must be an array');
  }

  layout.sections?.forEach((section, index) => {
    if (!section.id) {
      errors.push(`Section ${index} missing id`);
    }
    if (!section.type) {
      errors.push(`Section ${index} missing type`);
    }
    if (!Array.isArray(section.components)) {
      errors.push(`Section ${index} components must be an array`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};

// Generate thumbnail from canvas layout
export const generateThumbnail = (canvasLayout) => {
  // In production, this would use a headless browser or canvas library
  // For now, return a placeholder
  const { sections = [] } = canvasLayout;
  const componentCount = sections.reduce((acc, s) => acc + (s.components?.length || 0), 0);
  
  return {
    url: `/api/thumbnails/placeholder.png`,
    width: 1200,
    height: 630,
    componentCount
  };
};

// Extract colors from canvas layout
export const extractColors = (canvasLayout) => {
  const colors = new Set();

  const extractFromStyle = (style) => {
    if (!style) return;
    
    if (style.backgroundColor) colors.add(style.backgroundColor);
    if (style.textColor) colors.add(style.textColor);
    if (style.gradient) {
      // Extract colors from gradient string
      const gradientColors = style.gradient.match(/#[0-9A-Fa-f]{6}/g);
      gradientColors?.forEach(c => colors.add(c));
    }
  };

  // Extract from global background
  if (canvasLayout.globalBackground?.value) {
    colors.add(canvasLayout.globalBackground.value);
  }

  // Extract from sections and components
  canvasLayout.sections?.forEach(section => {
    extractFromStyle(section.style);
    
    section.components?.forEach(component => {
      extractFromStyle(component.style);
    });
  });

  return Array.from(colors);
};

// Optimize canvas layout (remove unused properties, compress)
export const optimizeCanvasLayout = (layout) => {
  const optimized = JSON.parse(JSON.stringify(layout));

  const cleanObject = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        cleanObject(obj[key]);
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    });
  };

  cleanObject(optimized);
  return optimized;
};

// Clone canvas layout with new IDs
export const cloneCanvasLayout = (layout) => {
  const cloned = JSON.parse(JSON.stringify(layout));

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  cloned.sections = cloned.sections?.map(section => ({
    ...section,
    id: generateId(),
    components: section.components?.map(component => ({
      ...component,
      id: generateId()
    }))
  }));

  return cloned;
};

// Merge canvas layouts
export const mergeCanvasLayouts = (baseLayout, overlayLayout) => {
  return {
    ...baseLayout,
    sections: [
      ...(baseLayout.sections || []),
      ...(overlayLayout.sections || [])
    ].map((section, index) => ({
      ...section,
      order: index
    }))
  };
};

// Get canvas statistics
export const getCanvasStats = (layout) => {
  const sections = layout.sections || [];
  const components = sections.flatMap(s => s.components || []);

  const componentTypes = {};
  components.forEach(c => {
    componentTypes[c.type] = (componentTypes[c.type] || 0) + 1;
  });

  return {
    sectionCount: sections.length,
    componentCount: components.length,
    componentTypes,
    colors: extractColors(layout).length,
    hasResponsive: !!(layout.responsive?.mobile || layout.responsive?.tablet)
  };
};

export default {
  validateCanvasLayout,
  generateThumbnail,
  extractColors,
  optimizeCanvasLayout,
  cloneCanvasLayout,
  mergeCanvasLayouts,
  getCanvasStats
};
