import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiPlus, FiTrash2, FiSave, FiZap, FiFileText, FiTarget, FiDownload } from 'react-icons/fi';
import { authAPI } from '../utils/api';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import BrandLogo from '../components/branding/BrandLogo';

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
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F1A]">
        <div className="absolute inset-0 brand-grid opacity-25" />
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#06B6D4]/12 blur-3xl" />
        
        <div className="relative text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#2563EB]/30 border-t-[#06B6D4] animate-spin mx-auto mb-6" />
          <p className="text-[#9CA3AF]">Loading profile lab...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F1A] text-[#E5E7EB]">
      <div className="absolute inset-0 brand-grid opacity-25" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#06B6D4]/12 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="sticky top-0 z-40 mb-8 mt-6 rounded-[28px] border border-white/8 bg-white/5 px-4 py-5 backdrop-blur sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <BrandLogo compact />
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">Profile Lab</h1>
                <p className="mt-1 text-sm text-[#9CA3AF]">Maintain profile, generate ATS-friendly resume, and create portfolio draft</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-white/10 bg-white/5 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
              >
                <FiArrowLeft className="mr-2 h-4 w-4" /> Dashboard
              </Button>
              <Button
                onClick={saveProfile}
                disabled={saving}
                className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white hover:shadow-lg disabled:opacity-50"
              >
                <FiSave className="mr-2 h-4 w-4" /> {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Profile Card */}
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader>
                <CardTitle className="text-white">Basic Profile</CardTitle>
                <CardDescription className="text-[#9CA3AF]">Core details used for both resume and portfolio generation.</CardDescription>
                <div className="flex flex-wrap gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => applySample('frontend')}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
                  >
                    Load Frontend Sample
                  </button>
                  <button
                    type="button"
                    onClick={() => applySample('backend')}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
                  >
                    Load Backend Sample
                  </button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                  placeholder="Full name"
                  value={profile.name || ''}
                  onChange={(e) => patch('name', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <Input
                  placeholder="Headline (e.g. Full Stack Engineer)"
                  value={profile.headline || ''}
                  onChange={(e) => patch('headline', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <Input
                  placeholder="Email"
                  value={profile.email || ''}
                  onChange={(e) => patch('email', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <Input
                  placeholder="Phone"
                  value={profile.phone || ''}
                  onChange={(e) => patch('phone', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <Input
                  placeholder="Location"
                  value={profile.location || ''}
                  onChange={(e) => patch('location', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <Input
                  placeholder="Website"
                  value={profile.website || ''}
                  onChange={(e) => patch('website', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <Input
                  placeholder="LinkedIn username/url"
                  value={profile.linkedin || ''}
                  onChange={(e) => patch('linkedin', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <Input
                  placeholder="GitHub username/url"
                  value={profile.github || ''}
                  onChange={(e) => patch('github', e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <div className="md:col-span-2">
                  <Textarea
                    placeholder="Professional summary"
                    value={profile.summary || ''}
                    onChange={(e) => patch('summary', e.target.value)}
                    rows={4}
                    className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add skill (React, Node.js, AWS...)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-3 py-2 text-white hover:shadow-lg transition-all"
                  >
                    <FiPlus />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(profile.skills || []).map((s, i) => (
                    <span key={`${s}-${i}`} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#06B6D4]/20 bg-[#06B6D4]/10 text-[#06B6D4] text-sm">
                      {typeof s === 'string' ? s : s.name}
                      <button
                        onClick={() => patch('skills', profile.skills.filter((_, idx) => idx !== i))}
                        className="text-[#06B6D4] hover:text-[#E5E7EB]"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Card */}
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader>
                <CardTitle className="text-white">Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(profile.experience || []).map((exp, i) => (
                  <div key={i} className="p-4 rounded-lg border border-white/8 bg-white/5 space-y-3">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <Input
                        placeholder="Role"
                        value={exp.title || ''}
                        onChange={(e) => {
                          const next = [...profile.experience];
                          next[i] = { ...next[i], title: e.target.value };
                          patch('experience', next);
                        }}
                        className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                      />
                      <Input
                        placeholder="Company"
                        value={exp.company || ''}
                        onChange={(e) => {
                          const next = [...profile.experience];
                          next[i] = { ...next[i], company: e.target.value };
                          patch('experience', next);
                        }}
                        className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                      />
                      <Input
                        placeholder="Duration"
                        value={exp.duration || ''}
                        onChange={(e) => {
                          const next = [...profile.experience];
                          next[i] = { ...next[i], duration: e.target.value };
                          patch('experience', next);
                        }}
                        className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                      />
                      <Input
                        placeholder="Location"
                        value={exp.location || ''}
                        onChange={(e) => {
                          const next = [...profile.experience];
                          next[i] = { ...next[i], location: e.target.value };
                          patch('experience', next);
                        }}
                        className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                      />
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
                      className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                    />
                    <button
                      onClick={() => patch('experience', profile.experience.filter((_, idx) => idx !== i))}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#E5E7EB] hover:border-red-400/30 hover:bg-red-400/10"
                    >
                      <FiTrash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => patch('experience', [...(profile.experience || []), { ...emptyExperience }])}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
                >
                  <FiPlus className="h-4 w-4" /> Add Experience
                </button>
              </CardContent>
            </Card>

            {/* Projects Card */}
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader>
                <CardTitle className="text-white">Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(profile.projects || []).map((proj, i) => (
                  <div key={i} className="p-4 rounded-lg border border-white/8 bg-white/5 space-y-3">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <Input
                        placeholder="Project name"
                        value={proj.name || ''}
                        onChange={(e) => {
                          const next = [...profile.projects];
                          next[i] = { ...next[i], name: e.target.value };
                          patch('projects', next);
                        }}
                        className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                      />
                      <Input
                        placeholder="Live link"
                        value={proj.link || ''}
                        onChange={(e) => {
                          const next = [...profile.projects];
                          next[i] = { ...next[i], link: e.target.value };
                          patch('projects', next);
                        }}
                        className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                      />
                    </div>
                    <Textarea
                      placeholder="Description"
                      value={proj.description || ''}
                      onChange={(e) => {
                        const next = [...profile.projects];
                        next[i] = { ...next[i], description: e.target.value };
                        patch('projects', next);
                      }}
                      rows={3}
                      className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                    />
                    <Input
                      placeholder="Tech stack (comma separated)"
                      value={(proj.tech || []).join(', ')}
                      onChange={(e) => {
                        const next = [...profile.projects];
                        next[i] = { ...next[i], tech: parseCsv(e.target.value) };
                        patch('projects', next);
                      }}
                      className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                    />
                  </div>
                ))}
                <button
                  onClick={() => patch('projects', [...(profile.projects || []), { ...emptyProject }])}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/10"
                >
                  <FiPlus className="h-4 w-4" /> Add Project
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Generate Assets Card */}
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader>
                <CardTitle className="text-white">Generate Assets</CardTitle>
                <CardDescription className="text-[#9CA3AF]">Create ATS-friendly resume text and a portfolio draft from this profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  className="w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-4 py-2 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  onClick={() => generateAssets(false)}
                >
                  <FiFileText className="h-4 w-4" /> Generate Resume + Portfolio Content
                </button>
                <div>
                  <label className="text-xs font-medium text-[#9CA3AF] mb-1 block">Resume Template (4 types)</label>
                  <select
                    value={resumeTemplate}
                    onChange={(e) => setResumeTemplate(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-white/10 bg-white/5 text-[#E5E7EB] text-sm focus:border-[#06B6D4]"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="compact">Compact</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
                <button
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[#E5E7EB] font-medium hover:border-[#06B6D4] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  onClick={downloadResume}
                >
                  <FiDownload className="h-4 w-4" /> Download ATS Resume (.pdf)
                </button>
                <button
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[#E5E7EB] font-medium hover:border-[#06B6D4] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  onClick={() => generateAssets(true)}
                >
                  <FiZap className="h-4 w-4" /> Create Portfolio Draft in Editor
                </button>
                {generatedResume && (
                  <Textarea
                    value={generatedResume}
                    readOnly
                    rows={12}
                    className="font-mono text-xs border-white/10 bg-white/5 text-[#E5E7EB]"
                  />
                )}
              </CardContent>
            </Card>

            {/* ATS Check Card */}
            <Card className="border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader>
                <CardTitle className="text-white">ATS Friendliness Check</CardTitle>
                <CardDescription className="text-[#9CA3AF]">Paste a target job description for match analysis.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  rows={8}
                  placeholder="Paste target job description..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] focus:border-[#06B6D4]"
                />
                <button
                  className="w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-4 py-2 text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  onClick={runATS}
                >
                  <FiTarget className="h-4 w-4" /> Run ATS Check
                </button>

                {atsResult && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-[#9CA3AF]">ATS Score</span>
                        <span className="font-semibold text-[#06B6D4]">{atsResult.score}/100</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${atsTone}`} style={{ width: `${atsResult.score}%` }} />
                      </div>
                    </div>

                    <div className="text-xs text-[#9CA3AF]">
                      Keyword coverage: <strong className="text-[#06B6D4]">{atsResult.keywordCoverage}%</strong>
                    </div>

                    {!!atsResult.issues?.length && (
                      <div>
                        <p className="text-sm font-semibold text-[#E5E7EB] mb-1">Issues</p>
                        <ul className="text-xs text-red-400 list-disc pl-4 space-y-1">
                          {atsResult.issues.map((x, i) => <li key={i}>{x}</li>)}
                        </ul>
                      </div>
                    )}

                    {!!atsResult.suggestions?.length && (
                      <div>
                        <p className="text-sm font-semibold text-[#E5E7EB] mb-1">Suggestions</p>
                        <ul className="text-xs text-green-400 list-disc pl-4 space-y-1">
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
    </div>
  );
}
