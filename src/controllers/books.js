import Book from '../models/Book.js';

// Get all books
export const getAllBooks = async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
};

// Get book by ID
export const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
};

// Create new book
export const createBook = async (req, res) => {
    const { title, author, year } = req.body;
    const newBook = new Book({ title, author, year });
    await newBook.save();
    res.status(201).json(newBook);
};

// Update book
export const updateBook = async (req, res) => {
    const updated = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(updated);
};

// Delete book
export const deleteBook = async (req, res) => {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully', book: deleted });
};