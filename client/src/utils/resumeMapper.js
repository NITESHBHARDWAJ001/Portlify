// ============================================================
// Resume → Canvas Layout Mapper
// Converts parsed resume data + user choices into a full
// canvasLayout ready to be loaded into the canvas store.
// ============================================================

import { defaultContent } from './componentRegistry';

// ─── Section order ────────────────────────────────────────────────────────────

const SECTION_ORDER = ['hero', 'about', 'skills', 'timeline', 'projects', 'contact'];

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * @param {object} parsedData        Structured resume data from the server
 * @param {object} selectedSections  { hero: true, about: true, ... }
 * @param {object} variantChoices    { hero: 'centered', about: 'bio', ... }
 * @param {string} [theme='midnight'] Theme ID
 * @returns {object}                  canvasLayout compatible with canvasStore
 */
export function mapResumeToCanvasLayout(parsedData, selectedSections, variantChoices, theme = 'midnight') {
  const sections = [];
  let order = 0;

  const push = (type, content) => {
    sections.push({
      id: `section-${Date.now()}-${type}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      variant: variantChoices[type] || null,
      content,
      components: [],
      style: {},
      order: order++,
    });
  };

  for (const sectionId of SECTION_ORDER) {
    if (!selectedSections[sectionId]) continue;

    switch (sectionId) {
      case 'hero':
        push('hero', buildHeroContent(parsedData));
        break;
      case 'about':
        push('about', buildAboutContent(parsedData));
        break;
      case 'skills':
        if (parsedData.skills.length > 0) {
          push('skills', buildSkillsContent(parsedData));
        }
        break;
      case 'timeline':
        if (parsedData.experience.length > 0 || parsedData.education.length > 0) {
          push('timeline', buildTimelineContent(parsedData));
        }
        break;
      case 'projects':
        if (parsedData.projects.length > 0) {
          push('projects', buildProjectsContent(parsedData));
        }
        break;
      case 'contact':
        push('contact', buildContactContent(parsedData));
        break;
      default:
        break;
    }
  }

  return {
    sections,
    globalBackground: { type: 'color', value: '#ffffff' },
    responsive: { desktop: {}, tablet: {}, mobile: {} },
    theme,
  };
}

// ─── Content builders ─────────────────────────────────────────────────────────

function buildHeroContent(d) {
  return {
    ...defaultContent.hero,
    name: d.name || defaultContent.hero.name,
    title: d.title || defaultContent.hero.title,
    description: d.summary
      ? d.summary.slice(0, 200)
      : defaultContent.hero.description,
    social: {
      github: d.github || '',
      linkedin: d.linkedin || '',
      twitter: '',
    },
    skills: d.skills.slice(0, 6),
  };
}

function buildAboutContent(d) {
  return {
    ...defaultContent.about,
    name: d.name || defaultContent.about.name,
    role: d.title || defaultContent.about.role,
    bio: d.summary ? d.summary.slice(0, 400) : defaultContent.about.bio,
    bio2: '',
    location: d.location || defaultContent.about.location,
    social: {
      github: d.github || '',
      linkedin: d.linkedin || '',
      twitter: '',
      email: d.email || '',
    },
    skills: d.skills.slice(0, 8),
    experience: calcYearsOfExp(d.experience),
    projects: d.projects.length > 0 ? `${d.projects.length}+` : defaultContent.about.projects,
  };
}

function buildSkillsContent(d) {
  return {
    ...defaultContent.skills,
    skills: d.skills.map((name) => ({
      name,
      level: 70 + seededOffset(name, 25),
      icon: getSkillIcon(name),
      category: guessSkillCategory(name),
    })),
  };
}

function buildTimelineContent(d) {
  const items = [];
  let id = 1;

  // Work experience first
  for (const job of d.experience) {
    items.push({
      id: id++,
      type: 'work',
      title: job.title || 'Software Engineer',
      company: job.company || '',
      location: job.location || '',
      duration: job.duration || '',
      description: job.highlights.slice(0, 2).join(' ') || '',
    });
  }

  // Then education
  for (const edu of d.education) {
    items.push({
      id: id++,
      type: 'education',
      title: edu.degree || 'Degree',
      company: edu.institution || '',
      location: '',
      duration: edu.duration || '',
      description: '',
    });
  }

  return { ...defaultContent.timeline, items };
}

function buildProjectsContent(d) {
  return {
    ...defaultContent.projects,
    projects: d.projects.map((p, i) => ({
      id: i + 1,
      title: p.name || `Project ${i + 1}`,
      description: p.description || '',
      image: '',
      link: p.link || '',
      github: '',
      tech: p.tech || [],
    })),
  };
}

function buildContactContent(d) {
  return {
    ...defaultContent.contact,
    email: d.email || defaultContent.contact.email,
    location: d.location || defaultContent.contact.location,
    social: {
      github: d.github || '',
      linkedin: d.linkedin || '',
      twitter: '',
    },
  };
}

// ─── Skill helpers ────────────────────────────────────────────────────────────

const CATEGORY_MAP = {
  Frontend: ['react', 'vue', 'angular', 'svelte', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'next', 'nuxt', 'gatsby', 'typescript', 'javascript', 'jquery', 'webpack', 'vite'],
  Backend: ['node', 'express', 'django', 'flask', 'rails', 'spring', 'laravel', 'fastapi', 'graphql', 'rest', 'php', 'ruby', 'golang', 'go', 'rust', 'java', 'python', 'c#', '.net'],
  Database: ['mongodb', 'mysql', 'postgresql', 'postgres', 'redis', 'sqlite', 'firebase', 'supabase', 'dynamodb', 'oracle', 'cassandra'],
  DevOps: ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'ci/cd', 'jenkins', 'github actions', 'terraform', 'nginx', 'linux', 'bash', 'ansible'],
  Mobile: ['react native', 'flutter', 'swift', 'kotlin', 'ios', 'android', 'expo'],
  Tools: ['git', 'figma', 'jira', 'postman', 'vscode', 'xcode', 'photoshop'],
};

function guessSkillCategory(name) {
  const lower = name.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_MAP)) {
    if (keywords.some((k) => lower.includes(k))) return cat;
  }
  return 'Other';
}

const ICON_MAP = {
  react: '⚛️', vue: '💚', angular: '🔴', typescript: '🔷', javascript: '🟡',
  node: '🟢', python: '🐍', java: '☕', rust: '🦀', go: '🐹', golang: '🐹',
  docker: '🐳', kubernetes: '⚙️', aws: '☁️', gcp: '☁️', azure: '☁️',
  mongodb: '🍃', postgresql: '🐘', redis: '📦', mysql: '🗄️',
  git: '🔗', linux: '🐧', figma: '🎨', swift: '🍎', flutter: '💙',
};

function getSkillIcon(name) {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) return icon;
  }
  return '💡';
}

// ─── Misc helpers ─────────────────────────────────────────────────────────────

/** Deterministic pseudo-offset per skill name so levels look varied, not random per render */
function seededOffset(str, max) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) & 0xffffffff;
  return Math.abs(h) % max;
}

/** Rough years-of-experience calculation from job list */
function calcYearsOfExp(experience) {
  if (!experience.length) return defaultContent.about.experience;
  const yearRe = /\b(19|20)\d{2}\b/g;
  let earliestYear = new Date().getFullYear();
  let latestYear = earliestYear;

  for (const job of experience) {
    const years = (job.duration || '').match(yearRe);
    if (years) {
      years.forEach((y) => {
        const n = parseInt(y, 10);
        if (n < earliestYear) earliestYear = n;
        if (n > latestYear && !/present|current/i.test(job.duration)) latestYear = n;
      });
    }
  }

  const diff = new Date().getFullYear() - earliestYear;
  if (diff <= 0) return defaultContent.about.experience;
  return `${diff}+`;
}
