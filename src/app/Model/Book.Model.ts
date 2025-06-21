
import { model, Schema } from 'mongoose';
import { IBook } from './../Interface/Book.Interface';

const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: true
    },
    isbn: { type: String, required: true },
    description: { type: String },
    copies: { type: Number, required: true },
    available: { type: Boolean, required: true },
},
{
    versionKey: false,
    timestamps: true
}
);

export const Book = model<IBook>("Book", bookSchema);