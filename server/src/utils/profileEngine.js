const SECTION_ORDER = ['hero', 'about', 'skills', 'timeline', 'projects', 'contact'];

const defaultVariants = {
  hero: 'centered',
  about: 'bio',
  skills: 'bars',
  timeline: 'vertical',
  projects: 'grid',
  contact: 'minimal',
};

function id(type, idx) {
  return `section-${type}-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`;
}

function mapSkills(skills = []) {
  return skills
    .filter(Boolean)
    .map((s) => {
      const name = typeof s === 'string' ? s : s.name || '';
      const level = typeof s === 'object' && s.level ? s.level : 80;
      return {
        name,
        level,
        icon: '💡',
        category: 'General',
      };
    })
    .filter((s) => s.name.trim().length > 0);
}

function buildTimeline(profile) {
  const experience = (profile.experience || []).map((x, i) => ({
    id: i + 1,
    type: 'work',
    title: x.title || 'Role',
    company: x.company || '',
    location: x.location || '',
    duration: x.duration || '',
    description: (x.highlights || []).join(' '),
  }));

  const education = (profile.education || []).map((x, i) => ({
    id: experience.length + i + 1,
    type: 'education',
    title: x.degree || 'Degree',
    company: x.institution || '',
    location: x.location || '',
    duration: x.duration || '',
    description: '',
  }));

  return [...experience, ...education];
}

export function generateCanvasLayoutFromProfile(profile = {}, theme = 'midnight') {
  const sections = [];
  const skills = mapSkills(profile.skills);

  const contentMap = {
    hero: {
      name: profile.name || 'Your Name',
      title: profile.headline || profile.title || 'Software Engineer',
      description: profile.summary || 'Building useful software with clean architecture and user focus.',
      badge: profile.openToWork ? 'Open to work' : 'Available for projects',
      ctaPrimary: { label: 'View Projects', href: '#projects' },
      ctaSecondary: { label: 'Contact Me', href: '#contact' },
      social: {
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        twitter: profile.twitter || '',
      },
      skills: skills.slice(0, 6).map((s) => s.name),
    },
    about: {
      name: profile.name || 'Your Name',
      role: profile.headline || profile.title || 'Software Engineer',
      bio: profile.summary || '',
      bio2: profile.about || '',
      location: profile.location || '',
      availability: profile.openToWork ? 'Open to opportunities' : 'Currently employed',
      social: {
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        twitter: profile.twitter || '',
        email: profile.email || '',
      },
      skills: skills.slice(0, 8).map((s) => s.name),
      experience: `${Math.max(1, profile.totalYearsExperience || 1)}+`,
      projects: `${(profile.projects || []).length || 0}+`,
      stars: profile.githubStars ? `${profile.githubStars}` : '0',
    },
    skills: {
      title: 'Skills & Technologies',
      subtitle: 'Core capabilities',
      skills,
    },
    timeline: {
      title: 'Experience',
      items: buildTimeline(profile),
    },
    projects: {
      title: 'Projects',
      subtitle: 'Selected work',
      projects: (profile.projects || []).map((p, i) => ({
        id: i + 1,
        title: p.name || `Project ${i + 1}`,
        description: p.description || '',
        image: '',
        link: p.link || '',
        github: p.github || '',
        tech: p.tech || [],
      })),
    },
    contact: {
      title: 'Get In Touch',
      email: profile.email || '',
      location: profile.location || '',
      social: {
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        twitter: profile.twitter || '',
      },
    },
  };

  SECTION_ORDER.forEach((type, idx) => {
    sections.push({
      id: id(type, idx),
      type,
      variant: defaultVariants[type],
      content: contentMap[type],
      components: [],
      style: {},
      order: idx,
    });
  });

  return {
    sections,
    globalBackground: { type: 'color', value: '#ffffff' },
    responsive: { desktop: {}, tablet: {}, mobile: {} },
    theme,
  };
}

export function generateResumeMarkdown(profile = {}) {
  const lines = [];
  
  // Header: Name
  lines.push(`# ${profile.name || 'Your Name'}`);
  lines.push('');
  
  // Professional headline
  lines.push(`${profile.headline || profile.title || 'Software Engineer'}`);
  lines.push('');

  // Contact information with smart formatting
  const contactLines = [];
  if (profile.email) contactLines.push(profile.email);
  if (profile.phone) contactLines.push(profile.phone);
  if (profile.location) contactLines.push(profile.location);
  
  if (contactLines.length) {
    lines.push(contactLines.join(' | '));
  }
  
  // Social links (separated for PDF rendering)
  const socialLinks = [];
  if (profile.linkedin) socialLinks.push(`LinkedIn: ${profile.linkedin}`);
  if (profile.github) socialLinks.push(`GitHub: ${profile.github}`);
  if (profile.website) socialLinks.push(`Portfolio: ${profile.website}`);
  
  if (socialLinks.length) {
    lines.push(socialLinks.join(' | '));
  }
  lines.push('');

  // Professional Summary
  if (profile.summary && profile.summary.trim()) {
    lines.push('## PROFESSIONAL SUMMARY');
    lines.push(profile.summary);
    lines.push('');
  }

  // Core Skills (ATS-friendly format)
  const skills = mapSkills(profile.skills).map((s) => s.name);
  if (skills.length) {
    lines.push('## CORE SKILLS');
    // Group skills by type for better ATS parsing
    const skillGroups = {};
    skills.forEach((skill) => {
      const category = categorizeSkill(skill);
      if (!skillGroups[category]) skillGroups[category] = [];
      skillGroups[category].push(skill);
    });
    
    Object.entries(skillGroups).forEach(([category, categorySkills]) => {
      lines.push(`${category}: ${categorySkills.join(', ')}`);
    });
    lines.push('');
  }

  // Professional Experience (most important for ATS)
  if ((profile.experience || []).length) {
    lines.push('## PROFESSIONAL EXPERIENCE');
    lines.push('');
    profile.experience.forEach((exp) => {
      const title = exp.title || 'Role';
      const company = exp.company || 'Company';
      const duration = exp.duration || '';
      const location = exp.location || '';
      
      // Format: Job Title | Company | Duration | Location
      lines.push(`### ${title}`);
      lines.push(`**${company}** | ${duration} ${location ? `| ${location}` : ''}`.trim());
      
      // Highlights as bullet points (ATS loves these)
      if (exp.highlights && exp.highlights.length) {
        exp.highlights.forEach((h) => {
          if (h && h.trim()) lines.push(`- ${h.trim()}`);
        });
      }
      lines.push('');
    });
  }

  // Education
  if ((profile.education || []).length) {
    lines.push('## EDUCATION');
    lines.push('');
    profile.education.forEach((edu) => {
      const degree = edu.degree || 'Degree';
      const institution = edu.institution || 'Institution';
      const duration = edu.duration ? ` | ${edu.duration}` : '';
      
      lines.push(`**${degree}** from **${institution}**${duration}`);
    });
    lines.push('');
  }

  // Projects
  if ((profile.projects || []).length) {
    lines.push('## PROJECTS');
    lines.push('');
    profile.projects.forEach((proj) => {
      lines.push(`### ${proj.name || 'Project'}`);
      if (proj.description && proj.description.trim()) {
        lines.push(proj.description.trim());
      }
      
      const projDetails = [];
      if ((proj.tech || []).length) {
        projDetails.push(`Tech: ${proj.tech.join(', ')}`);
      }
      if (proj.link) {
        projDetails.push(`Link: ${proj.link}`);
      }
      
      projDetails.forEach((detail) => lines.push(detail));
      lines.push('');
    });
  }

  return lines.join('\n').trim();
}

/**
 * Categorize skills for better ATS organization
 */
function categorizeSkill(skill) {
  const skill_lower = skill.toLowerCase();
  
  if (['react', 'vue', 'angular', 'svelte', 'nextjs', 'next.js', 'gatsby', 'remix'].some(s => skill_lower.includes(s))) {
    return 'Frontend';
  }
  if (['node', 'express', 'django', 'flask', 'fastapi', 'spring', 'laravel', 'rails'].some(s => skill_lower.includes(s))) {
    return 'Backend';
  }
  if (['python', 'javascript', 'typescript', 'java', 'c#', 'c++', 'rust', 'go', 'php', 'ruby', 'kotlin'].some(s => skill_lower.includes(s))) {
    return 'Languages';
  }
  if (['postgresql', 'mysql', 'mongodb', 'redis', 'firebase', 'dynamodb', 'sql', 'nosql'].some(s => skill_lower.includes(s))) {
    return 'Databases';
  }
  if (['aws', 'azure', 'gcp', 'heroku', 'vercel', 'netlify', 'docker', 'kubernetes', 'devops'].some(s => skill_lower.includes(s))) {
    return 'Cloud & DevOps';
  }
  if (['git', 'github', 'gitlab', 'bitbucket', 'jira', 'agile', 'scrum'].some(s => skill_lower.includes(s))) {
    return 'Tools & Methodologies';
  }
  
  return 'Technical Skills';
}

export function defaultProfileData(user) {
  return {
    name: user.fullName || '',
    title: '',
    headline: '',
    email: user.email || '',
    phone: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    summary: user.bio || '',
    about: '',
    openToWork: true,
    totalYearsExperience: 1,
    skills: [],
    experience: [],
    education: [],
    projects: [],
    targetRole: '',
    targetKeywords: [],
  };
}
