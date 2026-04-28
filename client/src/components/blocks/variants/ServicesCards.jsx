import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

const DEFAULT_SERVICES = [
  { id: 1, icon: '🌐', title: 'Web Development', description: 'Full-stack web applications built with modern frameworks and best practices for performance and maintainability.', tags: ['React', 'Node.js', 'TypeScript'] },
  { id: 2, icon: '📱', title: 'Mobile Apps', description: 'Cross-platform mobile apps with React Native that feel native on iOS and Android.', tags: ['React Native', 'Expo'] },
  { id: 3, icon: '🎨', title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces designed with user experience at the forefront using modern design tools.', tags: ['Figma', 'Design Systems'] },
  { id: 4, icon: '⚡', title: 'Performance Optimization', description: 'Speed up your existing apps with profiling, caching, and code optimization techniques.', tags: ['Core Web Vitals', 'CDN'] },
  { id: 5, icon: '☁️', title: 'Cloud Architecture', description: 'Scalable cloud infrastructure on AWS, GCP, or Azure with DevOps best practices.', tags: ['AWS', 'Docker', 'CI/CD'] },
  { id: 6, icon: '🔒', title: 'Security Audits', description: 'Comprehensive security reviews to keep your application and users safe from vulnerabilities.', tags: ['OWASP', 'Auth', 'Encryption'] },
];

export default function ServicesCards({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'What I Do',
    subtitle = 'Services & expertise I offer',
    services = DEFAULT_SERVICES,
  } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>{title}</h2>
          <p style={{ color: c.textMuted, fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>{subtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {services.map((s, i) => (
            <motion.div
              key={s.id || i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 16, padding: '1.75rem', transition: 'border-color 0.2s' }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = `${c.primary}60`)}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = c.border)}
            >
              <div style={{ fontSize: 36, marginBottom: '1rem' }}>{s.icon}</div>
              <h3 style={{ color: c.text, fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.625rem', fontFamily: 'var(--theme-font-heading)' }}>{s.title}</h3>
              <p style={{ color: c.textMuted, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{s.description}</p>
              {s.tags && s.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.tags.map((tag) => (
                    <span key={tag} style={{ padding: '3px 10px', borderRadius: 100, background: `${c.primary}15`, border: `1px solid ${c.primary}30`, color: c.primary, fontSize: 11, fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
