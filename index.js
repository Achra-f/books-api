import app from "./src/app.js";
import { connectDb } from './src/db.js';

// Start Server
const PORT = process.env.PORT || 3000;

connectDb(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/books`));
});