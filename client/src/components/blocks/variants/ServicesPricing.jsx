import { motion } from 'framer-motion';
import { FiCheck, FiZap } from 'react-icons/fi';
import { useTheme } from '../../../themes';

const defaultPlans = [
  {
    name: 'Starter',
    price: '$500',
    period: 'project',
    description: 'Perfect for small businesses and personal projects.',
    features: ['5 page website', 'Responsive design', 'Contact form', 'Basic SEO', '1 round of revisions'],
    cta: 'Get Started',
    href: '#',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$1,500',
    period: 'project',
    description: 'Full-featured solution for growing businesses.',
    features: ['Up to 15 pages', 'Custom animations', 'CMS integration', 'Advanced SEO', 'Analytics setup', '3 rounds of revisions', 'Priority support'],
    cta: 'Most Popular',
    href: '#',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote',
    description: 'Tailored solutions for large-scale needs.',
    features: ['Unlimited pages', 'Custom web app', 'API integrations', 'Performance audit', 'Dedicated support', 'SLA guarantee', 'Monthly retainer'],
    cta: "Let's Talk",
    href: '#',
    highlight: false,
  },
];

export default function ServicesPricing({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const plans = content.plans || defaultPlans;

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 2rem', fontFamily: theme.fontBody }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 100, background: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
            {content.badge || 'Pricing'}
          </span>
          <h2 style={{ fontFamily: theme.fontHeading, fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, color: c.text, letterSpacing: '-0.02em', marginBottom: 12 }}>
            {content.title || 'Simple, Transparent Pricing'}
          </h2>
          <p style={{ color: c.textMuted, fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
            {content.description || 'Choose the plan that fits your project. All plans include clean code and on-time delivery.'}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                border: plan.highlight ? `2px solid ${c.primary}` : `1px solid ${c.border}`,
                background: plan.highlight ? c.cardBg : c.surface,
                boxShadow: plan.highlight ? `0 16px 48px ${c.primary}20` : 'none',
                position: 'relative',
                transform: plan.highlight ? 'translateY(-8px)' : 'none',
              }}
            >
              {/* Gradient header for highlighted */}
              {plan.highlight && (
                <div style={{ background: c.gradient, padding: '8px 0', textAlign: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: c.primaryFg, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                    <FiZap size={12} /> Most Popular
                  </span>
                </div>
              )}

              <div style={{ padding: '2rem' }}>
                {/* Plan name */}
                <p style={{ fontFamily: theme.fontHeading, fontSize: '0.85rem', fontWeight: 700, color: c.primary, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
                  {plan.name}
                </p>

                {/* Price */}
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontFamily: theme.fontHeading, fontSize: '2.75rem', fontWeight: 800, color: c.text, letterSpacing: '-0.04em' }}>{plan.price}</span>
                  <span style={{ color: c.textMuted, fontSize: '0.8rem', marginLeft: 6 }}>/ {plan.period}</span>
                </div>

                <p style={{ color: c.textMuted, fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{plan.description}</p>

                {/* Divider */}
                <div style={{ height: 1, background: c.border, marginBottom: '1.5rem' }} />

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: `${c.primary}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiCheck size={11} style={{ color: c.primary }} />
                      </span>
                      <span style={{ color: c.textMuted, fontSize: '0.875rem' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={isEditing ? '#' : plan.href || '#'}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '13px',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    background: plan.highlight ? c.gradient : 'transparent',
                    color: plan.highlight ? c.primaryFg : c.primary,
                    border: plan.highlight ? 'none' : `1.5px solid ${c.border}`,
                    boxShadow: plan.highlight ? `0 4px 18px ${c.primary}30` : 'none',
                    transition: 'transform 0.15s, border-color 0.15s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; if (!plan.highlight) e.currentTarget.style.borderColor = c.primary; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = ''; if (!plan.highlight) e.currentTarget.style.borderColor = c.border; }}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
