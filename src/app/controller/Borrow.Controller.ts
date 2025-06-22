import express, { Request, Response } from "express";
import { borrowZodSchema } from "../validation/ZodValidation";
import { Borrow } from "../Model/Borrow.Model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = await borrowZodSchema.parseAsync(req.body);
    const borrow = await Borrow.create(body);
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
      message: "Failed to borrowed books",
      error: error,
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
          },
          totalQuantity: 1,
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
      error: error,
    });
  }
});
