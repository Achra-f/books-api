import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import booksRouters from './routes/books.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

// Routes
app.use('/books', booksRouters);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
});

export default app;