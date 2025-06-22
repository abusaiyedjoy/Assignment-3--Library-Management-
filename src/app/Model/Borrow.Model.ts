import { model, Schema } from "mongoose";
import { IBorrow } from './../Interface/Borrow.Interface';


const BorrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: { type: Number, required: true },
    dueDate: { type: String, required: true }
},{
    versionKey: false,
    timestamps: true
}
);

export const Borrow = model<IBorrow>("Borrow", BorrowSchema);