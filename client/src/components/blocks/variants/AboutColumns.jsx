import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiGlobe } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function AboutColumns({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  const highlights = content.highlights || [
    { icon: '🎯', label: 'Focus Areas', value: 'Full-Stack, APIs, DevOps' },
    { icon: '🏆', label: 'Top Skill', value: 'React & Node.js' },
    { icon: '📍', label: 'Location', value: content.location || 'Remote' },
    { icon: '🕐', label: 'Timezone', value: content.timezone || 'UTC±0' },
    { icon: '🚀', label: 'Projects', value: `${content.projectCount || '30'}+ shipped` },
    { icon: '🎓', label: 'Education', value: content.education || 'CS Degree' },
  ];

  const socials = [
    content.social?.github && { icon: <FiGithub size={18} />, label: 'GitHub', href: isEditing ? '#' : `https://github.com/${content.social.github}`, value: `@${content.social.github}` },
    content.social?.linkedin && { icon: <FiLinkedin size={18} />, label: 'LinkedIn', href: isEditing ? '#' : content.social.linkedin, value: 'Connect' },
    content.email && { icon: <FiMail size={18} />, label: 'Email', href: isEditing ? '#' : `mailto:${content.email}`, value: content.email },
    content.website && { icon: <FiGlobe size={18} />, label: 'Website', href: isEditing ? '#' : content.website, value: content.website },
  ].filter(Boolean);

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
            {content.title || 'About Me'}
          </h2>
          <div style={{ width: 60, height: 4, background: c.gradient, borderRadius: 2, margin: '0 auto' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', alignItems: 'start' }}>
          {/* Col 1: Bio */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {content.avatar && (
              <img src={content.avatar} alt={content.name} style={{ width: 80, height: 80, borderRadius: '50%', border: `3px solid ${c.primary}`, objectFit: 'cover', marginBottom: '1.25rem' }} />
            )}
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: c.text, fontFamily: theme.fontHeading, marginBottom: '0.4rem' }}>
              {content.name || 'Your Name'}
            </h3>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: c.primary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {content.title || 'Full Stack Developer'}
            </p>
            <p style={{ fontSize: '0.9rem', color: c.textMuted, lineHeight: 1.8 }}>
              {content.bio || 'Passionate developer with a knack for crafting elegant solutions. I thrive at the intersection of creative design and robust engineering.'}
            </p>
          </motion.div>

          {/* Col 2: Highlights */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.textSubtle, marginBottom: '1.25rem' }}>Quick Facts</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 12 }}
                >
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{h.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: c.textSubtle, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h.label}</div>
                    <div style={{ fontSize: '0.875rem', color: c.text, fontWeight: 600 }}>{h.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Col 3: Social + Connect */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.textSubtle, marginBottom: '1.25rem' }}>Get in Touch</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 12, color: c.text, textDecoration: 'none', transition: 'all 0.15s', fontSize: '0.875rem', fontWeight: 600 }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = `${c.primary}50`; e.currentTarget.style.background = `${c.primary}08`; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = c.cardBg; }}
                >
                  <span style={{ color: c.primary, flexShrink: 0 }}>{s.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: c.textSubtle, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                    <div style={{ fontSize: '0.8rem', color: c.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href={isEditing ? '#' : (content.email ? `mailto:${content.email}` : '#')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: '1.25rem', padding: '14px', borderRadius: 14, background: c.gradient, color: c.primaryFg, textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', boxShadow: `0 4px 20px ${c.primary}30` }}
            >
              <FiMail size={16} /> Let's Collaborate
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
