import { useState, useEffect } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { FiX, FiEdit3, FiSliders, FiChevronDown, FiChevronRight, FiPlus, FiTrash2 } from 'react-icons/fi';

// ─── Field helpers ───────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          display: 'block',
          color: '#9ca3af',
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  background: 'rgba(255,255,255,0.06)',
  color: '#e5e7eb',
  fontSize: 13,
  outline: 'none',
  boxSizing: 'border-box',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: 72,
};

// ─── Content fields per section type ────────────────────────────────────────

function HeroContentFields({ content, onChange }) {
  return (
    <>
      <Field label="Name">
        <input style={inputStyle} value={content.name || ''} onChange={(e) => onChange('name', e.target.value)} placeholder="Your Name" />
      </Field>
      <Field label="Title / Role">
        <input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} placeholder="Full Stack Developer" />
      </Field>
      <Field label="Badge text">
        <input style={inputStyle} value={content.badge || ''} onChange={(e) => onChange('badge', e.target.value)} placeholder="Open to work" />
      </Field>
      <Field label="Description">
        <textarea style={textareaStyle} value={content.description || ''} onChange={(e) => onChange('description', e.target.value)} placeholder="Short intro bio..." />
      </Field>
      <Field label="Avatar URL">
        <input style={inputStyle} value={content.avatar || ''} onChange={(e) => onChange('avatar', e.target.value)} placeholder="https://your-photo.com/pic.jpg" />
      </Field>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
        <p style={{ color: '#555', fontSize: 11, marginBottom: 8, fontWeight: 600 }}>CTA BUTTONS</p>
      </div>
      <Field label="Primary button label">
        <input style={inputStyle} value={content.ctaPrimary?.label || ''} onChange={(e) => onChange('ctaPrimary', { ...content.ctaPrimary, label: e.target.value })} placeholder="View Projects" />
      </Field>
      <Field label="Primary button link">
        <input style={inputStyle} value={content.ctaPrimary?.href || ''} onChange={(e) => onChange('ctaPrimary', { ...content.ctaPrimary, href: e.target.value })} placeholder="#projects" />
      </Field>
      <Field label="Secondary button label">
        <input style={inputStyle} value={content.ctaSecondary?.label || ''} onChange={(e) => onChange('ctaSecondary', { ...content.ctaSecondary, label: e.target.value })} placeholder="Contact Me" />
      </Field>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
        <p style={{ color: '#555', fontSize: 11, marginBottom: 8, fontWeight: 600 }}>SOCIAL LINKS</p>
      </div>
      <Field label="GitHub username">
        <input style={inputStyle} value={content.social?.github || ''} onChange={(e) => onChange('social', { ...content.social, github: e.target.value })} placeholder="yourusername" />
      </Field>
      <Field label="LinkedIn URL">
        <input style={inputStyle} value={content.social?.linkedin || ''} onChange={(e) => onChange('social', { ...content.social, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." />
      </Field>
      <Field label="Twitter handle">
        <input style={inputStyle} value={content.social?.twitter || ''} onChange={(e) => onChange('social', { ...content.social, twitter: e.target.value })} placeholder="yourhandle" />
      </Field>
    </>
  );
}

function ProjectsContentFields({ content, onChange }) {
  const projects = content.projects || [];

  const updateProject = (index, key, value) => {
    const updated = projects.map((p, i) => (i === index ? { ...p, [key]: value } : p));
    onChange('projects', updated);
  };

  const addProject = () => {
    onChange('projects', [
      ...projects,
      { id: Date.now(), title: 'New Project', description: '', image: '', link: '', github: '', tech: [] },
    ]);
  };

  const removeProject = (index) => {
    onChange('projects', projects.filter((_, i) => i !== index));
  };

  return (
    <>
      <Field label="Section title">
        <input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} placeholder="My Projects" />
      </Field>
      <Field label="Subtitle">
        <input style={inputStyle} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} placeholder="Things I've built" />
      </Field>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
        <p style={{ color: '#555', fontSize: 11, marginBottom: 8, fontWeight: 600 }}>PROJECTS ({projects.length})</p>
      </div>

      {projects.map((project, i) => (
        <div key={project.id || i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '0.875rem', marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700 }}>Project {i + 1}</span>
            <button onClick={() => removeProject(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 11 }}>Remove</button>
          </div>
          <Field label="Title">
            <input style={inputStyle} value={project.title || ''} onChange={(e) => updateProject(i, 'title', e.target.value)} />
          </Field>
          <Field label="Description">
            <textarea style={textareaStyle} value={project.description || ''} onChange={(e) => updateProject(i, 'description', e.target.value)} />
          </Field>
          <Field label="GitHub URL">
            <input style={inputStyle} value={project.github || ''} onChange={(e) => updateProject(i, 'github', e.target.value)} />
          </Field>
          <Field label="Live URL">
            <input style={inputStyle} value={project.link || ''} onChange={(e) => updateProject(i, 'link', e.target.value)} />
          </Field>
          <Field label="Tech stack (comma-separated)">
            <input style={inputStyle} value={(project.tech || []).join(', ')} onChange={(e) => updateProject(i, 'tech', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} placeholder="React, Node.js, MongoDB" />
          </Field>
        </div>
      ))}

      <button
        onClick={addProject}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: 8,
          border: '1px dashed rgba(255,255,255,0.15)',
          background: 'transparent',
          color: '#6366f1',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        + Add project
      </button>
    </>
  );
}

function SkillsContentFields({ content, onChange }) {
  const skills = content.skills || [];

  const updateSkill = (index, key, value) => {
    const updated = skills.map((s, i) => (i === index ? { ...s, [key]: value } : s));
    onChange('skills', updated);
  };

  const addSkill = () => {
    onChange('skills', [...skills, { name: 'New Skill', level: 80, icon: '⚡', category: 'General' }]);
  };

  const removeSkill = (index) => {
    onChange('skills', skills.filter((_, i) => i !== index));
  };

  return (
    <>
      <Field label="Section title">
        <input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} placeholder="Skills & Technologies" />
      </Field>
      <Field label="Subtitle">
        <input style={inputStyle} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} placeholder="My technical expertise" />
      </Field>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
        <p style={{ color: '#555', fontSize: 11, marginBottom: 8, fontWeight: 600 }}>SKILLS ({skills.length})</p>
      </div>

      {skills.map((skill, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '0.75rem', marginBottom: '0.625rem', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            <input style={{ ...inputStyle, width: 40, textAlign: 'center', padding: '6px', flexShrink: 0 }} value={skill.icon || ''} onChange={(e) => updateSkill(i, 'icon', e.target.value)} placeholder="⚡" />
            <input style={{ ...inputStyle, flex: 1 }} value={skill.name || ''} onChange={(e) => updateSkill(i, 'name', e.target.value)} placeholder="Skill name" />
            <button onClick={() => removeSkill(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 11, flexShrink: 0 }}>✕</button>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: '#555', fontSize: 10 }}>Category</label>
              <input style={inputStyle} value={skill.category || ''} onChange={(e) => updateSkill(i, 'category', e.target.value)} placeholder="Frontend" />
            </div>
            <div style={{ width: 70 }}>
              <label style={{ color: '#555', fontSize: 10 }}>Level %</label>
              <input type="number" min="0" max="100" style={inputStyle} value={skill.level ?? 80} onChange={(e) => updateSkill(i, 'level', parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addSkill}
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: 8,
          border: '1px dashed rgba(255,255,255,0.15)',
          background: 'transparent',
          color: '#6366f1',
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        + Add skill
      </button>
    </>
  );
}

// ─── Style tab ───────────────────────────────────────────────────────────────

function StyleFields({ style, onChange }) {
  return (
    <>
      <Field label="Background color">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="color"
            value={style.backgroundColor || '#ffffff'}
            onChange={(e) => onChange('backgroundColor', e.target.value)}
            style={{ width: 40, height: 36, padding: 2, borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', background: 'transparent' }}
          />
          <input
            style={{ ...inputStyle, flex: 1 }}
            value={style.backgroundColor || ''}
            onChange={(e) => onChange('backgroundColor', e.target.value)}
            placeholder="e.g. #0f172a or transparent"
          />
        </div>
      </Field>
      <Field label="Padding">
        <input style={inputStyle} value={style.padding || ''} onChange={(e) => onChange('padding', e.target.value)} placeholder="e.g. 5rem 2rem" />
      </Field>
      <Field label="Min height">
        <input style={inputStyle} value={style.minHeight || ''} onChange={(e) => onChange('minHeight', e.target.value)} placeholder="e.g. 100vh" />
      </Field>
    </>
  );
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export default function StylePanel() {
  const {
    selectedComponent,
    selectedSection,
    updateComponent,
    updateSectionContent,
    updateSection,
    clearSelection,
  } = useCanvasStore();

  const [activeTab, setActiveTab] = useState('content');
  const [localContent, setLocalContent] = useState({});
  const [localStyle, setLocalStyle] = useState({});

  const isVariantSection = !!selectedSection?.variant;

  useEffect(() => {
    if (selectedSection) {
      setLocalContent(selectedSection.content || {});
      setLocalStyle(selectedSection.style || {});
    } else if (selectedComponent) {
      setLocalContent(selectedComponent.content || {});
      setLocalStyle(selectedComponent.style || {});
    }
  }, [selectedSection?.id, selectedComponent?.id]);

  // Nothing selected
  if (!selectedSection && !selectedComponent) {
    return (
      <div
        style={{
          width: 320,
          background: '#161624',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>✏️</div>
          <p style={{ color: '#555', fontSize: 13 }}>Click a section to edit it</p>
        </div>
      </div>
    );
  }

  const handleContentChange = (key, value) => {
    const updated = { ...localContent, [key]: value };
    setLocalContent(updated);
    if (isVariantSection) {
      updateSectionContent(selectedSection.id, { [key]: value });
    } else if (selectedComponent) {
      updateComponent(selectedComponent.id, { content: updated });
    }
  };

  const handleStyleChange = (key, value) => {
    const updated = { ...localStyle, [key]: value };
    setLocalStyle(updated);
    if (selectedSection) {
      updateSection(selectedSection.id, { style: updated });
    } else if (selectedComponent) {
      updateComponent(selectedComponent.id, { style: updated });
    }
  };

  const sectionType = selectedSection?.type || selectedComponent?.type;
  const sectionVariant = selectedSection?.variant;
  const label = isVariantSection
    ? `${sectionType} · ${sectionVariant}`
    : sectionType;

  const TabBtn = ({ id, icon, children }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1,
        padding: '8px 4px',
        background: activeTab === id ? 'rgba(99,102,241,0.2)' : 'transparent',
        border: 'none',
        color: activeTab === id ? '#818cf8' : '#555',
        cursor: 'pointer',
        fontSize: 12,
        fontWeight: 600,
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        transition: 'all 0.15s',
      }}
    >
      {icon} {children}
    </button>
  );

  return (
    <div
      style={{
        width: 320,
        background: '#161624',
        borderLeft: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1.25rem 0.875rem',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p style={{ color: '#9ca3af', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
            Editing
          </p>
          <p style={{ color: '#e5e7eb', fontWeight: 700, fontSize: 14, textTransform: 'capitalize' }}>
            {label || 'Section'}
          </p>
        </div>
        <button
          onClick={clearSelection}
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: 'none',
            color: '#888',
            borderRadius: '50%',
            width: 28,
            height: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FiX size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: '0.75rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <TabBtn id="content" icon={<FiEdit3 size={12} />}>Content</TabBtn>
        <TabBtn id="style" icon={<FiSliders size={12} />}>Style</TabBtn>
      </div>

      {/* Scrollable fields */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
        {activeTab === 'content' && (
          <>
            {/* Variant indicator + change button */}
            {isVariantSection && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, padding: '6px 10px', marginBottom: '1rem' }}>
                <span style={{ color: '#818cf8', fontSize: 11, fontWeight: 600 }}>Layout: {selectedSection.variant}</span>
              </div>
            )}

            {sectionType === 'hero' && (
              <HeroContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'projects' && (
              <ProjectsContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'skills' && (
              <SkillsContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'about' && (
              <AboutContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'testimonials' && (
              <TestimonialsContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'services' && (
              <ServicesContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'stats' && (
              <StatsContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'cta' && (
              <CTAContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'timeline' && (
              <TimelineContentFields content={localContent} onChange={handleContentChange} />
            )}
            {sectionType === 'contact' && (
              <ContactContentFields content={localContent} onChange={handleContentChange} />
            )}
            {!['hero', 'projects', 'skills', 'about', 'testimonials', 'services', 'stats', 'cta', 'timeline', 'contact'].includes(sectionType) && (
              <LegacyContentFields
                type={sectionType}
                content={localContent}
                onChange={handleContentChange}
              />
            )}
          </>
        )}

        {activeTab === 'style' && (
          <StyleFields style={localStyle} onChange={handleStyleChange} />
        )}
      </div>
    </div>
  );
}

// ─── New content editors ─────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', marginBottom: '0.75rem', marginTop: '0.25rem' }}>
      <p style={{ color: '#555', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{children}</p>
    </div>
  );
}

function AddBtn({ onClick, label = '+ Add item' }) {
  return (
    <button onClick={onClick} style={{ width: '100%', padding: '8px', borderRadius: 8, border: '1px dashed rgba(255,255,255,0.15)', background: 'transparent', color: '#6366f1', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
      {label}
    </button>
  );
}

function ItemCard({ title, onRemove, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '0.875rem', marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open ? 8 : 0 }}>
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
          {open ? <FiChevronDown size={11} /> : <FiChevronRight size={11} />}
          {title}
        </button>
        <button onClick={onRemove} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <FiTrash2 size={12} />
        </button>
      </div>
      {open && children}
    </div>
  );
}

function AboutContentFields({ content, onChange }) {
  return (
    <>
      <Field label="Name"><input style={inputStyle} value={content.name || ''} onChange={(e) => onChange('name', e.target.value)} placeholder="Your Name" /></Field>
      <Field label="Role / Title"><input style={inputStyle} value={content.role || ''} onChange={(e) => onChange('role', e.target.value)} placeholder="Software Developer" /></Field>
      <Field label="Short Bio"><textarea style={textareaStyle} value={content.bio || ''} onChange={(e) => onChange('bio', e.target.value)} /></Field>
      <Field label="Second paragraph"><textarea style={{ ...textareaStyle, minHeight: 60 }} value={content.bio2 || ''} onChange={(e) => onChange('bio2', e.target.value)} /></Field>
      <Field label="Avatar URL"><input style={inputStyle} value={content.avatar || ''} onChange={(e) => onChange('avatar', e.target.value)} placeholder="https://…/photo.jpg" /></Field>
      <Field label="Location"><input style={inputStyle} value={content.location || ''} onChange={(e) => onChange('location', e.target.value)} placeholder="San Francisco, CA" /></Field>
      <Field label="Availability"><input style={inputStyle} value={content.availability || ''} onChange={(e) => onChange('availability', e.target.value)} placeholder="Open to opportunities" /></Field>
      <Field label="Resume URL"><input style={inputStyle} value={content.resumeUrl || ''} onChange={(e) => onChange('resumeUrl', e.target.value)} placeholder="https://…/resume.pdf" /></Field>
      <SectionLabel>Stats</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        <Field label="Exp"><input style={inputStyle} value={content.experience || ''} onChange={(e) => onChange('experience', e.target.value)} /></Field>
        <Field label="Projects"><input style={inputStyle} value={content.projects || ''} onChange={(e) => onChange('projects', e.target.value)} /></Field>
        <Field label="Stars"><input style={inputStyle} value={content.stars || ''} onChange={(e) => onChange('stars', e.target.value)} /></Field>
      </div>
      <SectionLabel>Social Links</SectionLabel>
      <Field label="GitHub username"><input style={inputStyle} value={content.social?.github || ''} onChange={(e) => onChange('social', { ...content.social, github: e.target.value })} /></Field>
      <Field label="LinkedIn URL"><input style={inputStyle} value={content.social?.linkedin || ''} onChange={(e) => onChange('social', { ...content.social, linkedin: e.target.value })} /></Field>
      <Field label="Twitter handle"><input style={inputStyle} value={content.social?.twitter || ''} onChange={(e) => onChange('social', { ...content.social, twitter: e.target.value })} /></Field>
      <Field label="Email"><input style={inputStyle} value={content.social?.email || ''} onChange={(e) => onChange('social', { ...content.social, email: e.target.value })} /></Field>
      <SectionLabel>Interests (Split variant: Skills)</SectionLabel>
      <Field label="Interests (comma-sep)"><input style={inputStyle} value={(content.interests || []).join(', ')} onChange={(e) => onChange('interests', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} placeholder="Open Source, Design, Music" /></Field>
      <Field label="Skills (comma-sep)"><input style={inputStyle} value={(content.skills || []).join(', ')} onChange={(e) => onChange('skills', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} placeholder="React, Node.js, TypeScript" /></Field>
      <SectionLabel>CTA (Split variant)</SectionLabel>
      <Field label="Button label"><input style={inputStyle} value={content.ctaLabel || ''} onChange={(e) => onChange('ctaLabel', e.target.value)} placeholder="View My Work" /></Field>
      <Field label="Button link"><input style={inputStyle} value={content.ctaHref || ''} onChange={(e) => onChange('ctaHref', e.target.value)} placeholder="#projects" /></Field>
    </>
  );
}

function TestimonialsContentFields({ content, onChange }) {
  const testimonials = content.testimonials || [];
  const update = (i, key, val) => onChange('testimonials', testimonials.map((t, j) => j === i ? { ...t, [key]: val } : t));
  const add = () => onChange('testimonials', [...testimonials, { id: Date.now(), name: 'New Person', role: 'Role', company: '', rating: 5, text: 'Great work!', avatar: '' }]);
  const remove = (i) => onChange('testimonials', testimonials.filter((_, j) => j !== i));
  return (
    <>
      <Field label="Section title"><input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} /></Field>
      <Field label="Subtitle"><input style={inputStyle} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} /></Field>
      <SectionLabel>Testimonials ({testimonials.length})</SectionLabel>
      {testimonials.map((t, i) => (
        <ItemCard key={t.id || i} title={t.name || `Person ${i + 1}`} onRemove={() => remove(i)}>
          <Field label="Name"><input style={inputStyle} value={t.name || ''} onChange={(e) => update(i, 'name', e.target.value)} /></Field>
          <Field label="Role"><input style={inputStyle} value={t.role || ''} onChange={(e) => update(i, 'role', e.target.value)} /></Field>
          <Field label="Company"><input style={inputStyle} value={t.company || ''} onChange={(e) => update(i, 'company', e.target.value)} /></Field>
          <Field label="Rating (1–5)"><input type="number" min="1" max="5" style={inputStyle} value={t.rating ?? 5} onChange={(e) => update(i, 'rating', parseInt(e.target.value) || 5)} /></Field>
          <Field label="Quote"><textarea style={textareaStyle} value={t.text || ''} onChange={(e) => update(i, 'text', e.target.value)} /></Field>
          <Field label="Avatar URL"><input style={inputStyle} value={t.avatar || ''} onChange={(e) => update(i, 'avatar', e.target.value)} placeholder="https://…/photo.jpg" /></Field>
        </ItemCard>
      ))}
      <AddBtn onClick={add} label="+ Add testimonial" />
    </>
  );
}

function ServicesContentFields({ content, onChange }) {
  const services = content.services || [];
  const update = (i, key, val) => onChange('services', services.map((s, j) => j === i ? { ...s, [key]: val } : s));
  const add = () => onChange('services', [...services, { id: Date.now(), icon: '🔧', title: 'New Service', description: 'Description here.', tags: [], price: '' }]);
  const remove = (i) => onChange('services', services.filter((_, j) => j !== i));
  return (
    <>
      <Field label="Section title"><input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} /></Field>
      <Field label="Subtitle"><input style={inputStyle} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} /></Field>
      <Field label="CTA label"><input style={inputStyle} value={content.ctaLabel || ''} onChange={(e) => onChange('ctaLabel', e.target.value)} /></Field>
      <Field label="CTA link"><input style={inputStyle} value={content.ctaHref || ''} onChange={(e) => onChange('ctaHref', e.target.value)} /></Field>
      <SectionLabel>Services ({services.length})</SectionLabel>
      {services.map((s, i) => (
        <ItemCard key={s.id || i} title={s.title || `Service ${i + 1}`} onRemove={() => remove(i)}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <Field label="Icon"><input style={{ ...inputStyle, width: 48, textAlign: 'center' }} value={s.icon || ''} onChange={(e) => update(i, 'icon', e.target.value)} /></Field>
            <div style={{ flex: 1 }}>
              <Field label="Title"><input style={inputStyle} value={s.title || ''} onChange={(e) => update(i, 'title', e.target.value)} /></Field>
            </div>
          </div>
          <Field label="Description"><textarea style={textareaStyle} value={s.description || ''} onChange={(e) => update(i, 'description', e.target.value)} /></Field>
          <Field label="Tags (comma-sep)"><input style={inputStyle} value={(s.tags || []).join(', ')} onChange={(e) => update(i, 'tags', e.target.value.split(',').map((x) => x.trim()).filter(Boolean))} placeholder="React, Node.js" /></Field>
          <Field label="Price (list variant)"><input style={inputStyle} value={s.price || ''} onChange={(e) => update(i, 'price', e.target.value)} placeholder="From $2,000" /></Field>
        </ItemCard>
      ))}
      <AddBtn onClick={add} label="+ Add service" />
    </>
  );
}

function StatsContentFields({ content, onChange }) {
  const stats = content.stats || [];
  const update = (i, key, val) => onChange('stats', stats.map((s, j) => j === i ? { ...s, [key]: val } : s));
  const add = () => onChange('stats', [...stats, { id: Date.now(), icon: '🚀', value: 10, suffix: '+', label: 'New Stat', description: '' }]);
  const remove = (i) => onChange('stats', stats.filter((_, j) => j !== i));
  return (
    <>
      <Field label="Section title"><input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} /></Field>
      <Field label="Subtitle"><input style={inputStyle} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} /></Field>
      <SectionLabel>Stats ({stats.length})</SectionLabel>
      {stats.map((s, i) => (
        <ItemCard key={s.id || i} title={s.label || `Stat ${i + 1}`} onRemove={() => remove(i)}>
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 60px', gap: 6, marginBottom: 8 }}>
            <Field label="Icon"><input style={{ ...inputStyle, textAlign: 'center', padding: '6px 4px' }} value={s.icon || ''} onChange={(e) => update(i, 'icon', e.target.value)} /></Field>
            <Field label="Label"><input style={inputStyle} value={s.label || ''} onChange={(e) => update(i, 'label', e.target.value)} /></Field>
            <Field label="Suffix"><input style={inputStyle} value={s.suffix || ''} onChange={(e) => update(i, 'suffix', e.target.value)} placeholder="+" /></Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 6 }}>
            <Field label="Value (number)"><input type="number" style={inputStyle} value={s.value ?? ''} onChange={(e) => update(i, 'value', e.target.value)} /></Field>
            <Field label="Description"><input style={inputStyle} value={s.description || ''} onChange={(e) => update(i, 'description', e.target.value)} /></Field>
          </div>
        </ItemCard>
      ))}
      <AddBtn onClick={add} label="+ Add stat" />
    </>
  );
}

function CTAContentFields({ content, onChange }) {
  return (
    <>
      <SectionLabel>Centered Variant</SectionLabel>
      <Field label="Badge text"><input style={inputStyle} value={content.badge || ''} onChange={(e) => onChange('badge', e.target.value)} placeholder="Available for Work" /></Field>
      <Field label="Headline"><textarea style={{ ...textareaStyle, minHeight: 60 }} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} /></Field>
      <Field label="Subtext"><textarea style={textareaStyle} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} /></Field>
      <Field label="Primary button"><input style={inputStyle} value={content.primaryLabel || ''} onChange={(e) => onChange('primaryLabel', e.target.value)} placeholder="Get In Touch" /></Field>
      <Field label="Primary link"><input style={inputStyle} value={content.primaryHref || ''} onChange={(e) => onChange('primaryHref', e.target.value)} placeholder="#contact" /></Field>
      <Field label="Secondary button"><input style={inputStyle} value={content.secondaryLabel || ''} onChange={(e) => onChange('secondaryLabel', e.target.value)} placeholder="View My Work" /></Field>
      <Field label="Secondary link"><input style={inputStyle} value={content.secondaryHref || ''} onChange={(e) => onChange('secondaryHref', e.target.value)} placeholder="#projects" /></Field>
      <Field label="Show email?">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={!!content.showEmail} onChange={(e) => onChange('showEmail', e.target.checked)} />
          <span style={{ color: '#9ca3af', fontSize: 12 }}>Show email below buttons</span>
        </label>
      </Field>
      {content.showEmail && <Field label="Email"><input type="email" style={inputStyle} value={content.email || ''} onChange={(e) => onChange('email', e.target.value)} /></Field>}
      <SectionLabel>Banner Variant</SectionLabel>
      <Field label="Banner CTA label"><input style={inputStyle} value={content.ctaLabel || ''} onChange={(e) => onChange('ctaLabel', e.target.value)} placeholder="Hire Me" /></Field>
      <Field label="Banner CTA link"><input style={inputStyle} value={content.ctaHref || ''} onChange={(e) => onChange('ctaHref', e.target.value)} placeholder="#contact" /></Field>
      <Field label="Banner sub-CTA"><input style={inputStyle} value={content.subCtaLabel || ''} onChange={(e) => onChange('subCtaLabel', e.target.value)} placeholder="View work" /></Field>
    </>
  );
}

function TimelineContentFields({ content, onChange }) {
  const items = content.items || [];
  const update = (i, key, val) => onChange('items', items.map((t, j) => j === i ? { ...t, [key]: val } : t));
  const add = () => onChange('items', [...items, { id: Date.now(), type: 'work', title: 'New Role', company: 'Company', location: '', duration: '2024 – Present', description: '' }]);
  const remove = (i) => onChange('items', items.filter((_, j) => j !== i));
  return (
    <>
      <Field label="Section title"><input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} /></Field>
      <Field label="Subtitle"><input style={inputStyle} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} /></Field>
      <SectionLabel>Timeline items ({items.length})</SectionLabel>
      {items.map((t, i) => (
        <ItemCard key={t.id || i} title={t.title || `Item ${i + 1}`} onRemove={() => remove(i)}>
          <Field label="Type">
            <select style={{ ...inputStyle, cursor: 'pointer' }} value={t.type || 'work'} onChange={(e) => update(i, 'type', e.target.value)}>
              <option value="work">💼 Work</option>
              <option value="education">📚 Education</option>
              <option value="award">🏆 Award</option>
            </select>
          </Field>
          <Field label="Title"><input style={inputStyle} value={t.title || ''} onChange={(e) => update(i, 'title', e.target.value)} /></Field>
          <Field label="Company / School"><input style={inputStyle} value={t.company || ''} onChange={(e) => update(i, 'company', e.target.value)} /></Field>
          <Field label="Location"><input style={inputStyle} value={t.location || ''} onChange={(e) => update(i, 'location', e.target.value)} /></Field>
          <Field label="Duration"><input style={inputStyle} value={t.duration || ''} onChange={(e) => update(i, 'duration', e.target.value)} placeholder="2022 – 2024" /></Field>
          <Field label="Description"><textarea style={textareaStyle} value={t.description || ''} onChange={(e) => update(i, 'description', e.target.value)} /></Field>
        </ItemCard>
      ))}
      <AddBtn onClick={add} label="+ Add entry" />
    </>
  );
}

function ContactContentFields({ content, onChange }) {
  return (
    <>
      <Field label="Heading"><input style={inputStyle} value={content.title || ''} onChange={(e) => onChange('title', e.target.value)} placeholder="Get In Touch" /></Field>
      <Field label="Subtitle"><textarea style={{ ...textareaStyle, minHeight: 60 }} value={content.subtitle || ''} onChange={(e) => onChange('subtitle', e.target.value)} /></Field>
      <Field label="Email"><input type="email" style={inputStyle} value={content.email || ''} onChange={(e) => onChange('email', e.target.value)} placeholder="hello@example.com" /></Field>
      <Field label="Location"><input style={inputStyle} value={content.location || ''} onChange={(e) => onChange('location', e.target.value)} /></Field>
      <Field label="Availability badge"><input style={inputStyle} value={content.availability || ''} onChange={(e) => onChange('availability', e.target.value)} placeholder="Available for freelance" /></Field>
      <SectionLabel>Social Links</SectionLabel>
      <Field label="GitHub username"><input style={inputStyle} value={content.social?.github || ''} onChange={(e) => onChange('social', { ...content.social, github: e.target.value })} /></Field>
      <Field label="LinkedIn URL"><input style={inputStyle} value={content.social?.linkedin || ''} onChange={(e) => onChange('social', { ...content.social, linkedin: e.target.value })} /></Field>
      <Field label="Twitter handle"><input style={inputStyle} value={content.social?.twitter || ''} onChange={(e) => onChange('social', { ...content.social, twitter: e.target.value })} /></Field>
    </>
  );
}

// ─── Legacy content fields (legacy component-array blocks) ───────────────────

function LegacyContentFields({ type, content, onChange }) {
  switch (type) {
    case 'github-stats':
      return (
        <Field label="GitHub Username">
          <input style={inputStyle} value={content.username || ''} onChange={(e) => onChange('username', e.target.value)} />
        </Field>
      );
    case 'markdown':
      return (
        <Field label="Markdown">
          <textarea style={{ ...textareaStyle, minHeight: 160 }} value={content.markdown || ''} onChange={(e) => onChange('markdown', e.target.value)} />
        </Field>
      );
    default:
      return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: 30, marginBottom: 8, opacity: 0.3 }}>✏️</div>
          <p style={{ color: '#555', fontSize: 13 }}>Select a section and click the ⚙ icon to edit it.</p>
        </div>
      );
  }
}
