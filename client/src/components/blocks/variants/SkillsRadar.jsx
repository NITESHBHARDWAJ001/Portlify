import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

const DEFAULT_SKILLS = [
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'TypeScript', category: 'Frontend', level: 90 },
  { name: 'CSS / Tailwind', category: 'Frontend', level: 88 },
  { name: 'Node.js', category: 'Backend', level: 85 },
  { name: 'Python', category: 'Backend', level: 80 },
  { name: 'PostgreSQL', category: 'Database', level: 78 },
  { name: 'Docker', category: 'DevOps', level: 72 },
  { name: 'AWS', category: 'Cloud', level: 70 },
];

export default function SkillsRadar({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const skills = (content.skills?.length > 0 ? content.skills : DEFAULT_SKILLS).slice(0, 8);

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
            {content.title || 'Skills & Expertise'}
          </h2>
          {content.subtitle && <p style={{ color: c.textMuted, fontSize: '1rem', margin: 0 }}>{content.subtitle}</p>}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {skills.map((skill, i) => {
            const level = skill.level ?? 75;
            return (
              <motion.div
                key={skill.name || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
                style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 16, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
              >
                {/* Category label */}
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: c.textSubtle, display: 'block', marginBottom: 8 }}>
                  {skill.category || 'General'}
                </span>

                {/* Skill name + level */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: c.text }}>{skill.name}</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: c.primary, fontFamily: theme.fontHeading }}>{level}%</span>
                </div>

                {/* Multi-ring progress */}
                <div style={{ position: 'relative', height: 8 }}>
                  {/* Background track */}
                  <div style={{ height: 8, background: `${c.primary}12`, borderRadius: 100, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${level}%` }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.9, ease: 'easeOut' }}
                      style={{ height: '100%', background: c.gradient, borderRadius: 100, position: 'relative', overflow: 'hidden' }}
                    >
                      {/* Shine */}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'rgba(255,255,255,0.25)', borderRadius: 100 }} />
                    </motion.div>
                  </div>
                </div>

                {/* Decorative corner gradient */}
                <div style={{ position: 'absolute', top: -10, right: -10, width: 60, height: 60, background: `${c.primary}10`, borderRadius: '50%', filter: 'blur(12px)', pointerEvents: 'none' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
