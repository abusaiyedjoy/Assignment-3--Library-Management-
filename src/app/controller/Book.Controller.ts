import express, { Request, Response } from "express";
import { Book } from "./../Model/Book.Model";
import { bookZodSchema } from "../validation/ZodValidation";

export const router = express.Router();

// Add a new Book
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = await bookZodSchema.parseAsync(req.body);
    const book = await Book.create(body);
    const { _id, ...data } = book.toObject();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: {
        _id,
        ...data,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create book",
      error: error,
    });
  }
});

// Get all books
router.get("/", async (req: Request, res: Response) => {
  try {
    const filterByGenre = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sortOrder as string) || "desc";
    const limit = parseInt(req.query.limit as string) || 10;

    const filter: any = {};

    if (filterByGenre) {
      filter.genre = filterByGenre;
    }

    if (filter) {
      const books = await Book.find(filter)
        .limit(limit)
        .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    } else {
      const books = await Book.find();
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error,
    });
  }
});

// Get a single book
router.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error,
    });
  }
});

// Update a book
router.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const body = req.body;
    const book = await Book.findByIdAndUpdate(id, body, { new: true });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error,
    });
  }
});

// Delete a book
router.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    await Book.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error,
    });
  }
});
