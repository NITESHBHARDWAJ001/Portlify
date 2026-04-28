import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiArrowRight } from 'react-icons/fi';

const DEFAULT_SERVICES = [
  { id: 1, icon: '🌐', title: 'Full-Stack Development', description: 'End-to-end web applications from concept to production deployment.', price: 'From $5,000' },
  { id: 2, icon: '🎨', title: 'UI/UX Design & Prototyping', description: 'User research, wireframes, and high-fidelity prototypes in Figma.', price: 'From $2,000' },
  { id: 3, icon: '⚡', title: 'Performance Consulting', description: 'Audit and optimize your existing app for speed and Core Web Vitals.', price: 'From $1,500' },
  { id: 4, icon: '🛠️', title: 'Technical Mentoring', description: 'One-on-one sessions to level up your development skills.', price: '$200/hr' },
];

export default function ServicesList({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'Services',
    subtitle = 'How I can help you',
    ctaLabel = 'Get in touch',
    ctaHref = '#contact',
    services = DEFAULT_SERVICES,
  } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>{title}</h2>
          {subtitle && <p style={{ color: c.textMuted, fontSize: '1rem' }}>{subtitle}</p>}
        </motion.div>

        <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${c.border}` }}>
          {services.map((s, i) => (
            <motion.div
              key={s.id || i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ background: c.cardBg, padding: '1.5rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: i < services.length - 1 ? `1px solid ${c.border}` : 'none', transition: 'background 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.background = c.surface)}
              onMouseOut={(e) => (e.currentTarget.style.background = c.cardBg)}
            >
              <div style={{ fontSize: 32, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: c.text, fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{s.title}</h3>
                <p style={{ color: c.textMuted, fontSize: '0.9rem', lineHeight: 1.6 }}>{s.description}</p>
              </div>
              {s.price && (
                <div style={{ color: c.primary, fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>{s.price}</div>
              )}
            </motion.div>
          ))}
        </div>

        {ctaLabel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <a
              href={ctaHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: c.primary, color: c.primaryFg, padding: '0.875rem 2rem', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {ctaLabel} <FiArrowRight size={14} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
