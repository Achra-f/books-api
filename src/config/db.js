import mongoose from 'mongoose';

export const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};