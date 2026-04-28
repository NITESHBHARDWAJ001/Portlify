import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../../themes';

function AnimatedNumber({ target, suffix = '', duration = 2 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const steps = 60;
    const increment = target / steps;
    const intervalMs = (duration * 1000) / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const DEFAULT_STATS = [
  { id: 1, value: 50, suffix: '+', label: 'Projects Shipped', description: 'Across startups and enterprises' },
  { id: 2, value: 5, suffix: '+', label: 'Years Experience', description: 'Building web products' },
  { id: 3, value: 99, suffix: '%', label: 'Client Satisfaction', description: 'From post-project surveys' },
  { id: 4, value: 12, suffix: 'k', label: 'GitHub Stars', description: 'On open source projects' },
];

export default function StatsCounter({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'By The Numbers',
    subtitle = 'A quick look at my track record',
    stats = DEFAULT_STATS,
  } = content;

  const cols = Math.min(stats.length, 4);

  return (
    <section style={{ background: c.surface, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, marginBottom: 10 }}>{title}</h2>
          {subtitle && <p style={{ color: c.textMuted, fontSize: '0.95rem' }}>{subtitle}</p>}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '1.5rem' }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.id || i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 20, padding: '2rem 1.5rem', textAlign: 'center' }}
            >
              <div style={{ fontFamily: 'var(--theme-font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: c.primary, lineHeight: 1, marginBottom: '0.5rem' }}>
                <AnimatedNumber target={s.value} suffix={s.suffix || ''} />
              </div>
              <div style={{ color: c.text, fontWeight: 700, fontSize: '1rem', marginBottom: '0.375rem' }}>{s.label}</div>
              {s.description && <div style={{ color: c.textMuted, fontSize: '0.85rem' }}>{s.description}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
