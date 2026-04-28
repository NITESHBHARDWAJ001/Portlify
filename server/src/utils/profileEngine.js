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
  lines.push(`# ${profile.name || 'Your Name'}`);
  lines.push('');
  lines.push(`${profile.headline || profile.title || 'Software Engineer'}`);
  lines.push('');

  const contact = [profile.email, profile.phone, profile.location, profile.linkedin, profile.github, profile.website]
    .filter(Boolean)
    .join(' | ');
  if (contact) {
    lines.push(contact);
    lines.push('');
  }

  if (profile.summary) {
    lines.push('## Professional Summary');
    lines.push(profile.summary);
    lines.push('');
  }

  const skills = mapSkills(profile.skills).map((s) => s.name);
  if (skills.length) {
    lines.push('## Core Skills');
    lines.push(skills.join(', '));
    lines.push('');
  }

  if ((profile.experience || []).length) {
    lines.push('## Professional Experience');
    lines.push('');
    profile.experience.forEach((exp) => {
      lines.push(`### ${exp.title || 'Role'} - ${exp.company || 'Company'}`);
      lines.push(`${exp.duration || ''} ${exp.location ? `| ${exp.location}` : ''}`.trim());
      (exp.highlights || []).forEach((h) => lines.push(`- ${h}`));
      lines.push('');
    });
  }

  if ((profile.projects || []).length) {
    lines.push('## Projects');
    lines.push('');
    profile.projects.forEach((proj) => {
      lines.push(`### ${proj.name || 'Project'}`);
      if (proj.description) lines.push(proj.description);
      if ((proj.tech || []).length) lines.push(`Tech: ${proj.tech.join(', ')}`);
      if (proj.link) lines.push(`Link: ${proj.link}`);
      lines.push('');
    });
  }

  if ((profile.education || []).length) {
    lines.push('## Education');
    lines.push('');
    profile.education.forEach((edu) => {
      lines.push(`- ${edu.degree || 'Degree'} - ${edu.institution || 'Institution'}${edu.duration ? ` (${edu.duration})` : ''}`);
    });
    lines.push('');
  }

  return lines.join('\n').trim();
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
