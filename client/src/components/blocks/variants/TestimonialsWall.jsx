import { motion } from 'framer-motion';
import { useTheme } from '../../../themes';

const DEFAULT_TESTIMONIALS = [
  { id: 1, name: 'Alex Kim', role: 'Founder', company: 'StartupXYZ', rating: 5, text: 'Exceptional work! The attention to detail was incredible and delivery was ahead of schedule.' },
  { id: 2, name: 'Jordan Lee', role: 'Engineering Manager', company: 'BigCorp', rating: 5, text: "One of the best developers I've ever worked with. Clean code, great communication." },
  { id: 3, name: 'Priya Patel', role: 'Designer', company: 'Design Co', rating: 5, text: 'Brought our designs to life perfectly. Would hire again in a heartbeat!' },
  { id: 4, name: 'Tyler Brown', role: 'CTO', company: 'Scale Labs', rating: 5, text: 'Delivered ahead of schedule and exceeded all quality expectations.' },
  { id: 5, name: 'Maria Santos', role: 'Product Lead', company: 'FinTech Inc', rating: 5, text: 'A rockstar developer who truly understands the product vision and executes flawlessly.' },
  { id: 6, name: 'Sam Wilson', role: 'Director', company: 'Creative Agency', rating: 5, text: 'Built our entire design system from scratch. The consistency and quality is remarkable.' },
];

function Card({ t, delay = 0 }) {
  const { colors: c } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 14, padding: '1.25rem', marginBottom: '1rem', breakInside: 'avoid' }}
    >
      <p style={{ color: c.text, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem', opacity: 0.85, fontStyle: 'italic' }}>"{t.text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${c.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.primary, fontWeight: 700, fontSize: 13, flexShrink: 0, overflow: 'hidden' }}>
          {t.avatar ? <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : t.name?.charAt(0)}
        </div>
        <div>
          <div style={{ color: c.text, fontWeight: 700, fontSize: 12 }}>{t.name}</div>
          <div style={{ color: c.textMuted, fontSize: 11 }}>{t.role}{t.company ? ` · ${t.company}` : ''}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsWall({ content = {} }) {
  const { colors: c } = useTheme();
  const {
    title = 'Testimonials',
    subtitle = 'What my clients and colleagues say',
    testimonials = DEFAULT_TESTIMONIALS,
  } = content;

  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section style={{ background: c.bg, padding: '5rem 2rem', fontFamily: 'var(--theme-font-body)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'var(--theme-font-heading)', color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>{title}</h2>
          {subtitle && <p style={{ color: c.textMuted, fontSize: '1rem' }}>{subtitle}</p>}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'start' }}>
          <div>{col1.map((t, i) => <Card key={t.id || i} t={t} delay={i * 0.08} />)}</div>
          <div style={{ marginTop: '2rem' }}>{col2.map((t, i) => <Card key={t.id || i} t={t} delay={0.1 + i * 0.08} />)}</div>
          <div>{col3.map((t, i) => <Card key={t.id || i} t={t} delay={0.05 + i * 0.08} />)}</div>
        </div>
      </div>
    </section>
  );
}
