import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

export default function SkillsBars({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const skills = content.skills || [];

  return (
    <section
      style={{
        backgroundColor: c.bg,
        padding: '5rem 2rem',
        fontFamily: theme.fontBody,
      }}
    >
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
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
            {content.title || 'Skills & Technologies'}
          </h2>
          {content.subtitle && (
            <p style={{ color: c.textMuted, marginTop: 8 }}>{content.subtitle}</p>
          )}
        </motion.div>

        {/* Skill bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 9,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  {skill.icon && (
                    <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                  )}
                  <span
                    style={{
                      fontWeight: 700,
                      color: c.text,
                      fontSize: '0.95rem',
                    }}
                  >
                    {skill.name}
                  </span>
                  {skill.category && (
                    <span
                      style={{
                        fontSize: 11,
                        color: c.primary,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 100,
                        background: `${c.primary}15`,
                      }}
                    >
                      {skill.category}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: c.textMuted,
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {skill.level || 80}%
                </span>
              </div>

              {/* Track */}
              <div
                style={{
                  height: 8,
                  borderRadius: 100,
                  background: `${c.primary}18`,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level || 80}%` }}
                  transition={{
                    delay: 0.4 + i * 0.07,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    height: '100%',
                    borderRadius: 100,
                    background: c.gradient,
                  }}
                />
              </div>
            </motion.div>
          ))}

          {skills.length === 0 && (
            <div
              style={{
                padding: '3rem',
                textAlign: 'center',
                color: c.textMuted,
                border: `2px dashed ${c.border}`,
                borderRadius: 12,
              }}
            >
              Add skills in the editor
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
