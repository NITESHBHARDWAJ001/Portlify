import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiSend } from 'react-icons/fi';

function SocialLink({ href, icon, label, c }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, width: 60, padding: '0.75rem 0.5rem', borderRadius: 12, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, textDecoration: 'none', fontSize: 11, fontWeight: 600, transition: 'all 0.2s' }}
      onMouseOver={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.color = c.primary; }}
      onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}
    >
      {icon}
      {label}
    </a>
  );
}

export default function ContactMinimal({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'Get In Touch',
    subtitle = "I'm always open to discussing new opportunities, creative projects, or just having a chat.",
    email = 'hello@example.com',
    location = 'San Francisco, CA',
    social = { github: '', linkedin: '', twitter: '' },
    availability = 'Available for freelance',
  } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        {availability && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `${c.primary}15`, border: `1px solid ${c.primary}40`, borderRadius: 100, padding: '5px 16px', color: c.primary, fontSize: 12, fontWeight: 700, marginBottom: '1.5rem' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px #22c55e30' }} />
              {availability}
            </span>
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: c.textMuted, fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem' }}
        >
          {subtitle}
        </motion.p>

        {/* Email CTA */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginBottom: '2.5rem' }}>
          <a
            href={`mailto:${email}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: c.primary, color: c.primaryFg, padding: '1rem 2.5rem', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseOut={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}
          >
            <FiSend size={16} /> {email}
          </a>
        </motion.div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2rem' }}>
          <div style={{ flex: 1, height: 1, background: c.border }} />
          <span style={{ color: c.textSubtle, fontSize: 12 }}>or find me on</span>
          <div style={{ flex: 1, height: 1, background: c.border }} />
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: '2rem' }}
        >
          {social.github && <SocialLink href={`https://github.com/${social.github}`} icon={<FiGithub size={18} />} label="GitHub" c={c} />}
          {social.linkedin && <SocialLink href={social.linkedin} icon={<FiLinkedin size={18} />} label="LinkedIn" c={c} />}
          {social.twitter && <SocialLink href={`https://twitter.com/${social.twitter}`} icon={<FiTwitter size={18} />} label="Twitter" c={c} />}
          {social.email && <SocialLink href={`mailto:${social.email}`} icon={<FiMail size={18} />} label="Email" c={c} />}
        </motion.div>

        {location && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: c.textMuted, fontSize: 14, margin: 0 }}
          >
            <FiMapPin size={13} /> {location}
          </motion.p>
        )}
      </div>
    </section>
  );
}
