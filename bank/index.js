const express = require('express');
const mongoose = require('mongoose');
const Account = require('./models/account');
const Transaction = require('./models/transactions');
const app = express();
app.use(express.json());
const port = 3001;
const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});

const connectDb = require('./connectDB');
connectDb();

app.get('/bank/account', (req, res) => {
    res.send("This is from the bank/account endpoint");
});

app.get('/bank/transaction', (req, res) => {
    res.send("This is from the bank/transaction endpoint");
});

app.get('/bank/create_account', async (req, res) => {
    res.send("This is from the bank/create_account endpoint");
    const newAccount = new Account({
        username: "Rahat",
        accountNumber: "22222222",
        currency: "USD",
        balance: 0,
        transactions: []
        });
    await newAccount.save((err, account) => {
        if (err) return console.log(err);
        console.log(account);
    });
});

app.post('/bank/create_transaction', async (req, res) => {
    // res.send("This is from the bank/create_transaction endpoint");
    console.log(req.body)
    const data =  req.body;
    // console.log(data);
    const newTransaction = new Transaction({
        fromAccount: data.fromAccount,
        toAccount: data.toAccount,
        amount: data.amount,
        createdAt: new Date()
        });
    await newTransaction.save()
    

    // const senderAccount = await Account.findOne({accountNumber: "123456789"});
    // senderAccount.transactions.push(newTransaction);
    // await senderAccount.save();
    // const receiverAccount = Account.findOne({accountNumber: "123456789"});
    // receiverAccount.transactions.push(newTransaction);
    // await receiverAccount.save();
    await Account.updateOne({accountNumber: "123456789"}, {$push: {transactions: newTransaction}});
    await Account.updateOne({accountNumber: "22222222"}, {$push: {transactions: newTransaction}});

    res.status(200).json({newTransaction});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))