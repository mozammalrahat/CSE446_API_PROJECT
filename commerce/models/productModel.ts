import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    available: Boolean,
    amount: Number,
    image: String,
    category: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);