import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiMail } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function HeroGlass({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: c.bg,
        fontFamily: `'${theme.fontBody}', sans-serif`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient blobs */}
      <div style={{ position: 'absolute', top: '5%', left: '10%', width: 480, height: 480, borderRadius: '50%', background: c.gradient, opacity: 0.15, filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '0%', right: '5%', width: 380, height: 380, borderRadius: '50%', background: `${c.secondary}50`, filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: '30%', width: 220, height: 220, borderRadius: '50%', background: `${c.accent}35`, filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Glass card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', damping: 25 }}
        style={{
          background: `${c.surface}cc`,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: `1.5px solid ${c.border}`,
          borderRadius: 28,
          padding: '3.5rem',
          maxWidth: 600,
          width: '90%',
          position: 'relative',
          zIndex: 1,
          boxShadow: `0 20px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
        }}
      >
        {/* Top row: badge + avatar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 16px', borderRadius: 100, backgroundColor: `${c.primary}20`, color: c.primary, fontSize: 12, fontWeight: 700, border: `1px solid ${c.primary}35` }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, display: 'inline-block', boxShadow: `0 0 6px ${c.accent}` }} />
            {content.badge || 'Open to work'}
          </span>
          {content.avatar ? (
            <img src={content.avatar} alt={content.name} style={{ width: 64, height: 64, borderRadius: '50%', border: `3px solid ${c.primary}`, objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', border: `3px solid ${c.primary}40` }}>👤</div>
          )}
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: '0.5rem',
            fontFamily: `'${theme.fontHeading}', sans-serif`,
            backgroundImage: c.gradientText,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {content.name || 'Your Name'}
        </h1>

        {/* Title */}
        <p style={{ fontSize: '1.25rem', color: c.textMuted, fontWeight: 600, marginBottom: '1.25rem' }}>
          {content.title || 'Full Stack Developer'}
        </p>

        {/* Description */}
        <p style={{ fontSize: '0.95rem', color: c.textMuted, lineHeight: 1.8, marginBottom: '2rem', opacity: 0.85 }}>
          {content.description || 'Building performant, beautiful web applications that live at the intersection of design and engineering.'}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(to right, ${c.primary}40, transparent)`, marginBottom: '2rem' }} />

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: '2rem' }}>
          <a
            href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
            style={{ padding: '12px 26px', borderRadius: 12, fontWeight: 700, background: c.gradient, color: c.primaryFg, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: `0 4px 20px ${c.primary}40`, fontSize: '0.9rem' }}
          >
            {content.ctaPrimary?.label || 'View Projects'} <FiArrowRight />
          </a>
          <a
            href={isEditing ? '#' : content.ctaSecondary?.href || '#'}
            style={{ padding: '12px 26px', borderRadius: 12, fontWeight: 700, background: `${c.primary}12`, color: c.text, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, border: `1.5px solid ${c.border}`, fontSize: '0.9rem' }}
          >
            <FiMail size={15} /> {content.ctaSecondary?.label || 'Contact Me'}
          </a>
        </div>

        {/* Social + stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {content.social?.github && (
              <a href={isEditing ? '#' : `https://github.com/${content.social.github}`} target="_blank" rel="noopener noreferrer"
                style={{ color: c.textMuted, width: 36, height: 36, borderRadius: 10, background: `${c.primary}12`, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = `${c.primary}60`; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; e.currentTarget.style.borderColor = c.border; }}
              ><FiGithub size={16} /></a>
            )}
            {content.social?.linkedin && (
              <a href={isEditing ? '#' : content.social.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ color: c.textMuted, width: 36, height: 36, borderRadius: 10, background: `${c.primary}12`, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = `${c.primary}60`; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; e.currentTarget.style.borderColor = c.border; }}
              ><FiLinkedin size={16} /></a>
            )}
            {content.social?.twitter && (
              <a href={isEditing ? '#' : content.social.twitter} target="_blank" rel="noopener noreferrer"
                style={{ color: c.textMuted, width: 36, height: 36, borderRadius: 10, background: `${c.primary}12`, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = `${c.primary}60`; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; e.currentTarget.style.borderColor = c.border; }}
              ><FiTwitter size={16} /></a>
            )}
          </div>
          <span style={{ fontSize: 12, color: c.textSubtle, fontWeight: 500 }}>
            {content.yearsExp || '3'}+ yrs · {content.projectCount || '20'}+ projects
          </span>
        </div>
      </motion.div>
    </section>
  );
}
