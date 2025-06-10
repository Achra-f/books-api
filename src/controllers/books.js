import Book from '../models/Book.js';

// Get all books
export const getAllBooks = async (req, res) => {
  const {
    title,
    author,
    genre,
    readStatus,
    yearMax,
    yearMin,
    limit = 20,
    page = 1,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = req.query;

  const filter = { addedBy: req.user._id };

  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }
  if (author) {
    filter.author = { $regex: author, $options: 'i' };
  }
  if (genre) {
    filter.genre = { $regex: genre, $options: 'i' };
  }
  if (readStatus) {
    const validStatuses = ['reading', 'finished', 'want to read'];
    if (validStatuses.includes(readStatus)) {
      filter.readStatus = readStatus;
    }
  }
  if (yearMax || yearMin) {
    filter.year = {};
    if (yearMin && !isNaN(yearMin)) filter.year.$gte = Number(yearMin);
    if (yearMax && !isNaN(yearMax)) filter.year.$lte = Number(yearMax);
  }

  const books = await Book.find(filter)
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit))
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 });
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
