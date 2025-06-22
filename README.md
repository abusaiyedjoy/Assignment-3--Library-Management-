Here’s a professional and well-structured `README.md` for your **Library Management API** built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**.

---

### ✅ `README.md`

````md
# 📚 Library Management API

A full-featured Library Management System built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**. This project supports full CRUD operations for books, borrow tracking, validation, business logic enforcement, and aggregation reporting.

---

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) for books
- ✅ Borrow book with availability enforcement
- ✅ Aggregation pipeline for borrowed summary
- ✅ Schema validation and custom error handling
- ✅ Filtering, sorting, and limiting on book queries
- ✅ Mongoose middleware and instance/static methods

---

## 🧑‍💻 Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Dotenv**

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/abusaiyedjoy/Assignment-3--Library-Management-.git

# Navigate to the project
cd library-management-api

# Install dependencies
npm install

# Start the server (development)
npm run dev

# Or build and run
npm run build
npm start
````

---

## 🔐 Environment Variables

Create a `.env` file with the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/library
```

---

## 📁 API Endpoints

### 📘 Book Endpoints

#### 1. Create Book

`POST /api/books`

Request:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### 2. Get All Books

`GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### 3. Get Book by ID

`GET /api/books/:bookId`

#### 4. Update Book

`PUT /api/books/:bookId`

Request:

```json
{
  "copies": 50
}
```

#### 5. Delete Book

`DELETE /api/books/:bookId`

---

### 📗 Borrow Endpoints

#### 6. Borrow a Book

`POST /api/borrow`

Request:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

Business Logic:

* Decreases `copies` from Book.
* Marks `available` as false if `copies === 0`.

#### 7. Borrowed Summary (Aggregation)

`GET /api/borrow`

Response:

```json
{
  "book": {
    "title": "The Theory of Everything",
    "isbn": "9780553380163"
  },
  "totalQuantity": 5
}
```




