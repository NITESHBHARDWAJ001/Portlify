/**
 * Professional Resume PDF Generator
 * Generates ATS-friendly PDFs with multiple template styles
 */

import PDFDocument from 'pdfkit';

export class ResumePDFGenerator {
  constructor(template = 'modern') {
    this.template = template;
    this.doc = null;
    this.style = this.getTemplateStyle(template);
    this.fontMap = this.getFontMap(template);
  }

  /**
   * Generate PDF buffer from profile
   */
  async generateBuffer(profile = {}, resumeMarkdown = '') {
    return new Promise((resolve, reject) => {
      const chunks = [];

      try {
        this.doc = new PDFDocument({
          margin: this.style.margins.left,
          bufferPages: true
        });

        this.doc.on('data', (chunk) => chunks.push(chunk));
        this.doc.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        this.doc.on('error', reject);

        this.renderResume(profile, resumeMarkdown);
        this.doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Save PDF to file
   */
  async saveToFile(filePath, profile = {}, resumeMarkdown = '') {
    return new Promise((resolve, reject) => {
      try {
        this.doc = new PDFDocument({
          margin: this.style.margins.left
        });

        const stream = require('fs').createWriteStream(filePath);
        this.doc.pipe(stream);

        this.doc.on('error', reject);
        stream.on('error', reject);
        stream.on('finish', resolve);

        this.renderResume(profile, resumeMarkdown);
        this.doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Render complete resume
   */
  renderResume(profile = {}, resumeMarkdown = '') {
    this.renderHeader(profile);
    this.renderContent(resumeMarkdown);
    this.addPageNumbers();
  }

  /**
   * Render header (name, title, contact info)
   */
  renderHeader(profile = {}) {
    const { name = 'Your Name', headline = 'Professional', email, phone, location, linkedin, github, website } = profile;

    // Name
    this.doc
      .font(this.fontMap.bold)
      .fontSize(this.style.nameSize)
      .fillColor(this.style.headingColor)
      .text(name, { align: 'center', lineGap: 2 });

    this.doc.moveDown(0.15);

    // Professional headline
    this.doc
      .font(this.fontMap.regular)
      .fontSize(this.style.titleSize)
      .fillColor('#374151')
      .text(headline, { align: 'center' });

    this.doc.moveDown(0.25);

    // Contact information
    const contactInfo = [];
    if (email) contactInfo.push(email);
    if (phone) contactInfo.push(phone);
    if (location) contactInfo.push(location);

    if (contactInfo.length) {
      this.doc
        .font(this.fontMap.regular)
        .fontSize(9.5)
        .fillColor('#4b5563')
        .text(contactInfo.join(' • '), { align: 'center', lineGap: 1 });
      this.doc.moveDown(0.1);
    }

    // Social links
    const socialLinks = [];
    if (linkedin) socialLinks.push(`LinkedIn: ${linkedin}`);
    if (github) socialLinks.push(`GitHub: ${github}`);
    if (website) socialLinks.push(`Portfolio: ${website}`);

    if (socialLinks.length) {
      this.doc
        .font(this.fontMap.regular)
        .fontSize(9)
        .fillColor(this.style.accentColor)
        .text(socialLinks.join(' | '), { align: 'center', lineGap: 0.5 });
    }

    // Decorative divider
    this.doc.moveDown(0.35);
    this.doc
      .strokeColor('#d1d5db')
      .lineWidth(0.5)
      .moveTo(this.style.margins.left, this.doc.y)
      .lineTo(this.doc.page.width - this.style.margins.right, this.doc.y)
      .stroke();

    this.doc.moveDown(0.5);
  }

  /**
   * Render main content (markdown)
   */
  renderContent(resumeMarkdown = '') {
    const lines = resumeMarkdown.split('\n');
    let currentSection = null;
    let isFirstItem = true;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if we're running out of space
      if (this.doc.y > this.doc.page.height - this.style.margins.bottom - 40) {
        this.doc.addPage();
      }

      if (!line.trim()) {
        if (this.doc.y < this.doc.page.height - 40) {
          this.doc.moveDown(0.2);
        }
        continue;
      }

      // Main sections (##)
      if (line.startsWith('## ')) {
        currentSection = line.replace(/^##\s*/, '').trim();

        if (i > 0) this.doc.moveDown(0.3);

        this.doc
          .font(this.fontMap.bold)
          .fontSize(this.style.headingSize)
          .fillColor(this.style.headingColor)
          .text(currentSection);

        // Underline
        const lineWidth = this.doc.widthOfString(currentSection);
        this.doc
          .strokeColor(this.style.accentColor)
          .lineWidth(1.5)
          .moveTo(this.style.margins.left, this.doc.y)
          .lineTo(this.style.margins.left + lineWidth, this.doc.y)
          .stroke();

        this.doc.moveDown(0.25);
        isFirstItem = true;
        continue;
      }

      // Subsections (###)
      if (line.startsWith('### ')) {
        const title = line.replace(/^###\s*/, '').trim();

        if (!isFirstItem) this.doc.moveDown(0.15);

        this.doc
          .font(this.fontMap.bold)
          .fontSize(this.style.headingSize - 1)
          .fillColor(this.style.headingColor)
          .text(title);

        isFirstItem = false;
        continue;
      }

      // Bold company/institution info
      if (line.includes('**') && !line.startsWith('-')) {
        this.renderBoldLine(line);
        continue;
      }

      // Bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        this.renderBulletPoint(line);
        continue;
      }

      // Links and special formatting
      if (line.toLowerCase().startsWith('link:') || line.toLowerCase().startsWith('tech:')) {
        this.renderSpecialLine(line);
        continue;
      }

      // Regular text
      this.doc
        .font(this.fontMap.regular)
        .fontSize(this.style.bodySize)
        .fillColor('#374151')
        .text(line, {
          lineGap: 1,
          paragraphGap: 2
        });
    }
  }

  /**
   * Render bold formatted lines
   */
  renderBoldLine(line) {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const options = {
      continued: true,
      lineGap: 1
    };

    parts.forEach((part, idx) => {
      if (!part) return;

      const isBold = idx % 2 === 1;
      this.doc
        .font(isBold ? this.fontMap.bold : this.fontMap.regular)
        .fontSize(this.style.bodySize)
        .fillColor(isBold ? this.style.headingColor : '#374151')
        .text(part, undefined, undefined, {
          ...options,
          continued: idx < parts.length - 1
        });
    });

    this.doc.moveDown(0.1);
  }

  /**
   * Render bullet points with proper formatting
   */
  renderBulletPoint(line) {
    const bulletText = line.replace(/^[-•]\s*/, '').trim();

    this.doc
      .font(this.fontMap.regular)
      .fontSize(this.style.bodySize)
      .fillColor('#111827')
      .text(`• ${bulletText}`, this.style.margins.left + 15, undefined, {
        width: this.doc.page.width - this.style.margins.right - 65,
        lineGap: 2,
        paragraphGap: 0
      });
  }

  /**
   * Render special lines (links, tech, etc)
   */
  renderSpecialLine(line) {
    const [label, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    const isLink = label.toLowerCase().startsWith('link');

    this.doc
      .font(this.fontMap.regular)
      .fontSize(this.style.bodySize)
      .fillColor(isLink ? this.style.accentColor : '#374151')
      .text(`${label}: ${value}`, {
        lineGap: 1,
        underline: isLink
      });
  }

  /**
   * Add page numbers
   */
  addPageNumbers() {
    const pageCount = this.doc.bufferedPageRange().count;

    for (let i = 0; i < pageCount; i++) {
      this.doc.switchToPage(i);

      if (pageCount > 1) {
        this.doc
          .font(this.fontMap.regular)
          .fontSize(9)
          .fillColor('#9ca3af')
          .text(`Page ${i + 1} of ${pageCount}`, {
            align: 'center',
            y: this.doc.page.height - 30
          });
      }
    }
  }

  /**
   * Get template style configuration
   */
  getTemplateStyle(template) {
    const styles = {
      modern: {
        nameSize: 28,
        titleSize: 12,
        bodySize: 10.5,
        headingSize: 13,
        headingColor: '#111827',
        accentColor: '#1d4ed8',
        margins: { left: 50, right: 50, top: 40, bottom: 40 }
      },
      classic: {
        nameSize: 26,
        titleSize: 11.5,
        bodySize: 10,
        headingSize: 12.5,
        headingColor: '#111827',
        accentColor: '#0f766e',
        margins: { left: 50, right: 50, top: 40, bottom: 40 }
      },
      compact: {
        nameSize: 24,
        titleSize: 11,
        bodySize: 9.75,
        headingSize: 12,
        headingColor: '#111827',
        accentColor: '#2563eb',
        margins: { left: 45, right: 45, top: 35, bottom: 35 }
      },
      executive: {
        nameSize: 28,
        titleSize: 12.5,
        bodySize: 10.75,
        headingSize: 13.5,
        headingColor: '#0f172a',
        accentColor: '#4338ca',
        margins: { left: 55, right: 55, top: 45, bottom: 45 }
      }
    };

    return styles[template] || styles.modern;
  }

  /**
   * Get font map for template
   */
  getFontMap(template) {
    const isClassic = template === 'classic';

    return {
      bold: isClassic ? 'Times-Bold' : 'Helvetica-Bold',
      regular: isClassic ? 'Times-Roman' : 'Helvetica'
    };
  }
}

/**
 * Generate resume PDF buffer
 */
export async function generateResumePDF(profile = {}, resumeMarkdown = '', template = 'modern') {
  const generator = new ResumePDFGenerator(template);
  return generator.generateBuffer(profile, resumeMarkdown);
}

/**
 * Save resume to PDF file
 */
export async function saveResumePDF(filePath, profile = {}, resumeMarkdown = '', template = 'modern') {
  const generator = new ResumePDFGenerator(template);
  return generator.saveToFile(filePath, profile, resumeMarkdown);
}
