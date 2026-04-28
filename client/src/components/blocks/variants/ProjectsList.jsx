import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function ProjectsList({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const projects = content.projects || [];

  const displayProjects = projects.length > 0 ? projects : [
    { title: 'Portfolio Builder SaaS', description: 'Full-stack application for creating beautiful developer portfolios with drag-and-drop.', tags: ['React', 'Node.js', 'MongoDB'], link: '#', github: '#' },
    { title: 'Real-Time Chat Platform', description: 'WebSocket-powered chat with rooms, presence indicators, and media sharing.', tags: ['Socket.io', 'Redis', 'Express'], link: '#' },
    { title: 'E-Commerce Dashboard', description: 'Analytics dashboard serving 10k+ daily active merchants with live data.', tags: ['TypeScript', 'D3.js', 'PostgreSQL'], github: '#' },
    { title: 'AI Code Review Bot', description: 'GitHub bot that reviews PRs using GPT-4 and provides contextual feedback.', tags: ['Python', 'OpenAI', 'GitHub API'] },
    { title: 'Design System Library', description: 'Component library with 60+ accessible components, used across 4 products.', tags: ['Storybook', 'CSS', 'a11y'], github: '#' },
  ];

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3.5rem' }}>
          {content.subtitle && (
            <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, backgroundColor: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 600, marginBottom: '0.75rem', border: `1px solid ${c.primary}30` }}>
              {content.subtitle}
            </span>
          )}
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, letterSpacing: '-0.02em', margin: 0 }}>
            {content.title || 'Projects'}
          </h2>
        </motion.div>

        {/* List */}
        <div>
          {displayProjects.map((project, i) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '3rem 1fr auto',
                gap: '1.5rem',
                alignItems: 'center',
                padding: '1.75rem 0',
                borderBottom: `1px solid ${c.border}`,
                cursor: 'default',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = `${c.primary}05`; e.currentTarget.style.paddingLeft = '0.5rem'; e.currentTarget.style.borderRadius = '8px'; e.currentTarget.style.transition = 'all 0.2s'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '0'; }}
            >
              {/* Index */}
              <span style={{ fontFamily: theme.fontHeading, fontSize: '1.75rem', fontWeight: 900, color: `${c.primary}30`, letterSpacing: '-0.04em', lineHeight: 1. }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: c.text, fontFamily: theme.fontHeading, margin: 0 }}>
                    {project.title || 'Project'}
                  </h3>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {(project.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} style={{ padding: '2px 9px', borderRadius: 5, background: `${c.primary}12`, fontSize: 10, color: c.primary, fontWeight: 700, border: `1px solid ${c.primary}20` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: c.textMuted, lineHeight: 1.6, margin: 0 }}>
                  {project.description || 'Project description.'}
                </p>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {project.github && (
                  <a href={isEditing ? '#' : project.github} target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${c.border}`, background: c.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, textDecoration: 'none', transition: 'all 0.15s' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = `${c.primary}60`; e.currentTarget.style.color = c.primary; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}
                  ><FiGithub size={15} /></a>
                )}
                {project.link && (
                  <a href={isEditing ? '#' : project.link} target="_blank" rel="noopener noreferrer"
                    style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${c.border}`, background: c.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, textDecoration: 'none', transition: 'all 0.15s' }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = `${c.primary}60`; e.currentTarget.style.color = c.primary; }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}
                  ><FiArrowUpRight size={15} /></a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
