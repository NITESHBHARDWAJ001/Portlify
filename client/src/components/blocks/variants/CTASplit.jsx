import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function CTASplit({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  const highlights = content.highlights || [
    'Open to remote opportunities',
    '5+ years of experience',
    'Full-stack & design expertise',
    'Fast turnaround & clean code',
  ];

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', borderRadius: 28, overflow: 'hidden', border: `1px solid ${c.border}`, boxShadow: `0 24px 64px rgba(0,0,0,0.1)` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 420 }}>
          {/* Left: Gradient */}
          <div style={{ position: 'relative', background: c.gradient, padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
            <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.span
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                style={{ display: 'inline-block', padding: '5px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: '1.25rem' }}
              >
                {content.badge || 'Currently available'}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                style={{ fontFamily: theme.fontHeading, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.18, marginBottom: '1rem' }}
              >
                {content.title || "Ready to Start Your Next Project?"}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '2rem' }}
              >
                {content.description || "Let's collaborate and create something extraordinary together. I bring expertise, creativity, and dedication to every project."}
              </motion.p>

              <motion.a
                href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                style={{ alignSelf: 'flex-start', padding: '13px 28px', borderRadius: 12, fontWeight: 700, background: '#fff', color: c.primary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', transition: 'transform 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = ''; }}
              >
                {content.ctaPrimary?.label || 'Get in Touch'} <FiArrowRight />
              </motion.a>
            </div>
          </div>

          {/* Right: Details panel */}
          <div style={{ background: c.cardBg, padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{ fontFamily: theme.fontHeading, fontSize: '1.2rem', fontWeight: 700, color: c.text, marginBottom: '1.5rem' }}
            >
              {content.rightTitle || 'What you can expect'}
            </motion.h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: '2rem' }}>
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <FiCheckCircle size={18} style={{ color: c.primary, flexShrink: 0 }} />
                  <span style={{ color: c.textMuted, fontSize: '0.93rem' }}>{item}</span>
                </motion.div>
              ))}
            </div>

            {content.ctaSecondary && (
              <motion.a
                href={isEditing ? '#' : content.ctaSecondary.href || '#'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ alignSelf: 'flex-start', padding: '12px 26px', borderRadius: 12, fontWeight: 600, background: 'transparent', color: c.primary, border: `1.5px solid ${c.primary}40`, textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.background = `${c.primary}12`; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {content.ctaSecondary.label} <FiArrowRight />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
