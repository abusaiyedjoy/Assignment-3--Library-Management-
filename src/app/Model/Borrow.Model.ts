import { model, Schema } from "mongoose";
import { IBorrow } from './../Interface/Borrow.Interface';


const BorrowSchema = new Schema<IBorrow>({
    book: {},
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true }
},{
    versionKey: false,
    timestamps: true
}
);

export const Borrow = model<IBorrow>("Borrow", BorrowSchema);