import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiUpload,
  FiFileText,
  FiX,
  FiPlus,
  FiChevronRight,
  FiZap,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { resumeAPI } from '../utils/api';
import { useCanvasStore } from '../store/canvasStore';
import { mapResumeToCanvasLayout } from '../utils/resumeMapper';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// ─── Static config ─────────────────────────────────────────────────────────

const SECTIONS_CONFIG = [
  { id: 'hero',     label: 'Hero',       desc: 'Name, title, intro',      variants: ['centered', 'split', 'minimal', 'terminal'] },
  { id: 'about',    label: 'About',      desc: 'Bio, photo, links',        variants: ['bio', 'split'] },
  { id: 'skills',   label: 'Skills',     desc: 'Tech stack',               variants: ['tags', 'bars'] },
  { id: 'timeline', label: 'Experience', desc: 'Work + education history', variants: ['vertical'] },
  { id: 'projects', label: 'Projects',   desc: 'Portfolio projects',       variants: ['grid', 'featured'] },
  { id: 'contact',  label: 'Contact',    desc: 'Email, location, socials', variants: ['minimal'] },
];

const EMPTY_DATA = () => ({
  name: '', title: '', email: '', phone: '', location: '',
  linkedin: '', github: '', website: '', summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
});

const DEFAULT_VARIANTS = {
  hero: 'centered', about: 'bio', skills: 'tags',
  timeline: 'vertical', projects: 'grid', contact: 'minimal',
};

const DEFAULT_SECTIONS = {
  hero: true, about: true, skills: true,
  timeline: true, projects: true, contact: true,
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function ResumeImport() {
  const navigate = useNavigate();
  const { resetCanvas, setCanvasLayout, setTheme } = useCanvasStore();
  const fileRef = useRef(null);

  // Step state
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState('');

  // Review state
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [sections, setSections] = useState(DEFAULT_SECTIONS);
  const [variants, setVariants] = useState(DEFAULT_VARIANTS);
  const [newSkill, setNewSkill] = useState('');

  // ─── Step 1 handlers ──────────────────────────────────────────────────────

  const handleFile = (f) => {
    if (!f) return;
    const ok = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(f.type);
    if (!ok) { setError('Please upload a PDF or DOCX file.'); return; }
    if (f.size > 5 * 1024 * 1024) { setError('File must be under 5 MB.'); return; }
    setFile(f);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleParse = async () => {
    if (!file) return;
    setParsing(true);
    setError('');
    try {
      const res = await resumeAPI.parse(file);
      const parsed = res.data.data.parsed;
      setData({ ...EMPTY_DATA(), ...parsed });
      setStep(2);
      toast.success('Resume parsed successfully!');
    } catch {
      setError('Could not parse the file. Try a different PDF or use DOCX format.');
    } finally {
      setParsing(false);
    }
  };

  const handleSkip = () => {
    setData(EMPTY_DATA());
    setStep(2);
  };

  // ─── Step 2 data helpers ──────────────────────────────────────────────────

  const setField = (field, value) =>
    setData((d) => ({ ...d, [field]: value }));

  // Skills
  const addSkill = () => {
    const s = newSkill.trim();
    if (!s || data.skills.includes(s)) { setNewSkill(''); return; }
    setData((d) => ({ ...d, skills: [...d.skills, s] }));
    setNewSkill('');
  };
  const removeSkill = (i) =>
    setData((d) => ({ ...d, skills: d.skills.filter((_, idx) => idx !== i) }));

  // Experience
  const updateJob = (i, field, value) =>
    setData((d) => ({ ...d, experience: d.experience.map((j, idx) => idx === i ? { ...j, [field]: value } : j) }));
  const addJob = () =>
    setData((d) => ({ ...d, experience: [...d.experience, { title: '', company: '', location: '', duration: '', highlights: [] }] }));
  const removeJob = (i) =>
    setData((d) => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }));
  const addHighlight = (ji) =>
    setData((d) => ({ ...d, experience: d.experience.map((j, i) => i === ji ? { ...j, highlights: [...j.highlights, ''] } : j) }));
  const updateHighlight = (ji, hi, val) =>
    setData((d) => ({ ...d, experience: d.experience.map((j, i) => i === ji ? { ...j, highlights: j.highlights.map((h, k) => k === hi ? val : h) } : j) }));
  const removeHighlight = (ji, hi) =>
    setData((d) => ({ ...d, experience: d.experience.map((j, i) => i === ji ? { ...j, highlights: j.highlights.filter((_, k) => k !== hi) } : j) }));

  // Education
  const updateEdu = (i, field, value) =>
    setData((d) => ({ ...d, education: d.education.map((e, idx) => idx === i ? { ...e, [field]: value } : e) }));
  const addEdu = () =>
    setData((d) => ({ ...d, education: [...d.education, { degree: '', institution: '', duration: '' }] }));
  const removeEdu = (i) =>
    setData((d) => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }));

  // Projects
  const updateProject = (i, field, value) =>
    setData((d) => ({ ...d, projects: d.projects.map((p, idx) => idx === i ? { ...p, [field]: value } : p) }));
  const addProject = () =>
    setData((d) => ({ ...d, projects: [...d.projects, { name: '', description: '', tech: [], link: '' }] }));
  const removeProject = (i) =>
    setData((d) => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) }));
  const addProjectTech = (pi, tech) => {
    const t = tech.trim();
    if (!t) return;
    setData((d) => ({ ...d, projects: d.projects.map((p, i) => i === pi ? { ...p, tech: [...(p.tech || []), t] } : p) }));
  };
  const removeProjectTech = (pi, ti) =>
    setData((d) => ({ ...d, projects: d.projects.map((p, i) => i === pi ? { ...p, tech: p.tech.filter((_, k) => k !== ti) } : p) }));

  // ─── Generate ─────────────────────────────────────────────────────────────

  const handleGenerate = () => {
    const layout = mapResumeToCanvasLayout(data, sections, variants, 'midnight');
    resetCanvas();
    setCanvasLayout(layout);
    setTheme('midnight');
    toast.success('Portfolio generated! You can now edit and save it.');
    navigate('/editor');
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <FiArrowLeft size={14} /> Dashboard
            </Link>
            <span className="text-gray-300">|</span>
            <span className="font-semibold text-gray-900 text-sm">Import from Resume</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 text-sm">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                <span className={step >= s ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                  {s === 1 ? 'Upload' : 'Review & Generate'}
                </span>
                {s < 2 && <FiChevronRight size={14} className="text-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ──────────────────────── STEP 1: UPLOAD ──────────────────────── */}
      {step === 1 && (
        <div className="flex items-center justify-center min-h-[calc(100vh-56px)] p-6">
          <div className="w-full max-w-lg">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiUpload size={24} className="text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h1>
              <p className="text-gray-500 text-sm">
                We'll extract your data automatically. You can edit everything before generating.
              </p>
            </div>

            {/* Drop zone */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : file
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50/30'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !file && fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FiFileText size={28} className="text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  >
                    <FiX size={16} className="text-gray-500" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FiUpload size={20} className="text-gray-400" />
                  </div>
                  <p className="font-medium text-gray-700 mb-1">Drag & drop your resume here</p>
                  <p className="text-sm text-gray-400">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-2">PDF or DOCX · Max 5 MB</p>
                </>
              )}
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
            )}

            <div className="mt-5 flex flex-col gap-3">
              <Button
                className="w-full"
                disabled={!file || parsing}
                onClick={handleParse}
              >
                {parsing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Parsing…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FiZap size={15} /> Parse Resume
                  </span>
                )}
              </Button>

              <button
                onClick={handleSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors text-center py-1"
              >
                Fill in manually instead →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────── STEP 2: REVIEW ──────────────────────── */}
      {step === 2 && data && (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

          {/* ── Left: Editable data ─────────────────────────────────── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Review & Edit Your Data</h2>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 overflow-x-auto">
              {['personal', 'experience', 'education', 'skills', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[80px] py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-white shadow text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'experience' ? 'Work' : tab === 'education' ? 'Edu' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Personal */}
            {activeTab === 'personal' && (
              <div className="space-y-4 bg-white border border-gray-200 rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LabeledInput label="Full Name" value={data.name} onChange={(v) => setField('name', v)} placeholder="Jane Smith" />
                  <LabeledInput label="Job Title" value={data.title} onChange={(v) => setField('title', v)} placeholder="Full Stack Developer" />
                  <LabeledInput label="Email" value={data.email} onChange={(v) => setField('email', v)} placeholder="jane@example.com" type="email" />
                  <LabeledInput label="Phone" value={data.phone} onChange={(v) => setField('phone', v)} placeholder="+1 555 123 4567" />
                  <LabeledInput label="Location" value={data.location} onChange={(v) => setField('location', v)} placeholder="San Francisco, CA" />
                  <LabeledInput label="Website" value={data.website} onChange={(v) => setField('website', v)} placeholder="https://yoursite.com" />
                  <LabeledInput label="LinkedIn username" value={data.linkedin} onChange={(v) => setField('linkedin', v)} placeholder="janesmith" />
                  <LabeledInput label="GitHub username" value={data.github} onChange={(v) => setField('github', v)} placeholder="janesmith" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Summary / Bio</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    value={data.summary}
                    onChange={(e) => setField('summary', e.target.value)}
                    placeholder="A brief professional summary…"
                  />
                </div>
              </div>
            )}

            {/* Experience */}
            {activeTab === 'experience' && (
              <div className="space-y-4">
                {data.experience.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-6">No experience added yet.</p>
                )}
                {data.experience.map((job, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Position {i + 1}</span>
                      <button onClick={() => removeJob(i)} className="text-red-400 hover:text-red-600 transition-colors">
                        <FiX size={15} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <LabeledInput label="Job Title" value={job.title} onChange={(v) => updateJob(i, 'title', v)} placeholder="Senior Engineer" />
                      <LabeledInput label="Company" value={job.company} onChange={(v) => updateJob(i, 'company', v)} placeholder="Google" />
                      <LabeledInput label="Location" value={job.location} onChange={(v) => updateJob(i, 'location', v)} placeholder="Remote" />
                      <LabeledInput label="Duration" value={job.duration} onChange={(v) => updateJob(i, 'duration', v)} placeholder="Jan 2021 – Present" />
                    </div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">Key highlights</label>
                    <div className="space-y-2">
                      {job.highlights.map((h, hi) => (
                        <div key={hi} className="flex gap-2">
                          <Input
                            value={h}
                            onChange={(e) => updateHighlight(i, hi, e.target.value)}
                            placeholder="Led migration to microservices…"
                            className="text-sm"
                          />
                          <button onClick={() => removeHighlight(i, hi)} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                            <FiX size={14} />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => addHighlight(i)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <FiPlus size={12} /> Add bullet
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addJob}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlus size={14} /> Add Experience
                </button>
              </div>
            )}

            {/* Education */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                {data.education.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-6">No education added yet.</p>
                )}
                {data.education.map((edu, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Entry {i + 1}</span>
                      <button onClick={() => removeEdu(i)} className="text-red-400 hover:text-red-600 transition-colors">
                        <FiX size={15} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <LabeledInput label="Degree / Qualification" value={edu.degree} onChange={(v) => updateEdu(i, 'degree', v)} placeholder="B.S. Computer Science" />
                      <LabeledInput label="Institution" value={edu.institution} onChange={(v) => updateEdu(i, 'institution', v)} placeholder="MIT" />
                      <LabeledInput label="Duration" value={edu.duration} onChange={(v) => updateEdu(i, 'duration', v)} placeholder="2017 – 2021" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEdu}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlus size={14} /> Add Education
                </button>
              </div>
            )}

            {/* Skills */}
            {activeTab === 'skills' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <p className="text-xs text-gray-500 mb-4">Click a skill to remove it.</p>
                <div className="flex flex-wrap gap-2 mb-5 min-h-[40px]">
                  {data.skills.map((skill, i) => (
                    <button
                      key={i}
                      onClick={() => removeSkill(i)}
                      className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    >
                      {skill} <FiX size={11} />
                    </button>
                  ))}
                  {data.skills.length === 0 && (
                    <span className="text-sm text-gray-400">No skills added yet.</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. React)"
                    className="text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button size="sm" variant="outline" onClick={addSkill}>
                    <FiPlus size={14} />
                  </Button>
                </div>
              </div>
            )}

            {/* Projects */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                {data.projects.length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-6">No projects added yet.</p>
                )}
                {data.projects.map((proj, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Project {i + 1}</span>
                      <button onClick={() => removeProject(i)} className="text-red-400 hover:text-red-600 transition-colors">
                        <FiX size={15} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <LabeledInput label="Project Name" value={proj.name} onChange={(v) => updateProject(i, 'name', v)} placeholder="Portfolio Builder" />
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                        <textarea
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                          value={proj.description}
                          onChange={(e) => updateProject(i, 'description', e.target.value)}
                          placeholder="What does it do?"
                        />
                      </div>
                      <LabeledInput label="Live URL" value={proj.link || ''} onChange={(v) => updateProject(i, 'link', v)} placeholder="https://myproject.com" />
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tech Stack</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {(proj.tech || []).map((t, ti) => (
                            <button
                              key={ti}
                              onClick={() => removeProjectTech(i, ti)}
                              className="flex items-center gap-1 bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5 text-xs hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              {t} <FiX size={10} />
                            </button>
                          ))}
                        </div>
                        <ProjectTechInput onAdd={(t) => addProjectTech(i, t)} />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProject}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlus size={14} /> Add Project
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Sections + variant config ────────────────────── */}
          <div className="sticky top-20 self-start">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Portfolio Sections</h3>

              <div className="space-y-3">
                {SECTIONS_CONFIG.map(({ id, label, desc, variants: vOpts }) => (
                  <div key={id} className={`p-3 rounded-lg border transition-colors ${sections[id] ? 'border-blue-200 bg-blue-50/40' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                    <div className="flex items-start gap-2 mb-2">
                      <input
                        type="checkbox"
                        id={`sec-${id}`}
                        checked={sections[id]}
                        onChange={(e) => setSections((s) => ({ ...s, [id]: e.target.checked }))}
                        className="mt-0.5 accent-blue-600"
                      />
                      <label htmlFor={`sec-${id}`} className="cursor-pointer flex-1">
                        <span className="font-semibold text-gray-900 text-xs">{label}</span>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </label>
                    </div>
                    {sections[id] && vOpts.length > 1 && (
                      <select
                        value={variants[id]}
                        onChange={(e) => setVariants((v) => ({ ...v, [id]: e.target.value }))}
                        className="w-full border border-gray-200 rounded-md text-xs py-1 px-2 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        {vOpts.map((v) => (
                          <option key={v} value={v}>
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>

              <Button className="w-full mt-5" onClick={handleGenerate}>
                <FiZap className="mr-2" size={15} />
                Generate Portfolio
              </Button>

              <p className="text-xs text-gray-400 text-center mt-2">
                Opens in the editor — nothing is saved yet.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Small sub-components ────────────────────────────────────────────────────

function LabeledInput({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="text-sm"
      />
    </div>
  );
}

function ProjectTechInput({ onAdd }) {
  const [val, setVal] = useState('');
  const submit = () => { onAdd(val); setVal(''); };
  return (
    <div className="flex gap-2">
      <Input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="e.g. React"
        className="text-sm"
      />
      <Button size="sm" variant="outline" onClick={submit}>
        <FiPlus size={13} />
      </Button>
    </div>
  );
}
