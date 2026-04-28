import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

const DEFAULT_STATS = [
  { id: 1, icon: '🚀', value: '50+', label: 'Projects Shipped' },
  { id: 2, icon: '⭐', value: '12k', label: 'GitHub Stars' },
  { id: 3, icon: '👥', value: '30+', label: 'Happy Clients' },
  { id: 4, icon: '📦', value: '8', label: 'Open Source Libs' },
  { id: 5, icon: '☕', value: '∞', label: 'Cups of Coffee' },
  { id: 6, icon: '🎯', value: '99%', label: 'On-time Delivery' },
];

export default function StatsGrid({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'Quick Stats',
    subtitle = '',
    stats = DEFAULT_STATS,
  } = content;

  return (
    <section style={{ background: c.bg, padding: '4rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {(title || subtitle) && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            {title && <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, marginBottom: subtitle ? 10 : 0 }}>{title}</h2>}
            {subtitle && <p style={{ color: c.textMuted, fontSize: '0.95rem' }}>{subtitle}</p>}
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.id || i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.05, y: -3 }}
              style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: '1.25rem', textAlign: 'center', cursor: 'default' }}
            >
              <div style={{ fontSize: 28, marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ color: c.primary, fontSize: '1.6rem', fontWeight: 900, lineHeight: 1, marginBottom: 4, fontFamily: 'var(--theme-font-heading)' }}>{s.value}</div>
              <div style={{ color: c.textMuted, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
