import { useRef, useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useTheme } from '../../../themes';

const defaultTestimonials = [
  { name: 'Sarah Chen', role: 'CEO, TechStart', text: 'Exceptional work quality and communication. Delivered beyond expectations.', avatar: '', rating: 5 },
  { name: 'Marcus Rivera', role: 'Product Lead, Nova', text: 'Incredibly talented. The UI they built is both beautiful and performant.', avatar: '', rating: 5 },
  { name: 'Priya Nair', role: 'Founder, Bloom', text: 'A pleasure to work with — reliable, creative, and always on time.', avatar: '', rating: 5 },
  { name: 'James Okafor', role: 'CTO, BuildIt', text: 'Top-notch technical skills. Our app is running flawlessly after launch.', avatar: '', rating: 5 },
  { name: 'Luna Park', role: 'Designer, Studio Co', text: 'So good at turning design mocks into pixel-perfect React components.', avatar: '', rating: 5 },
  { name: 'Ethan Cole', role: 'Head of Eng, Rapid', text: 'Clean code, great tests, excellent documentation. Will hire again!', avatar: '', rating: 5 },
];

function TestimonialCard({ item, c, theme }) {
  const initials = item.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '??';
  return (
    <div
      style={{
        minWidth: 300,
        maxWidth: 300,
        background: c.cardBg,
        border: `1px solid ${c.border}`,
        borderRadius: 18,
        padding: '1.5rem',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: item.rating || 5 }).map((_, i) => (
          <FiStar key={i} size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
        ))}
      </div>
      {/* Quote */}
      <p style={{ color: c.text, fontSize: '0.875rem', lineHeight: 1.65, flex: 1 }}>"{item.text}"</p>
      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {item.avatar ? (
          <img src={item.avatar} alt={item.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: c.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: theme.fontHeading, fontWeight: 800, color: c.primaryFg, fontSize: 13 }}>
            {initials}
          </div>
        )}
        <div>
          <p style={{ fontFamily: theme.fontHeading, fontWeight: 700, color: c.text, fontSize: '0.875rem', margin: 0 }}>{item.name}</p>
          <p style={{ color: c.textMuted, fontSize: 12, margin: 0 }}>{item.role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction, c, theme }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div
        style={{
          display: 'flex',
          gap: 20,
          width: 'max-content',
          animation: `marquee-${direction} 40s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={i} item={item} c={c} theme={theme} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function TestimonialsMarquee({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const items = content.testimonials || defaultTestimonials;

  const half = Math.ceil(items.length / 2);
  const row1 = items.slice(0, half);
  const row2 = items.slice(half);

  return (
    <section style={{ backgroundColor: c.bg, padding: '5rem 0', fontFamily: theme.fontBody, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 2rem', marginBottom: '3rem' }}>
        <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: 100, background: `${c.primary}18`, color: c.primary, fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
          {content.badge || 'Testimonials'}
        </span>
        <h2 style={{ fontFamily: theme.fontHeading, fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', fontWeight: 800, color: c.text, letterSpacing: '-0.02em', marginBottom: 12 }}>
          {content.title || 'What Clients Say'}
        </h2>
        <p style={{ color: c.textMuted, fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
          {content.description || "Don't just take my word for it — here's what people I've worked with have to say."}
        </p>
      </div>

      {/* Marquee rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {row1.length > 0 && <MarqueeRow items={row1} direction="left" c={c} theme={theme} />}
        {row2.length > 0 && <MarqueeRow items={row2} direction="right" c={c} theme={theme} />}
      </div>
    </section>
  );
}
