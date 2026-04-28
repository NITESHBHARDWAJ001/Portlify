import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiBriefcase, FiBook, FiAward } from 'react-icons/fi';

const DEFAULT_ITEMS = [
  { id: 1, type: 'work', title: 'Senior Frontend Engineer', company: 'TechCorp Inc.', location: 'Remote', duration: '2023 – Present', description: 'Leading the frontend architecture for a SaaS product serving 100k users. Built a component library adopted across 5 product teams.' },
  { id: 2, type: 'work', title: 'Full Stack Developer', company: 'StartupXYZ', location: 'San Francisco, CA', duration: '2021 – 2023', description: 'Built the entire product from 0 to 1, scaled to $2M ARR. Implemented real-time features with WebSockets and serverless functions.' },
  { id: 3, type: 'education', title: 'B.S. Computer Science', company: 'University of California', location: 'Berkeley, CA', duration: '2017 – 2021', description: 'Focus on distributed systems and human-computer interaction. Graduated Magna Cum Laude.' },
];

const TYPE_ICONS = {
  work: <FiBriefcase size={13} />,
  education: <FiBook size={13} />,
  award: <FiAward size={13} />,
};

export default function TimelineVertical({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'Experience',
    subtitle = 'My professional journey',
    items = DEFAULT_ITEMS,
  } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 10 }}>{title}</h2>
          {subtitle && <p style={{ color: c.textMuted, fontSize: '1rem' }}>{subtitle}</p>}
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: 44 }}>
          {/* Vertical connector line */}
          <div style={{ position: 'absolute', left: 13, top: 14, bottom: 0, width: 2, background: `${c.border}`, borderRadius: 1 }} />

          {items.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              style={{ position: 'relative', marginBottom: '2.5rem' }}
            >
              {/* Icon dot */}
              <div style={{ position: 'absolute', left: -31, top: 4, width: 28, height: 28, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.primaryFg, zIndex: 1, boxShadow: `0 0 0 4px ${c.bg}` }}>
                {TYPE_ICONS[item.type] || TYPE_ICONS.work}
              </div>

              {/* Card */}
              <div
                style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 14, padding: '1.5rem 1.75rem', transition: 'border-color 0.2s' }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = `${c.primary}50`)}
                onMouseOut={(e) => (e.currentTarget.style.borderColor = c.border)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ color: c.text, fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>{item.title}</h3>
                    <p style={{ color: c.primary, fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>{item.company}</p>
                    {item.location && <p style={{ color: c.textMuted, fontSize: '0.8rem' }}>{item.location}</p>}
                  </div>
                  <span style={{ background: `${c.primary}15`, color: c.primary, padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {item.duration}
                  </span>
                </div>
                {item.description && (
                  <p style={{ color: c.textMuted, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
