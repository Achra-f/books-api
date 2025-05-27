import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Helper for Async route Errors
const asyncHandler = fn => async (req, res, next) => Promise.
resolve(fn(req, res, next)).catch(next);

// Get All Books
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.find()
    res.json(books)
}));

// Get book by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
}));

// Post new book
router.post('/', asyncHandler(async (req, res) => {
    const { title, author, year } = req.body;
    const newBook = new Book({ title, author, year });
    await newBook.save();
    res.status(200).json(newBook);
}));

// Update book
router.put('/:id', asyncHandler( async (req, res) => {
    const updated = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true}
    );
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
}))

// Delete book
router.delete('/:id', asyncHandler( async (req, res) => {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully', book: deleted });
}))

export default router;