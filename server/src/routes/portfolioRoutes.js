import express from 'express';
import {
  createPortfolio,
  getMyPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  togglePublishPortfolio,
  getPublishedPortfolio,
  discoverPortfolios
} from '../controllers/portfolioController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/discover', discoverPortfolios);
router.get('/p/:username', getPublishedPortfolio);

// Protected routes
router.post('/', protect, createPortfolio);
router.get('/', protect, getMyPortfolios);
router.get('/:id', protect, getPortfolioById);
router.put('/:id', protect, updatePortfolio);
router.delete('/:id', protect, deletePortfolio);
router.put('/:id/publish', protect, togglePublishPortfolio);

export default router;
