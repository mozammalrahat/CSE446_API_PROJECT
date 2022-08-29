import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../connectDB";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userModel from "../../../models/userModel";
import userCart from "../../../models/userCart";
import jwt from "jsonwebtoken";
import axios from "axios";
import userShippingModel from "../../../models/userShippingModel";
import CustomerOrderModel from "../../../models/customerOrderModel";
import Product from "../../../models/productModel";
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
  if (req.method === "GET") {
    const order = await CustomerOrderModel.findById(req.query.orderId)
      .populate({ path: "products.productId", model: Product })
      .populate({ path: "shippingInfo", model: userShippingModel });
    if (!order) {
      return res.status(404).send(`User order not found`);
    }
    res.status(200).json({
      order,
    });
  }
  if (req.method === "PUT") {
    console.log("Parameters : ", req.query);
    const action = req.query.action;
    const orderId = req.query.orderId;
    let update = {};
    if (action === "accept") {
      update.status = "accepted";
    }
    if (action === "reject") {
      update.status = "rejected";
    }
    if (action === "delivered") {
      update.delivered = true;
    }
    let order = await CustomerOrderModel.findOneAndUpdate(
      { _id: orderId },
      update,
      { new: true }
    );
    return res.status(200).json({ order });
  }
}
