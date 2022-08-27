// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../middleware/authMiddleware";
import LocalShippingIcon from "../../models/userModel";
import shippingInfoModel from "../../models/userShippingModel";
import jwt from "jsonwebtoken";
import connectDb from "../../connectDB";
connectDb();

const shippingHandle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization) {
    return res.status(401).send(`Unauthorized`);
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.jwtSecret
  );
  req.userId = userId;
  if (req.method === "GET") {
    try {
      const shippingInfo = await shippingInfoModel.findOne({ user: userId });
      return res.status(200).json({ shippingInfo });
    } catch (err) {
      console.error(err);
      return res.status(500).send(`Server error`);
    }
  }

  if (req.method === "PATCH") {
    try {
      let updatedShippingInfo = {};
      if (req.body.shippingInfo.house) {
        updatedShippingInfo.house = req.body.shippingInfo.house;
      }
      if (req.body.shippingInfo.street) {
        updatedShippingInfo.street = req.body.shippingInfo.street;
      }
      if (req.body.shippingInfo.city) {
        updatedShippingInfo.city = req.body.shippingInfo.city;
      }
      if (req.body.shippingInfo.zip) {
        updatedShippingInfo.zip = req.body.shippingInfo.zip;
      }
      if (req.body.shippingInfo.phone) {
        updatedShippingInfo.phone = req.body.shippingInfo.phone;
      }
      if (req.body.shippingInfo.account) {
        updatedShippingInfo.account = req.body.shippingInfo.account;
      }
      if (req.body.shippingInfo.bank_secret) {
        updatedShippingInfo.bank_secret = req.body.shippingInfo.bank_secret;
      }
      let shippingInfo = await shippingInfoModel.findOneAndUpdate(
        { user: userId },
        updatedShippingInfo,
        { new: true }
      );

      console.log("Shipping Information from backend:", updatedShippingInfo);

      return res.status(200).json({ shippingInfo });
    } catch (err) {
      console.error(err);
      return res.status(500).send(`Server error`);
    }
  }
};
export default shippingHandle;
