import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function ProjectsGrid({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const projects = content.projects || [];

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
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          {content.subtitle && (
            <span
              style={{
                display: 'inline-block',
                padding: '4px 14px',
                borderRadius: 100,
                backgroundColor: `${c.primary}18`,
                color: c.primary,
                fontSize: 13,
                fontWeight: 600,
                marginBottom: '1rem',
                border: `1px solid ${c.primary}30`,
              }}
            >
              {content.subtitle}
            </span>
          )}
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
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6 }}
              style={{
                background: c.cardBg,
                border: `1px solid ${c.border}`,
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              {/* Image/placeholder */}
              <div
                style={{
                  height: 180,
                  background: project.image
                    ? `url(${project.image}) center/cover no-repeat`
                    : `linear-gradient(135deg, ${c.primary}20 0%, ${c.secondary}25 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}
              >
                {!project.image && '📁'}
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: c.text,
                    marginBottom: '0.5rem',
                    fontFamily: theme.fontHeading,
                  }}
                >
                  {project.title || 'Project Name'}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: c.textMuted,
                    lineHeight: 1.65,
                    marginBottom: '1rem',
                  }}
                >
                  {project.description || 'Project description here.'}
                </p>

                {/* Tech tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginBottom: '1rem',
                  }}
                >
                  {(project.tech || []).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 100,
                        backgroundColor: `${c.primary}15`,
                        color: c.primary,
                        fontSize: 11,
                        fontWeight: 600,
                        border: `1px solid ${c.primary}25`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
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
                        fontWeight: 500,
                      }}
                    >
                      <FiGithub size={14} /> GitHub
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
                      <FiExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Empty state */}
          {projects.length === 0 && !isEditing && (
            <div
              style={{
                gridColumn: '1 / -1',
                padding: '3rem',
                textAlign: 'center',
                color: c.textMuted,
                border: `2px dashed ${c.border}`,
                borderRadius: 16,
              }}
            >
              No projects yet — add some in the editor
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
