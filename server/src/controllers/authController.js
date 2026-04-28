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
      modern: { nameSize: 24, titleSize: 11, bodySize: 10.5, headingSize: 14, headingColor: '#111827', accentColor: '#1d4ed8' },
      classic: { nameSize: 22, titleSize: 10.5, bodySize: 10, headingSize: 13, headingColor: '#111827', accentColor: '#0f766e' },
      compact: { nameSize: 20, titleSize: 10, bodySize: 9.5, headingSize: 12, headingColor: '#111827', accentColor: '#2563eb' },
      executive: { nameSize: 26, titleSize: 11, bodySize: 10.5, headingSize: 14, headingColor: '#0f172a', accentColor: '#4338ca' },
    };
    const style = templateStyles[template];

    const nameFont = template === 'classic' ? 'Times-Bold' : 'Helvetica-Bold';
    const bodyFont = template === 'classic' ? 'Times-Roman' : 'Helvetica';
    const headingFont = template === 'classic' ? 'Times-Bold' : 'Helvetica-Bold';

    const titlePrefix = template === 'executive' ? 'Professional Profile' : '';
    doc.font(nameFont).fontSize(style.nameSize).fillColor(style.headingColor).text(displayName, { align: 'center' });
    doc.moveDown(0.2);
    doc.font(bodyFont).fontSize(style.titleSize).fillColor('#374151').text(
      titlePrefix ? `${titlePrefix} | ${headline}` : headline,
      { align: 'center' }
    );
    doc.moveDown(0.35);

    if (contactInfo.length) {
      doc.font(bodyFont).fontSize(9.5).fillColor('#4b5563').text(contactInfo.join('  |  '), { align: 'center' });
      doc.moveDown(0.15);
    }

    // Safer centered link rendering to avoid PDF coordinate NaN in some cases
    contactLinks.forEach((item) => {
      if (!item.href) return;
      doc.font(bodyFont).fontSize(9.5).fillColor(style.accentColor).text(item.label, {
        align: 'center',
        link: item.href,
        underline: true,
      });
    });

    doc.moveDown(0.6);
    doc.strokeColor('#e5e7eb').lineWidth(1).moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
    doc.moveDown(0.8);

    const lines = resumeMarkdown.split('\n');
    const firstSectionIndex = lines.findIndex((line) => line.startsWith('## '));
    const renderLines = firstSectionIndex >= 0 ? lines.slice(firstSectionIndex) : lines;

    renderLines.forEach((line) => {
      if (!line.trim()) {
        doc.moveDown(0.6);
        return;
      }

      if (line.startsWith('# ')) {
        doc.font(headingFont).fontSize(style.nameSize - 2).fillColor(style.headingColor).text(line.replace(/^#\s*/, ''));
        doc.moveDown(0.5);
        return;
      }

      if (line.startsWith('## ')) {
        doc.font(headingFont).fontSize(style.headingSize).fillColor(style.headingColor).text(line.replace(/^##\s*/, ''));
        doc.moveDown(0.25);
        return;
      }

      if (line.startsWith('### ')) {
        doc.font(headingFont).fontSize(style.headingSize - 1).fillColor(style.headingColor).text(line.replace(/^###\s*/, ''));
        return;
      }

      if (line.toLowerCase().startsWith('link:')) {
        const raw = line.replace(/^link:\s*/i, '').trim();
        const href = asLink(raw);
        if (href) {
          doc.font(bodyFont).fontSize(style.bodySize).fillColor(style.accentColor).text('Project Link', {
            link: href,
            underline: true,
          });
        } else {
          doc.font(bodyFont).fontSize(style.bodySize).fillColor('#374151').text(line);
        }
        return;
      }

      if (line.startsWith('- ')) {
        doc.font(bodyFont).fontSize(style.bodySize).fillColor('#111827').text(`• ${line.replace(/^-\s*/, '')}`, { indent: 14 });
        return;
      }

      doc.font(bodyFont).fontSize(style.bodySize).fillColor('#374151').text(line);
    });

    doc.end();
  } catch (error) {
    next(error);
  }
};
