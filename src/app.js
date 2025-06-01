import express from 'express';
import helmet from 'helmet';
import booksRoutes from './routes/books.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/books', booksRoutes);
app.use('/api/auth', authRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

export default app;
