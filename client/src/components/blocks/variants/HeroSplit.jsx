import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowRight, FiStar, FiCode } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function HeroSplit({ content = {}, isEditing }) {
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
        padding: '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', right: '-5%', top: '5%', width: 500, height: 500, borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%', background: c.gradient, opacity: 0.06, filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        {/* Left: Content */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 100, backgroundColor: `${c.primary}15`, color: c.primary, fontSize: 12, fontWeight: 600, marginBottom: '1.5rem', border: `1px solid ${c.primary}30` }}>
            <FiCode size={13} />
            {content.badge || 'Available for hire'}
          </div>

          <h1 style={{ fontFamily: `'${theme.fontHeading}', sans-serif`, fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', color: c.text, marginBottom: '0.4rem' }}>
            Hi, I'm{' '}
            <span style={{ backgroundImage: c.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {content.name || 'Your Name'}
            </span>
          </h1>

          <p style={{ fontSize: '1.4rem', color: c.secondary, fontWeight: 600, marginBottom: '1.25rem' }}>
            {content.title || 'Full Stack Developer'}
          </p>

          <p style={{ fontSize: '1rem', color: c.textMuted, lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: 480 }}>
            {content.description || 'I craft clean, high-performance applications from concept to deployment. Let\'s build something amazing together.'}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <a
              href={isEditing ? '#' : content.ctaPrimary?.href || '#'}
              style={{ padding: '13px 28px', borderRadius: 12, fontWeight: 700, background: c.gradient, color: c.primaryFg, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: `0 6px 24px ${c.primary}35` }}
            >
              {content.ctaPrimary?.label || 'View Projects'} <FiArrowRight />
            </a>
            <a
              href={isEditing ? '#' : content.ctaSecondary?.href || '#'}
              style={{ padding: '13px 28px', borderRadius: 12, fontWeight: 700, background: 'transparent', color: c.text, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, border: `2px solid ${c.border}` }}
            >
              {content.ctaSecondary?.label || 'Get In Touch'}
            </a>
          </div>

          {/* Social + stats row */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 14 }}>
              {content.social?.github && (
                <a href={isEditing ? '#' : `https://github.com/${content.social.github}`} target="_blank" rel="noopener noreferrer" style={{ color: c.textMuted }}>
                  <FiGithub size={20} />
                </a>
              )}
              {content.social?.linkedin && (
                <a href={isEditing ? '#' : content.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: c.textMuted }}>
                  <FiLinkedin size={20} />
                </a>
              )}
            </div>
            <div style={{ width: 1, height: 24, backgroundColor: c.border }} />
            <span style={{ fontSize: 13, color: c.textSubtle }}>
              {content.yearsExp || '3'}+ years experience
            </span>
          </div>
        </motion.div>

        {/* Right: Avatar blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          {/* Outer morphing blob */}
          <div style={{ width: 360, height: 360, borderRadius: '64% 36% 27% 73% / 55% 58% 42% 45%', background: c.gradient, padding: 5, boxShadow: `0 20px 80px ${c.primary}40` }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 'inherit', backgroundColor: c.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {content.avatar ? (
                <img src={content.avatar} alt={content.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ fontSize: '6rem', background: `${c.primary}12`, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  👨‍💻
                </div>
              )}
            </div>
          </div>

          {/* Floating badge 1 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ position: 'absolute', bottom: '8%', left: '-5%', background: c.surface, borderRadius: 14, padding: '10px 16px', boxShadow: `0 10px 40px rgba(0,0,0,0.25)`, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <span style={{ fontSize: 22 }}>🚀</span>
            <div>
              <div style={{ fontSize: 11, color: c.textSubtle }}>Projects Built</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: c.text }}>{content.projectCount || '30'}+</div>
            </div>
          </motion.div>

          {/* Floating badge 2 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ position: 'absolute', top: '8%', right: '-3%', background: c.surface, borderRadius: 14, padding: '10px 16px', boxShadow: `0 10px 40px rgba(0,0,0,0.25)`, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <FiStar size={22} style={{ color: '#fbbf24' }} />
            <div>
              <div style={{ fontSize: 11, color: c.textSubtle }}>GitHub Stars</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: c.text }}>{content.githubStars || '500'}+</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
