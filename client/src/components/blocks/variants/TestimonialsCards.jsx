import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

function StarRating({ count, color }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: '0.875rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < count ? color : 'none'} stroke={i < count ? color : '#555'} strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

const DEFAULT_TESTIMONIALS = [
  { id: 1, name: 'Sarah Chen', role: 'CTO', company: 'TechFlow', rating: 5, text: 'An exceptional developer who consistently delivers elegant solutions. The attention to detail and code quality is outstanding.' },
  { id: 2, name: 'Marcus Williams', role: 'Product Manager', company: 'InnovateCo', rating: 5, text: 'Incredibly reliable and communicative. Transformed our complex requirements into a beautiful, functional product on time.' },
  { id: 3, name: 'Elena Rodriguez', role: 'Lead Designer', company: 'CreativeHub', rating: 5, text: "A perfect blend of technical expertise and design sensibility. Couldn't have built this product without their help." },
];

export default function TestimonialsCards({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'What People Say',
    subtitle = 'Kind words from colleagues and clients',
    testimonials = DEFAULT_TESTIMONIALS,
  } = content;

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>{title}</h2>
          <p style={{ color: c.textMuted, fontSize: '1rem', maxWidth: 500, margin: '0 auto' }}>{subtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id || i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 16, padding: '1.75rem', display: 'flex', flexDirection: 'column' }}
            >
              <StarRating count={t.rating || 5} color={c.primary} />

              <p style={{ color: c.text, fontSize: '0.95rem', lineHeight: 1.75, flex: 1, marginBottom: '1.5rem', fontStyle: 'italic', opacity: 0.85 }}>
                "{t.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: `${c.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.primary, fontWeight: 800, fontSize: 16, flexShrink: 0, overflow: 'hidden' }}>
                  {t.avatar
                    ? <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : t.name?.charAt(0)
                  }
                </div>
                <div>
                  <div style={{ color: c.text, fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: c.textMuted, fontSize: 12 }}>{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
