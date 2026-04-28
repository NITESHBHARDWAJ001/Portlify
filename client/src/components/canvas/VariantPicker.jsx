import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { blockMeta } from '../../utils/componentRegistry';
import { useCanvasStore } from '../../store/canvasStore';
import { getTheme } from '../../themes';

// ─── Mini CSS Thumbnails ────────────────────────────────────────────────────

function HeroCenteredThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 10, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.primary }} />
      <div style={{ width: '55%', height: 7, background: c.text, borderRadius: 4, opacity: 0.85 }} />
      <div style={{ width: '38%', height: 5, background: c.textMuted, borderRadius: 4, opacity: 0.5 }} />
      <div style={{ display: 'flex', gap: 4 }}>
        <div style={{ width: 36, height: 9, borderRadius: 4, background: c.primary }} />
        <div style={{ width: 32, height: 9, borderRadius: 4, border: `1px solid ${c.border}` }} />
      </div>
    </div>
  );
}

function HeroSplitThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 10, height: 80, display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ width: '85%', height: 7, background: c.text, borderRadius: 3, opacity: 0.85 }} />
        <div style={{ width: '60%', height: 5, background: c.textMuted, borderRadius: 3, opacity: 0.55 }} />
        <div style={{ width: '90%', height: 4, background: c.textMuted, borderRadius: 3, opacity: 0.3 }} />
        <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
          <div style={{ width: 28, height: 9, borderRadius: 3, background: c.primary }} />
          <div style={{ width: 24, height: 9, borderRadius: 3, border: `1px solid ${c.border}` }} />
        </div>
      </div>
      <div style={{ width: 48, height: 48, borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', background: c.gradient, flexShrink: 0 }} />
    </div>
  );
}

function HeroTerminalThumb() {
  return (
    <div style={{ background: '#0d1117', borderRadius: 8, padding: 8, height: 80 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#febc2e' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
      </div>
      <div style={{ width: '70%', height: 4, background: '#3fb950', borderRadius: 3, marginBottom: 5 }} />
      <div style={{ width: '50%', height: 4, background: '#79c0ff', borderRadius: 3, marginBottom: 5 }} />
      <div style={{ width: '62%', height: 4, background: '#ffa657', borderRadius: 3, marginBottom: 5 }} />
      <div style={{ width: '40%', height: 4, background: '#8b949e', borderRadius: 3 }} />
    </div>
  );
}

function HeroMinimalThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 10, height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: '88%', height: 16, background: c.text, borderRadius: 4, marginBottom: 7, opacity: 0.9 }} />
      <div style={{ width: '45%', height: 6, background: c.textMuted, borderRadius: 4, opacity: 0.5 }} />
    </div>
  );
}

function ProjectsGridThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 8, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
          <div style={{ height: 28, background: `${c.primary}30` }} />
          <div style={{ padding: '4px 5px' }}>
            <div style={{ height: 4, background: c.text, borderRadius: 2, opacity: 0.6, marginBottom: 3 }} />
            <div style={{ height: 3, background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsFeaturedThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 8, height: 80, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 5 }}>
      <div style={{ background: c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, padding: '6px 8px' }}>
        <div style={{ width: 34, height: 5, background: c.gradient.startsWith('linear') ? c.primary : c.primary, borderRadius: 3, marginBottom: 5, opacity: 0.9 }} />
        <div style={{ width: '80%', height: 7, background: c.text, borderRadius: 3, marginBottom: 3, opacity: 0.8 }} />
        <div style={{ width: '60%', height: 4, background: c.textMuted, borderRadius: 3, opacity: 0.4 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ flex: 1, background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}` }} />
        <div style={{ flex: 1, background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}` }} />
      </div>
    </div>
  );
}

function SkillsTagsThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 10, height: 80 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {['React', 'Node', 'TS', 'CSS', 'SQL', 'Git'].map((t) => (
          <span key={t} style={{ padding: '3px 8px', borderRadius: 100, background: c.cardBg, border: `1px solid ${c.border}`, fontSize: 9, color: c.textMuted, fontWeight: 600 }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillsBarsThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '10px 10px', height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      {[90, 75, 85, 65].map((w, i) => (
        <div key={i} style={{ height: 5, background: `${c.primary}18`, borderRadius: 100, overflow: 'hidden' }}>
          <div style={{ width: `${w}%`, height: '100%', background: c.gradient, borderRadius: 100 }} />
        </div>
      ))}
    </div>
  );
}

// ─── About thumbnails ────────────────────────────────────────────────────────

function AboutBioThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 8, height: 80, display: 'flex', gap: 7 }}>
      <div style={{ width: 36, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.gradient }} />
        <div style={{ height: 4, background: c.primary, borderRadius: 10 }} />
        <div style={{ height: 3, background: `${c.textMuted}60`, borderRadius: 3 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 2 }}>
        <div style={{ height: 7, width: '70%', background: c.text, borderRadius: 3, opacity: 0.8 }} />
        <div style={{ height: 4, width: '100%', background: c.textMuted, borderRadius: 3, opacity: 0.35 }} />
        <div style={{ height: 4, width: '85%', background: c.textMuted, borderRadius: 3, opacity: 0.35 }} />
        <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 12, height: 12, borderRadius: 4, background: `${c.primary}30`, border: `1px solid ${c.border}` }} />)}
        </div>
      </div>
    </div>
  );
}

function AboutSplitThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, height: 80, display: 'flex', overflow: 'hidden' }}>
      <div style={{ width: '42%', background: c.gradient, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 60%, ${c.bg})` }} />
      </div>
      <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ height: 7, width: '75%', background: c.text, borderRadius: 3, opacity: 0.8 }} />
        <div style={{ height: 4, width: '55%', background: c.primary, borderRadius: 3, opacity: 0.7 }} />
        <div style={{ height: 3, width: '90%', background: c.textMuted, borderRadius: 3, opacity: 0.35 }} />
        <div style={{ display: 'flex', gap: 3, marginTop: 3 }}>
          {['TS', 'Go', 'SQL'].map((t) => <div key={t} style={{ padding: '2px 5px', borderRadius: 4, background: `${c.primary}20`, border: `1px solid ${c.border}`, height: 10 }} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials thumbnails ──────────────────────────────────────────────────

function TestimonialsCardsThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 8, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ background: c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, padding: '5px 6px' }}>
          <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
            {[0, 1, 2, 3, 4].map((s) => <div key={s} style={{ width: 6, height: 6, background: '#f59e0b', borderRadius: 1 }} />)}
          </div>
          <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.4, marginBottom: 2 }} />
          <div style={{ height: 3, width: '80%', background: c.textMuted, borderRadius: 2, opacity: 0.3 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: c.gradient }} />
            <div style={{ height: 4, width: '55%', background: c.text, borderRadius: 2, opacity: 0.5 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TestimonialsWallThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
      {[0, 1, 2].map((col) => (
        <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: col === 1 ? 8 : 0 }}>
          <div style={{ background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}`, height: col === 1 ? 28 : 24, padding: '3px 4px' }}>
            <div style={{ height: 3, background: c.textMuted, borderRadius: 2, opacity: 0.4, marginBottom: 2 }} />
            <div style={{ height: 3, width: '80%', background: c.textMuted, borderRadius: 2, opacity: 0.3 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Services thumbnails ──────────────────────────────────────────────────────

function ServicesCardsThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 8, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ background: c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, padding: '6px 7px' }}>
          <div style={{ width: 16, height: 16, borderRadius: 5, background: `${c.primary}25`, border: `1px solid ${c.border}`, marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c.primary, opacity: 0.7 }} />
          </div>
          <div style={{ height: 5, width: '75%', background: c.text, borderRadius: 2, opacity: 0.7, marginBottom: 3 }} />
          <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
        </div>
      ))}
    </div>
  );
}

function ServicesListThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '6px 8px', height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 6, borderBottom: i < 2 ? `1px solid ${c.border}` : 'none' }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: `${c.primary}20`, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ height: 5, width: '60%', background: c.text, borderRadius: 2, opacity: 0.7, marginBottom: 2 }} />
            <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.3 }} />
          </div>
          <div style={{ height: 7, width: 24, borderRadius: 4, border: `1px solid ${c.border}` }} />
        </div>
      ))}
    </div>
  );
}

// ─── Stats thumbnails ─────────────────────────────────────────────────────────

function StatsCounterThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 8, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ background: c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, padding: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ height: 16, width: '60%', background: c.gradient, borderRadius: 4, marginBottom: 5, opacity: 0.85 }} />
          <div style={{ height: 4, width: '70%', background: c.textMuted, borderRadius: 2, opacity: 0.4 }} />
        </div>
      ))}
    </div>
  );
}

function StatsGridThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
      {['🚀', '⭐', '🎯'].map((icon, i) => (
        <div key={i} style={{ background: c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
          <div style={{ fontSize: 10 }}>{icon}</div>
          <div style={{ height: 8, width: '70%', background: c.gradient, borderRadius: 2, opacity: 0.8 }} />
          <div style={{ height: 3, width: '85%', background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
        </div>
      ))}
    </div>
  );
}

// ─── CTA thumbnails ───────────────────────────────────────────────────────────

function CTACenteredThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 10, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <div style={{ padding: '2px 12px', borderRadius: 100, background: `${c.primary}20`, border: `1px solid ${c.border}` }}>
        <div style={{ height: 4, width: 40, background: c.primary, borderRadius: 2, opacity: 0.7 }} />
      </div>
      <div style={{ height: 10, width: '65%', background: c.text, borderRadius: 4, opacity: 0.85 }} />
      <div style={{ display: 'flex', gap: 5 }}>
        <div style={{ width: 44, height: 10, borderRadius: 5, background: c.gradient }} />
        <div style={{ width: 36, height: 10, borderRadius: 5, border: `1px solid ${c.border}` }} />
      </div>
    </div>
  );
}

function CTABannerThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, height: 80, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ background: c.gradient, width: '100%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}>
        <div>
          <div style={{ height: 8, width: 80, background: 'rgba(255,255,255,0.9)', borderRadius: 3, marginBottom: 4 }} />
          <div style={{ height: 4, width: 55, background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
        </div>
        <div style={{ padding: '4px 14px', borderRadius: 6, background: '#fff' }}>
          <div style={{ height: 6, width: 32, background: c.primary, borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Timeline thumbnail ────────────────────────────────────────────────────────

function TimelineVerticalThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '8px 10px 8px 22px', height: 80, position: 'relative' }}>
      <div style={{ position: 'absolute', left: 15, top: 12, bottom: 12, width: 2, background: `${c.primary}40`, borderRadius: 1 }} />
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 7, position: 'relative' }}>
          <div style={{ position: 'absolute', left: -11, top: 2, width: 10, height: 10, borderRadius: '50%', background: i === 0 ? c.primary : c.cardBg, border: `2px solid ${c.primary}`, flexShrink: 0 }} />
          <div>
            <div style={{ height: 5, width: 70, background: c.text, borderRadius: 2, opacity: 0.7, marginBottom: 2 }} />
            <div style={{ height: 3, width: 50, background: c.textMuted, borderRadius: 2, opacity: 0.4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── New Hero thumbnails ───────────────────────────────────────────────────────

function HeroGradientThumb({ c }) {
  return (
    <div style={{ background: c.gradient, borderRadius: 8, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, right: -20, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
      <div style={{ width: '55%', height: 7, background: 'rgba(255,255,255,0.85)', borderRadius: 4 }} />
      <div style={{ display: 'flex', gap: 4 }}>
        <div style={{ width: 36, height: 9, borderRadius: 4, background: '#fff' }} />
        <div style={{ width: 30, height: 9, borderRadius: 4, background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }} />
      </div>
    </div>
  );
}

function HeroGlassThumb({ c }) {
  return (
    <div style={{ background: `${c.bg}dd`, borderRadius: 8, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -20, left: -20, width: 60, height: 60, borderRadius: '50%', background: `${c.primary}40` }} />
      <div style={{ position: 'absolute', bottom: -15, right: -15, width: 50, height: 50, borderRadius: '50%', background: `${c.accent || c.primary}30` }} />
      <div style={{ background: `${c.surface}bb`, border: `1px solid ${c.border}`, borderRadius: 10, padding: '8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 1 }}>
        <div style={{ width: 18, height: 18, borderRadius: '50%', background: c.gradient }} />
        <div style={{ width: 55, height: 6, background: c.text, borderRadius: 3, opacity: 0.8 }} />
        <div style={{ width: 40, height: 4, background: c.textMuted, borderRadius: 3, opacity: 0.5 }} />
      </div>
    </div>
  );
}

function HeroBoldThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, height: 80, display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
      <div style={{ width: 4, background: c.gradient, flexShrink: 0 }} />
      <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
        <div style={{ height: 14, width: '85%', background: c.text, borderRadius: 3, opacity: 0.9 }} />
        <div style={{ height: 14, width: '60%', background: c.gradient, borderRadius: 3, opacity: 0.85 }} />
        <div style={{ height: 4, width: '50%', background: c.textMuted, borderRadius: 3, opacity: 0.4, marginTop: 2 }} />
        <div style={{ width: 44, height: 9, borderRadius: 4, background: c.primary, marginTop: 3 }} />
      </div>
    </div>
  );
}

// ─── New Projects thumbnails ────────────────────────────────────────────────────

function ProjectsBentoThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 4 }}>
      <div style={{ background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}`, gridRow: 'span 1', gridColumn: 'span 1', padding: '4px 5px' }}>
        <div style={{ height: 4, width: '80%', background: c.gradient, borderRadius: 2, opacity: 0.8, marginBottom: 3 }} />
        <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
      </div>
      <div style={{ background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}`, gridRow: 'span 2' }} />
      <div style={{ background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}` }} />
      <div style={{ background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}` }} />
      <div style={{ background: c.cardBg, borderRadius: 5, border: `1px solid ${c.border}`, gridColumn: 'span 1' }} />
    </div>
  );
}

function ProjectsListThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '6px 8px', height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, paddingBottom: 5, borderBottom: i < 2 ? `1px solid ${c.border}` : 'none' }}>
          <div style={{ fontSize: 10, color: `${c.primary}50`, fontWeight: 900, width: 16 }}>0{i + 1}</div>
          <div style={{ flex: 1, height: 5, background: c.text, borderRadius: 2, opacity: 0.7 }} />
          <div style={{ display: 'flex', gap: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: `${c.primary}20` }} />
            <div style={{ width: 10, height: 10, borderRadius: 3, background: `${c.primary}20` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── New Skills thumbnails ─────────────────────────────────────────────────────

function SkillsIconsThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
      {['⚛️', '🟢', '🐳', '☁️', '🔷', '🍃', '⬡', '📦'].map((icon, i) => (
        <div key={i} style={{ background: c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, fontSize: 11 }}>
          {icon}
        </div>
      ))}
    </div>
  );
}

function SkillsRadarThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '7px 8px', height: 80, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {[88, 72, 95, 65].map((w, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: `${c.primary}20`, flexShrink: 0 }} />
          <div style={{ flex: 1, height: 5, background: `${c.primary}15`, borderRadius: 100, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${w}%`, background: c.gradient, borderRadius: 100 }} />
          </div>
          <div style={{ fontSize: 8, color: c.primary, fontWeight: 700, width: 20, textAlign: 'right' }}>{w}%</div>
        </div>
      ))}
    </div>
  );
}

// ─── New About thumbnails ──────────────────────────────────────────────────────

function AboutCardThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'flex', gap: 6 }}>
      <div style={{ width: 36, borderRadius: 8, background: c.gradient, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, height: 12, background: 'rgba(0,0,0,0.4)', borderRadius: 4 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 2 }}>
        <div style={{ height: 6, width: '70%', background: c.text, borderRadius: 3, opacity: 0.85 }} />
        <div style={{ height: 3, width: '50%', background: c.primary, borderRadius: 3, opacity: 0.7 }} />
        <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 3, opacity: 0.35 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, marginTop: 2 }}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={{ height: 10, background: c.cardBg, borderRadius: 4, border: `1px solid ${c.border}` }} />)}
        </div>
      </div>
    </div>
  );
}

function AboutColumnsThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ background: i === 2 ? `${c.primary}10` : c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, padding: '5px 5px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ height: 4, width: '75%', background: i === 2 ? c.primary : c.text, borderRadius: 2, opacity: 0.8 }} />
          <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
          <div style={{ height: 3, width: '85%', background: c.textMuted, borderRadius: 2, opacity: 0.25 }} />
        </div>
      ))}
    </div>
  );
}

// ─── New Timeline thumbnails ────────────────────────────────────────────────────

function TimelineCompactThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '7px 8px', height: 80, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 14px 1fr', gap: 5, alignItems: 'center' }}>
          <div style={{ height: 4, background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === 0 ? c.primary : `${c.primary}30`, border: `1.5px solid ${c.primary}`, flexShrink: 0 }} />
          <div style={{ height: 4, background: c.text, borderRadius: 2, opacity: 0.6 }} />
        </div>
      ))}
    </div>
  );
}

function TimelineHorizontalThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '0 8px', height: 80, position: 'relative', display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: 8, right: 8, height: 2, background: `${c.primary}30`, transform: 'translateY(-50%)' }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 1, flexShrink: 0 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: i === 0 ? c.gradient : c.cardBg, border: `2px solid ${c.primary}` }} />
          <div style={{ width: 28, height: 4, background: c.text, borderRadius: 2, opacity: 0.6 }} />
        </div>
      ))}
    </div>
  );
}

// ─── New Contact thumbnails ────────────────────────────────────────────────────

function ContactSplitThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, height: 80, display: 'flex', overflow: 'hidden' }}>
      <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: `${c.primary}25` }} />
            <div style={{ height: 3, flex: 1, background: c.textMuted, borderRadius: 2, opacity: 0.4 }} />
          </div>
        ))}
      </div>
      <div style={{ width: '42%', background: c.gradient, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
        <div style={{ position: 'absolute', bottom: -15, left: -15, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ height: 7, width: '65%', background: 'rgba(255,255,255,0.85)', borderRadius: 3 }} />
        <div style={{ width: 44, height: 9, borderRadius: 5, background: '#fff' }} />
      </div>
    </div>
  );
}

function ContactSocialThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
      {['#24292e', '#0077b5', '#1da1f2', `${c.primary}`].map((bg, i) => (
        <div key={i} style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: bg, opacity: 0.8 }} />
          <div style={{ height: 3, width: '80%', background: c.textMuted, borderRadius: 2, opacity: 0.4 }} />
        </div>
      ))}
    </div>
  );
}

// ─── New CTA thumbnails ────────────────────────────────────────────────────────

function CTACardThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 8, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: c.cardBg, border: `1px solid ${c.border}`, borderRadius: 12, padding: '8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, boxShadow: `0 8px 24px ${c.primary}15` }}>
        <div style={{ fontSize: 14 }}>🚀</div>
        <div style={{ height: 7, width: 65, background: c.text, borderRadius: 3, opacity: 0.85 }} />
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 38, height: 9, borderRadius: 5, background: c.gradient }} />
          <div style={{ width: 28, height: 9, borderRadius: 5, border: `1px solid ${c.border}` }} />
        </div>
      </div>
    </div>
  );
}

function CTASplitThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, height: 80, overflow: 'hidden', display: 'flex' }}>
      <div style={{ width: '48%', background: c.gradient, padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <div style={{ height: 7, width: '90%', background: 'rgba(255,255,255,0.85)', borderRadius: 3 }} />
        <div style={{ height: 4, width: '70%', background: 'rgba(255,255,255,0.5)', borderRadius: 3 }} />
        <div style={{ width: 38, height: 9, borderRadius: 5, background: '#fff', marginTop: 2 }} />
      </div>
      <div style={{ flex: 1, background: c.cardBg, padding: '8px', display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: `${c.primary}40` }} />
            <div style={{ flex: 1, height: 3, background: c.textMuted, borderRadius: 2, opacity: 0.4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── New Services thumbnail ────────────────────────────────────────────────────

function ServicesPricingThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5, alignItems: 'end' }}>
      {[false, true, false].map((highlight, i) => (
        <div key={i} style={{ background: highlight ? c.cardBg : c.surface, borderRadius: 7, border: `1.5px solid ${highlight ? c.primary : c.border}`, padding: '5px', transform: highlight ? 'translateY(-5px)' : 'none', height: highlight ? 70 : 60, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {highlight && <div style={{ height: 3, background: c.gradient, borderRadius: 2 }} />}
          <div style={{ height: 9, width: '70%', background: c.gradient, borderRadius: 2, opacity: 0.85 }} />
          <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.35 }} />
          <div style={{ height: 3, width: '85%', background: c.textMuted, borderRadius: 2, opacity: 0.25 }} />
        </div>
      ))}
    </div>
  );
}

// ─── New Testimonials thumbnail ────────────────────────────────────────────────

function TestimonialsMarqueeThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: '6px 5px', height: 80, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 5 }}>
      {[0, 1].map((row) => (
        <div key={row} style={{ display: 'flex', gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ minWidth: 70, background: c.cardBg, borderRadius: 6, border: `1px solid ${c.border}`, padding: '4px 5px', flexShrink: 0 }}>
              <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.35, marginBottom: 3 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.gradient, flexShrink: 0 }} />
                <div style={{ height: 3, flex: 1, background: c.text, borderRadius: 2, opacity: 0.5 }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── New Stats thumbnail ────────────────────────────────────────────────────────

function StatsMilestonesThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 7, height: 80, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ background: c.cardBg, borderRadius: 7, border: `1px solid ${c.border}`, padding: '5px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: c.gradient, opacity: 0.7 }} />
          <div style={{ position: 'absolute', top: 2, right: 4, fontSize: 11, fontWeight: 900, color: `${c.primary}18` }}>0{i + 1}</div>
          <div style={{ height: 9, width: '80%', background: c.gradient, borderRadius: 2, opacity: 0.85, marginTop: 4 }} />
          <div style={{ height: 3, width: '100%', background: c.textMuted, borderRadius: 2, opacity: 0.35, marginTop: 4 }} />
        </div>
      ))}
    </div>
  );
}

// ─── Contact thumbnail ─────────────────────────────────────────────────────────

function ContactMinimalThumb({ c }) {
  return (
    <div style={{ background: c.bg, borderRadius: 8, padding: 10, height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
      <div style={{ height: 9, width: '55%', background: c.text, borderRadius: 3, opacity: 0.85 }} />
      <div style={{ height: 4, width: '75%', background: c.textMuted, borderRadius: 3, opacity: 0.4 }} />
      <div style={{ width: 64, height: 11, borderRadius: 6, background: c.gradient }} />
      <div style={{ display: 'flex', gap: 5, marginTop: 2 }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: `${c.primary}20`, border: `1px solid ${c.border}` }} />)}
      </div>
    </div>
  );
}

const thumbnailMap = {
  hero: {
    centered: HeroCenteredThumb,
    split: HeroSplitThumb,
    terminal: HeroTerminalThumb,
    minimal: HeroMinimalThumb,
    gradient: HeroGradientThumb,
    glass: HeroGlassThumb,
    bold: HeroBoldThumb,
  },
  projects: {
    grid: ProjectsGridThumb,
    featured: ProjectsFeaturedThumb,
    bento: ProjectsBentoThumb,
    list: ProjectsListThumb,
  },
  skills: {
    tags: SkillsTagsThumb,
    bars: SkillsBarsThumb,
    icons: SkillsIconsThumb,
    radar: SkillsRadarThumb,
  },
  about: {
    bio: AboutBioThumb,
    split: AboutSplitThumb,
    card: AboutCardThumb,
    columns: AboutColumnsThumb,
  },
  testimonials: {
    cards: TestimonialsCardsThumb,
    wall: TestimonialsWallThumb,
    marquee: TestimonialsMarqueeThumb,
  },
  services: {
    cards: ServicesCardsThumb,
    list: ServicesListThumb,
    pricing: ServicesPricingThumb,
  },
  stats: {
    counter: StatsCounterThumb,
    grid: StatsGridThumb,
    milestones: StatsMilestonesThumb,
  },
  cta: {
    centered: CTACenteredThumb,
    banner: CTABannerThumb,
    card: CTACardThumb,
    split: CTASplitThumb,
  },
  timeline: {
    vertical: TimelineVerticalThumb,
    compact: TimelineCompactThumb,
    horizontal: TimelineHorizontalThumb,
  },
  contact: {
    minimal: ContactMinimalThumb,
    split: ContactSplitThumb,
    social: ContactSocialThumb,
  },
};

function VariantThumbnail({ type, variantId, theme }) {
  const Component = thumbnailMap[type]?.[variantId];
  if (Component) return <Component c={theme.colors} />;
  return (
    <div style={{ background: theme.colors.bg, borderRadius: 8, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 24, opacity: 0.4 }}>📦</span>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function VariantPicker({ type, onSelect, onClose }) {
  const { activeTheme } = useCanvasStore();
  const theme = getTheme(activeTheme);
  const meta = blockMeta[type];

  if (!meta) return null;

  const cols = meta.variants.length <= 2 ? '1fr 1fr' : 'repeat(auto-fill, minmax(210px, 1fr))';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        style={{
          background: '#13131f',
          borderRadius: 20,
          padding: '2rem',
          width: 540,
          maxWidth: '92vw',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
          <div>
            <p style={{ color: theme.colors.primary, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              {meta.icon} {meta.name}
            </p>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem', margin: 0 }}>
              Choose a layout
            </h2>
            <p style={{ color: '#666', fontSize: 13, marginTop: 4 }}>{meta.description}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.08)',
              color: '#aaa',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Variants grid */}
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '0.875rem' }}>
          {meta.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => { onSelect(variant.id); onClose(); }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '2px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'pointer',
                textAlign: 'left',
                padding: 0,
                transition: 'border-color 0.18s, transform 0.15s, background 0.18s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = theme.colors.primary;
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.transform = '';
              }}
            >
              {/* Thumbnail */}
              <div style={{ padding: '8px 8px 0' }}>
                <VariantThumbnail type={type} variantId={variant.id} theme={theme} />
              </div>
              {/* Label */}
              <div style={{ padding: '10px 14px 12px' }}>
                <div style={{ color: '#f0f0f0', fontWeight: 700, fontSize: 13 }}>
                  {variant.name}
                </div>
                <div style={{ color: '#666', fontSize: 11, marginTop: 2 }}>
                  {variant.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
