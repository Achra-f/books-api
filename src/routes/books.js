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

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

const router = express.Router();

// Protect all routes below
router.use(authMiddleware);

// Helper for async error handling
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 */

router.get('/', asyncHandler(getAllBooks));

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book data
 *       404:
 *         description: Book not found
 */

router.get('/:id', asyncHandler(getBookById));

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Alchemist
 *               author:
 *                 type: string
 *                 example: Paulo Coelho
 *               pages:
 *                 type: number
 *                 example: 208
 *     responses:
 *       201:
 *         description: Book created
 */

router.post('/', validate(bookCreateSchema), asyncHandler(createBook));

/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *     responses:
 *       200:
 *         description: Book updated
 */

router.patch('/:id', validate(bookUpdateSchema), asyncHandler(updateBook));

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       204:
 *         description: Book deleted
 */

router.delete('/:id', asyncHandler(deleteBook));

export default router;
