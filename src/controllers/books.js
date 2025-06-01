import Book from '../models/Book.js';

// Get all books
export const getAllBooks = async (req, res) => {
  const books = await Book.find({ addedBy: req.user._id });
  res.status(200).json(books);
};

// Get book by ID
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.status(200).json(book);
};

// Create new book
export const createBook = async (req, res) => {
  const bookData = {
    ...req.body,
    addedBy: req.user._id,
  };
  const newBook = await Book.create(bookData);
  res.status(201).json(newBook);
};

// Update book
export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (!book.addedBy.equals(req.user._id)) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to update this book' });
  }

  Object.assign(book, req.body);
  await book.save();

  res.status(200).json(book);
};

// Delete book
export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  if (!book.addedBy.equals(req.user._id)) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to delete this book' });
  }

  await book.remove();

  res.status(200).json({ message: 'Book deleted successfully', book });
};
