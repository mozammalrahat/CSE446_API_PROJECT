const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const accountSchema = Schema({
    username:String,
    accountNumber:{
        type:String,
        unique:true,
        default:uuidv4
    },
    currency:{
        type:String,
        default:"USD"
    },
    email:String,
    balance:Number,
    createdAt:{type:Date, default:Date.now},
    
    transactions:[{
        id:{type:Schema.Types.ObjectId, ref:"Transactions"}
}],
bank_secret:{
    type:String,
    required:true
}
});

module.exports = mongoose.model("Account", accountSchema); 