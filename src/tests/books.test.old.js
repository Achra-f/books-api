import supertest from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);

beforeAll(async () => {
    await connectDB(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Books API', () => {
    let createdBookId;

    it('GET /books - should return all books', async () => {
        const res = await request.get('/books');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /books/:id - should return 404 for non-existing book', async () => {
        const fakeId = '64b9fddc1a2b3c4567890123';
        const res = await request.get(`/books/${fakeId}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Book not found');
    });

    it('POST /books - should create a new book', async () => {
        const newBook = { title: '1984', author: 'George Orwell', year: 2500 };
        const res = await request.post('/books').send(newBook);
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(newBook.title);
        createdBookId = res.body._id;
    });

    it('PATCH /books/:id - should update the book', async () => {
        const updateData = { title: '1984', author: 'George Orwell', year: 1949 };
        const res = await request.patch(`/books/${createdBookId}`).send(updateData);
        expect(res.statusCode).toBe(200);
        expect(res.body.pages).toBe(updateData.pages);
    });

    it('DELETE /books/:id - should delete the book', async () => {
        const res = await request.delete(`/books/${createdBookId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Book deleted successfully');
    });
});