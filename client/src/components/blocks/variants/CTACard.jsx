import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function CTACard({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            background: c.cardBg,
            border: `1px solid ${c.border}`,
            borderRadius: 28,
            padding: '3.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px ${c.border}`,
          }}
        >
          {/* Gradient glow behind */}
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 360, height: 200, background: c.gradient, opacity: 0.1, borderRadius: '50%', filter: 'blur(50px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            {content.badge !== false && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 16px', borderRadius: 100, background: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 700, border: `1px solid ${c.primary}30`, marginBottom: '1.5rem' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, boxShadow: `0 0 6px ${c.accent}` }} />
                  {content.badge || 'Available for projects'}
                </span>
              </motion.div>
            )}

            {/* Emoji icon */}
            <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
              {content.emoji || '🚀'}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: theme.fontHeading, fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800, color: c.text, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '1rem' }}
            >
              {content.title || "Let's Build Something Great"}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '1rem', color: c.textMuted, lineHeight: 1.75, maxWidth: 480, margin: '0 auto 2.5rem' }}
            >
              {content.description || "I'm open to freelance projects, full-time roles, and exciting collaborations. Let's turn your idea into reality."}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}
            >
              <a
                href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
                style={{ padding: '14px 32px', borderRadius: 14, fontWeight: 700, background: c.gradient, color: c.primaryFg, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, boxShadow: `0 6px 24px ${c.primary}40`, fontSize: '0.95rem', transition: 'transform 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = ''; }}
              >
                {content.ctaPrimary?.label || 'Get in Touch'} <FiArrowRight />
              </a>
              {content.ctaSecondary && (
                <a
                  href={isEditing ? '#' : content.ctaSecondary.href || '#'}
                  style={{ padding: '14px 32px', borderRadius: 14, fontWeight: 700, background: 'transparent', color: c.text, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, border: `1.5px solid ${c.border}`, fontSize: '0.95rem', transition: 'border-color 0.15s' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.primary; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; }}
                >
                  {content.ctaSecondary.label}
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
