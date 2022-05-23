const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionsSchema = Schema({
    fromAccount:String,
    toAccount:String,
    amount:Number,
    createdAt:{type:Date, default:Date.now},
});
module.exports = mongoose.model("Transactions", transactionsSchema);
