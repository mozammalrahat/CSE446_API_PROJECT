const express = require('express');
const mongoose = require('mongoose');
const Account = require('./models/account');
const Transaction = require('./models/transactions');
const app = express();
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

app.get('/bank/create_transaction', async (req, res) => {
    res.send("This is from the bank/create_transaction endpoint");
    const newTransaction = new Transaction({
        transactionId: "123456789",
        fromAccount: "123456789",
        toAccount: "22222222",
        amount: 50,
        createdAt: new Date()
        });
    await newTransaction.save((err, transaction) => {
        if (err) return console.log(err);
        console.log(transaction);
    });

    // const senderAccount = await Account.findOne({accountNumber: "123456789"});
    // senderAccount.transactions.push(newTransaction);
    // await senderAccount.save();
    // const receiverAccount = Account.findOne({accountNumber: "123456789"});
    // receiverAccount.transactions.push(newTransaction);
    // await receiverAccount.save();
    await Account.updateOne({accountNumber: "123456789"}, {$push: {transactions: newTransaction}});
    await Account.updateOne({accountNumber: "22222222"}, {$push: {transactions: newTransaction}});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))