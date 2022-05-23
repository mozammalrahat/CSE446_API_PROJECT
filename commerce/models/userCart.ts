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
        productId:{type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true},
        price:Number,
        quantity:Number
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    modifiedOn: {
        type: Date,
        default: Date.now
      },
    createdAt: {
        type: Date,
        default: Date.now,
    }  
});

export default mongoose.models.UserCart || mongoose.model("UserCart", userCartSchema);