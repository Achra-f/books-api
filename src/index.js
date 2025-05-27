import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db.js';
import booksRouters from './routes/books.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/books', booksRouters);

// Error handling middleware
app.use((err, req, res) => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
});

// Start Server
const PORT = process.env.PORT || 3000;
connectDb(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/books`));
});