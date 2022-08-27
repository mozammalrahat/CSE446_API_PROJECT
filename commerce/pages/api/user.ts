// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../middleware/authMiddleware";
import userModel from "../../models/userModel";
import jwt from "jsonwebtoken";
import connectDb from "../../connectDB";
connectDb();

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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
      const user = await userModel.findById(userId);
      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).send(`Server error`);
    }
  }

  if (req.method === "PATCH") {
    try {
      let updatedUser = {};
      if (req.body.user.name) {
        updatedUser.name = req.body.user.name;
      }
      if (req.body.user.email) {
        updatedUser.email = req.body.user.email;
      }
      let user = await userModel.findOneAndUpdate({ _id: userId }, updatedUser);

      return res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).send(`Server error`);
    }
  }
};
export default userHandler;
