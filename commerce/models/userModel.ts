import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    userType:{
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
export default mongoose.models.User || mongoose.model("User", userSchema);
