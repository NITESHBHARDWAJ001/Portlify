import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function ProjectsFeatured({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const projects = content.projects || [];
  const [featured, ...rest] = projects;

  return (
    <section
      style={{
        backgroundColor: c.bg,
        padding: '5rem 2rem',
        fontFamily: theme.fontBody,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '3rem' }}
        >
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: c.text,
              fontFamily: theme.fontHeading,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {content.title || 'My Projects'}
          </h2>
          {content.subtitle && (
            <p style={{ color: c.textMuted, marginTop: 8, fontSize: '1.1rem' }}>
              {content.subtitle}
            </p>
          )}
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
              background: c.cardBg,
              border: `1px solid ${c.border}`,
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: '2rem',
              padding: '2.5rem',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 100,
                  background: c.gradient,
                  color: c.primaryFg,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: '1.25rem',
                  letterSpacing: '0.08em',
                }}
              >
                ✦ FEATURED PROJECT
              </span>
              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: c.text,
                  fontFamily: theme.fontHeading,
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {featured.title || 'Featured Project'}
              </h3>
              <p
                style={{
                  color: c.textMuted,
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem',
                }}
              >
                {featured.description || 'Project description here.'}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: '1.75rem',
                }}
              >
                {(featured.tech || []).map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 100,
                      background: `${c.primary}15`,
                      color: c.primary,
                      fontSize: 12,
                      fontWeight: 600,
                      border: `1px solid ${c.primary}25`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {featured.github && (
                  <a
                    href={isEditing ? '#' : featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 20px',
                      borderRadius: 10,
                      border: `2px solid ${c.border}`,
                      color: c.text,
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    <FiGithub /> GitHub
                  </a>
                )}
                {featured.link && (
                  <a
                    href={isEditing ? '#' : featured.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 20px',
                      borderRadius: 10,
                      background: c.gradient,
                      color: c.primaryFg,
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Image side */}
            <div
              style={{
                height: 300,
                background: featured.image
                  ? `url(${featured.image}) center/cover no-repeat`
                  : `linear-gradient(135deg, ${c.primary}25 0%, ${c.secondary}25 100%)`,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
              }}
            >
              {!featured.image && '🚀'}
            </div>
          </motion.div>
        )}

        {/* Rest of projects */}
        {rest.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {rest.map((project, i) => (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ y: -4 }}
                style={{
                  background: c.cardBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 12,
                  padding: '1.5rem',
                }}
              >
                <h3
                  style={{
                    fontWeight: 700,
                    color: c.text,
                    marginBottom: 8,
                    fontFamily: theme.fontHeading,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    color: c.textMuted,
                    fontSize: 14,
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}
                >
                  {project.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 6,
                    flexWrap: 'wrap',
                    marginBottom: 14,
                  }}
                >
                  {(project.tech || []).map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: '2px 8px',
                        borderRadius: 100,
                        background: `${c.primary}15`,
                        color: c.primary,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {project.github && (
                    <a
                      href={isEditing ? '#' : project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        color: c.textMuted,
                        textDecoration: 'none',
                        fontSize: 13,
                      }}
                    >
                      <FiGithub size={13} /> GitHub
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={isEditing ? '#' : project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        color: c.primary,
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      <FiArrowUpRight size={13} /> Demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
