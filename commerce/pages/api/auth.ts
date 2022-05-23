// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '../../middleware/authMiddleware'
import userModel from '../../models/userModel';
import jwt from "jsonwebtoken";
import connectDb from '../../connectDB';
connectDb();

const handler=async(  req: NextApiRequest,  res: NextApiResponse)=> {
  if (!req.headers.authorization) {
    return res.status(401).send(`Unauthorized`);
  }
  console.log(req.headers.authorization);
  const { userId } = jwt.verify(req.headers.authorization, process.env.jwtSecret);
  req.userId = userId;
  try{
      const user = await userModel.findById(userId);
      return res.status(200).json({ user});
  }catch(err){
      console.error(err);
      return res.status(500).send(`Server error`);
  }
}
export default handler;

