// ============================================================
// Resume Parser — Pure regex/heuristic text extraction
// Works on plain text output from pdf-parse or mammoth
// ============================================================

// ─── Regex constants ─────────────────────────────────────────────────────────

const EMAIL_RE = /[\w.+\-]+@[\w\-]+\.[a-zA-Z]{2,}/i;
const PHONE_RE = /(\+?1[\s.-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}/;
const LINKEDIN_RE = /linkedin\.com\/in\/([\w\-]+)/i;
const GITHUB_RE = /github\.com\/([\w\-]+)/i;
const WEBSITE_RE = /https?:\/\/(?!(?:www\.)?(linkedin|github)\.com)([\w\-]+\.)+[\w]{2,}[^\s]*/i;

// Matches a date range like "Jan 2020 – Dec 2022", "2020 - Present", "01/2020 to 2023"
const DURATION_RE = new RegExp(
  '(' +
    '(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|' +
    'jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)' +
    "[\\s']?\\d{2,4}" +
  '|\\d{1,2}\\/\\d{4}|\\d{4}' +
  ')' +
  '\\s*[-–—\\/](?:to)?\\s*' +
  '(' +
    '(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|' +
    'jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)' +
    "[\\s']?\\d{2,4}" +
  '|\\d{1,2}\\/\\d{4}|\\d{4}|present|current|now|ongoing' +
  ')',
  'gi'
);

// ─── Section header keywords ──────────────────────────────────────────────────

const SECTION_DEFS = [
  {
    key: 'summary',
    re: /^(summary|about\s*me?|profile|objective|career\s*objective|overview|professional\s*summary|personal\s*statement|introduction)$/i,
  },
  {
    key: 'experience',
    re: /^(experience|work\s*experience|employment|work\s*history|professional\s*experience|career\s*history|positions?\s*held|employment\s*history|internships?)$/i,
  },
  {
    key: 'education',
    re: /^(education|academics?|academic\s*background|educational\s*background|qualifications?|degrees?|schooling)$/i,
  },
  {
    key: 'skills',
    re: /^(skills?|technical\s*skills?|technologies|expertise|competencies|core\s*competencies|technical\s*expertise|tools?|programming\s*languages?|languages?\s*&?\s*tools?|tech\s*stack|stack|proficiencies|key\s*skills?)$/i,
  },
  {
    key: 'projects',
    re: /^(projects?|personal\s*projects?|portfolio|side\s*projects?|key\s*projects?|notable\s*projects?|open[\s\-]?source\s*projects?|selected\s*projects?)$/i,
  },
  {
    key: 'certifications',
    re: /^(certifications?|certificates?|awards?|achievements?|honors?|accomplishments?)$/i,
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Parse raw resume text into a structured object.
 * @param {string} rawText  Plain text from pdf-parse or mammoth
 * @returns {object}        Structured resume data
 */
export function parseResume(rawText) {
  const text = normalizeText(rawText);
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const sectionMap = splitIntoSections(lines);

  const name = parseName(lines);
  const contact = parseContactBlock(lines.slice(0, 14).join('\n'));

  return {
    name,
    title: contact.title || inferTitle(sectionMap.experience || sectionMap.summary || ''),
    email: contact.email,
    phone: contact.phone,
    location: contact.location,
    linkedin: contact.linkedin,
    github: contact.github,
    website: contact.website,
    summary: parseSummary(sectionMap),
    skills: parseSkills(sectionMap),
    experience: parseExperience(sectionMap),
    education: parseEducation(sectionMap),
    projects: parseProjects(sectionMap),
  };
}

// ─── Normalisation ────────────────────────────────────────────────────────────

function normalizeText(text) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')         // collapse horizontal whitespace
    .replace(/\n{3,}/g, '\n\n');     // collapse triple+ blank lines
}

// ─── Section splitting ────────────────────────────────────────────────────────

function splitIntoSections(lines) {
  const map = { header: [] };
  let currentKey = 'header';

  for (const line of lines) {
    const headerKey = matchSectionHeader(line);
    if (headerKey) {
      currentKey = headerKey;
      if (!map[currentKey]) map[currentKey] = [];
    } else {
      if (!map[currentKey]) map[currentKey] = [];
      map[currentKey].push(line);
    }
  }

  // Convert arrays to joined strings
  const out = {};
  for (const [k, v] of Object.entries(map)) {
    out[k] = Array.isArray(v) ? v.join('\n') : v;
  }
  return out;
}

function matchSectionHeader(line) {
  // Strip trailing decoration chars (dots, dashes, underscores)
  const clean = line.replace(/[\s\-=_.•*:]+$/, '').trim();
  for (const { key, re } of SECTION_DEFS) {
    if (re.test(clean)) return key;
  }
  return null;
}

// ─── Name ─────────────────────────────────────────────────────────────────────

function parseName(lines) {
  for (const line of lines.slice(0, 8)) {
    if (!line) continue;
    if (EMAIL_RE.test(line)) continue;
    if (PHONE_RE.test(line)) continue;
    if (/https?:\/\//.test(line)) continue;
    if (/linkedin|github/i.test(line)) continue;

    const words = line.split(/\s+/);
    // 2–5 words, each starting with a capital letter, no digits, reasonable length
    if (
      words.length >= 2 &&
      words.length <= 5 &&
      words.every((w) => /^[A-Z]/.test(w)) &&
      line.length < 60 &&
      !/\d/.test(line)
    ) {
      return line;
    }
  }
  return '';
}

// ─── Contact block ────────────────────────────────────────────────────────────

function parseContactBlock(blockText) {
  const emailM = blockText.match(EMAIL_RE);
  const phoneM = blockText.match(PHONE_RE);
  const linkedinM = blockText.match(LINKEDIN_RE);
  const githubM = blockText.match(GITHUB_RE);
  const websiteM = blockText.match(WEBSITE_RE);

  // Location: "City, ST" or "City, Country"
  const locationM = blockText.match(/\b([A-Z][a-zA-Z\s\-]+,\s*[A-Z][a-zA-Z\s]{1,30})\b/);

  // The line right after the name that isn't contact info is likely the title
  const lines = blockText.split('\n').map((l) => l.trim()).filter(Boolean);
  let title = '';
  let nameSkipped = false;
  for (const line of lines.slice(0, 7)) {
    if (!nameSkipped) {
      nameSkipped = true; // first line is name, skip it
      continue;
    }
    // Skip obvious contact-info lines
    if (EMAIL_RE.test(line)) continue;
    if (PHONE_RE.test(line)) continue;
    if (/https?:\/\//.test(line)) continue;
    if (/linkedin|github/i.test(line)) continue;
    if (/^\+?[\d\s().\-]{8,}$/.test(line)) continue;
    // A professional title is short and looks like text
    if (line.length > 0 && line.length < 100) {
      title = line;
      break;
    }
  }

  return {
    email: emailM ? emailM[0] : '',
    phone: phoneM ? phoneM[0].trim() : '',
    linkedin: linkedinM ? linkedinM[1] : '',
    github: githubM ? githubM[1] : '',
    website: websiteM ? websiteM[0] : '',
    location: locationM ? locationM[1].trim() : '',
    title,
  };
}

// ─── Summary / Bio ────────────────────────────────────────────────────────────

function parseSummary(sections) {
  const raw = (sections.summary || '').replace(/\n/g, ' ').trim();
  return raw.slice(0, 800);
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function parseSkills(sections) {
  const raw = sections.skills || '';
  if (!raw) return [];

  const skills = new Set();
  const lines = raw.split('\n').filter(Boolean);

  for (const line of lines) {
    // Strip "Category: " prefix (e.g. "Frontend: React, Vue")
    const withoutCat = line.replace(/^[\w\s&\/\-]+:\s*/i, '');
    // Split by common delimiters
    withoutCat
      .split(/[,|•\t·]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s.length < 45)
      .forEach((s) => skills.add(s));
  }

  return [...skills].slice(0, 30);
}

// ─── Experience ───────────────────────────────────────────────────────────────

function parseExperience(sections) {
  const raw = sections.experience || '';
  if (!raw) return [];

  const jobs = [];
  const lines = raw.split('\n').filter(Boolean);
  let current = null;

  const flush = () => {
    if (current && (current.title || current.company)) {
      jobs.push(current);
    }
    current = null;
  };

  for (const line of lines) {
    // Bullet / highlight
    if (/^[•\-*◦‣⁃]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      if (current) {
        current.highlights.push(line.replace(/^[•\-*◦‣⁃\d.]\s+/, '').trim());
      }
      continue;
    }

    // Separator line
    if (/^[-=_*]{3,}$/.test(line)) continue;

    // Duration detected on this line
    const durationMatch = extractDuration(line);
    if (durationMatch) {
      const withoutDates = line
        .replace(DURATION_RE, '')
        .replace(/[-–|,·]+$/, '')
        .trim();

      if (current) {
        if (!current.duration) current.duration = durationMatch;
        // Pipe-separated company + location on the same date line
        if (withoutDates) {
          const parts = withoutDates.split(/\s*[|·]\s*/);
          if (!current.company && parts[0]) current.company = parts[0];
          if (!current.location && parts[1]) current.location = parts[1];
        }
      } else {
        current = { title: withoutDates, company: '', location: '', duration: durationMatch, highlights: [] };
      }
      continue;
    }

    // City, State pattern — location for current job
    if (/^[A-Z][a-zA-Z\s\-]+,\s*[A-Z]{2,}$/.test(line) && current) {
      if (!current.location) current.location = line;
      continue;
    }

    // Pipe-separated line: "Google | Mountain View, CA" or "Title | Company"
    if (/\|/.test(line)) {
      const parts = line.split(/\s*\|\s*/);
      if (current) {
        if (!current.company) current.company = parts[0] || '';
        if (!current.location && parts[1]) current.location = parts[1];
      } else {
        current = { title: parts[0] || '', company: parts[1] || '', location: parts[2] || '', duration: '', highlights: [] };
      }
      continue;
    }

    // Short, capitalised line → either title or company
    if (line.length < 3) continue;

    if (current) {
      if (current.title && !current.company) {
        current.company = line;
      } else {
        // New job entry
        flush();
        current = { title: line, company: '', location: '', duration: '', highlights: [] };
      }
    } else {
      current = { title: line, company: '', location: '', duration: '', highlights: [] };
    }
  }

  flush();
  return jobs.slice(0, 8);
}

// ─── Education ────────────────────────────────────────────────────────────────

function parseEducation(sections) {
  const raw = sections.education || '';
  if (!raw) return [];

  const entries = [];
  const lines = raw.split('\n').filter(Boolean);
  let current = null;

  const flush = () => {
    if (current && (current.degree || current.institution)) entries.push(current);
    current = null;
  };

  for (const line of lines) {
    if (/^[-=_*]{3,}$/.test(line)) continue;

    const isDegree = /\b(bachelor|master|doctor|phd|ph\.d|b\.?s\.?c?|m\.?s\.?c?|b\.?a|m\.?a|mba|associate|diploma|degree|honors?|a\.?a\.?s?)\b/i.test(line);
    const durationMatch = extractDuration(line);

    if (isDegree) {
      flush();
      current = { degree: line, institution: '', duration: '' };
    } else if (durationMatch) {
      if (!current) current = { degree: '', institution: '', duration: '' };
      current.duration = durationMatch;
      const withoutDate = line.replace(DURATION_RE, '').replace(/[-–|,·]+$/, '').trim();
      if (withoutDate && !current.institution) current.institution = withoutDate;
    } else if (current && !current.institution) {
      current.institution = line;
    } else if (!current) {
      // Line before a degree line → could be institution
      current = { degree: '', institution: line, duration: '' };
    }
  }
  flush();
  return entries.slice(0, 4);
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function parseProjects(sections) {
  const raw = sections.projects || '';
  if (!raw) return [];

  const projects = [];
  const lines = raw.split('\n').filter(Boolean);
  let current = null;

  const flush = () => {
    if (current && current.name) projects.push(current);
    current = null;
  };

  for (const line of lines) {
    // Tech line: "Tech: React, Node.js" or "Built with: ..."
    if (/^(tech(?:nologies|nology|[\s_\-]?stack)?|built\s*with|stack|tools?|languages?)\s*:/i.test(line)) {
      if (current) {
        current.tech = line
          .replace(/^[^:]+:\s*/i, '')
          .split(/[,|•·]+/)
          .map((t) => t.trim())
          .filter(Boolean);
      }
      continue;
    }

    // URL
    if (/https?:\/\//.test(line) && current) {
      if (!current.link) current.link = line.trim();
      continue;
    }

    // Bullet → description
    if (/^[•\-*◦‣⁃]\s+/.test(line)) {
      if (current) {
        const text = line.replace(/^[•\-*◦‣⁃]\s+/, '').trim();
        current.description = current.description
          ? current.description + ' ' + text
          : text;
      }
      continue;
    }

    // Skip date lines
    if (extractDuration(line)) continue;

    // Short capitalised line with no typical body-text indicators → project name
    const wordCount = line.split(/\s+/).length;
    if (wordCount <= 8 && /^[A-Z]/.test(line) && line.length < 70) {
      flush();
      current = { name: line, description: '', tech: [], link: '' };
    } else if (current && !current.description) {
      current.description = line;
    }
  }

  flush();
  return projects.slice(0, 6);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractDuration(text) {
  const m = text.match(DURATION_RE);
  return m ? m[0].trim() : '';
}

function inferTitle(text) {
  if (!text) return '';
  const m = text.match(
    /\b(senior|junior|lead|principal|staff|mid[\s\-]?level|associate)?\s*(software|web|frontend|back[\s\-]?end|full[\s\-]?stack|mobile|ios|android|devops|cloud|data|ml|machine\s*learning|ai|ux|ui|product|systems?|platform)\s*(engineer|developer|architect|designer|manager|analyst|scientist|intern)\b/i
  );
  if (m) return m[0].replace(/\s+/g, ' ').trim();
  return '';
}
