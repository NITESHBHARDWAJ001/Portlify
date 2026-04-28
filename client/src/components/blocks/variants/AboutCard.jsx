import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiDownload } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function AboutCard({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  const stats = [
    { label: 'Years Exp.', value: content.yearsExp || '5+' },
    { label: 'Projects', value: content.projectCount || '30+' },
    { label: 'Clients', value: content.clientCount || '12+' },
  ];

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', alignItems: 'start' }}>
        {/* Left: Photo card */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          {/* Avatar / photo */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '100%',
                paddingBottom: '110%',
                borderRadius: 24,
                background: content.avatar
                  ? `url(${content.avatar}) center/cover no-repeat`
                  : c.gradient,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {!content.avatar && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>👤</div>
              )}
            </div>
            {/* Status badge */}
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, background: `${c.surface}e0`, backdropFilter: 'blur(12px)', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${c.border}` }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>Available for work</span>
            </div>
          </div>

          {/* Quick contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {content.email && (
              <a href={isEditing ? '#' : `mailto:${content.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 12, color: c.textMuted, textDecoration: 'none', fontSize: 13, transition: 'border-color 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = `${c.primary}50`; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; }}
              ><FiMail size={15} style={{ color: c.primary, flexShrink: 0 }} /> {content.email}</a>
            )}
            {content.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 12, color: c.textMuted, fontSize: 13 }}>
                <FiMapPin size={15} style={{ color: c.primary, flexShrink: 0 }} /> {content.location}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, backgroundColor: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 600, marginBottom: '1.25rem', border: `1px solid ${c.primary}30` }}>
            About Me
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1.25rem' }}>
            {content.name || 'Your Name'}
          </h2>
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: c.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
            {content.title || 'Full Stack Developer'}
          </p>
          <p style={{ fontSize: '1rem', color: c.textMuted, lineHeight: 1.8, marginBottom: '2rem' }}>
            {content.bio || 'I\'m a developer passionate about building things that matter. With a focus on clean code and exceptional user experience, I bring ideas to life through thoughtful engineering.'}
          </p>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 14, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: c.primary, fontFamily: theme.fontHeading, marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Social + CV */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {content.social?.github && (
              <a href={isEditing ? '#' : `https://github.com/${content.social.github}`} target="_blank" rel="noopener noreferrer"
                style={{ width: 40, height: 40, borderRadius: 12, border: `1px solid ${c.border}`, background: c.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = `${c.primary}50`; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; e.currentTarget.style.borderColor = c.border; }}
              ><FiGithub size={17} /></a>
            )}
            {content.social?.linkedin && (
              <a href={isEditing ? '#' : content.social.linkedin} target="_blank" rel="noopener noreferrer"
                style={{ width: 40, height: 40, borderRadius: 12, border: `1px solid ${c.border}`, background: c.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = `${c.primary}50`; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; e.currentTarget.style.borderColor = c.border; }}
              ><FiLinkedin size={17} /></a>
            )}
            {content.social?.twitter && (
              <a href={isEditing ? '#' : content.social.twitter} target="_blank" rel="noopener noreferrer"
                style={{ width: 40, height: 40, borderRadius: 12, border: `1px solid ${c.border}`, background: c.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = c.primary; e.currentTarget.style.borderColor = `${c.primary}50`; }}
                onMouseOut={(e) => { e.currentTarget.style.color = c.textMuted; e.currentTarget.style.borderColor = c.border; }}
              ><FiTwitter size={17} /></a>
            )}
            {content.resumeUrl && (
              <a href={isEditing ? '#' : content.resumeUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, background: c.gradient, color: c.primaryFg, textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}
              ><FiDownload size={15} /> Download CV</a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
