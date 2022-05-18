import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema  = new Schema({
    user :{type: Schema.Types.ObjectId, ref: 'User'},
    bankAccount: {
        type: String,
        required: true,
    },
    bankSecurityCode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Customer", customerSchema);