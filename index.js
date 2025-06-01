import dotenv from 'dotenv';

dotenv.config();

import app from './src/app.js';
import { connectDB } from './src/config/db.js';

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
