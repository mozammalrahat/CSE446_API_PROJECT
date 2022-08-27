import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerOrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  shippingInfo: {
    type: Schema.Types.ObjectId,
    ref: "ShippingModel",
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        unique: true,
      },
      key: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CustomerOrder ||
  mongoose.model("CustomerOrder", customerOrderSchema);
