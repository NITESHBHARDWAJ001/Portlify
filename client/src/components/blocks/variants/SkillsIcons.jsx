import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

const SKILL_ICONS = {
  react: '⚛️', vue: '💚', angular: '🔴', svelte: '🔥',
  node: '🟢', python: '🐍', javascript: '☕', typescript: '🔷',
  go: '🐹', rust: '🦀', java: '☕', c: '🔵',
  docker: '🐳', kubernetes: '☸️', aws: '☁️', gcp: '🌩️',
  azure: '🔷', postgresql: '🐘', mongodb: '🍃', redis: '🔴',
  figma: '🎨', css: '🎨', html: '📄', graphql: '⬡',
  git: '📦', linux: '🐧', nginx: '🔒', terraform: '🏗️',
};

function getIcon(name) {
  const key = name.toLowerCase().replace(/[^a-z]/g, '').split('.')[0];
  return SKILL_ICONS[key] || '⚡';
}

export default function SkillsIcons({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const skills = content.skills || [];

  const displaySkills = skills.length > 0 ? skills : [
    { name: 'React', icon: '⚛️', category: 'Frontend' },
    { name: 'TypeScript', icon: '🔷', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'Python', icon: '🐍', category: 'Backend' },
    { name: 'Docker', icon: '🐳', category: 'DevOps' },
    { name: 'AWS', icon: '☁️', category: 'Cloud' },
    { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
    { name: 'MongoDB', icon: '🍃', category: 'Database' },
    { name: 'Figma', icon: '🎨', category: 'Design' },
    { name: 'Git', icon: '📦', category: 'Tools' },
    { name: 'GraphQL', icon: '⬡', category: 'API' },
    { name: 'Redis', icon: '🔴', category: 'Database' },
  ];

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
            {content.title || 'Tech Stack'}
          </h2>
          {content.subtitle && <p style={{ color: c.textMuted, fontSize: '1rem' }}>{content.subtitle}</p>}
        </motion.div>

        {/* Icon grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
          {displaySkills.map((skill, i) => {
            const icon = skill.icon || getIcon(skill.name);
            return (
              <motion.div
                key={skill.name || i}
                initial={{ opacity: 0, scale: 0.8, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.04 * i, type: 'spring', stiffness: 250 }}
                whileHover={{ y: -6, scale: 1.05 }}
                style={{
                  background: c.cardBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 18,
                  padding: '1.5rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'default',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = `${c.primary}60`;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${c.primary}18`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Glow behind icon */}
                <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', width: 80, height: 80, background: `${c.primary}10`, borderRadius: '50%', filter: 'blur(20px)', pointerEvents: 'none' }} />
                {/* Icon */}
                <div style={{ fontSize: '2.25rem', lineHeight: 1, position: 'relative', zIndex: 1 }}>{icon}</div>
                {/* Name */}
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: c.text, textAlign: 'center', lineHeight: 1.3 }}>{skill.name}</span>
                {/* Level bar (if present) */}
                {skill.level != null && (
                  <div style={{ width: '80%', height: 3, background: `${c.primary}20`, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${skill.level}%`, height: '100%', background: c.gradient, borderRadius: 3 }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
