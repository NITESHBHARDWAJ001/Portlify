import express from 'express';
import {
  createTemplate,
  getPublicTemplates,
  getMyTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  useTemplate,
  toggleLikeTemplate,
  getSavedTemplates
} from '../controllers/templateController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPublicTemplates);
router.get('/:id', optionalAuth, getTemplateById);

// Protected routes
router.post('/', protect, createTemplate);
router.get('/user/my', protect, getMyTemplates);
router.get('/user/saved', protect, getSavedTemplates);
router.put('/:id', protect, updateTemplate);
router.delete('/:id', protect, deleteTemplate);
router.post('/:id/use', protect, useTemplate);
router.post('/:id/like', protect, toggleLikeTemplate);

export default router;
