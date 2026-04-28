import express from 'express';
import { upload, parseResumeFile } from '../controllers/resumeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/resume/parse
// Requires auth so anonymous users can't hammer the parser endpoint
router.post('/parse', protect, upload.single('resume'), parseResumeFile);

export default router;
