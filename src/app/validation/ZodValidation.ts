import { z } from "zod";

export const bookZodSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.number(),
    available: z.boolean()
});


export const borrowZodSchema = z.object({
    book: z.string(),
    quantity: z.number(),
    dueDate: z.string()
});