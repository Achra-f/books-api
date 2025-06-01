import express from 'express';
import {
  bookCreateSchema,
  bookUpdateSchema,
} from '../validators/bookValidator.js';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/books.js';

const router = express.Router();

// Protect all routes below
router.use(authMiddleware);

// Helper for async error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(getAllBooks));
router.get('/:id', asyncHandler(getBookById));
router.post('/', validate(bookCreateSchema), asyncHandler(createBook));
router.patch('/:id', validate(bookUpdateSchema), asyncHandler(updateBook));
router.delete('/:id', asyncHandler(deleteBook));

export default router;
