import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../connectDB'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcryptjs'
import mongoose  from 'mongoose'
import userModel from '../../models/userModel'
import jwt from 'jsonwebtoken'
connectDB();

let email: String;
let password: String;
let msg:String;
let valid_password:boolean;

  export default  async function handler(  req: NextApiRequest,  res: NextApiResponse) {
    if(req.method === 'POST'){
       try{
        email =  req.body.user.email.toLowerCase();
        let user = await userModel.findOne({email:email})
        if(user){
            password = req.body.user.password;
            valid_password = await bcrypt.compare(password, user.password);
        }
        if(!isEmail(email)){
            res.status(401).json({
                msg: 'Invalid Email'
            })
        }
        else if(!user){
            res.status(401).json({
                msg: 'Email is not asosiated with any account'
            })
        }
        else if(password.length < 6){
            res.status(401).json({
                msg: 'Password must be at least 6 characters'
            })
        }
        else if(!valid_password){
            res.status(401).json({
                msg: 'Password is incorrect'
            })
        }
        else{
            const payload = { userId: user._id };
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
    }
    catch(err){
    console.log(err);
    res.status(500).send('Server Error');
}
    }
  }
  
  