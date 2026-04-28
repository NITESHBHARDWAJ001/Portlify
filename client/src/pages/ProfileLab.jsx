import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus, FiTrash2, FiSave, FiZap, FiFileText, FiTarget, FiDownload } from 'react-icons/fi';
import { authAPI } from '../utils/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';

const emptyExperience = { title: '', company: '', location: '', duration: '', highlights: [] };
const emptyEducation = { degree: '', institution: '', duration: '', location: '' };
const emptyProject = { name: '', description: '', link: '', github: '', tech: [] };

const SAMPLE_PROFILES = {
  frontend: {
    name: 'Aarav Sharma',
    headline: 'Senior Frontend Engineer',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    website: 'aarav.dev',
    linkedin: 'linkedin.com/in/aarav-sharma',
    github: 'github.com/aaravsharma',
    summary: 'Frontend engineer with 6+ years building high-performance React applications, design systems, and accessible user experiences for SaaS products used by 1M+ users.',
    skills: ['React', 'TypeScript', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Jest', 'Cypress', 'Web Performance'],
    experience: [
      {
        title: 'Senior Frontend Engineer',
        company: 'ScaleFlow',
        duration: '2022 - Present',
        location: 'Remote',
        highlights: [
          'Led migration from legacy Angular to React + TypeScript, reducing bundle size by 38%.',
          'Built reusable design system adopted by 5 product squads.',
          'Improved Core Web Vitals and increased conversion by 14%.',
        ],
      },
      {
        title: 'Frontend Engineer',
        company: 'PixelForge',
        duration: '2019 - 2022',
        location: 'Bangalore',
        highlights: [
          'Delivered analytics dashboard with 50+ data visualizations.',
          'Implemented test automation pipelines reducing regressions by 40%.',
        ],
      },
    ],
    projects: [
      {
        name: 'UI Kit Pro',
        description: 'Open-source React component library focused on accessibility and theming.',
        link: 'https://uikitpro.dev',
        github: 'https://github.com/aaravsharma/uikitpro',
        tech: ['React', 'TypeScript', 'Storybook'],
      },
      {
        name: 'Perf Lens',
        description: 'Web performance audit dashboard with actionable recommendations.',
        link: 'https://perflens.app',
        github: 'https://github.com/aaravsharma/perf-lens',
        tech: ['Next.js', 'Lighthouse', 'Node.js'],
      },
    ],
  },
  backend: {
    name: 'Meera Nair',
    headline: 'Backend Engineer',
    email: 'meera.nair@example.com',
    phone: '+91 99887 77665',
    location: 'Hyderabad, India',
    website: 'meeranair.dev',
    linkedin: 'linkedin.com/in/meera-nair',
    github: 'github.com/meeranair',
    summary: 'Backend engineer specialized in distributed systems, API design, and cloud-native services with a strong record of reliability and cost optimization.',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS'],
    experience: [
      {
        title: 'Backend Engineer',
        company: 'CloudRail',
        duration: '2021 - Present',
        location: 'Hyderabad',
        highlights: [
          'Designed event-driven microservices handling 20M+ events/day.',
          'Reduced API p95 latency by 32% through query optimization and caching.',
          'Implemented observability stack reducing incident MTTR by 45%.',
        ],
      },
    ],
    projects: [
      {
        name: 'Queue Guard',
        description: 'Reliable job orchestration engine with retry, dead-letter, and monitoring capabilities.',
        link: 'https://queueguard.dev',
        github: 'https://github.com/meeranair/queue-guard',
        tech: ['Node.js', 'Redis', 'BullMQ'],
      },
    ],
  },
};

function parseCsv(value) {
  return value
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function ProfileLab() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [atsResult, setAtsResult] = useState(null);
  const [generatedResume, setGeneratedResume] = useState('');
  const [resumeTemplate, setResumeTemplate] = useState('modern');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await authAPI.getProfileData();
        setProfile(res.data.data.profileData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const atsTone = useMemo(() => {
    if (!atsResult) return 'bg-gray-300';
    if (atsResult.score >= 75) return 'bg-emerald-500';
    if (atsResult.score >= 55) return 'bg-amber-500';
    return 'bg-rose-500';
  }, [atsResult]);

  const patch = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  const saveProfile = async () => {
    setSaving(true);
    try {
      await authAPI.updateProfileData(profile);
      toast.success('Profile data saved');
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const runATS = async () => {
    try {
      await authAPI.updateProfileData(profile);
      const res = await authAPI.atsCheck({ jobDescription });
      setAtsResult(res.data.data.result);
      toast.success('ATS analysis complete');
    } catch (e) {
      console.error(e);
    }
  };

  const generateAssets = async (createPortfolio = false) => {
    try {
      await authAPI.updateProfileData(profile);
      const res = await authAPI.generateAssets({ createPortfolio, title: `${profile.name || 'My'} Portfolio` });
      setGeneratedResume(res.data.data.resumeMarkdown || '');
      if (createPortfolio && res.data.data.portfolio?._id) {
        toast.success('Portfolio draft created from profile');
        navigate(`/editor/${res.data.data.portfolio._id}`);
        return;
      }
      toast.success('Resume + portfolio content generated');
    } catch (e) {
      console.error(e);
    }
  };

  const downloadResume = async () => {
    try {
      await authAPI.updateProfileData(profile);
      const res = await authAPI.downloadResume(resumeTemplate);
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `${(profile.name || 'resume').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'resume'}-ats-resume.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('ATS-friendly resume PDF downloaded');
    } catch (e) {
      console.error(e);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    patch('skills', [...(profile.skills || []), skillInput.trim()]);
    setSkillInput('');
  };

  const applySample = (key) => {
    const sample = SAMPLE_PROFILES[key];
    if (!sample) return;
    setProfile((prev) => ({ ...prev, ...sample }));
    toast.success('Sample profile loaded');
  };

  if (loading || !profile) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading profile lab...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Profile Lab</h1>
            <p className="text-sm text-slate-600">Maintain profile, generate ATS-friendly resume, and create portfolio draft.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <FiArrowLeft className="mr-2" /> Dashboard
            </Button>
            <Button onClick={saveProfile} disabled={saving}>
              <FiSave className="mr-2" /> {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Profile</CardTitle>
              <CardDescription>Core details used for both resume and portfolio generation.</CardDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button type="button" size="sm" variant="outline" onClick={() => applySample('frontend')}>
                  Load Frontend Sample
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => applySample('backend')}>
                  Load Backend Sample
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full name" value={profile.name || ''} onChange={(e) => patch('name', e.target.value)} />
              <Input placeholder="Headline (e.g. Full Stack Engineer)" value={profile.headline || ''} onChange={(e) => patch('headline', e.target.value)} />
              <Input placeholder="Email" value={profile.email || ''} onChange={(e) => patch('email', e.target.value)} />
              <Input placeholder="Phone" value={profile.phone || ''} onChange={(e) => patch('phone', e.target.value)} />
              <Input placeholder="Location" value={profile.location || ''} onChange={(e) => patch('location', e.target.value)} />
              <Input placeholder="Website" value={profile.website || ''} onChange={(e) => patch('website', e.target.value)} />
              <Input placeholder="LinkedIn username/url" value={profile.linkedin || ''} onChange={(e) => patch('linkedin', e.target.value)} />
              <Input placeholder="GitHub username/url" value={profile.github || ''} onChange={(e) => patch('github', e.target.value)} />
              <div className="md:col-span-2">
                <Textarea placeholder="Professional summary" value={profile.summary || ''} onChange={(e) => patch('summary', e.target.value)} rows={4} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-3">
                <Input placeholder="Add skill (React, Node.js, AWS...)" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
                <Button type="button" onClick={addSkill}><FiPlus /></Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile.skills || []).map((s, i) => (
                  <span key={`${s}-${i}`} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                    {typeof s === 'string' ? s : s.name}
                    <button
                      onClick={() => patch('skills', profile.skills.filter((_, idx) => idx !== i))}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(profile.experience || []).map((exp, i) => (
                <div key={i} className="p-4 border rounded-lg bg-white space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Role" value={exp.title || ''} onChange={(e) => {
                      const next = [...profile.experience];
                      next[i] = { ...next[i], title: e.target.value };
                      patch('experience', next);
                    }} />
                    <Input placeholder="Company" value={exp.company || ''} onChange={(e) => {
                      const next = [...profile.experience];
                      next[i] = { ...next[i], company: e.target.value };
                      patch('experience', next);
                    }} />
                    <Input placeholder="Duration" value={exp.duration || ''} onChange={(e) => {
                      const next = [...profile.experience];
                      next[i] = { ...next[i], duration: e.target.value };
                      patch('experience', next);
                    }} />
                    <Input placeholder="Location" value={exp.location || ''} onChange={(e) => {
                      const next = [...profile.experience];
                      next[i] = { ...next[i], location: e.target.value };
                      patch('experience', next);
                    }} />
                  </div>
                  <Textarea
                    rows={3}
                    placeholder="Highlights (one per line)"
                    value={(exp.highlights || []).join('\n')}
                    onChange={(e) => {
                      const next = [...profile.experience];
                      next[i] = {
                        ...next[i],
                        highlights: e.target.value.split('\n').map((x) => x.trim()).filter(Boolean),
                      };
                      patch('experience', next);
                    }}
                  />
                  <Button variant="outline" onClick={() => patch('experience', profile.experience.filter((_, idx) => idx !== i))}>
                    <FiTrash2 className="mr-2" /> Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => patch('experience', [...(profile.experience || []), { ...emptyExperience }])}>
                <FiPlus className="mr-2" /> Add Experience
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(profile.projects || []).map((proj, i) => (
                <div key={i} className="p-4 border rounded-lg bg-white space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Project name" value={proj.name || ''} onChange={(e) => {
                      const next = [...profile.projects];
                      next[i] = { ...next[i], name: e.target.value };
                      patch('projects', next);
                    }} />
                    <Input placeholder="Live link" value={proj.link || ''} onChange={(e) => {
                      const next = [...profile.projects];
                      next[i] = { ...next[i], link: e.target.value };
                      patch('projects', next);
                    }} />
                  </div>
                  <Textarea placeholder="Description" value={proj.description || ''} onChange={(e) => {
                    const next = [...profile.projects];
                    next[i] = { ...next[i], description: e.target.value };
                    patch('projects', next);
                  }} rows={3} />
                  <Input placeholder="Tech stack (comma separated)" value={(proj.tech || []).join(', ')} onChange={(e) => {
                    const next = [...profile.projects];
                    next[i] = { ...next[i], tech: parseCsv(e.target.value) };
                    patch('projects', next);
                  }} />
                </div>
              ))}
              <Button variant="outline" onClick={() => patch('projects', [...(profile.projects || []), { ...emptyProject }])}>
                <FiPlus className="mr-2" /> Add Project
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Assets</CardTitle>
              <CardDescription>Create ATS-friendly resume text and a portfolio draft from this profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => generateAssets(false)}>
                <FiFileText className="mr-2" /> Generate Resume + Portfolio Content
              </Button>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Resume Template (4 types)</label>
                <select
                  value={resumeTemplate}
                  onChange={(e) => setResumeTemplate(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="compact">Compact</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
              <Button className="w-full" variant="outline" onClick={downloadResume}>
                <FiDownload className="mr-2" /> Download ATS Resume (.pdf)
              </Button>
              <Button className="w-full" variant="outline" onClick={() => generateAssets(true)}>
                <FiZap className="mr-2" /> Create Portfolio Draft in Editor
              </Button>
              {generatedResume && (
                <Textarea value={generatedResume} readOnly rows={12} className="font-mono text-xs" />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ATS Friendliness Check</CardTitle>
              <CardDescription>Paste a target job description for match analysis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                rows={8}
                placeholder="Paste target job description..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <Button className="w-full" onClick={runATS}>
                <FiTarget className="mr-2" /> Run ATS Check
              </Button>

              {atsResult && (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>ATS Score</span>
                      <span className="font-semibold">{atsResult.score}/100</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${atsTone}`} style={{ width: `${atsResult.score}%` }} />
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    Keyword coverage: <strong>{atsResult.keywordCoverage}%</strong>
                  </div>

                  {!!atsResult.issues?.length && (
                    <div>
                      <p className="text-sm font-semibold mb-1">Issues</p>
                      <ul className="text-xs text-rose-700 list-disc pl-4 space-y-1">
                        {atsResult.issues.map((x, i) => <li key={i}>{x}</li>)}
                      </ul>
                    </div>
                  )}

                  {!!atsResult.suggestions?.length && (
                    <div>
                      <p className="text-sm font-semibold mb-1">Suggestions</p>
                      <ul className="text-xs text-emerald-700 list-disc pl-4 space-y-1">
                        {atsResult.suggestions.map((x, i) => <li key={i}>{x}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
