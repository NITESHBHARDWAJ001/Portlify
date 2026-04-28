import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

export default function SkillsTags({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const skills = content.skills || [];

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section
      style={{
        backgroundColor: c.bg,
        padding: '5rem 2rem',
        fontFamily: theme.fontBody,
      }}
    >
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            <p style={{ color: c.textMuted, marginTop: 8, fontSize: '1.05rem' }}>
              {content.subtitle}
            </p>
          )}
        </motion.div>

        {/* Grouped categories */}
        {Object.entries(grouped).map(([category, catSkills], ci) => (
          <div key={category} style={{ marginBottom: '2.5rem' }}>
            <motion.h3
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: ci * 0.08 }}
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: c.textSubtle,
                marginBottom: '1rem',
              }}
            >
              {category}
            </motion.h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {catSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ci * 0.08 + i * 0.045 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 18px',
                    borderRadius: 100,
                    background: c.cardBg,
                    border: `1px solid ${c.border}`,
                    color: c.text,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'default',
                    userSelect: 'none',
                  }}
                >
                  {skill.icon && (
                    <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>{skill.icon}</span>
                  )}
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              color: c.textMuted,
              border: `2px dashed ${c.border}`,
              borderRadius: 16,
            }}
          >
            Add skills in the editor to display them here
          </div>
        )}
      </div>
    </section>
  );
}
