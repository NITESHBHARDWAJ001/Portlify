import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { useTheme } from '../../../themes';

function TypedLine({ texts, delay = 0 }) {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const full = texts[idx % texts.length];
    const speed = deleting ? 35 : 75;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 >= full.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length <= 1) { setDeleting(false); setIdx(i => i + 1); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx, texts, started]);

  return <>{text}<span style={{ opacity: 1, animation: 'blink 1s step-end infinite' }}>█</span></>;
}

export default function HeroTerminal({ content = {}, isEditing }) {
  const theme = useTheme();
  const c = theme.colors;
  const skills = content.skills || ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker'];

  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d1117',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
      }}
    >
      <style>{`@keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }`}</style>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 780 }}
      >
        {/* Terminal Window */}
        <div style={{ background: '#161b22', borderRadius: 12, border: '1px solid #30363d', overflow: 'hidden', boxShadow: '0 30px 90px rgba(0,0,0,0.7)' }}>
          {/* Title bar */}
          <div style={{ background: '#21262d', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #30363d' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28c840' }} />
            <span style={{ marginLeft: 10, fontSize: 12, color: '#8b949e' }}>
              {(content.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')} — zsh
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '2rem 2rem 2.5rem', lineHeight: 2.1, fontSize: '0.9rem' }}>
            {/* whoami */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <span style={{ color: '#3fb950' }}>~/portfolio</span>
              <span style={{ color: '#79c0ff' }}> $ </span>
              <span style={{ color: '#e6edf3' }}>whoami</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ paddingLeft: 0, color: '#e6edf3', marginBottom: 8 }}>
              <span style={{ background: 'linear-gradient(90deg, #3fb950, #79c0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700, fontSize: '1.1rem' }}>
                {content.name || 'John Doe'}
              </span>
              {' · '}
              <span style={{ color: '#ffa657' }}>{content.title || 'Full Stack Developer'}</span>
            </motion.div>

            {/* cat about */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <span style={{ color: '#3fb950' }}>~/portfolio</span>
              <span style={{ color: '#79c0ff' }}> $ </span>
              <span style={{ color: '#e6edf3' }}>cat about.json</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} style={{ color: '#8b949e', paddingLeft: 16, marginBottom: 8 }}>
              <div>{'{'}</div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: '#79c0ff' }}>"bio"</span>
                {': '}
                <span style={{ color: '#a5d6ff' }}>"{content.description || 'Passionate about building cool things'}"</span>,
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ color: '#79c0ff' }}>"skills"</span>
                {': ['}
                {skills.map((s, i) => (
                  <span key={s}>
                    <span style={{ color: '#ffa657' }}>"{s}"</span>
                    {i < skills.length - 1 && ', '}
                  </span>
                ))}
                {']'}
              </div>
              <div>{'}'}</div>
            </motion.div>

            {/* echo currently */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
              <span style={{ color: '#3fb950' }}>~/portfolio</span>
              <span style={{ color: '#79c0ff' }}> $ </span>
              <span style={{ color: '#e6edf3' }}>echo&nbsp;</span>
              <span style={{ color: '#ffa657' }}>
                "<TypedLine texts={content.typingTexts || ['building amazing products', 'open to opportunities', 'shipping great code']} delay={2.5} />"
              </span>
            </motion.div>

            {/* links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {content.social?.github && (
                <a
                  href={isEditing ? '#' : `https://github.com/${content.social.github}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '7px 16px', borderRadius: 6, fontSize: 13, background: `${c.primary}25`, color: c.primary, textDecoration: 'none', border: `1px solid ${c.primary}40`, display: 'inline-flex', alignItems: 'center', gap: 7 }}
                >
                  <FiGithub size={14} /> github.com/{content.social.github}
                </a>
              )}
              {content.ctaPrimary?.label && (
                <a
                  href={isEditing ? '#' : content.ctaPrimary.href || '#'}
                  style={{ padding: '7px 16px', borderRadius: 6, fontSize: 13, background: '#3fb950', color: '#0d1117', textDecoration: 'none', fontWeight: 700 }}
                >
                  → {content.ctaPrimary.label}
                </a>
              )}
            </motion.div>

            {/* cursor */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} style={{ marginTop: 12 }}>
              <span style={{ color: '#3fb950' }}>~/portfolio</span>
              <span style={{ color: '#79c0ff' }}> $ </span>
              <span style={{ animation: 'blink 1s step-end infinite', color: '#e6edf3' }}>█</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
