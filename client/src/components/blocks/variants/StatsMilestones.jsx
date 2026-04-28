import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

const defaultStats = [
  { label: 'Projects Completed', value: '50+', description: 'From MVPs to enterprise platforms across various industries.' },
  { label: 'Years Experience', value: '5+', description: 'Deep expertise in full-stack development and modern tooling.' },
  { label: 'Happy Clients', value: '40+', description: 'Consistently delivering results that exceed expectations.' },
  { label: 'Open Source Stars', value: '2K+', description: 'Contributing back to the community that helped me grow.' },
];

export default function StatsMilestones({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const stats = content.stats || defaultStats;

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        {(content.title || content.description) && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            {content.badge && (
              <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 100, background: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
                {content.badge}
              </span>
            )}
            {content.title && (
              <h2 style={{ fontFamily: theme.fontHeading, fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800, color: c.text, letterSpacing: '-0.02em', marginBottom: 12 }}>
                {content.title}
              </h2>
            )}
            {content.description && (
              <p style={{ color: c.textMuted, fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>{content.description}</p>
            )}
          </motion.div>
        )}

        {/* Milestone cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09 }}
              style={{
                background: c.cardBg,
                border: `1px solid ${c.border}`,
                borderRadius: 22,
                padding: '2rem 1.75rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 36px ${c.primary}16`; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {/* Index number watermark */}
              <div style={{
                position: 'absolute',
                top: -10,
                right: 16,
                fontFamily: theme.fontHeading,
                fontSize: '5rem',
                fontWeight: 900,
                color: `${c.primary}12`,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Gradient accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: c.gradient, opacity: 0.7 }} />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: theme.fontHeading,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  background: c.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: 8,
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>

                <p style={{ fontFamily: theme.fontHeading, fontWeight: 700, color: c.text, fontSize: '1rem', marginBottom: 8 }}>
                  {stat.label}
                </p>

                <p style={{ color: c.textMuted, fontSize: '0.84rem', lineHeight: 1.6 }}>
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
