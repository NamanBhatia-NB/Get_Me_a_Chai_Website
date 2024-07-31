import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: { type: String },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, Default: Date.now },
    updatedAt: { type: Date, Default: Date.now },
    done: { type: Boolean, default: false },
});

export default mongoose.models.Payment || model("Payment", PaymentSchema);