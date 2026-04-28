import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiBriefcase, FiBook, FiAward } from 'react-icons/fi';

const DEFAULT_ITEMS = [
  { id: 1, type: 'education', title: 'CS Degree', company: 'University', duration: '2017–2021' },
  { id: 2, type: 'work', title: 'Junior Dev', company: 'First Job', duration: '2021–2022' },
  { id: 3, type: 'work', title: 'Mid-Level Engineer', company: 'StartupXYZ', duration: '2022–2023' },
  { id: 4, type: 'award', title: 'Hackathon Win', company: 'HackMIT', duration: '2023' },
  { id: 5, type: 'work', title: 'Senior Engineer', company: 'TechCorp', duration: '2023–Now' },
];

const TYPE_ICONS = { work: <FiBriefcase size={14} />, education: <FiBook size={14} />, award: <FiAward size={14} /> };

export default function TimelineHorizontal({ content = {} }) {
  const { colors: c, fontHeading, fontBody } = useTheme();
  const { title = 'My Journey', subtitle = '', items = DEFAULT_ITEMS } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: fontBody, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: fontHeading, color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, margin: '0 0 8px' }}>{title}</h2>
          {subtitle && <p style={{ color: c.textMuted, fontSize: '0.95rem', margin: 0 }}>{subtitle}</p>}
        </motion.div>

        {/* Scrollable container */}
        <div style={{ overflowX: 'auto', padding: '1rem 0 2rem', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ display: 'flex', gap: 0, minWidth: items.length * 220, position: 'relative', padding: '0 2rem' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: 28, left: '2rem', right: '2rem', height: 2, background: `${c.border}`, zIndex: 0 }} />

            {items.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ flex: `0 0 200px`, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}
              >
                {/* Period dot */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: i === items.length - 1 ? c.gradient : c.cardBg,
                  border: `2px solid ${i === items.length - 1 ? c.primary : c.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: i === items.length - 1 ? c.primaryFg : c.textMuted,
                  marginBottom: '1.25rem',
                  flexShrink: 0,
                  boxShadow: i === items.length - 1 ? `0 4px 20px ${c.primary}40` : 'none',
                  transition: 'all 0.2s',
                }}>
                  {TYPE_ICONS[item.type] || TYPE_ICONS.work}
                </div>

                {/* Card */}
                <div style={{
                  background: c.cardBg,
                  border: `1px solid ${i === items.length - 1 ? `${c.primary}50` : c.border}`,
                  borderRadius: 14,
                  padding: '1rem 1.25rem',
                  width: '85%',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, marginBottom: 6, letterSpacing: '0.05em' }}>{item.duration}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: c.text, marginBottom: 4, lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: c.textMuted, fontWeight: 500 }}>@ {item.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
