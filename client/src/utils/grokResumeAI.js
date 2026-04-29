import { puter } from '@heyputer/puter.js';

const GROK_MODEL = 'x-ai/grok-4.20';

export const PORTFOLIO_VARIANT_OPTIONS = {
  hero: ['centered', 'split', 'minimal', 'terminal'],
  about: ['bio', 'split'],
  skills: ['tags', 'bars'],
  timeline: ['vertical'],
  projects: ['grid', 'featured'],
  contact: ['minimal'],
};

export const DEFAULT_PORTFOLIO_SECTIONS = {
  hero: true,
  about: true,
  skills: true,
  timeline: true,
  projects: true,
  contact: true,
};

export const DEFAULT_PORTFOLIO_VARIANTS = {
  hero: 'centered',
  about: 'bio',
  skills: 'tags',
  timeline: 'vertical',
  projects: 'grid',
  contact: 'minimal',
};

export function normalizeResumeInput(data = {}) {
  return {
    name: data.name || '',
    title: data.title || '',
    email: data.email || '',
    phone: data.phone || '',
    location: data.location || '',
    linkedin: normalizeUrlField(data.linkedin, 'linkedin'),
    github: normalizeUrlField(data.github, 'github'),
    website: normalizeUrlField(data.website, 'website'),
    summary: data.summary || '',
    skills: Array.isArray(data.skills) ? data.skills.filter(Boolean) : [],
    experience: Array.isArray(data.experience)
      ? data.experience.map((job) => ({
          title: job?.title || '',
          company: job?.company || '',
          location: job?.location || '',
          duration: job?.duration || '',
          highlights: Array.isArray(job?.highlights) ? job.highlights.filter(Boolean) : [],
        }))
      : [],
    education: Array.isArray(data.education)
      ? data.education.map((edu) => ({
          degree: edu?.degree || '',
          institution: edu?.institution || '',
          duration: edu?.duration || '',
        }))
      : [],
    projects: Array.isArray(data.projects)
      ? data.projects.map((project) => ({
          name: project?.name || '',
          description: project?.description || '',
          tech: Array.isArray(project?.tech) ? project.tech.filter(Boolean) : [],
          link: normalizeUrlField(project?.link, 'website'),
        }))
      : [],
  };
}

export function generateResumeMarkdownDraft(profile = {}) {
  const p = normalizeResumeInput(profile);
  const lines = [];

  lines.push(`# ${p.name || 'Your Name'}`);
  lines.push(p.title || 'Professional Title');
  lines.push('');

  const contact = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  if (contact.length) {
    lines.push(contact.join(' | '));
    lines.push('');
  }

  if (p.summary) {
    lines.push('## Professional Summary');
    lines.push(p.summary);
    lines.push('');
  }

  if (p.skills.length) {
    lines.push('## Skills');
    lines.push(p.skills.join(', '));
    lines.push('');
  }

  if (p.experience.length) {
    lines.push('## Experience');
    lines.push('');
    p.experience.forEach((job) => {
      lines.push(`### ${job.title || 'Role'}${job.company ? ` - ${job.company}` : ''}`);
      lines.push([job.duration, job.location].filter(Boolean).join(' | '));
      (job.highlights || []).forEach((h) => lines.push(`- ${h}`));
      lines.push('');
    });
  }

  if (p.projects.length) {
    lines.push('## Projects');
    lines.push('');
    p.projects.forEach((proj) => {
      lines.push(`### ${proj.name || 'Project'}`);
      if (proj.description) lines.push(proj.description);
      if ((proj.tech || []).length) lines.push(`Tech: ${proj.tech.join(', ')}`);
      if (proj.link) lines.push(`Link: ${proj.link}`);
      lines.push('');
    });
  }

  if (p.education.length) {
    lines.push('## Education');
    lines.push('');
    p.education.forEach((edu) => {
      lines.push(`- ${[edu.degree, edu.institution].filter(Boolean).join(' - ')}${edu.duration ? ` (${edu.duration})` : ''}`);
    });
  }

  return lines.join('\n').trim();
}

function normalizeUrlField(value, type = 'website') {
  const raw = String(value || '').trim();
  if (!raw) return '';

  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^mailto:/i.test(raw)) return raw;

  if (type === 'linkedin') {
    const slug = raw
      .replace(/^linkedin\.com\//i, '')
      .replace(/^in\//i, '')
      .replace(/^\/+/, '')
      .replace(/^@/, '');
    return slug ? `https://www.linkedin.com/in/${slug}` : raw;
  }

  if (type === 'github') {
    const username = raw.replace(/^github\.com\//i, '').replace(/^\/+/, '').replace(/^@/, '');
    return username ? `https://github.com/${username}` : raw;
  }

  return raw ? `https://${raw.replace(/^\/+/, '')}` : '';
}

function extractJsonContent(text = '') {
  const trimmed = String(text).trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);

  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    return trimmed.slice(start, end + 1);
  }

  return trimmed;
}

function safeParseJson(text) {
  const jsonText = extractJsonContent(text);
  return JSON.parse(jsonText);
}

async function runGrok(prompt, { model = GROK_MODEL } = {}) {
  const response = await puter.ai.chat(prompt, { model });
  const content = response?.message?.content ?? response?.content ?? response ?? '';
  return typeof content === 'string' ? content : String(content);
}

async function parseOrRepairJson(raw, { model = GROK_MODEL } = {}) {
  try {
    return safeParseJson(raw);
  } catch {
    const repairPrompt = `
You are a strict JSON repair assistant.
Fix the payload below into valid JSON only.
Do not add markdown or commentary.

Payload:
${raw}
`;
    const repairedRaw = await runGrok(repairPrompt, { model });
    return safeParseJson(repairedRaw);
  }
}

function resolveSourcePayload(input) {
  const hasEnvelope = input && typeof input === 'object' && (input.parsed || input.rawText || input.extractedText);
  const rawText = String((hasEnvelope ? (input.rawText || input.extractedText) : '') || '').trim();
  const parsedResume = hasEnvelope ? (input.parsed || {}) : (input || {});
  const normalizedResume = normalizeResumeInput(parsedResume);

  return {
    rawText,
    parsedResume,
    normalizedResume,
    meta: {
      filename: hasEnvelope ? (input.filename || '') : '',
      mimeType: hasEnvelope ? (input.mimeType || '') : '',
      charCount: hasEnvelope ? (input.charCount || rawText.length || 0) : (rawText.length || 0),
    },
  };
}

function buildResumePrompt(profile, sections, variants) {
  return buildResumePromptWithOptions(profile, sections, variants, {});
}

function buildResumePromptWithOptions(profile, sections, variants, options = {}) {
  const sourcePayload = resolveSourcePayload(profile);
  const jobDescription = String(options.jobDescription || '').trim();
  const promptMode = options.mode || 'rewrite';
  const prompt = `
You are a senior resume strategist, ATS specialist, and portfolio copywriter.

Task:
1. Rebuild and rewrite ALL resume sections from the uploaded document data.
2. Rewrite portfolio statements for hero/about/project storytelling in content form.
3. Recommend the best portfolio template and section variants.
4. Provide ATS feedback and wording improvements.

Hard rules:
- Do not fabricate job titles, employers, dates, degrees, technologies, or achievements.
- Keep only facts that exist in the uploaded document source.
- Improve wording, clarity, and impact without changing meaning.
- Return ONLY valid JSON. No markdown, no commentary, no code fences.
- Use BOTH the extracted raw resume text and parsed JSON.
- First read raw text fully, then use parsed JSON to disambiguate placement.
- Regenerate each section (summary, skills, experience, education, projects, contact) from source.
- If multiple fields overlap, preserve the most complete fact and keep the rest consistent.
- Preserve every hyperlink as a plain URL string. Do not output markdown links or hidden anchors.
- If a social value is a username or slug, convert it to the full URL in the output.
- If a project, contact, or reference URL exists anywhere in the parsed data, keep it visible in the returned JSON.
- If a job description is provided, tailor wording to maximize match while staying truthful.
- Seed keywords naturally (not stuffing). Keep readability high.

Section extraction intent:
- Experience: include each role with title, company, duration, location, and highlights.
- Projects: include each project with name, description, tech stack, and plain URL link.
- Contact/social: include email, phone, location, LinkedIn, GitHub, website as plain strings.

Use this exact JSON schema:
{
  "profile": {
    "name": "string",
    "title": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "github": "string",
    "website": "string",
    "summary": "string",
    "skills": ["string"],
    "experience": [
      {
        "title": "string",
        "company": "string",
        "location": "string",
        "duration": "string",
        "highlights": ["string"]
      }
    ],
    "education": [
      {
        "degree": "string",
        "institution": "string",
        "duration": "string"
      }
    ],
    "projects": [
      {
        "name": "string",
        "description": "string",
        "tech": ["string"],
        "link": "string"
      }
    ]
  },
  "portfolioStatements": {
    "heroHeadline": "string",
    "aboutBio": "string",
    "projectNarrative": "string",
    "cta": "string"
  },
  "template": {
    "theme": "midnight",
    "sections": {
      "hero": true,
      "about": true,
      "skills": true,
      "timeline": true,
      "projects": true,
      "contact": true
    },
    "variants": {
      "hero": "centered|split|minimal|terminal",
      "about": "bio|split",
      "skills": "tags|bars",
      "timeline": "vertical",
      "projects": "grid|featured",
      "contact": "minimal"
    },
    "reason": "string"
  },
  "ats": {
    "score": 0,
    "formattingScore": 0,
    "keywordMatchScore": 0,
    "achievementScore": 0,
    "readabilityScore": 0,
    "strengths": ["string"],
    "issues": ["string"],
    "recommendations": ["string"],
    "keywordHints": ["string"],
    "seededKeywords": ["string"],
    "rewrittenSummary": "string",
    "wordingNotes": ["string"],
    "quickFixes": {
      "summary": "string",
      "skillsToAdd": ["string"],
      "experienceHighlights": [
        {
          "index": 0,
          "highlights": ["string"]
        }
      ],
      "projects": [
        {
          "index": 0,
          "description": "string"
        }
      ]
    }
  }
}

Input payload:
${JSON.stringify({
    mode: promptMode,
    targetJobDescription: jobDescription,
    source: sourcePayload,
    selectedSections: sections,
    selectedVariants: variants,
  }, null, 2)}

Return the best possible JSON object for the schema above.`;

  return prompt;
}

export async function generateResumeAiPlan(profile, sections = DEFAULT_PORTFOLIO_SECTIONS, variants = DEFAULT_PORTFOLIO_VARIANTS, options = {}) {
  const sourcePayload = resolveSourcePayload(profile);
  const prompt = buildResumePromptWithOptions(profile, sections, variants, options);
  const raw = await runGrok(prompt);
  const parsed = await parseOrRepairJson(raw);
  const profileOutput = normalizeResumeInput(parsed.profile || sourcePayload.parsedResume || profile);

  return {
    profile: profileOutput,
    portfolioStatements: {
      heroHeadline: parsed.portfolioStatements?.heroHeadline || '',
      aboutBio: parsed.portfolioStatements?.aboutBio || '',
      projectNarrative: parsed.portfolioStatements?.projectNarrative || '',
      cta: parsed.portfolioStatements?.cta || '',
    },
    template: {
      theme: parsed.template?.theme || 'midnight',
      sections: {
        ...DEFAULT_PORTFOLIO_SECTIONS,
        ...(parsed.template?.sections || {}),
      },
      variants: {
        ...DEFAULT_PORTFOLIO_VARIANTS,
        ...(parsed.template?.variants || {}),
      },
      reason: parsed.template?.reason || '',
    },
    ats: {
      score: Number.isFinite(parsed.ats?.score) ? parsed.ats.score : 0,
      formattingScore: Number.isFinite(parsed.ats?.formattingScore) ? parsed.ats.formattingScore : 0,
      keywordMatchScore: Number.isFinite(parsed.ats?.keywordMatchScore) ? parsed.ats.keywordMatchScore : 0,
      achievementScore: Number.isFinite(parsed.ats?.achievementScore) ? parsed.ats.achievementScore : 0,
      readabilityScore: Number.isFinite(parsed.ats?.readabilityScore) ? parsed.ats.readabilityScore : 0,
      strengths: Array.isArray(parsed.ats?.strengths) ? parsed.ats.strengths : [],
      issues: Array.isArray(parsed.ats?.issues) ? parsed.ats.issues : [],
      recommendations: Array.isArray(parsed.ats?.recommendations) ? parsed.ats.recommendations : [],
      keywordHints: Array.isArray(parsed.ats?.keywordHints) ? parsed.ats.keywordHints : [],
      seededKeywords: Array.isArray(parsed.ats?.seededKeywords) ? parsed.ats.seededKeywords : [],
      rewrittenSummary: parsed.ats?.rewrittenSummary || '',
      wordingNotes: Array.isArray(parsed.ats?.wordingNotes) ? parsed.ats.wordingNotes : [],
      quickFixes: {
        summary: parsed.ats?.quickFixes?.summary || '',
        skillsToAdd: Array.isArray(parsed.ats?.quickFixes?.skillsToAdd) ? parsed.ats.quickFixes.skillsToAdd : [],
        experienceHighlights: Array.isArray(parsed.ats?.quickFixes?.experienceHighlights)
          ? parsed.ats.quickFixes.experienceHighlights
          : [],
        projects: Array.isArray(parsed.ats?.quickFixes?.projects)
          ? parsed.ats.quickFixes.projects
          : [],
      },
    },
    source: sourcePayload,
    raw,
  };
}

export function applyAtsQuickFixes(profile = {}, ats = {}) {
  const base = normalizeResumeInput(profile);
  const fixes = ats?.quickFixes || {};

  const out = {
    ...base,
    summary: fixes.summary || base.summary,
    skills: [...base.skills],
    experience: base.experience.map((e) => ({ ...e, highlights: [...(e.highlights || [])] })),
    projects: base.projects.map((p) => ({ ...p })),
  };

  if (Array.isArray(fixes.skillsToAdd)) {
    fixes.skillsToAdd.forEach((skill) => {
      const val = String(skill || '').trim();
      if (val && !out.skills.includes(val)) out.skills.push(val);
    });
  }

  if (Array.isArray(fixes.experienceHighlights)) {
    fixes.experienceHighlights.forEach((item) => {
      const idx = Number(item?.index);
      if (!Number.isFinite(idx) || idx < 0 || idx >= out.experience.length) return;
      if (!Array.isArray(item?.highlights)) return;
      const merged = [...out.experience[idx].highlights];
      item.highlights.forEach((h) => {
        const val = String(h || '').trim();
        if (val && !merged.includes(val)) merged.push(val);
      });
      out.experience[idx].highlights = merged;
    });
  }

  if (Array.isArray(fixes.projects)) {
    fixes.projects.forEach((item) => {
      const idx = Number(item?.index);
      if (!Number.isFinite(idx) || idx < 0 || idx >= out.projects.length) return;
      const description = String(item?.description || '').trim();
      if (description) out.projects[idx].description = description;
    });
  }

  return out;
}

export async function rewriteResumeWithGrok(profile, sections, variants, options = {}) {
  return generateResumeAiPlan(profile, sections, variants, {
    ...options,
    mode: options.mode || 'rewrite',
  });
}

export async function checkResumeAtsWithGrok(profile, sections = DEFAULT_PORTFOLIO_SECTIONS, variants = DEFAULT_PORTFOLIO_VARIANTS, options = {}) {
  const result = await generateResumeAiPlan(profile, sections, variants, {
    ...options,
    mode: 'ats-check',
  });
  return result.ats;
}

export async function recommendPortfolioTemplateWithGrok(profile, sections = DEFAULT_PORTFOLIO_SECTIONS, variants = DEFAULT_PORTFOLIO_VARIANTS, options = {}) {
  const result = await generateResumeAiPlan(profile, sections, variants, {
    ...options,
    mode: 'template-recommendation',
  });
  return result.template;
}

function buildConversationPrompt(messages = [], profile = {}, options = {}) {
  const baseProfile = normalizeResumeInput(profile);
  const transcript = messages
    .map((m) => `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${String(m.content || '').trim()}`)
    .join('\n\n');

  return `
You are a resume + portfolio chatbot assistant.

Goal:
- Continue the conversation naturally.
- Extract user information from chat and update structured resume data.
- Help user produce both a resume draft and portfolio-ready content.
- Keep all facts truthful, no fabrication.

Rules:
- Ask concise follow-up questions for missing critical details.
- Keep hyperlinks as plain URLs.
- Normalize linkedin/github handles into full URLs.
- Return ONLY valid JSON.

JSON schema:
{
  "assistantReply": "string",
  "profile": {
    "name": "string",
    "title": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "github": "string",
    "website": "string",
    "summary": "string",
    "skills": ["string"],
    "experience": [{ "title": "string", "company": "string", "location": "string", "duration": "string", "highlights": ["string"] }],
    "education": [{ "degree": "string", "institution": "string", "duration": "string" }],
    "projects": [{ "name": "string", "description": "string", "tech": ["string"], "link": "string" }]
  },
  "portfolio": {
    "sections": { "hero": true, "about": true, "skills": true, "timeline": true, "projects": true, "contact": true },
    "variants": { "hero": "centered|split|minimal|terminal", "about": "bio|split", "skills": "tags|bars", "timeline": "vertical", "projects": "grid|featured", "contact": "minimal" },
    "reason": "string"
  },
  "ats": {
    "score": 0,
    "recommendations": ["string"],
    "seededKeywords": ["string"]
  },
  "missingFields": ["string"],
  "isReadyToGenerate": false
}

Context:
${JSON.stringify({
    targetJobDescription: String(options.jobDescription || ''),
    currentProfile: baseProfile,
    conversation: transcript,
  }, null, 2)}

Return JSON only.`;
}

export async function chatBuildResumeAndPortfolio(messages = [], profile = {}, options = {}) {
  const prompt = buildConversationPrompt(messages, profile, options);
  const raw = await runGrok(prompt);
  const parsed = await parseOrRepairJson(raw);

  return {
    assistantReply: String(parsed.assistantReply || 'Great, I updated your draft. What should I refine next?'),
    profile: normalizeResumeInput(parsed.profile || profile),
    portfolio: {
      sections: {
        ...DEFAULT_PORTFOLIO_SECTIONS,
        ...(parsed.portfolio?.sections || {}),
      },
      variants: {
        ...DEFAULT_PORTFOLIO_VARIANTS,
        ...(parsed.portfolio?.variants || {}),
      },
      reason: String(parsed.portfolio?.reason || ''),
    },
    ats: {
      score: Number.isFinite(parsed.ats?.score) ? parsed.ats.score : 0,
      recommendations: Array.isArray(parsed.ats?.recommendations) ? parsed.ats.recommendations : [],
      seededKeywords: Array.isArray(parsed.ats?.seededKeywords) ? parsed.ats.seededKeywords : [],
    },
    missingFields: Array.isArray(parsed.missingFields) ? parsed.missingFields : [],
    isReadyToGenerate: Boolean(parsed.isReadyToGenerate),
  };
}
