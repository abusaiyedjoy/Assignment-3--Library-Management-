
import express, { Request, Response } from "express";
import { borrowZodSchema } from "../validation/ZodValidation";
import { Borrow } from "../Model/Borrow.Model";
import { Book } from "../Model/Book.Model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = await borrowZodSchema.parseAsync(req.body);

    const book = await Book.findById(body.book);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.copies < body.quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${book.copies} copies are available`,
      });
    }

    const borrow = await Borrow.create(body);

    book.copies -= body.quantity;
    book.available = book.copies > 0;
    await book.save();

    const { _id, ...data } = borrow.toObject();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: {
        _id,
        ...data,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: error instanceof Error ? error.message : error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
          dueDate: { $first: "$dueDate" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
            author: "$bookInfo.author",
          },
          totalQuantity: 1,
          dueDate: "$dueDate",
          status: "active",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error,
    });
  }
});
