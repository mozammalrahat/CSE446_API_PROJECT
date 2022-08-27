const express = require('express');
const mongoose = require('mongoose');
const Account = require('./models/account');
const Transaction = require('./models/transactions');
const app = express();
app.use(express.json());
const port = 3001;
const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});
const generator = require('generate-password');

const connectDb = require('./connectDB');
connectDb();

app.get('/bank/accounts', (req, res) => {
    Account.find()
    .then(accounts => {
        res.json({
            success:true,
            data:accounts
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            success:false,
            error:err
        });
    });
});

app.get('/bank/transactions', (req, res) => {
    Transaction.find()
    .then(transactions => {
        res.json({
            success:true,
            data:transactions
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            success:false,
            error:err
        });
    });
});

app.post('/bank/create_account', async (req, res) => {
    const bank_secret = generator.generate({
        length: 8,
        numbers: true
    });

    const account = req.body;
    const newAccount = new Account({
        username: account.username,
        balance: account.balance,
        email:account.email,
        bank_secret: bank_secret
        });
    await newAccount.save();
    res.send(newAccount);
});

app.post('/bank/create_transaction', async (req, res) => {
    const data =  req.body;
    const bank_secret_frontend = data.bank_secret;
    const from_account = await Account.findOne({accountNumber:data.fromAccount});
    const from_account_secret = from_account.bank_secret.toString();

    if(bank_secret_frontend === from_account_secret){
    
        const newTransaction = new Transaction({
            fromAccount: data.fromAccount,
            toAccount: data.toAccount,
            amount: data.amount,
            createdAt: new Date()
            });
        await newTransaction.save();
        console.log("New Transaction",newTransaction);
        await Account.updateOne({accountNumber: data.fromAccount},{$inc: {balance:-data.amount}}, {$push: {transactions: newTransaction}});
        await Account.updateOne({accountNumber: data.toAccount}, {$inc: {balance:data.amount}}, {$push: {transactions: newTransaction}});
    
        res.status(200).json({newTransaction});
    
    
    
    }
    else{
        res.status(400).json({error: "Invalid bank secret"});
    }


    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))