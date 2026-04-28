import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiBriefcase, FiDownload } from 'react-icons/fi';

function SocialBtn({ href, icon, c }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ width: 36, height: 36, borderRadius: 8, background: c.surface, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0 }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.color = c.primary; }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}
    >
      {icon}
    </a>
  );
}

export default function AboutBio({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    name = 'Your Name',
    role = 'Software Developer',
    bio = "I'm a passionate developer with 5+ years of experience building scalable web applications and delightful user experiences.",
    avatar = '',
    location = 'San Francisco, CA',
    availability = 'Open to opportunities',
    resumeUrl = '',
    social = { github: '', linkedin: '', twitter: '', email: '' },
    interests = ['Open Source', 'Web Performance', 'Design Systems', 'Music'],
    experience = '5+',
    projects = '50+',
    stars = '2k',
  } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Avatar + meta */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ position: 'sticky', top: 40 }}>
              {/* Avatar */}
              <div style={{ borderRadius: 20, overflow: 'hidden', marginBottom: '1.25rem', background: c.surface, border: `1px solid ${c.border}`, aspectRatio: '1' }}>
                {avatar
                  ? <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${c.primary}15`, fontFamily: 'var(--theme-font-heading)', fontSize: 72, fontWeight: 900, color: c.primary, opacity: 0.5 }}>{name.charAt(0)}</div>
                }
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: c.textMuted, fontSize: 13, marginBottom: 8 }}>
                <FiMapPin size={12} /> {location}
              </div>

              {/* Availability */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, marginBottom: '1.5rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px #22c55e30' }} />
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{availability}</span>
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: '1.5rem' }}>
                {[
                  { label: 'Exp', value: experience },
                  { label: 'Projects', value: projects },
                  { label: 'Stars', value: stars },
                  { label: 'Interests', value: `${interests.length}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ background: c.surface, borderRadius: 10, padding: '0.75rem 0.5rem', border: `1px solid ${c.border}`, textAlign: 'center' }}>
                    <div style={{ color: c.primary, fontSize: 18, fontWeight: 800, lineHeight: 1 }}>{value}</div>
                    <div style={{ color: c.textMuted, fontSize: 10, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: resumeUrl ? '1rem' : 0 }}>
                {social.github && <SocialBtn href={`https://github.com/${social.github}`} icon={<FiGithub size={14} />} c={c} />}
                {social.linkedin && <SocialBtn href={social.linkedin} icon={<FiLinkedin size={14} />} c={c} />}
                {social.twitter && <SocialBtn href={`https://twitter.com/${social.twitter}`} icon={<FiTwitter size={14} />} c={c} />}
                {social.email && <SocialBtn href={`mailto:${social.email}`} icon={<FiMail size={14} />} c={c} />}
              </div>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', padding: '0.625rem', borderRadius: 10, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.color = c.primary; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}
                >
                  <FiDownload size={13} /> Download Resume
                </a>
              )}
            </div>
          </motion.div>

          {/* Right: Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${c.primary}15`, border: `1px solid ${c.primary}40`, borderRadius: 100, padding: '4px 14px', marginBottom: '1.25rem' }}>
              <FiBriefcase size={11} color={c.primary} />
              <span style={{ color: c.primary, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{role}</span>
            </div>

            <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem' }}>
              About{' '}
              <span style={{ backgroundImage: c.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Me</span>
            </h2>

            <p style={{ color: c.textMuted, fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>{bio}</p>

            <div>
              <h3 style={{ color: c.text, fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                Things I love
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {interests.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.06, y: -2 }}
                    style={{ padding: '6px 14px', borderRadius: 100, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 13, fontWeight: 500, cursor: 'default' }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
