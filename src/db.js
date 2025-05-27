import mongoose from "mongoose";

export async function connectDb(uri) {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}