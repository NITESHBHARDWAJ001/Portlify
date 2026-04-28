import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiGlobe, FiYoutube, FiInstagram } from 'react-icons/fi';
import { useTheme } from '../../../themes';

const PLATFORM_CONFIG = {
  github:    { icon: FiGithub,    label: 'GitHub',    color: '#333', bg: '#f0f0f0', desc: 'See my code & contributions' },
  linkedin:  { icon: FiLinkedin,  label: 'LinkedIn',  color: '#0077b5', bg: '#e8f4fd', desc: 'Professional network' },
  twitter:   { icon: FiTwitter,   label: 'Twitter',   color: '#1da1f2', bg: '#e8f5fd', desc: 'Thoughts & updates' },
  email:     { icon: FiMail,      label: 'Email',     color: '#ea4335', bg: '#fde8e8', desc: 'Direct message' },
  website:   { icon: FiGlobe,     label: 'Website',   color: '#6366f1', bg: '#eef0ff', desc: 'Personal site' },
  youtube:   { icon: FiYoutube,   label: 'YouTube',   color: '#ff0000', bg: '#ffe8e8', desc: 'Video content' },
  instagram: { icon: FiInstagram, label: 'Instagram', color: '#e1306c', bg: '#fde8f0', desc: 'Visual updates' },
};

export default function ContactSocial({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  const links = [
    content.github && { id: 'github', href: `https://github.com/${content.github}`, username: `@${content.github}` },
    content.linkedin && { id: 'linkedin', href: content.linkedin, username: 'Connect' },
    content.twitter && { id: 'twitter', href: content.twitter, username: content.twitter },
    content.email && { id: 'email', href: `mailto:${content.email}`, username: content.email },
    content.website && { id: 'website', href: content.website, username: content.website },
  ].filter(Boolean);

  const displayLinks = links.length > 0 ? links : [
    { id: 'github', href: '#', username: '@yourusername' },
    { id: 'linkedin', href: '#', username: 'Connect' },
    { id: 'twitter', href: '#', username: '@yourhandle' },
    { id: 'email', href: '#', username: 'hello@you.dev' },
  ];

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: theme.fontHeading, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: c.text, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            {content.title || 'Find Me Online'}
          </h2>
          <p style={{ fontSize: '1rem', color: c.textMuted, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            {content.description || "I'm most responsive on email and LinkedIn. Feel free to reach out on any platform."}
          </p>
        </motion.div>

        {/* Social link grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {displayLinks.map((link, i) => {
            const config = PLATFORM_CONFIG[link.id] || PLATFORM_CONFIG.website;
            const Icon = config.icon;
            return (
              <motion.a
                key={link.id}
                href={isEditing ? '#' : link.href}
                target={link.id !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.03 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  padding: '1.75rem',
                  background: c.cardBg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 20,
                  textDecoration: 'none',
                  color: c.text,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = config.color + '60';
                  e.currentTarget.style.boxShadow = `0 8px 28px ${config.color}15`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon with platform color */}
                <div style={{ width: 48, height: 48, borderRadius: 14, background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: config.color, flexShrink: 0 }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: c.text, marginBottom: 3 }}>{config.label}</div>
                  <div style={{ fontSize: '0.8rem', color: c.textMuted, marginBottom: 4, wordBreak: 'break-all' }}>{link.username}</div>
                  <div style={{ fontSize: '0.75rem', color: c.textSubtle }}>{config.desc}</div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
