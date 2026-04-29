import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiMessageSquare, FiSend, FiUser, FiX, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useCanvasStore } from '../store/canvasStore';
import { mapResumeToCanvasLayout } from '../utils/resumeMapper';
import {
  chatBuildResumeAndPortfolio,
  generateResumeMarkdownDraft,
  normalizeResumeInput,
} from '../utils/grokResumeAI';
import { downloadFile } from '../utils/helpers';

const EMPTY_PROFILE = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
};

export default function ChatBuilder() {
  const navigate = useNavigate();
  const { resetCanvas, setCanvasLayout, setTheme } = useCanvasStore();

  const [jobDescription, setJobDescription] = useState('');
  const [userInput, setUserInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! I can build your resume and portfolio by chat. Tell me about your role, experience, projects, skills, and links. You can also paste a target job description.',
    },
  ]);

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [sections, setSections] = useState({
    hero: true,
    about: true,
    skills: true,
    timeline: true,
    projects: true,
    contact: true,
  });
  const [variants, setVariants] = useState({
    hero: 'centered',
    about: 'bio',
    skills: 'tags',
    timeline: 'vertical',
    projects: 'grid',
    contact: 'minimal',
  });
  const [ats, setAts] = useState(null);
  const [missingFields, setMissingFields] = useState([]);
  const [isReadyToGenerate, setIsReadyToGenerate] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  const canSend = userInput.trim().length > 0 && !busy;

  const messageCountText = useMemo(() => {
    const userMsgs = messages.filter((m) => m.role === 'user').length;
    return `${userMsgs} prompt${userMsgs === 1 ? '' : 's'} shared`;
  }, [messages]);

  const sendMessage = async () => {
    if (!canSend) return;

    const nextUser = { role: 'user', content: userInput.trim() };
    const nextMessages = [...messages, nextUser];
    setMessages(nextMessages);
    setUserInput('');
    setBusy(true);

    try {
      const result = await chatBuildResumeAndPortfolio(nextMessages, profile, {
        jobDescription,
      });

      setProfile(normalizeResumeInput(result.profile));
      setSections(result.portfolio.sections);
      setVariants(result.portfolio.variants);
      setAts(result.ats);
      setMissingFields(result.missingFields || []);
      setIsReadyToGenerate(Boolean(result.isReadyToGenerate));
      setMessages((prev) => [...prev, { role: 'assistant', content: result.assistantReply }]);
    } catch (error) {
      console.error(error);
      toast.error(error?.message || 'Chat generation failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleGeneratePortfolio = () => {
    const layout = mapResumeToCanvasLayout(profile, sections, variants, 'midnight');
    resetCanvas();
    setCanvasLayout(layout);
    setTheme('midnight');
    toast.success('Portfolio generated from chatbot conversation.');
    navigate('/editor');
  };

  const handleDownloadResumeDraft = () => {
    const markdown = generateResumeMarkdownDraft(profile);
    const safeName = (profile.name || 'resume').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    downloadFile(markdown, `${safeName || 'resume'}-chat-draft.md`, 'text/markdown');
    toast.success('Resume draft downloaded.');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F1A] text-[#E5E7EB]">
      <div className="absolute inset-0 brand-grid opacity-25" />
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#7C3AED]/15 blur-3xl" />
      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#06B6D4]/12 blur-3xl" />

      <header className="sticky top-0 z-10 border-b border-white/8 bg-white/5 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-1 text-sm text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
              <FiArrowLeft size={14} /> Dashboard
            </Link>
            <span className="text-white/20">|</span>
            <span className="font-semibold text-[#E5E7EB] text-sm">Chat Builder</span>
          </div>
          <span className="text-xs text-[#9CA3AF]">{messageCountText}</span>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="max-w-3xl space-y-4 pb-40">
          <div className="border border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-2">Generation Status</h3>
            <p className="text-xs text-[#9CA3AF]">Missing fields: {missingFields.length ? missingFields.join(', ') : 'none'}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">ATS score: <span className="text-[#06B6D4] font-semibold">{ats?.score || 0}</span></p>
            {!!ats?.seededKeywords?.length && (
              <p className="text-xs text-[#9CA3AF] mt-1">Keywords: {ats.seededKeywords.slice(0, 8).join(', ')}</p>
            )}
            {!!ats?.recommendations?.length && (
              <p className="text-xs text-[#9CA3AF] mt-2">Tip: {ats.recommendations[0]}</p>
            )}
          </div>

          <div className="border border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] rounded-xl p-4 space-y-2">
            <button
              onClick={handleGeneratePortfolio}
              disabled={busy || !isReadyToGenerate}
              className="w-full rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-4 py-2 text-white text-sm font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FiZap size={14} /> Generate Portfolio
            </button>
            <button
              onClick={handleDownloadResumeDraft}
              disabled={busy}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[#E5E7EB] text-sm font-medium hover:border-[#06B6D4]/40 hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FiDownload size={14} /> Download Resume Draft
            </button>
            {!isReadyToGenerate && (
              <p className="text-[11px] text-[#6B7280]">Keep chatting until the assistant confirms enough information.</p>
            )}
          </div>
        </div>

        {/* Floating chatbot widget */}
        <div className="fixed bottom-24 right-4 z-30 sm:right-6">
          {chatOpen && (
            <div className="w-[calc(100vw-2rem)] max-w-[390px] h-[70vh] max-h-[620px] rounded-2xl border border-white/10 bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#7C3AED]/25 to-[#06B6D4]/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white">
                    <FiUser size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Grok Assistant</p>
                    <p className="text-[11px] text-[#9CA3AF]">{messageCountText}</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#E5E7EB] flex items-center justify-center"
                  aria-label="Close chat"
                >
                  <FiX size={14} />
                </button>
              </div>

              <div className="p-3 border-b border-white/10">
                <label className="block text-[11px] font-semibold text-[#9CA3AF] mb-1">Target Job Description (optional)</label>
                <textarea
                  rows={3}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full border border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] rounded-lg px-3 py-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-[#06B6D4]"
                  placeholder="Paste JD for targeting..."
                />
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((m, idx) => (
                  <div key={`${m.role}-${idx}`} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 mt-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white flex-shrink-0">
                        <FiUser size={12} />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-xl px-3 py-2 text-sm leading-6 ${
                        m.role === 'assistant'
                          ? 'bg-white/8 text-[#E5E7EB]'
                          : 'bg-[#06B6D4]/15 text-[#A5F3FC] border border-[#06B6D4]/20'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {busy && <p className="text-xs text-[#9CA3AF]">Grok is thinking...</p>}
              </div>

              <div className="p-3 border-t border-white/10 flex gap-2">
                <textarea
                  rows={2}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="flex-1 border border-white/10 bg-white/5 text-[#E5E7EB] placeholder-[#6B7280] rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#06B6D4]"
                  placeholder="Tell me your experience, projects, skills..."
                />
                <button
                  onClick={sendMessage}
                  disabled={!canSend}
                  className="rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-4 text-white hover:shadow-lg disabled:opacity-50"
                >
                  <FiSend />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar launcher */}
        <button
          onClick={() => setChatOpen((v) => !v)}
          className="fixed bottom-6 right-4 z-40 sm:right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-xl shadow-[#06B6D4]/25 flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Open chat assistant"
        >
          {chatOpen ? <FiX size={18} /> : <FiMessageSquare size={20} />}
        </button>
      </div>
    </div>
  );
}
