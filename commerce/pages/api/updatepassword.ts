import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../connectDB";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userModel from "../../models/userModel";
import jwt from "jsonwebtoken";
connectDB();

let name: String;
let email: String;
let password: String;
let msg: String;
let emailAlreadyExists: any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    if (!req.headers.authorization) {
      return res.status(401).send(`Unauthorized`);
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.jwtSecret
    );
    req.userId = userId;
    try {
      let newPassword = req.body.password;
      if (newPassword.length < 6) {
        return res.status(401).json({
          msg: "Password must be at least 6 characters",
        });
      }
      newPassword = await bcrypt.hash(newPassword, 10);

      let user = await userModel.findOneAndUpdate(
        { _id: userId },
        { password: newPassword },
        { new: true }
      );
      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).send(`Server error`);
    }
  }
  if (req.method === "POST") {
    try {
      name = req.body.user.name;
      email = req.body.user.email.toLowerCase();
      emailAlreadyExists = await userModel.findOne({ email: email });
      password = req.body.user.password;
      if (name.length < 3) {
        res.status(401).json({ msg: "Name is too short" });
      } else if (!isEmail(email)) {
        res.status(401).json({
          msg: "Invalid Email",
        });
      } else if (emailAlreadyExists) {
        res.status(401).json({
          msg: "Email already exists",
        });
      } else if (password.length < 6) {
        res.status(401).json({
          msg: "Password must be at least 6 characters",
        });
      } else {
        let user = {
          name,
          email,
          password,
        };
        user.password = await bcrypt.hash(password, 10);
        const newUser = new userModel(user);
        await newUser.save();
        const payload = { userId: newUser._id };
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: "2d" },
          (err, token) => {
            if (err) throw err;
            res.status(200).json(token);
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    }
  }
}
