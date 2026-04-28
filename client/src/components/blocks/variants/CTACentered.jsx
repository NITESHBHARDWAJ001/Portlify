import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiArrowRight, FiMail } from 'react-icons/fi';

export default function CTACentered({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    badge = 'Available for Work',
    title = "Let's Build Something Amazing Together",
    subtitle = "Have a project in mind? I'd love to hear about it. Let's talk about how we can collaborate.",
    primaryLabel = 'Get In Touch',
    primaryHref = '#contact',
    secondaryLabel = 'View My Work',
    secondaryHref = '#projects',
    showEmail = false,
    email = 'hello@example.com',
  } = content;

  return (
    <section style={{ background: c.bg, padding: '6rem 2rem', fontFamily: 'var(--theme-font-body)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: `${c.primary}08`, pointerEvents: 'none', filter: 'blur(64px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 200, height: 200, borderRadius: '50%', background: `${c.secondary}08`, pointerEvents: 'none', filter: 'blur(48px)' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {badge && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${c.primary}15`, border: `1px solid ${c.primary}40`, borderRadius: 100, padding: '5px 16px', color: c.primary, fontSize: 12, fontWeight: 700, marginBottom: '1.75rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px #22c55e30' }} />
              {badge}
            </span>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: c.textMuted, fontSize: '1.1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href={primaryHref}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: c.primary, color: c.primaryFg, padding: '0.875rem 2rem', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <FiMail size={15} /> {primaryLabel}
          </a>
          {secondaryLabel && (
            <a
              href={secondaryHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: c.text, padding: '0.875rem 2rem', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: `2px solid ${c.border}`, transition: 'border-color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = c.primary)}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = c.border)}
            >
              {secondaryLabel} <FiArrowRight size={14} />
            </a>
          )}
        </motion.div>

        {showEmail && email && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ color: c.textMuted, fontSize: '0.9rem', marginTop: '1.5rem' }}>
            Or email directly at{' '}
            <a href={`mailto:${email}`} style={{ color: c.primary, fontWeight: 600, textDecoration: 'none' }}>{email}</a>
          </motion.p>
        )}
      </div>
    </section>
  );
}
