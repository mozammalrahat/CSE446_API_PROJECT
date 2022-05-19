import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }  
});

export default mongoose.model("UserCart", userCartSchema);