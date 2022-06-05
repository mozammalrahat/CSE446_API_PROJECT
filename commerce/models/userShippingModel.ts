import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shoppingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    house: {
        type: String,
        required: true,
    },
    street:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    zip:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    account:{
        type: String,
        required: true,
    },
    bank_secret:{
        type: String,
        required: true,
    },
});
export default mongoose.models.ShippingModel || mongoose.model("ShippingModel", shoppingSchema);
