# Book Tracker API

A secure, RESTful API that allows users to **register**, **log in**, and **manage a collection of books**. It supports full CRUD operations on books and uses JWT for authenticated access.

---

## Features

- User authentication (signup + login)
- Secure password hashing with `bcrypt`
- Pagination & filters
- JWT-based authorization (required for all book routes)
- CRUD operations on books
- Input validation using `zod`
- Rate limiting and security headers via `helmet` and `express-rate-limit`
- Swagger documentation
- Tested using `Jest`

## Tech used

- **Backend Framework:** Express.js
- **Database:** MongoDB
- **Validation:** Zod
- **Authentication:** JWT + bcryptjs
- **Documentation:** Swagger (via `swagger-ui-express`)
- **Testing:** Jest
- **Deployment:** Render

## Base URL

> 🟢 **Deployed API:**  
https://books-api-1jwf.onrender.com

---

## 📄 API Documentation (Swagger)

View the full API reference at:

**[https://books-api-1jwf.onrender.com/api-docs](https://books-api-1jwf.onrender.com/api-docs)**

---

## Authentication

All `/api/books` routes are protected and require a valid JWT token.

- Register at: `POST /api/auth/signup`
- Log in at: `POST /api/auth/login`
- Use the returned token as `Authorization: Bearer <token>`

---

## Endpoints

### Authentication

#### Signup

```bash
curl -X POST https://books-api-1jwf.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@email.com", "password": "password123", "confirmPassword": "password123"}'
```

#### Login

```bash
curl -X POST https://books-api-1jwf.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@email.com", "password": "password123"}'
```

### Books (require JWT)

#### GET Books

```bash
curl -H "Authorization: Bearer <token>" \
  https://books-api-1jwf.onrender.com/api/books?author=Orwell&limit=10&page=2&sortBy=year&sortOrder=asc
```

#### GET Books ID

```bash
curl -H "Authorization: Bearer <token>" \
  https://books-api-1jwf.onrender.com/api/books/<bookId>
```
#### POST Book

```bash
curl -X POST https://books-api-1jwf.onrender.com/api/books \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "1984", "author": "George Orwell", "year": 1949, "genre": "Dystopian", "readStatus": "finished"}'
```
#### PATCH Book

```bash
curl -X PATCH https://books-api-1jwf.onrender.com/api/books/<bookId> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"year": 1950}'
```
#### DELETE Book

```bash
curl -X DELETE https://books-api-1jwf.onrender.com/api/books/<bookId> \
  -H "Authorization: Bearer <token>"
```
---

## Tests

The API is tested with Jest. Tests cover:
- Auth flow (signup, login, error handling)
- Full book CRUD
- Input validation
- JWT protection

### Example Jest Test

```bash
const response = await request
.post('/api/auth/login')
.send({ username: 'testuser', password: 'password123' });

const token = response.body.token;

const booksResponse = await request
.get('/api/books')
.set('Authorization', `Bearer ${token}`);
```
---

## Local dev Setup

```bash
# 1. Clone the repo
git clone https://github.com/Achra-f/books-api.git
cd books-api

# 2. Install dependencies
npm install

# 3. Add a `.env` file in the root directory with the following:
MONGODB_URI=mongodb+srv://<your-cluster-uri>
JWT_SECRET=your_jwt_secret
PORT=3000

# 4. Start the local server
npm run dev
```
You'll also need a .env file with MongoDB credentials:

```bash
MONGODB_URI=mongodb+srv://<your-cluster-uri>
JWT_SECRET=your_jwt_secret
PORT=3000
```