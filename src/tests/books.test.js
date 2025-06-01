import supertest from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);

let authToken;

beforeAll(async () => {
    await connectDB(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);

    // Signup to get a user
    const testUser = {
        username: `testuser_${Date.now()}`,
        password: 'password'
    };
    await request.post('/auth/signup').send(testUser);

    // Get JWT token via login
    const response = await request.post('/auth/login').send(testUser);

    authToken = response.body.token;

    if (!authToken) {
        throw new Error('Failed to get Token');
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Books API', () => {
    let createdBookId;

    it('GET /books - should return all books', async () => {
        const res = await request
            .get('/books')
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /books/:id - should return 404 for non-existing book', async () => {
        const fakeId = '64b9fddc1a2b3c4567890123';
        const res = await request
            .get(`/books/${fakeId}`)
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Book not found');
    });

    it('POST /books - should create a new book', async () => {
        const newBook = { title: '1984', author: 'George Orwell', year: 2500 };
        const res = await request
            .post('/books')
            .set('Authorization', `Bearer ${authToken}`)
            .send(newBook);
        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe(newBook.title);
        createdBookId = res.body._id;
    });

    it('PATCH /books/:id - should update the book', async () => {
        const updateData = { title: '1984', author: 'George Orwell', year: 1949 };
        const res = await request
            .patch(`/books/${createdBookId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updateData);
        expect(res.statusCode).toBe(200);
        expect(res.body.year).toBe(updateData.year);
    });

    it('DELETE /books/:id - should delete the book', async () => {
        const res = await request
            .delete(`/books/${createdBookId}`)
            .set('Authorization', `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Book deleted successfully');
    });

    it('POST /books - should return 400 if fields are missing', async () => {
        const res = await request
            .post('/books')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ title: '', author: '', year: 'notanumber' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('PATCH /books/:id - should return 400 for invalid year', async () => {
        const newBook = { title: 'Invalid Patch', author: 'X', year: 2020 };
        const createRes = await request
            .post('/books')
            .set('Authorization', `Bearer ${authToken}`)
            .send(newBook);

        const badUpdate = { year: 'NaN' };
        const res = await request
            .patch(`/books/${createRes.body._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(badUpdate);

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});