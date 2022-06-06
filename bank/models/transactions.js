const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const transactionsSchema = Schema({
    fromAccount:String,
    toAccount:String,
    amount:Number,
    transaction_id:{
        type:String,
        unique:true,
        default:uuidv4
    },
    createdAt:{type:Date, default:Date.now},
});
module.exports = mongoose.model("Transactions", transactionsSchema);
