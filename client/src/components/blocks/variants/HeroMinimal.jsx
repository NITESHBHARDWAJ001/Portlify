import { motion } from 'framer-motion';
import { FiArrowDownRight, FiGithub, FiLinkedin } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function HeroMinimal({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: c.bg,
        fontFamily: `'${theme.fontBody}', sans-serif`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top row: name small */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span style={{ fontSize: '0.9rem', color: c.textSubtle, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {content.name || 'Your Name'}
        </span>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {content.social?.github && (
            <a href={isEditing ? '#' : `https://github.com/${content.social.github}`} target="_blank" rel="noopener noreferrer" style={{ color: c.textSubtle, fontSize: 13 }}>
              GitHub
            </a>
          )}
          {content.social?.linkedin && (
            <a href={isEditing ? '#' : content.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: c.textSubtle, fontSize: 13 }}>
              LinkedIn
            </a>
          )}
        </div>
      </motion.div>

      {/* Center: massive name */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{ overflow: 'hidden', marginBottom: '0.25rem' }}>
          <h1
            style={{
              fontFamily: `'${theme.fontHeading}', sans-serif`,
              fontSize: 'clamp(4rem, 13vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: c.text,
              margin: 0,
            }}
          >
            {(content.name || 'Your Name').split(' ')[0]}
          </h1>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <h1
            style={{
              fontFamily: `'${theme.fontHeading}', sans-serif`,
              fontSize: 'clamp(4rem, 13vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              background: c.gradientText,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            {(content.name || 'Your Name').split(' ').slice(1).join(' ') || 'Name'}
          </h1>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '3rem' }}>
          <div style={{ maxWidth: 380 }}>
            <p style={{ fontSize: '1.15rem', color: c.text, fontWeight: 600, marginBottom: '0.5rem' }}>
              {content.title || 'Full Stack Developer'}
            </p>
            <p style={{ fontSize: '0.95rem', color: c.textMuted, lineHeight: 1.75 }}>
              {content.description || 'Building elegant solutions to complex problems.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom row: CTA + scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <a
          href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 32px',
            borderRadius: '100px',
            background: c.gradient,
            color: c.primaryFg,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1.05rem',
            boxShadow: `0 10px 40px ${c.primary}40`,
          }}
        >
          {content.ctaPrimary?.label || 'See My Work'}
          <FiArrowDownRight size={18} />
        </a>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '0.75rem', color: c.textSubtle, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            Scroll to explore
          </p>
          <div style={{ width: 1, height: 48, background: `linear-gradient(${c.primary}, transparent)`, marginLeft: 'auto', animation: 'pulse 2s infinite' }} />
        </div>
      </motion.div>
    </section>
  );
}
