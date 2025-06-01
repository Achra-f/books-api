import supertest from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';
import dotenv from "dotenv";

dotenv.config();
const request = supertest(app);

beforeAll(async () => {
    await connectDB(process.env.MONGODB_URI_TEST || process.env.MONGODB_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth API (username + password)', () => {
    const testUser = {
        username: 'testuser',
        password: 'superSecret123',
    };

    afterAll(async () => {
        await User.deleteOne({ username: testUser.username });
    });

    it('POST /signup - should register a new user', async () => {
        const res = await request.post('/auth/signup').send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toMatch(/success/i);
    });

    it('POST /signup - should fail for duplicate username', async () => {
        const res = await request.post('/auth/signup').send(testUser);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    it('POST /login - should authenticate existing user', async () => {
        const res = await request.post('/auth/login').send(testUser);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('POST /login - should fail with incorrect password', async () => {
        const res = await request.post('/auth/login').send({
            username: testUser.username,
            password: 'wrongPass',
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error');
    });

    it('POST /login - should fail for non-existent user', async () => {
        const res = await request.post('/auth/login').send({
            username: 'ghostuser',
            password: 'irrelevant',
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
});