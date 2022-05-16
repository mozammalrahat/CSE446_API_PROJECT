const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path:"./config.env"});
const Product = require('./models/product');
const connectDB = require('./connectDB');
connectDB();
const app = express();
port = 3002;
app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/create_product', async (req, res) => {
    res.send('this is from the create_product endpoint');
    const product = new Product({
        name: 'Product 1',
        price: 100,
        description: 'Product 1 description',
        available: true,
        amount: 10,
        image: 'https://www.pinterest.com/pin/687784174355786719/',
        category: 'category 1',
        createdAt: new Date()
    });

    await product.save((err, product) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log(product);
        }
    }
    );
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

