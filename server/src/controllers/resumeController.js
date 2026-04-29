import { createRequire } from 'module';
import multer from 'multer';
import { parseResume } from '../utils/resumeParser.js';

// Hoist CJS imports so any missing-module error is caught at server startup
const _require = createRequire(import.meta.url);
const _pdfParse = _require('pdf-parse');
// CJS default-export interop: the function may be on .default in ESM context
const pdfParse = typeof _pdfParse === 'function' ? _pdfParse : _pdfParse.default;
const mammoth = _require('mammoth');

// ─── Multer setup (memory storage — we only need the buffer) ─────────────────

const ALLOWED_MIME = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are accepted'));
    }
  },
});

// ─── Text extraction helpers ──────────────────────────────────────────────────

async function extractTextFromPDF(buffer) {
  const result = await pdfParse(buffer);
  return result.text || '';
}

async function extractTextFromDOCX(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return result.value || '';
}

// ─── Controller ───────────────────────────────────────────────────────────────

// @desc    Upload and parse a resume file
// @route   POST /api/resume/parse
// @access  Private
export const parseResumeFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { mimetype, buffer, originalname } = req.file;

    let rawText = '';

    if (mimetype === 'application/pdf') {
      rawText = await extractTextFromPDF(buffer);
    } else {
      // DOCX / DOC
      rawText = await extractTextFromDOCX(buffer);
    }

    if (!rawText.trim()) {
      return res.status(422).json({
        success: false,
        message:
          'Could not extract text from the file. ' +
          'Make sure the PDF is not image-only (scanned). Try a DOCX version.',
      });
    }

    const parsed = parseResume(rawText);

    res.status(200).json({
      success: true,
      data: {
        parsed,
        rawText,
        filename: originalname,
        mimeType: mimetype,
        charCount: rawText.length,
      },
    });
  } catch (error) {
    next(error);
  }
};
