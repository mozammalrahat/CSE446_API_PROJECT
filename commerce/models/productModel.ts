import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    key:String,
    price: Number,
    description: String,
    available: Boolean,
    amount: Number,
    image: String,
    category: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);