import express from 'express';
import { bookPostValidationRules, bookPatchValidationRules } from "../validators/bookValidator.js";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/auth.js";
import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from '../controllers/books.js';

const router = express.Router();

// Protect all routes below
// router.use(authMiddleware);

// Helper for async error handling
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.get('/', asyncHandler(getAllBooks));
router.get('/:id', asyncHandler(getBookById));
router.post('/', bookPostValidationRules, validate, asyncHandler(createBook));
router.patch('/:id', bookPatchValidationRules, validate, asyncHandler(updateBook));
router.delete('/:id', asyncHandler(deleteBook));

export default router;