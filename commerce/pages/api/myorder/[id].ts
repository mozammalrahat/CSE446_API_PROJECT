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
    const orderList = await CustomerOrderModel.find({ user: userId });
    if (!orderList) {
      return res.status(404).send(`User order not found`);
    }
    res.status(200).json({
      orderList,
    });
  }
}
