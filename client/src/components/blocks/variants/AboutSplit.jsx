import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiArrowRight } from 'react-icons/fi';

export default function AboutSplit({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    name = 'Your Name',
    role = 'Software Developer',
    bio = "I'm a passionate developer who loves crafting beautiful, high-performance web experiences that make a real difference.",
    bio2 = "When I'm not coding, I enjoy hiking, photography, and contributing to open source projects.",
    avatar = '',
    ctaLabel = 'View My Work',
    ctaHref = '#projects',
    skills = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
  } = content;

  return (
    <section style={{ background: c.bg, overflow: 'hidden', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', overflow: 'hidden', minHeight: 400 }}
        >
          {avatar
            ? <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            : <div style={{ width: '100%', height: '100%', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${c.primary}18` }}>
                <div style={{ fontFamily: 'var(--theme-font-heading)', fontSize: 120, fontWeight: 900, color: `${c.primary}20` }}>{name.charAt(0)}</div>
              </div>
          }
          {/* Gradient fade to right */}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 50%, ${c.bg} 100%)` }} />
          {/* Role badge */}
          <div style={{ position: 'absolute', bottom: 30, left: 30, background: c.primary, borderRadius: 12, padding: '8px 18px', color: c.primaryFg, fontSize: 13, fontWeight: 700, zIndex: 1 }}>
            {role}
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ padding: '5rem 3.5rem 5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Hi, I'm{' '}
            <span style={{ backgroundImage: c.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{name}</span>
          </h2>

          <p style={{ color: c.textMuted, fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem' }}>{bio}</p>
          {bio2 && <p style={{ color: c.textMuted, fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{bio2}</p>}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2.5rem' }}>
            {skills.map((s) => (
              <span key={s} style={{ padding: '5px 12px', borderRadius: 6, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontSize: 12, fontWeight: 600 }}>{s}</span>
            ))}
          </div>

          {ctaLabel && (
            <a
              href={ctaHref}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: c.primary, color: c.primaryFg, padding: '0.75rem 1.5rem', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', alignSelf: 'flex-start', transition: 'opacity 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {ctaLabel} <FiArrowRight size={14} />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
