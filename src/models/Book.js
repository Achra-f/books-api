import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String },
    coverImageUrl: { type: String },
    readStatus: { type: String, enum: ['reading', 'finished', 'want to read'] },
    addedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);
