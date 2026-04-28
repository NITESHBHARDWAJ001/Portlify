import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDownRight } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function HeroBold({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  const words = (content.name || 'Your Name').split(' ');

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: c.bg,
        fontFamily: `'${theme.fontBody}', sans-serif`,
        display: 'flex',
        alignItems: 'center',
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large background text watermark */}
      <div
        style={{
          position: 'absolute',
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%) rotate(-5deg)',
          fontFamily: `'${theme.fontHeading}', sans-serif`,
          fontSize: 'clamp(6rem, 18vw, 20rem)',
          fontWeight: 900,
          color: `${c.primary}07`,
          lineHeight: 0.85,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          letterSpacing: '-0.04em',
        }}
      >
        {words[words.length - 1] || 'DEV'}
      </div>

      {/* Accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 5, height: '100%', background: c.gradient }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%', paddingLeft: '2rem', position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
          <div style={{ width: 40, height: 3, background: c.gradient, borderRadius: 2 }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.primary }}>
            {content.badge || 'Portfolio'}
          </span>
        </motion.div>

        {/* Name stacked */}
        <div>
          {words.map((word, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                fontFamily: `'${theme.fontHeading}', sans-serif`,
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.04em',
                // Alternate: first word solid text, rest gradient
                backgroundImage: i % 2 === 0 ? 'none' : c.gradientText,
                WebkitBackgroundClip: i % 2 === 0 ? 'unset' : 'text',
                WebkitTextFillColor: i % 2 === 0 ? c.text : 'transparent',
                backgroundClip: i % 2 === 0 ? 'unset' : 'text',
                color: i % 2 === 0 ? c.text : 'transparent',
              }}
            >
              {word}
            </motion.div>
          ))}
        </div>

        {/* Subtitle row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginTop: '2rem', flexWrap: 'wrap' }}
        >
          <div>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: c.secondary, fontWeight: 600, marginBottom: 6 }}>
              {content.title || 'Full Stack Developer'}
            </p>
            <p style={{ fontSize: '0.9rem', color: c.textMuted, lineHeight: 1.7, maxWidth: 440 }}>
              {content.description || 'Passionate about building things that matter. Available for exciting projects and collaborations.'}
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', flexShrink: 0 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: c.primary, fontFamily: `'${theme.fontHeading}', sans-serif` }}>{content.yearsExp || '5'}+</div>
              <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years</div>
            </div>
            <div style={{ width: 1, background: c.border, opacity: 0.5 }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: c.primary, fontFamily: `'${theme.fontHeading}', sans-serif` }}>{content.projectCount || '30'}+</div>
              <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Projects</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom row: CTAs + socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: '2.5rem', flexWrap: 'wrap' }}
        >
          <a
            href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
            style={{ padding: '14px 32px', borderRadius: 4, fontWeight: 800, background: c.gradient, color: c.primaryFg, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '0.95rem', letterSpacing: '0.03em', textTransform: 'uppercase', boxShadow: `0 4px 20px ${c.primary}35` }}
          >
            {content.ctaPrimary?.label || 'See My Work'} <FiArrowDownRight size={16} />
          </a>

          <div style={{ display: 'flex', gap: 12 }}>
            {content.social?.github && (
              <a href={isEditing ? '#' : `https://github.com/${content.social.github}`} target="_blank" rel="noopener noreferrer"
                style={{ color: c.textMuted, fontSize: '1.25rem', transition: 'color 0.15s', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; }}
              ><FiGithub /></a>
            )}
            {content.social?.linkedin && (
              <a href={isEditing ? '#' : content.social.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ color: c.textMuted, fontSize: '1.25rem', transition: 'color 0.15s', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; }}
              ><FiLinkedin /></a>
            )}
            {content.social?.twitter && (
              <a href={isEditing ? '#' : content.social.twitter} target="_blank" rel="noopener noreferrer"
                style={{ color: c.textMuted, fontSize: '1.25rem', transition: 'color 0.15s', display: 'flex', alignItems: 'center' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; }}
              ><FiTwitter /></a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
