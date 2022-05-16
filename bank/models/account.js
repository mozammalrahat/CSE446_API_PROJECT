const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountSchema = Schema({
    username:String,
    accountNumber:String,
    currency:String,
    balance:Number,
    createdAt:{type:Date, default:Date.now},
    transactions:[{
        id:{type:Schema.Types.ObjectId, ref:"Transactions"}
}]
});

module.exports = mongoose.model("Account", accountSchema); 