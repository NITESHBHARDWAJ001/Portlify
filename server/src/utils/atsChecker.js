function tokenize(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function unique(arr) {
  return [...new Set(arr)];
}

export function checkATSFriendliness(profile = {}, jobDescription = '') {
  const issues = [];
  const suggestions = [];

  const resumeText = [
    profile.summary,
    profile.about,
    ...(profile.skills || []).map((s) => (typeof s === 'string' ? s : s.name || '')),
    ...(profile.experience || []).flatMap((e) => [e.title, e.company, ...(e.highlights || [])]),
    ...(profile.projects || []).flatMap((p) => [p.name, p.description, ...(p.tech || [])]),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  const jdTokens = unique(tokenize(jobDescription)).filter((t) => t.length > 2);
  const keywordCandidates = jdTokens.filter((t) => /[a-z]/.test(t)).slice(0, 60);

  const matched = keywordCandidates.filter((k) => resumeText.includes(k));
  const missing = keywordCandidates.filter((k) => !resumeText.includes(k));

  const keywordCoverage = keywordCandidates.length
    ? Math.round((matched.length / keywordCandidates.length) * 100)
    : 0;

  if (!profile.summary || profile.summary.length < 120) {
    issues.push('Professional summary is missing or too short.');
    suggestions.push('Add a 3-5 line summary with role, years, domain, and measurable impact.');
  }

  if (!(profile.skills || []).length) {
    issues.push('Skills section is missing.');
    suggestions.push('Add a focused skills section with hard skills relevant to the role.');
  }

  if ((profile.experience || []).length === 0) {
    issues.push('Experience section is missing.');
    suggestions.push('Add role-wise experience with action verbs and outcomes.');
  }

  const hasMetrics = /\b\d+%|\$\d+|\d+\+|\b\d{2,}\b/.test(resumeText);
  if (!hasMetrics) {
    issues.push('No measurable achievements detected.');
    suggestions.push('Include quantified impact (%, revenue, latency, throughput, cost).');
  }

  if (!jobDescription || jobDescription.trim().length < 50) {
    suggestions.push('Add a target job description to run keyword alignment scoring.');
  } else if (keywordCoverage < 45) {
    issues.push('Low keyword alignment with target job description.');
    suggestions.push('Improve alignment by naturally adding missing role-specific keywords.');
  }

  const sectionScore = [
    profile.summary ? 20 : 0,
    (profile.skills || []).length ? 20 : 0,
    (profile.experience || []).length ? 25 : 0,
    (profile.projects || []).length ? 15 : 0,
    hasMetrics ? 10 : 0,
    Math.round((keywordCoverage / 100) * 10),
  ].reduce((a, b) => a + b, 0);

  const score = Math.max(0, Math.min(100, sectionScore));

  return {
    score,
    keywordCoverage,
    matchedKeywords: matched.slice(0, 30),
    missingKeywords: missing.slice(0, 30),
    issues,
    suggestions,
  };
}
