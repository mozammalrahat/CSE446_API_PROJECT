import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../connectDB";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userModel from "../../models/userModel";
import userCart from "../../models/userCart";
import jwt from "jsonwebtoken";
import axios from "axios";
import userShippingModel from "../../models/userShippingModel";
import CustomerOrderModel from "../../models/customerOrderModel";
import Product from "../../models/productModel";
connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.headers.authorization) {
    return res.status(401).send(`Unauthorized`);
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.jwtSecret
  );
  req.userId = userId;

  if (req.method === "POST") {
    const cart = await userCart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).send(`User cart not found`);
    }
    const user_account = await userShippingModel.findOne({ user: req.userId });
    const user_account_number = user_account.account;
    const myAccount = await axios.get(
      `http://localhost:3001/bank/accounts/${user_account_number}`
    );
    const myBalance = myAccount.data.accountDetails.balance;
    const totalPrice = cart.totalPrice;
    if (myBalance < totalPrice) {
      return res.status(405).send({
        message: "Insufficient Balance",
      });
    }
    const transaction = await axios.post(
      "http://localhost:3001/bank/create_transaction",
      {
        bank_secret: user_account.bank_secret,
        amount: totalPrice,
        fromAccount: user_account_number,
        toAccount: process.env.ecommerce_account,
      }
    );

    const transaction_id = transaction.data.newTransaction.transaction_id;
    const userShipping = await userShippingModel.findOne({ user: userId });
    const cartProducts = cart.products;

    const productList = cartProducts.map((product) => {
      return {
        productId: product.productId,
        key: product.key,
        price: product.price,
        quantity: product.quantity,
      };
    });

    let order = new CustomerOrderModel({
      user: userId,
      shippingInfo: userShipping._id,
      transactionId: transaction_id,
      totalPrice: totalPrice,
      products: [],
    });

    productList.forEach((p) => {
      order.products.push({
        productId: p.productId,
        key: p.key,
        price: p.price,
        quantity: p.quantity,
      });
    });

    try {
      await order.save();
      order = await CustomerOrderModel.findById(order._id);
    } catch (err) {
      console.log("Error in saving order : ", err);
    }

    await axios
      .post("http://localhost:3002/order", {
        order: order,
        ecommerce_account: process.env.ecommerce_account,
        secret_key: process.env.ecommerce_secret,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log("This is from order axios");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Order created");
    order = await CustomerOrderModel.findById(order._id)
      .populate({ path: "products.productId", model: Product })
      .populate({ path: "shippingInfo", model: userShippingModel });
    await userCart.deleteOne({ user: req.userId });
    res.status(200).json({
      order,
    });
  }
  if (req.method === "GET") {
    const orders = await CustomerOrderModel.find({ user: userId })
      .populate({ path: "products.productId", model: Product })
      .populate({ path: "shippingInfo", model: userShippingModel });
    if (!orders) {
      return res.status(404).send(`User order not found`);
    }
    res.status(200).json({
      orders,
    });
  }
}
