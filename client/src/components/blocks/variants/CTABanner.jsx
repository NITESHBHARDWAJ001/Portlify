import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiArrowRight } from 'react-icons/fi';

export default function CTABanner({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'Ready to Start a Project?',
    subtitle = "Let's build something great together.",
    ctaLabel = 'Hire Me',
    ctaHref = '#contact',
    subCtaLabel = '',
    subCtaHref = '#projects',
  } = content;

  return (
    <section style={{ background: c.bg, padding: '3rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: c.gradient, borderRadius: 20, padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}
        >
          <div>
            <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: 8 }}>{title}</h2>
            {subtitle && <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', margin: 0 }}>{subtitle}</p>}
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
            {subCtaLabel && (
              <a
                href={subCtaHref}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600, textDecoration: 'none', padding: '0.75rem 1.25rem', borderRadius: 100, border: '2px solid rgba(255,255,255,0.3)', transition: 'border-color 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)')}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
              >
                {subCtaLabel}
              </a>
            )}
            <a
              href={ctaHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: c.primary, padding: '0.875rem 1.75rem', borderRadius: 100, fontSize: 15, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'transform 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = '')}
            >
              {ctaLabel} <FiArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
