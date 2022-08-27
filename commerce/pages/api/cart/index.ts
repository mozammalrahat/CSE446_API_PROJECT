import mongoose from 'mongoose';
import Cart  from '../../../models/userCart';
import type { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '../../../middleware/authMiddleware'
import userModel from '../../../models/userModel';
import jwt from "jsonwebtoken";
import connectDB from '../../../connectDB'
import UserModel from '../../../models/userModel';
import Product from '../../../models/productModel';
connectDB();


const handler=async(  req: NextApiRequest,  res: NextApiResponse)=> {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
    
    console.log("Unauthorized");
    return res.status(401).send(`Unauthorized`);

  }
  const { userId} = jwt.verify(req.headers.authorization, process.env.jwtSecret);
  req.userId = userId;
  if(req.method === 'POST'){
    try{
        const cart = req.body
        const userCart = new Cart({
            user: req.userId,
            products: {
                ...cart.products
            },
            totalPrice: cart.totalPrice
        });
        await userCart.save();
       
        return res.status(200).json({ userCart});
    }catch(err){
        console.error(err);
        return res.status(500).send(err);
    }
    }
    
  try{
      const userCart = await Cart.findOne({user:userId}).populate({path:'products.productId', model:Product});
    //   const user = await userModel.findById(userId);
       
      return res.status(200).json({ userCart});
  }catch(err){
      console.error(err);
      return res.status(500).send(`Server error`);
  }
}
export default handler;

