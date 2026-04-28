// Component Registry
// Maps component types to their implementations and metadata

import HeroBlock from '../components/blocks/HeroBlock';
import ProjectCard from '../components/blocks/ProjectCard';
import SkillsGrid from '../components/blocks/SkillsGrid';
import Timeline from '../components/blocks/Timeline';
import MarkdownBlock from '../components/blocks/MarkdownBlock';
import GitHubStats from '../components/blocks/GitHubStats';
import ContactForm from '../components/blocks/ContactForm';
import AboutBlock from '../components/blocks/AboutBlock';
import TypingAnimation from '../components/blocks/TypingAnimation';

// ─── Variant Components ──────────────────────────────────────────────────────
import HeroCentered from '../components/blocks/variants/HeroCentered';
import HeroSplit from '../components/blocks/variants/HeroSplit';
import HeroTerminal from '../components/blocks/variants/HeroTerminal';
import HeroMinimal from '../components/blocks/variants/HeroMinimal';
import ProjectsGrid from '../components/blocks/variants/ProjectsGrid';
import ProjectsFeatured from '../components/blocks/variants/ProjectsFeatured';
import SkillsTags from '../components/blocks/variants/SkillsTags';
import SkillsBars from '../components/blocks/variants/SkillsBars';
import AboutBio from '../components/blocks/variants/AboutBio';
import AboutSplit from '../components/blocks/variants/AboutSplit';
import TestimonialsCards from '../components/blocks/variants/TestimonialsCards';
import TestimonialsWall from '../components/blocks/variants/TestimonialsWall';
import ServicesCards from '../components/blocks/variants/ServicesCards';
import ServicesList from '../components/blocks/variants/ServicesList';
import StatsCounter from '../components/blocks/variants/StatsCounter';
import StatsGrid from '../components/blocks/variants/StatsGrid';
import CTACentered from '../components/blocks/variants/CTACentered';
import CTABanner from '../components/blocks/variants/CTABanner';
import TimelineVertical from '../components/blocks/variants/TimelineVertical';
import ContactMinimal from '../components/blocks/variants/ContactMinimal';
import HeroGradient from '../components/blocks/variants/HeroGradient';
import HeroGlass from '../components/blocks/variants/HeroGlass';
import HeroBold from '../components/blocks/variants/HeroBold';
import ProjectsBento from '../components/blocks/variants/ProjectsBento';
import ProjectsList from '../components/blocks/variants/ProjectsList';
import SkillsIcons from '../components/blocks/variants/SkillsIcons';
import SkillsRadar from '../components/blocks/variants/SkillsRadar';
import AboutCard from '../components/blocks/variants/AboutCard';
import AboutColumns from '../components/blocks/variants/AboutColumns';
import TimelineCompact from '../components/blocks/variants/TimelineCompact';
import TimelineHorizontal from '../components/blocks/variants/TimelineHorizontal';
import ContactSplit from '../components/blocks/variants/ContactSplit';
import ContactSocial from '../components/blocks/variants/ContactSocial';
import CTACard from '../components/blocks/variants/CTACard';
import CTASplit from '../components/blocks/variants/CTASplit';
import ServicesPricing from '../components/blocks/variants/ServicesPricing';
import TestimonialsMarquee from '../components/blocks/variants/TestimonialsMarquee';
import StatsMilestones from '../components/blocks/variants/StatsMilestones';

export const componentRegistry = {
  'hero': {
    component: HeroBlock,
    name: 'Hero Section',
    category: 'header',
    icon: '🎯',
    defaultProps: {
      title: 'Hi, I\'m Your Name',
      subtitle: 'Full Stack Developer',
      description: 'Welcome to my portfolio',
    },
    thumbnail: '/thumbnails/hero.png'
  },
  'about': {
    component: AboutBlock,
    name: 'About Me',
    category: 'content',
    icon: '👋',
    defaultProps: {
      title: 'About Me',
      text: 'Tell your story here...',
    },
    thumbnail: '/thumbnails/about.png'
  },
  'skills': {
    component: SkillsGrid,
    name: 'Skills Grid',
    category: 'content',
    icon: '🛠️',
    defaultProps: {
      title: 'Skills & Technologies',
      skills: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    },
    thumbnail: '/thumbnails/skills.png'
  },
  'project': {
    component: ProjectCard,
    name: 'Project Card',
    category: 'content',
    icon: '📁',
    defaultProps: {
      title: 'Project Name',
      description: 'Project description goes here',
      image: '',
      tags: ['React', 'TypeScript'],
      link: '',
    },
    thumbnail: '/thumbnails/project.png'
  },
  'timeline': {
    component: Timeline,
    name: 'Timeline',
    category: 'content',
    icon: '📅',
    defaultProps: {
      title: 'Experience',
      items: [
        {
          title: 'Position',
          company: 'Company Name',
          duration: '2023 - Present',
          description: 'Job description'
        }
      ],
    },
    thumbnail: '/thumbnails/timeline.png'
  },
  'github-stats': {
    component: GitHubStats,
    name: 'GitHub Stats',
    category: 'widgets',
    icon: '📊',
    defaultProps: {
      username: '',
      theme: 'default',
    },
    thumbnail: '/thumbnails/github-stats.png'
  },
  'typing-animation': {
    component: TypingAnimation,
    name: 'Typing Animation',
    category: 'widgets',
    icon: '⌨️',
    defaultProps: {
      texts: ['Developer', 'Designer', 'Creator'],
    },
    thumbnail: '/thumbnails/typing.png'
  },
  'markdown': {
    component: MarkdownBlock,
    name: 'Markdown Block',
    category: 'content',
    icon: '📝',
    defaultProps: {
      markdown: '# Hello World\n\nWrite your markdown here...',
    },
    thumbnail: '/thumbnails/markdown.png'
  },
  'contact': {
    component: ContactForm,
    name: 'Contact Form',
    category: 'forms',
    icon: '📧',
    defaultProps: {
      title: 'Get In Touch',
      email: '',
      linkedin: '',
      github: '',
      twitter: '',
    },
    thumbnail: '/thumbnails/contact.png'
  },
};

// ─── Variant Registry ────────────────────────────────────────────────────────
// variantRegistry[type][variant] → React component
export const variantRegistry = {
  hero: {
    centered: HeroCentered,
    split: HeroSplit,
    terminal: HeroTerminal,
    minimal: HeroMinimal,
    gradient: HeroGradient,
    glass: HeroGlass,
    bold: HeroBold,
  },
  projects: {
    grid: ProjectsGrid,
    featured: ProjectsFeatured,
    bento: ProjectsBento,
    list: ProjectsList,
  },
  skills: {
    tags: SkillsTags,
    bars: SkillsBars,
    icons: SkillsIcons,
    radar: SkillsRadar,
  },
  about: {
    bio: AboutBio,
    split: AboutSplit,
    card: AboutCard,
    columns: AboutColumns,
  },
  testimonials: {
    cards: TestimonialsCards,
    wall: TestimonialsWall,
    marquee: TestimonialsMarquee,
  },
  services: {
    cards: ServicesCards,
    list: ServicesList,
    pricing: ServicesPricing,
  },
  stats: {
    counter: StatsCounter,
    grid: StatsGrid,
    milestones: StatsMilestones,
  },
  cta: {
    centered: CTACentered,
    banner: CTABanner,
    card: CTACard,
    split: CTASplit,
  },
  timeline: {
    vertical: TimelineVertical,
    compact: TimelineCompact,
    horizontal: TimelineHorizontal,
  },
  contact: {
    minimal: ContactMinimal,
    split: ContactSplit,
    social: ContactSocial,
  },
};

// Block metadata for VariantPicker UI
export const blockMeta = {
  hero: {
    name: 'Hero Section',
    icon: '🎯',
    description: 'Your introduction and first impression',
    variants: [
      { id: 'centered', name: 'Centered', description: 'Classic centered layout with avatar' },
      { id: 'split', name: 'Split', description: '50/50 text and image side-by-side' },
      { id: 'terminal', name: 'Terminal', description: 'Developer terminal aesthetic' },
      { id: 'minimal', name: 'Minimal', description: 'Ultra-minimal large typography' },
      { id: 'gradient', name: 'Gradient', description: 'Bold full-gradient background hero' },
      { id: 'glass', name: 'Glassmorphism', description: 'Frosted glass card on blurred backdrop' },
      { id: 'bold', name: 'Bold Type', description: 'Oversized stacked typographic hero' },
    ],
  },
  projects: {
    name: 'Projects',
    icon: '📁',
    description: 'Showcase your work and side projects',
    variants: [
      { id: 'grid', name: 'Grid', description: 'Card grid with hover effects' },
      { id: 'featured', name: 'Featured', description: 'One spotlight + smaller grid' },
      { id: 'bento', name: 'Bento', description: 'Asymmetric bento-box grid layout' },
      { id: 'list', name: 'Numbered List', description: 'Minimal numbered horizontal list' },
    ],
  },
  skills: {
    name: 'Skills',
    icon: '🛠️',
    description: 'Showcase your tech stack',
    variants: [
      { id: 'tags', name: 'Tag Cloud', description: 'Colorful badge tags by category' },
      { id: 'bars', name: 'Progress Bars', description: 'Animated horizontal skill bars' },
      { id: 'icons', name: 'Icon Cards', description: 'Large icon cards with glow hover' },
      { id: 'radar', name: 'Skill Bars+', description: 'Enhanced gradient skill bars with shine' },
    ],
  },
  about: {
    name: 'About Me',
    icon: '👋',
    description: 'Tell your story with personality',
    variants: [
      { id: 'bio', name: 'Bio Card', description: 'Sidebar avatar with stats & social' },
      { id: 'split', name: 'Split Screen', description: 'Full-bleed photo with content' },
      { id: 'card', name: 'Profile Card', description: 'Tall photo card with bio & stats' },
      { id: 'columns', name: 'Three Columns', description: 'Bio | Quick Facts | Get in Touch' },
    ],
  },
  testimonials: {
    name: 'Testimonials',
    icon: '💬',
    description: 'Social proof from clients & colleagues',
    variants: [
      { id: 'cards', name: 'Cards', description: 'Grid of cards with star ratings' },
      { id: 'wall', name: 'Wall', description: 'Masonry-style testimonial wall' },
      { id: 'marquee', name: 'Marquee', description: 'Auto-scrolling dual-row carousel' },
    ],
  },
  services: {
    name: 'Services',
    icon: '🔧',
    description: 'What you offer to clients',
    variants: [
      { id: 'cards', name: 'Service Cards', description: 'Icon cards with tech tags' },
      { id: 'list', name: 'List + Pricing', description: 'Minimal list with prices' },
      { id: 'pricing', name: 'Pricing Table', description: '3-tier pricing cards with features' },
    ],
  },
  stats: {
    name: 'Stats',
    icon: '📊',
    description: 'Numbers that speak for themselves',
    variants: [
      { id: 'counter', name: 'Counters', description: 'Big animated number counters' },
      { id: 'grid', name: 'Icon Grid', description: 'Compact icon + value grid' },
      { id: 'milestones', name: 'Milestones', description: 'Numbered achievement cards' },
    ],
  },
  cta: {
    name: 'Call to Action',
    icon: '⚡',
    description: 'Drive visitors to take action',
    variants: [
      { id: 'centered', name: 'Centered', description: 'Full-width centered with glow' },
      { id: 'banner', name: 'Banner', description: 'Gradient banner with button' },
      { id: 'card', name: 'Floating Card', description: 'Centered floating card with glow' },
      { id: 'split', name: 'Split Gradient', description: 'Half gradient + highlights list' },
    ],
  },
  timeline: {
    name: 'Timeline',
    icon: '📅',
    description: 'Experience and education history',
    variants: [
      { id: 'vertical', name: 'Vertical', description: 'Clean vertical with icons' },
      { id: 'compact', name: 'Compact', description: 'Dense 3-column grid timeline' },
      { id: 'horizontal', name: 'Horizontal', description: 'Horizontal scrollable timeline' },
    ],
  },
  contact: {
    name: 'Contact',
    icon: '📧',
    description: 'Let people reach you',
    variants: [
      { id: 'minimal', name: 'Minimal', description: 'Clean contact with social links' },
      { id: 'split', name: 'Split', description: 'Contact info left + gradient CTA right' },
      { id: 'social', name: 'Social Hub', description: 'Platform icon cards grid' },
    ],
  },
};

// Default content for each variant-supported type
export const defaultContent = {
  hero: {
    name: 'Your Name',
    title: 'Full Stack Developer',
    description: 'I build beautiful, scalable web applications that users love.',
    badge: 'Open to work',
    avatar: '',
    ctaPrimary: { label: 'View Projects', href: '#projects' },
    ctaSecondary: { label: 'Contact Me', href: '#contact' },
    social: { github: 'yourusername', linkedin: '', twitter: '' },
    typingTexts: ['Full Stack Developer', 'Open Source Enthusiast', 'Problem Solver'],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    projectCount: '50+',
    githubStars: '1.2k',
    yearsExp: '5+',
  },
  projects: {
    title: 'My Projects',
    subtitle: "Things I've built",
    projects: [
      { id: 1, title: 'Project Alpha', description: 'A full-stack web application built with React and Node.js.', image: '', link: '', github: '', tech: ['React', 'Node.js', 'MongoDB'] },
      { id: 2, title: 'Project Beta', description: 'A mobile-first PWA with offline support and push notifications.', image: '', link: '', github: '', tech: ['Vue', 'Express', 'PostgreSQL'] },
      { id: 3, title: 'Project Gamma', description: 'An API-driven dashboard with real-time data visualization.', image: '', link: '', github: '', tech: ['Next.js', 'TypeScript', 'D3.js'] },
    ],
  },
  skills: {
    title: 'Skills & Technologies',
    subtitle: 'My technical expertise',
    skills: [
      { name: 'React', level: 90, icon: '⚛️', category: 'Frontend' },
      { name: 'TypeScript', level: 85, icon: '🔷', category: 'Frontend' },
      { name: 'Node.js', level: 85, icon: '🟢', category: 'Backend' },
      { name: 'GraphQL', level: 75, icon: '⬡', category: 'Backend' },
      { name: 'MongoDB', level: 80, icon: '🍃', category: 'Database' },
      { name: 'PostgreSQL', level: 75, icon: '🐘', category: 'Database' },
      { name: 'Docker', level: 70, icon: '🐳', category: 'DevOps' },
      { name: 'AWS', level: 65, icon: '☁️', category: 'DevOps' },
    ],
  },
  about: {
    name: 'Your Name',
    role: 'Software Developer',
    bio: "I'm a passionate developer with 5+ years of experience building scalable web applications and delightful user experiences.",
    bio2: "When I'm not coding, I enjoy hiking, photography, and contributing to open source.",
    avatar: '',
    location: 'San Francisco, CA',
    availability: 'Open to opportunities',
    resumeUrl: '',
    ctaLabel: 'View My Work',
    ctaHref: '#projects',
    social: { github: '', linkedin: '', twitter: '', email: '' },
    interests: ['Open Source', 'Web Performance', 'Design Systems', 'Music'],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
    experience: '5+',
    projects: '50+',
    stars: '2k',
  },
  testimonials: {
    title: 'What People Say',
    subtitle: 'Kind words from colleagues and clients',
    testimonials: [
      { id: 1, name: 'Sarah Chen', role: 'CTO', company: 'TechFlow', rating: 5, avatar: '', text: 'An exceptional developer who consistently delivers elegant solutions. The attention to detail and code quality is outstanding.' },
      { id: 2, name: 'Marcus Williams', role: 'Product Manager', company: 'InnovateCo', rating: 5, avatar: '', text: 'Incredibly reliable and communicative. Transformed our complex requirements into a beautiful, functional product.' },
      { id: 3, name: 'Elena Rodriguez', role: 'Lead Designer', company: 'CreativeHub', rating: 5, avatar: '', text: "A perfect blend of technical expertise and design sensibility. Couldn't have built this without their help." },
    ],
  },
  services: {
    title: 'What I Do',
    subtitle: 'Services & expertise I offer',
    ctaLabel: 'Get in touch',
    ctaHref: '#contact',
    services: [
      { id: 1, icon: '🌐', title: 'Web Development', description: 'Full-stack web applications built with modern frameworks.', tags: ['React', 'Node.js', 'TypeScript'], price: '' },
      { id: 2, icon: '📱', title: 'Mobile Apps', description: 'Cross-platform mobile apps with React Native.', tags: ['React Native', 'Expo'], price: '' },
      { id: 3, icon: '🎨', title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces designed with users in mind.', tags: ['Figma', 'Design Systems'], price: '' },
      { id: 4, icon: '⚡', title: 'Performance Optimization', description: 'Speed up your app with profiling and code optimization.', tags: ['Core Web Vitals', 'CDN'], price: '' },
    ],
  },
  stats: {
    title: 'By The Numbers',
    subtitle: '',
    stats: [
      { id: 1, icon: '🚀', value: 50, suffix: '+', label: 'Projects Shipped', description: 'Across startups and enterprises' },
      { id: 2, icon: '⭐', value: 5, suffix: '+', label: 'Years Experience', description: 'Building web products' },
      { id: 3, icon: '👥', value: 99, suffix: '%', label: 'Client Satisfaction', description: '' },
      { id: 4, icon: '📦', value: 12, suffix: 'k', label: 'GitHub Stars', description: 'On open source projects' },
    ],
  },
  cta: {
    badge: 'Available for Work',
    title: "Let's Build Something Amazing Together",
    subtitle: "Have a project in mind? I'd love to hear about it. Let's talk about how we can collaborate.",
    primaryLabel: 'Get In Touch',
    primaryHref: '#contact',
    secondaryLabel: 'View My Work',
    secondaryHref: '#projects',
    showEmail: false,
    email: 'hello@example.com',
    ctaLabel: 'Hire Me',
    ctaHref: '#contact',
    subCtaLabel: '',
    subCtaHref: '#projects',
  },
  timeline: {
    title: 'Experience',
    subtitle: 'My professional journey',
    items: [
      { id: 1, type: 'work', title: 'Senior Frontend Engineer', company: 'TechCorp Inc.', location: 'Remote', duration: '2023 – Present', description: 'Leading the frontend architecture for a SaaS product serving 100k users.' },
      { id: 2, type: 'work', title: 'Full Stack Developer', company: 'StartupXYZ', location: 'San Francisco, CA', duration: '2021 – 2023', description: 'Built the entire product from 0 to 1, scaled to $2M ARR.' },
      { id: 3, type: 'education', title: 'B.S. Computer Science', company: 'University of California', location: 'Berkeley, CA', duration: '2017 – 2021', description: 'Focus on distributed systems. Graduated Magna Cum Laude.' },
    ],
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "I'm always open to discussing new opportunities, creative projects, or just having a chat.",
    email: 'hello@example.com',
    location: 'San Francisco, CA',
    social: { github: '', linkedin: '', twitter: '' },
    availability: 'Available for freelance',
  },
};

// ─── Legacy helpers ──────────────────────────────────────────────────────────

export const getComponent = (type) => {
  return componentRegistry[type]?.component || null;
};

export const getVariantComponent = (type, variant) => {
  return variantRegistry[type]?.[variant] || null;
};

export const getComponentMeta = (type) => {
  return componentRegistry[type] || null;
};

export const getAllComponents = () => {
  return Object.entries(componentRegistry).map(([type, meta]) => ({
    type,
    ...meta,
  }));
};

export const getComponentsByCategory = (category) => {
  return Object.entries(componentRegistry)
    .filter(([_, meta]) => meta.category === category)
    .map(([type, meta]) => ({ type, ...meta }));
};

export const categories = [
  { id: 'header', name: 'Header', icon: '🎯' },
  { id: 'content', name: 'Content', icon: '📄' },
  { id: 'widgets', name: 'Widgets', icon: '🧩' },
  { id: 'forms', name: 'Forms', icon: '📝' },
];

// All block types available as section-level blocks (for ComponentLibrary)
export const allBlockTypes = [
  { type: 'hero', ...blockMeta.hero },
  { type: 'about', ...blockMeta.about },
  { type: 'projects', ...blockMeta.projects },
  { type: 'skills', ...blockMeta.skills },
  { type: 'services', ...blockMeta.services },
  { type: 'testimonials', ...blockMeta.testimonials },
  { type: 'stats', ...blockMeta.stats },
  { type: 'cta', ...blockMeta.cta },
  { type: 'timeline', ...blockMeta.timeline },
  { type: 'contact', ...blockMeta.contact },
];
