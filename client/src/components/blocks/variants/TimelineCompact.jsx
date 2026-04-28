import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiBriefcase, FiBook, FiAward } from 'react-icons/fi';

const DEFAULT_ITEMS = [
  { id: 1, type: 'work', title: 'Senior Engineer', company: 'TechCorp', duration: '2023 – Now', description: 'Leading frontend architecture.' },
  { id: 2, type: 'work', title: 'Full Stack Dev', company: 'StartupXYZ', duration: '2021 – 2023', description: 'Built product 0→1, scaled to $2M ARR.' },
  { id: 3, type: 'education', title: 'B.S. Computer Science', company: 'UC Berkeley', duration: '2017 – 2021', description: 'Magna Cum Laude.' },
  { id: 4, type: 'award', title: 'Best Hack Award', company: 'HackMIT', duration: '2020', description: 'Won first place out of 200 teams.' },
];

const TYPE_ICONS = { work: <FiBriefcase size={12} />, education: <FiBook size={12} />, award: <FiAward size={12} /> };

export default function TimelineCompact({ content = {} }) {
  const { colors: c, fontHeading, fontBody } = useTheme();
  const { title = 'Experience', subtitle = '', items = DEFAULT_ITEMS } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: fontBody }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: fontHeading, color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, margin: '0 0 8px' }}>{title}</h2>
          {subtitle && <p style={{ color: c.textMuted, fontSize: '0.95rem', margin: 0 }}>{subtitle}</p>}
        </motion.div>

        <div>
          {items.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: 'grid', gridTemplateColumns: '110px 28px 1fr', gap: '0 1rem', marginBottom: '0.25rem', alignItems: 'stretch' }}
            >
              {/* Date */}
              <div style={{ textAlign: 'right', paddingTop: '0.85rem', paddingBottom: '0.85rem' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.textSubtle, whiteSpace: 'nowrap' }}>{item.duration}</span>
              </div>

              {/* Dot + line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.primaryFg, flexShrink: 0, zIndex: 1 }}>
                  {TYPE_ICONS[item.type] || TYPE_ICONS.work}
                </div>
                {i < items.length - 1 && <div style={{ flex: 1, width: 2, background: `${c.border}`, minHeight: 16 }} />}
              </div>

              {/* Content */}
              <div style={{ padding: '0.5rem 0 1.5rem' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: c.text, fontSize: '0.95rem' }}>{item.title}</span>
                  <span style={{ fontSize: '0.8rem', color: c.primary, fontWeight: 600 }}>@ {item.company}</span>
                </div>
                {item.description && (
                  <p style={{ fontSize: '0.85rem', color: c.textMuted, lineHeight: 1.65, marginTop: '0.25rem', marginBottom: 0 }}>{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
