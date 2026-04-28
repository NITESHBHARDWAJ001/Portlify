import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiTwitter, FiGlobe, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../../themes';

export default function ContactSplit({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;

  const contactItems = [
    content.email && { icon: <FiMail />, label: 'Email', value: content.email, href: `mailto:${content.email}` },
    content.phone && { icon: <FiPhone />, label: 'Phone', value: content.phone, href: `tel:${content.phone}` },
    content.location && { icon: <FiMapPin />, label: 'Location', value: content.location, href: null },
    content.website && { icon: <FiGlobe />, label: 'Website', value: content.website, href: content.website },
  ].filter(Boolean);

  const socialItems = [
    content.github && { icon: <FiGithub size={18} />, label: 'GitHub', href: `https://github.com/${content.github}` },
    content.linkedin && { icon: <FiLinkedin size={18} />, label: 'LinkedIn', href: content.linkedin },
    content.twitter && { icon: <FiTwitter size={18} />, label: 'Twitter', href: content.twitter },
  ].filter(Boolean);

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        {/* Left: Info panel */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 100, background: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 600, marginBottom: '1.5rem', border: `1px solid ${c.primary}30` }}>
            Contact
          </span>
          <h2 style={{ fontFamily: theme.fontHeading, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: c.text, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1rem' }}>
            {content.title || "Let's Work Together"}
          </h2>
          <p style={{ fontSize: '0.95rem', color: c.textMuted, lineHeight: 1.8, marginBottom: '2.5rem' }}>
            {content.description || "Have a project in mind or just want to chat? I'm always open to new opportunities and interesting conversations."}
          </p>

          {/* Contact items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            {contactItems.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c.primary}15`, border: `1px solid ${c.primary}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.primary, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: c.textSubtle, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                  {item.href ? (
                    <a href={isEditing ? '#' : item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ fontSize: '0.9rem', color: c.text, textDecoration: 'none', fontWeight: 600, transition: 'color 0.15s' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = c.primary; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = c.text; }}
                    >{item.value}</a>
                  ) : (
                    <span style={{ fontSize: '0.9rem', color: c.text, fontWeight: 600 }}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Socials */}
          {socialItems.length > 0 && (
            <div style={{ display: 'flex', gap: 10 }}>
              {socialItems.map((s) => (
                <a key={s.label} href={isEditing ? '#' : s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width: 42, height: 42, borderRadius: 12, border: `1px solid ${c.border}`, background: c.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted, textDecoration: 'none', transition: 'all 0.15s' }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = `${c.primary}50`; e.currentTarget.style.color = c.primary; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textMuted; }}
                >{s.icon}</a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right: CTA card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: c.gradient,
            borderRadius: 28,
            padding: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -30, right: -30, width: 150, height: 150, background: 'rgba(255,255,255,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, background: 'rgba(0,0,0,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>✉️</div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', fontFamily: theme.fontHeading, marginBottom: '0.75rem', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              Ready to start?
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Send me a message and I'll get back to you within 24 hours.
            </p>

            <a
              href={isEditing ? '#' : (content.email ? `mailto:${content.email}` : '#')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 14, background: '#fff', color: c.primary, textDecoration: 'none', fontWeight: 800, fontSize: '0.95rem', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', transition: 'transform 0.15s' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = ''; }}
            >
              Send a Message <FiArrowRight />
            </a>

            {content.availability && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: '1.25rem', marginBottom: 0 }}>
                📅 {content.availability}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
