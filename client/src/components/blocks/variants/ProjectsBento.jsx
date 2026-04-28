import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import { useTheme } from '../../../themes';

// Bento grid layout — feature-1 (2×1 wide), feature-2 (1×2 tall), rest 1×1
export default function ProjectsBento({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const projects = content.projects || [];

  const bentoFills = [
    { colSpan: 2, rowSpan: 1 }, // wide
    { colSpan: 1, rowSpan: 2 }, // tall
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
  ];

  const displayProjects = projects.length > 0 ? projects : [
    { title: 'Featured Project', description: 'Your headline project with the biggest impact. Make it stand out.', tags: ['React', 'Node', 'AWS'], stars: 248 },
    { title: 'Side Hustle', description: 'A passion project you poured weekends into.', tags: ['TypeScript', 'Prisma'] },
    { title: 'Open Source', description: 'Community contribution.', tags: ['Python'] },
    { title: 'Freelance Work', description: 'Client success story.', tags: ['Vue', 'Nuxt'] },
    { title: 'Experiment', description: 'A crazy idea that worked.', tags: ['Rust', 'WASM'] },
    { title: 'Design System', description: 'Component library shipped to production.', tags: ['Storybook', 'CSS'] },
  ];

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            {content.subtitle && (
              <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, backgroundColor: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 600, marginBottom: '0.75rem', border: `1px solid ${c.primary}30` }}>
                {content.subtitle}
              </span>
            )}
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, letterSpacing: '-0.02em', margin: 0 }}>
              {content.title || 'Selected Work'}
            </h2>
          </div>
          <p style={{ color: c.textMuted, fontSize: '0.9rem', maxWidth: 280, lineHeight: 1.6, margin: 0 }}>
            A curated mix of projects across product, open source, and client work.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '220px',
            gap: '1rem',
          }}
        >
          {displayProjects.slice(0, 6).map((project, i) => {
            const bento = bentoFills[i] || { colSpan: 1, rowSpan: 1 };
            return (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
                whileHover={{ scale: 1.015 }}
                style={{
                  gridColumn: `span ${bento.colSpan}`,
                  gridRow: `span ${bento.rowSpan}`,
                  background: c.cardBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 20,
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'default',
                  transition: 'border-color 0.2s',
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = `${c.primary}50`; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; }}
              >
                {/* Background accent for first card */}
                {i === 0 && (
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180, background: c.gradient, borderRadius: '50%', opacity: 0.07, filter: 'blur(30px)', pointerEvents: 'none' }} />
                )}

                <div>
                  {/* Project number */}
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem', opacity: 0.8 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontSize: i === 0 ? '1.5rem' : '1.1rem', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, marginBottom: '0.5rem', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    {project.title || 'Project Name'}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: c.textMuted, lineHeight: 1.65, marginBottom: '1rem' }}>
                    {project.description || 'Project description.'}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1rem' }}>
                    {(project.tags || []).map((tag) => (
                      <span key={tag} style={{ padding: '3px 10px', borderRadius: 6, background: `${c.primary}14`, border: `1px solid ${c.primary}25`, fontSize: 11, color: c.primary, fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* Links row */}
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {project.github && (
                      <a href={isEditing ? '#' : project.github} target="_blank" rel="noopener noreferrer"
                        style={{ color: c.textMuted, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseOver={(e) => { e.currentTarget.style.color = c.primary; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; }}
                      ><FiGithub size={14} /> Code</a>
                    )}
                    {project.link && (
                      <a href={isEditing ? '#' : project.link} target="_blank" rel="noopener noreferrer"
                        style={{ color: c.textMuted, display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseOver={(e) => { e.currentTarget.style.color = c.primary; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; }}
                      ><FiExternalLink size={14} /> Live</a>
                    )}
                    {project.stars && (
                      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#f59e0b', fontWeight: 600 }}>
                        <FiStar size={12} /> {project.stars}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
