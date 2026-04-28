import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiMail } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function HeroGradient({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <section
      style={{
        minHeight: '100vh',
        background: c.gradient,
        fontFamily: `'${theme.fontBody}', sans-serif`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative mesh overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)', pointerEvents: 'none' }} />
      {/* Animated blobs */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(0,0,0,0.12)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', maxWidth: 760, padding: '4rem 2rem', position: 'relative', zIndex: 1 }}
      >
        {/* Avatar */}
        {content.avatar ? (
          <motion.img
            src={content.avatar}
            alt={content.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 220 }}
            style={{ width: 110, height: 110, borderRadius: '50%', margin: '0 auto 1.75rem', display: 'block', border: '4px solid rgba(255,255,255,0.4)', objectFit: 'cover', boxShadow: '0 10px 40px rgba(0,0,0,0.25)' }}
          />
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            style={{ width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', border: '3px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(10px)' }}
          >
            👤
          </motion.div>
        )}

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 18px', borderRadius: 100, background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 13, fontWeight: 600, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block', opacity: 0.85 }} />
            {content.badge || 'Open to work'}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#fff',
            fontFamily: `'${theme.fontHeading}', sans-serif`,
            marginBottom: '0.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          {content.name || 'Your Name'}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: 'rgba(255,255,255,0.85)', fontWeight: 500, marginBottom: '1.5rem' }}
        >
          {content.title || 'Full Stack Developer'}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 2.5rem' }}
        >
          {content.description || 'I craft beautiful digital experiences that delight users and drive results.'}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          <a
            href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
            style={{ padding: '14px 32px', borderRadius: 14, fontWeight: 700, background: '#fff', color: c.primary, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, boxShadow: '0 8px 30px rgba(0,0,0,0.2)', fontSize: '0.95rem' }}
          >
            {content.ctaPrimary?.label || 'View Work'} <FiArrowRight />
          </a>
          <a
            href={isEditing ? '#' : content.ctaSecondary?.href || '#'}
            style={{ padding: '14px 32px', borderRadius: 14, fontWeight: 700, background: 'rgba(255,255,255,0.15)', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 9, border: '1.5px solid rgba(255,255,255,0.35)', backdropFilter: 'blur(8px)', fontSize: '0.95rem' }}
          >
            <FiMail size={16} />
            {content.ctaSecondary?.label || 'Contact Me'}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          {content.social?.github && (
            <a href={isEditing ? '#' : `https://github.com/${content.social.github}`} target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', transition: 'transform 0.15s' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
            ><FiGithub size={18} /></a>
          )}
          {content.social?.linkedin && (
            <a href={isEditing ? '#' : content.social.linkedin} target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', transition: 'transform 0.15s' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = ''; }}
            ><FiLinkedin size={18} /></a>
          )}
          {content.social?.twitter && (
            <a href={isEditing ? '#' : content.social.twitter} target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', transition: 'transform 0.15s' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = ''; }}
            ><FiTwitter size={18} /></a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
