import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../connectDB'
import shippingModel from '../../models/userShippingModel'
import jwt from 'jsonwebtoken'
import userModel from '../../models/userModel';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.headers.authorization) {
    
    console.log("Unauthorized");
    return res.status(401).send(`Unauthorized`);

  }
  else{
    console.log(req.headers.authorization);
    const { userId} = jwt.verify(req.headers.authorization, process.env.jwtSecret);
    req.userId = userId;

      if(req.method === 'POST'){
        console.log("User id is ", req.userId);
        try{
            const shipping = req.body.shipping;
            const userShipping = new shippingModel({
                user: req.userId,
                ...shipping
            });
            await userShipping.save();
            console.log("User shopping is ",userShipping);
            let user = await userModel.findById(req.userId);
            user.isShipping = true;
            await user.save();
            return res.status(200).json({ userShipping});
        }
        catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    }

    if(req.method === 'GET'){
        try{
            const userShipping = await shippingModel.findOne({user: req.userId});
            console.log("User shipping is ",userShipping);
            return res.status(200).json({ userShipping});
        }
        catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    }

  }
    



}