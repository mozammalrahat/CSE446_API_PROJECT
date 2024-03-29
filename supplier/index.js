const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const Product = require("./models/product");
const connectDB = require("./connectDB");
const axios = require("axios");
const cors = require("cors");
connectDB();
const app = express();
app.use(express.json());
port = 3002;
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/order", async (req, res) => {
  order = req.body.order;
  ecommerce_account = req.body.ecommerce_account;
  ecommerce_secret = req.body.secret_key;

  if (!order || !ecommerce_account || !ecommerce_secret) {
    res.status(400).send({
      message: "Invalid Request",
    });
  } else {
    for (let i = 0; i < order.products.length; i++) {
      product = await Product.findOne({ key: order.products[i].key });
      if (product) {
        product.amount = product.amount - order.products[i].quantity;
        await product.save();
      }
    }

    const bank_transaction = await axios.post(
      "http://localhost:3001/bank/create_transaction",
      {
        fromAccount: ecommerce_account,
        bank_secret: ecommerce_secret,
        toAccount: process.env.supplier_account,
        amount: order.totalPrice,
      }
    );

    console.log(bank_transaction);

    if (bank_transaction.statusText === "OK") {
      res.status(200).send({
        message: "Order Placed",
      });
    } else {
      res.status(400).send({
        message: "Order Failed",
      });
    }
  }
});
app.post("/product", async (req, res) => {
  const product = req.body;
  const newproduct = new Product({
    name: product.name,
    key: product.key,
    price: product.price,
    description: product.description,
    available: product.available,
    amount: product.amount,
    image: product.image,
    category: product.category,
    createdAt: new Date(),
  });

  await newproduct.save((err, product) => {
    if (err) {
      console.log(err);
    } else {
      console.log(product);
    }
  });
  console.log(newproduct);

  res.status(200).json({ newproduct });
});

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
