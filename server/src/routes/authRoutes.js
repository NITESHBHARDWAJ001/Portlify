import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getProfileData,
  updateProfileData,
  generateAssetsFromProfile,
  atsCheck,
  downloadResumeFromProfile,
  checkAtsCompatibility,
  getAtsRecommendations
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);
router.get('/profile-data', protect, getProfileData);
router.put('/profile-data', protect, updateProfileData);
router.post('/generate-assets', protect, generateAssetsFromProfile);
router.post('/ats-check', protect, atsCheck);
router.get('/download-resume', protect, downloadResumeFromProfile);
router.post('/check-ats-compatibility', protect, checkAtsCompatibility);
router.get('/ats-recommendations', protect, getAtsRecommendations);

export default router;
