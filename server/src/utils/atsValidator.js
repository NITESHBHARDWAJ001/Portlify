/**
 * Comprehensive ATS (Applicant Tracking System) Resume Validator
 * Checks for common issues that prevent ATS parsing and visibility
 */

export class ATSValidator {
  constructor(profile = {}) {
    this.profile = profile;
    this.issues = [];
    this.warnings = [];
    this.score = 100;
  }

  /**
   * Run full ATS validation
   */
  validate() {
    this.validateContactInfo();
    this.validateFormatting();
    this.validateContent();
    this.validateKeywords();
    this.validateLength();

    return {
      score: this.score,
      issues: this.issues,
      warnings: this.warnings,
      isATSFriendly: this.issues.length === 0,
      summary: this.generateSummary()
    };
  }

  /**
   * Validate contact information
   */
  validateContactInfo() {
    const { email, phone, name } = this.profile;

    if (!email || !email.includes('@')) {
      this.issues.push('Missing or invalid email address');
      this.score -= 10;
    }

    if (!name || name.trim().length < 2) {
      this.issues.push('Name is missing or too short');
      this.score -= 15;
    }

    // Phone is optional but good to have
    if (!phone) {
      this.warnings.push('Consider adding a phone number for better ATS parsing');
      this.score -= 2;
    }

    // Check for special characters in contact that might break parsing
    if (email && /[^a-zA-Z0-9@._-]/.test(email)) {
      this.issues.push('Email contains invalid characters');
      this.score -= 5;
    }
  }

  /**
   * Validate document formatting
   */
  validateFormatting() {
    // Check for proper section structure
    const sections = ['experience', 'education', 'skills'];
    sections.forEach((section) => {
      if (!this.profile[section] || this.profile[section].length === 0) {
        this.warnings.push(`Consider adding a ${section} section for better ATS matching`);
        this.score -= 3;
      }
    });

    // Check for adequate content length
    const experienceCount = (this.profile.experience || []).length;
    if (experienceCount < 1) {
      this.warnings.push('Add at least one work experience entry');
      this.score -= 5;
    }

    if (experienceCount > 10) {
      this.warnings.push('Consider limiting experience to 10 most recent/relevant positions');
    }
  }

  /**
   * Validate content quality
   */
  validateContent() {
    const { experience = [], education = [], skills = [] } = this.profile;

    // Validate experience entries
    experience.forEach((exp, idx) => {
      if (!exp.title || !exp.company) {
        this.issues.push(`Experience entry ${idx + 1}: Missing job title or company name`);
        this.score -= 5;
      }

      if (!exp.duration) {
        this.warnings.push(`Experience entry ${idx + 1}: Consider adding duration dates`);
        this.score -= 2;
      }

      if (exp.highlights && exp.highlights.length === 0) {
        this.warnings.push(`Experience entry ${idx + 1}: Add achievement bullets for better ATS matching`);
      }
    });

    // Validate education entries
    education.forEach((edu, idx) => {
      if (!edu.degree || !edu.institution) {
        this.issues.push(`Education entry ${idx + 1}: Missing degree or institution name`);
        this.score -= 5;
      }
    });

    // Validate skills
    if (skills.length === 0) {
      this.warnings.push('Add skills section for better keyword matching');
      this.score -= 5;
    }

    if (skills.length > 50) {
      this.warnings.push('Consider limiting skills to 50 most relevant items');
    }
  }

  /**
   * Validate keyword optimization for ATS
   */
  validateKeywords() {
    const { skills = [], summary = '', experience = [] } = this.profile;

    const fullText = `${summary} ${skills.join(' ')} ${experience
      .map((e) => `${e.title} ${e.company} ${(e.highlights || []).join(' ')}`)
      .join(' ')}`.toLowerCase();

    const atsKeywords = [
      // Technical
      'technical',
      'experienced',
      'developed',
      'implemented',
      'designed',
      'managed',
      // Action verbs
      'led',
      'created',
      'built',
      'achieved',
      'improved',
      'increased'
    ];

    const missingKeywords = atsKeywords.filter((keyword) => !fullText.includes(keyword));

    if (missingKeywords.length > 0) {
      this.warnings.push(
        `Consider using action verbs like: ${missingKeywords.slice(0, 3).join(', ')}`
      );
      this.score -= missingKeywords.length * 0.5;
    }

    // Check for numeric results (ATS loves quantified achievements)
    if (!/\b\d+(%|increase|decrease|improved|growth)\b/i.test(fullText)) {
      this.warnings.push('Add quantified achievements (e.g., "increased sales by 25%")');
      this.score -= 3;
    }
  }

  /**
   * Validate document length
   */
  validateLength() {
    const { experience = [], education = [], projects = [] } = this.profile;

    // Calculate estimated pages (rough estimate)
    const entryCount = experience.length + education.length + projects.length;
    const estimatedPages = Math.ceil(entryCount / 3);

    if (estimatedPages > 2) {
      this.warnings.push('Resume may exceed 2 pages - consider condensing for better ATS parsing');
    }

    if (entryCount < 3) {
      this.warnings.push('Add more professional history or project experience');
    }
  }

  /**
   * Generate ATS compatibility summary
   */
  generateSummary() {
    const recommendations = [];

    if (this.issues.length > 0) {
      recommendations.push('❌ Critical Issues - Fix before submitting:');
      this.issues.forEach((issue) => recommendations.push(`   • ${issue}`));
    }

    if (this.warnings.length > 0) {
      recommendations.push('⚠️  Recommendations to improve ATS matching:');
      this.warnings.forEach((warning) => recommendations.push(`   • ${warning}`));
    }

    if (this.issues.length === 0 && this.warnings.length <= 2) {
      recommendations.push('✅ Resume is well-optimized for ATS systems');
    }

    return {
      text: recommendations.join('\n'),
      atsScore: Math.max(0, Math.min(100, this.score)),
      status: this.issues.length === 0 ? 'READY' : 'NEEDS_FIXES'
    };
  }

  /**
   * Get specific recommendations for sections
   */
  getRecommendations() {
    return {
      contactInfo: this.getContactInfoRecommendations(),
      experience: this.getExperienceRecommendations(),
      skills: this.getSkillsRecommendations(),
      education: this.getEducationRecommendations()
    };
  }

  /**
   * Recommendations for contact info
   */
  getContactInfoRecommendations() {
    return [
      'Use standard email format (firstname.lastname@domain.com)',
      'Include full phone number with area code',
      'Add professional title/headline',
      'Include specific location (City, State) - do not use abbreviations',
      'Use complete URLs for LinkedIn/Portfolio - avoid shortened links'
    ];
  }

  /**
   * Recommendations for experience section
   */
  getExperienceRecommendations() {
    return [
      'Use standard date format (MM/YYYY or "Month Year")',
      'Start each bullet with strong action verbs (Led, Designed, Implemented, etc.)',
      'Include quantifiable results (metrics, percentages, amounts)',
      'Use industry-specific keywords from job description',
      'Focus on achievements, not just duties',
      'Keep to 5-7 bullets per role, most recent first'
    ];
  }

  /**
   * Recommendations for skills section
   */
  getSkillsRecommendations() {
    return [
      'Organize skills by category (Technical Skills, Languages, Tools, etc.)',
      'Use standard names for technologies (e.g., "React" not "Reactjs")',
      'Include both hard skills and relevant soft skills',
      'Match skills to job description keywords',
      'Avoid outdated technologies unless specifically relevant',
      'List skills in order of proficiency and relevance'
    ];
  }

  /**
   * Recommendations for education section
   */
  getEducationRecommendations() {
    return [
      'Include degree type (B.S., M.S., B.A., etc.)',
      'Add major/field of study',
      'Include graduation date or "In Progress"',
      'Add GPA if 3.5 or higher',
      'Include relevant coursework if recent graduate',
      'Add academic honors or achievements if space allows'
    ];
  }
}

/**
 * Check if resume markdown is ATS-friendly
 */
export function checkATSCompatibility(profile) {
  const validator = new ATSValidator(profile);
  return validator.validate();
}

/**
 * Improve a resume markdown for ATS compatibility
 */
export function optimizeForATS(resumeMarkdown) {
  const optimized = resumeMarkdown
    // Use standard formatting
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers but keep content
    .replace(/__(.*?)__/g, '$1') // Remove underline markers
    .replace(/~~(.*?)~~/g, '$1') // Remove strikethrough
    // Standardize bullet points
    .replace(/^\s*[-*]\s+/gm, '• ')
    // Remove extra whitespace
    .replace(/\n\n\n+/g, '\n\n')
    // Standardize section headers
    .replace(/^#+\s+/gm, (match) => {
      const level = match.match(/#/g).length;
      return level <= 2 ? match.toUpperCase().trim() + '\n' : match;
    });

  return optimized;
}
