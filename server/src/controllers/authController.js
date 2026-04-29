import jwt from 'jsonwebtoken';
import PDFDocument from 'pdfkit';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';
import { checkATSFriendliness } from '../utils/atsChecker.js';
import {
  defaultProfileData,
  generateCanvasLayoutFromProfile,
  generateResumeMarkdown,
} from '../utils/profileEngine.js';
import { checkATSCompatibility, ATSValidator } from '../utils/atsValidator.js';
import { generateResumePDF, ResumePDFGenerator } from '../utils/resumePDFGenerator.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { username, email, password, fullName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      fullName
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

  // @desc    Check ATS compatibility of user's resume
  // @route   POST /api/auth/check-ats-compatibility
  // @access  Private
  export const checkAtsCompatibility = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const profileData = user.profileData && Object.keys(user.profileData).length
        ? user.profileData
        : defaultProfileData(user);

      // Validate ATS compatibility
      const atsResult = checkATSCompatibility(profileData);

      res.status(200).json({
        success: true,
        data: {
          atsScore: atsResult.score,
          isATSFriendly: atsResult.isATSFriendly,
          issues: atsResult.issues,
          warnings: atsResult.warnings,
          summary: atsResult.summary
        }
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc    Get ATS optimization recommendations
  // @route   GET /api/auth/ats-recommendations
  // @access  Private
  export const getAtsRecommendations = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const profileData = user.profileData && Object.keys(user.profileData).length
        ? user.profileData
        : defaultProfileData(user);

      const validator = new ATSValidator(profileData);
      const recommendations = validator.getRecommendations();

      res.status(200).json({
        success: true,
        data: {
          recommendations,
          score: validator.validate().score
        }
      });
    } catch (error) {
      next(error);
    }
  };

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Get user with password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('portfolios')
      .populate('templates');

    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { fullName, bio, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, bio, avatar },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get structured profile data
// @route   GET /api/auth/profile-data
// @access  Private
export const getProfileData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const profileData = user.profileData && Object.keys(user.profileData).length
      ? user.profileData
      : defaultProfileData(user);

    res.status(200).json({
      success: true,
      data: { profileData }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update structured profile data
// @route   PUT /api/auth/profile-data
// @access  Private
export const updateProfileData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const current = user.profileData && Object.keys(user.profileData).length
      ? user.profileData
      : defaultProfileData(user);

    const nextProfileData = {
      ...current,
      ...req.body,
    };

    user.profileData = nextProfileData;
    user.markModified('profileData');
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile data updated successfully',
      data: { profileData: user.profileData }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate resume + portfolio draft from profile data
// @route   POST /api/auth/generate-assets
// @access  Private
export const generateAssetsFromProfile = async (req, res, next) => {
  try {
    const { createPortfolio = false, title, theme = 'midnight' } = req.body || {};
    const user = await User.findById(req.user.id);
    const profileData = user.profileData && Object.keys(user.profileData).length
      ? user.profileData
      : defaultProfileData(user);

    const resumeMarkdown = generateResumeMarkdown(profileData);
    const canvasLayout = generateCanvasLayoutFromProfile(profileData, theme);

    let createdPortfolio = null;

    if (createPortfolio) {
      createdPortfolio = await Portfolio.create({
        owner: user._id,
        title: title || `${profileData.name || user.username} Portfolio`,
        description: profileData.summary || '',
        canvasLayout,
      });

      await User.findByIdAndUpdate(user._id, {
        $push: { portfolios: createdPortfolio._id }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assets generated successfully',
      data: {
        resumeMarkdown,
        canvasLayout,
        portfolio: createdPortfolio,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check ATS friendliness
// @route   POST /api/auth/ats-check
// @access  Private
export const atsCheck = async (req, res, next) => {
  try {
    const { jobDescription = '' } = req.body || {};
    const user = await User.findById(req.user.id);
    const profileData = user.profileData && Object.keys(user.profileData).length
      ? user.profileData
      : defaultProfileData(user);

    const result = checkATSFriendliness(profileData, jobDescription);

    res.status(200).json({
      success: true,
      data: { result }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Download ATS-friendly resume generated from profile data
// @route   GET /api/auth/download-resume
// @access  Private
export const downloadResumeFromProfile = async (req, res, next) => {
  try {
    const selectedTemplate = String(req.query.template || 'modern').toLowerCase();
    const template = ['modern', 'classic', 'compact', 'executive'].includes(selectedTemplate)
      ? selectedTemplate
      : 'modern';

    const user = await User.findById(req.user.id);
    const profileData = user.profileData && Object.keys(user.profileData).length
      ? user.profileData
      : defaultProfileData(user);

    const resumeMarkdown = generateResumeMarkdown(profileData);
    const safeName = (profileData.name || user.username || 'resume')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'resume';

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${safeName}-ats-resume.pdf"`);
      res.status(200).send(pdfBuffer);
    });

    const asLink = (value) => {
      if (!value) return null;
      const v = String(value).trim();
      if (!v) return null;
      const toValidUrl = (candidate) => {
        try {
          const u = new URL(candidate);
          return u.toString();
        } catch {
          return null;
        }
      };

      if (/^mailto:/i.test(v)) return toValidUrl(v);
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        return `mailto:${encodeURIComponent(v)}`.replace('%40', '@');
      }
      if (/^https?:\/\//i.test(v)) return toValidUrl(v);
      if (/linkedin\.com|github\.com|x\.com|twitter\.com/i.test(v)) {
        return toValidUrl(`https://${v.replace(/^\/+/, '')}`);
      }
      if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(v)) {
        return toValidUrl(`https://${v}`);
      }
      return null;
    };

    // Header block: centered name + headline + clickable contact links
    const displayName = profileData.name || user.fullName || user.username;
    const headline = profileData.headline || profileData.title || 'Software Engineer';
    const contactLinks = [];
    const contactInfo = [];

    if (profileData.email) {
      contactInfo.push(String(profileData.email));
      const href = asLink(profileData.email);
      if (href) contactLinks.push({ label: 'Email', href });
    }
    if (profileData.phone) contactInfo.push(String(profileData.phone));
    if (profileData.location) contactInfo.push(String(profileData.location));

    const websiteHref = asLink(profileData.website);
    if (websiteHref) contactLinks.push({ label: 'Portfolio', href: websiteHref });

    const linkedinHref = asLink(profileData.linkedin);
    if (linkedinHref) contactLinks.push({ label: 'LinkedIn', href: linkedinHref });

    const githubHref = asLink(profileData.github);
    if (githubHref) contactLinks.push({ label: 'GitHub', href: githubHref });

    const templateStyles = {
      modern: { 
        nameSize: 28, titleSize: 12, bodySize: 10.5, headingSize: 13, 
        headingColor: '#111827', accentColor: '#1d4ed8', lineHeight: 1.3,
        margins: { top: 40, bottom: 40, left: 50, right: 50 }
      },
      classic: { 
        nameSize: 26, titleSize: 11.5, bodySize: 10, headingSize: 12.5, 
        headingColor: '#111827', accentColor: '#0f766e', lineHeight: 1.25,
        margins: { top: 40, bottom: 40, left: 50, right: 50 }
      },
      compact: { 
        nameSize: 24, titleSize: 11, bodySize: 9.75, headingSize: 12, 
        headingColor: '#111827', accentColor: '#2563eb', lineHeight: 1.2,
        margins: { top: 35, bottom: 35, left: 45, right: 45 }
      },
      executive: { 
        nameSize: 28, titleSize: 12.5, bodySize: 10.75, headingSize: 13.5, 
        headingColor: '#0f172a', accentColor: '#4338ca', lineHeight: 1.35,
        margins: { top: 45, bottom: 45, left: 55, right: 55 }
      },
    };
    const style = templateStyles[template];

    // Font selection for each template
    const nameFont = template === 'classic' ? 'Times-Bold' : 'Helvetica-Bold';
    const bodyFont = template === 'classic' ? 'Times-Roman' : 'Helvetica';
    const headingFont = template === 'classic' ? 'Times-Bold' : 'Helvetica-Bold';

    // Header section: Name and title
    doc.font(nameFont).fontSize(style.nameSize).fillColor(style.headingColor).text(displayName, {
      align: 'center',
      lineGap: 2
    });
    doc.moveDown(0.15);

    // Professional headline
    const titlePrefix = template === 'executive' ? 'EXECUTIVE PROFILE' : '';
    const fullTitle = titlePrefix ? `${titlePrefix} | ${headline}` : headline;
    doc.font(bodyFont).fontSize(style.titleSize).fillColor('#374151').text(fullTitle, {
      align: 'center'
    });
    doc.moveDown(0.25);

    // Contact information - clean, scannable format
    if (contactInfo.length) {
      doc.font(bodyFont).fontSize(9.5).fillColor('#4b5563').text(contactInfo.join(' • '), {
        align: 'center',
        lineGap: 1
      });
      doc.moveDown(0.1);
    }

    // Social links with better formatting (for ATS compatibility)
    if (contactLinks.length) {
      const linkText = contactLinks.map((item) => `${item.label}: ${item.href}`).join(' | ');
      doc.font(bodyFont).fontSize(9).fillColor(style.accentColor).text(linkText, {
        align: 'center',
        lineGap: 0.5
      });
    }

    // Decorative divider
    doc.moveDown(0.35);
    doc.strokeColor('#d1d5db').lineWidth(0.5).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
    doc.moveDown(0.5);

    const lines = resumeMarkdown.split('\n');
    const firstSectionIndex = lines.findIndex((line) => line.startsWith('## '));
    const renderLines = firstSectionIndex >= 0 ? lines.slice(firstSectionIndex) : lines;

    let currentSection = null;
    let isFirstItemInSection = true;

    renderLines.forEach((line, index) => {
      if (!line.trim()) {
        // Smaller gap for empty lines
        if (doc.y < doc.page.height - 40) doc.moveDown(0.3);
        return;
      }

      // Main sections (##)
      if (line.startsWith('## ')) {
        currentSection = line.replace(/^##\s*/, '').trim();
        
        // Add spacing before section (except first)
        if (index > 0) doc.moveDown(0.4);
        
        doc.font(headingFont)
          .fontSize(style.headingSize)
          .fillColor(style.headingColor)
          .text(currentSection);
        
        // Underline for sections
        const lineWidth = doc.widthOfString(currentSection);
        doc.strokeColor(style.accentColor)
          .lineWidth(1.5)
          .moveTo(50, doc.y)
          .lineTo(50 + lineWidth, doc.y)
          .stroke();
        
        doc.moveDown(0.25);
        isFirstItemInSection = true;
        return;
      }

      // Subsections (###) - Job titles, project names
      if (line.startsWith('### ')) {
        const jobTitle = line.replace(/^###\s*/, '').trim();
        
        if (!isFirstItemInSection) doc.moveDown(0.15);
        doc.font(headingFont)
          .fontSize(style.headingSize - 1)
          .fillColor(style.headingColor)
          .text(jobTitle);
        
        isFirstItemInSection = false;
        return;
      }

      // Bold text for company/institution (** **) or duration info
      if (line.includes('**') && !line.startsWith('-')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        let x = 50;
        
        parts.forEach((part, idx) => {
          if (!part) return;
          
          const isBold = idx % 2 === 1;
          doc.font(isBold ? headingFont : bodyFont)
            .fontSize(style.bodySize)
            .fillColor(isBold ? style.headingColor : '#374151');
          
          // Check if this will fit on current line
          const width = doc.widthOfString(part);
          if (x + width > doc.page.width - 50) {
            doc.moveDown(0.25);
            x = 50;
          }
          
          doc.text(part, x, undefined, { 
            continued: idx < parts.length - 1,
            lineGap: 1
          });
          x = doc.x;
        });
        
        if (!line.endsWith(' ')) doc.moveDown(0.1);
        return;
      }

      // Bullet points - properly indented and formatted
      if (line.startsWith('- ') || line.startsWith('• ')) {
        const bulletText = line.replace(/^[-•]\s*/, '').trim();
        const bulletSize = style.bodySize;
        
        // Use proper bullet with spacing
        doc.font(bodyFont)
          .fontSize(bulletSize)
          .fillColor('#111827')
          .text(`• ${bulletText}`, 65, undefined, {
            width: doc.page.width - 130,
            lineGap: 2,
            paragraphGap: 0
          });
        
        return;
      }

      // Links in special format (Link: URL)
      if (line.toLowerCase().startsWith('link:') || line.toLowerCase().startsWith('tech:')) {
        const [label, ...rest] = line.split(':');
        const value = rest.join(':').trim();
        
        doc.font(bodyFont)
          .fontSize(style.bodySize)
          .fillColor(style.accentColor)
          .text(`${label}: ${value}`, {
            lineGap: 1,
            underline: line.toLowerCase().startsWith('link:')
          });
        
        return;
      }

      // Default paragraph text
      doc.font(bodyFont)
        .fontSize(style.bodySize)
        .fillColor('#374151')
        .text(line, {
          lineGap: 1,
          paragraphGap: 2
        });
    });

    doc.end();
  } catch (error) {
    next(error);
  }
};
