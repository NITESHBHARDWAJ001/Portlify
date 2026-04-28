import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function HeroCentered({ content = {}, isEditing }) {
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
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', width: 320, height: 320, borderRadius: '50%', background: c.gradient, opacity: 0.07, filter: 'blur(90px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle, ${c.secondary}30, transparent)`, filter: 'blur(70px)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', maxWidth: 720, padding: '4rem 2rem', position: 'relative', zIndex: 1 }}
      >
        {/* Avatar */}
        {content.avatar && (
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            src={content.avatar}
            alt={content.name}
            style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto 1.5rem', display: 'block', border: `4px solid ${c.primary}`, objectFit: 'cover' }}
          />
        )}
        {!content.avatar && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            style={{ width: 96, height: 96, borderRadius: '50%', margin: '0 auto 1.5rem', background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}
          >
            👤
          </motion.div>
        )}

        {/* Badge */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ marginBottom: '1.25rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 15px', borderRadius: 100, backgroundColor: `${c.primary}18`, color: c.primary, fontSize: 13, fontWeight: 600, border: `1px solid ${c.primary}35` }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: c.accent, display: 'inline-block' }} />
            {content.badge || 'Open to work'}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
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
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: c.textMuted, fontWeight: 500, marginBottom: '1.25rem' }}
        >
          {content.title || 'Full Stack Developer'}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ fontSize: '1.05rem', color: c.textMuted, maxWidth: 560, margin: '0 auto 2.5rem', lineHeight: 1.75 }}
        >
          {content.description || 'Passionate about building beautiful, performant web applications.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          <a
            href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
            style={{ padding: '13px 30px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', background: c.gradient, color: c.primaryFg, textDecoration: 'none', display: 'inline-block', boxShadow: `0 8px 28px ${c.primary}40` }}
          >
            {content.ctaPrimary?.label || 'View Projects'}
          </a>
          <a
            href={isEditing ? '#' : content.ctaSecondary?.href || '#'}
            style={{ padding: '13px 30px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', background: 'transparent', color: c.text, textDecoration: 'none', display: 'inline-block', border: `2px solid ${c.border}` }}
          >
            {content.ctaSecondary?.label || 'Contact Me'}
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{ display: 'flex', gap: 18, justifyContent: 'center' }}
        >
          {content.social?.github && (
            <a href={isEditing ? '#' : `https://github.com/${content.social.github}`} target="_blank" rel="noopener noreferrer" style={{ color: c.textMuted }}>
              <FiGithub size={22} />
            </a>
          )}
          {content.social?.linkedin && (
            <a href={isEditing ? '#' : content.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: c.textMuted }}>
              <FiLinkedin size={22} />
            </a>
          )}
          {content.social?.twitter && (
            <a href={isEditing ? '#' : `https://twitter.com/${content.social.twitter}`} target="_blank" rel="noopener noreferrer" style={{ color: c.textMuted }}>
              <FiTwitter size={22} />
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
