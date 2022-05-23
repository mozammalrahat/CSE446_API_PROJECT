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
    
    console.log("Unauthorized", req.headers.authorization);
    return res.status(401).send(`Unauthorized`);

  }
  const { userId} = jwt.verify(req.headers.authorization, process.env.jwtSecret);
  req.userId = userId;
  console.log(req.query.update[0]);
  const method = req.query.update[0];
  const productId =  req.query.update[1];
  const quantity = req.query.update[2];

  if(req.method === 'PUT'){
    try{
        if(method ==='add'){
            let cart = await Cart.findOne({user:req.userId})
            // .populate({path:'products.productId', model:Product});
            console.log("productId",productId);
            const targetProduct = await Product.findById(productId);
            console.log("Cart from line 32",cart);
            if(!cart){
                cart = new Cart({
                    user: req.userId,
                    products: [{
                        productId: productId,
                        price: targetProduct.price,
                        quantity: quantity
                    }],
                    totalPrice: +quantity*(+targetProduct.price)
                });
                console.log("Cart from line 42",cart);
            }
            else
            {  
                let is_product = cart.products.find(product => product.productId.toString() == productId);
            // filteredproduct.quantity = filteredproduct.quantity + quantity;
            // cart.totalPrice = +cart.totalPrice + quantity * filteredproduct.price;
            console.log("From line 56",is_product);
            if(is_product){for(var i=0;i<cart.products.length;i++){
                if(cart.products[i].productId.toString() === productId.toString()){
                    cart.products[i].quantity = +cart.products[i].quantity+(+quantity);
                    cart.totalPrice = cart.totalPrice + (+quantity) * (+targetProduct.price);
                }
            }}
            else if(!is_product){
                cart.products.push({
                    productId: productId,
                    price: targetProduct.price,
                    quantity: quantity
                });
                cart.totalPrice = +cart.totalPrice + (+quantity) * (+targetProduct.price);
            }
            
            
        }
        console.log("Modified cart is :",cart )
        cart = await cart.save()
        console.log("User cart is ",cart);
        return res.status(200).json({ cart});
    }
        else if(method ==='remove'){
            let cart = await Cart.findOne({user:req.userId});
            const targetProduct = await Product.findById(productId);
            console.log(cart);
        
            for(var i=0;i<cart.products.length;i++){
                if(cart.products[i].productId.toString() === productId){
                    if(+cart.products[i].quantity-(+quantity)>=0){

                        cart.products[i].quantity = +cart.products[i].quantity-(+quantity);
                        cart.totalPrice = +cart.totalPrice - quantity * (+cart.products[i].price);
                    }
                }
            }
    
            await cart.save();
            console.log("User cart is ",cart);
            return res.status(200).json({ cart});

        }
    }
    catch(err){
        console.error(err);
        return res.status(500).send(err);
    }
    }


  if(req.method === 'POST'){
    try{
      let userCart = await Cart.findOne({user:userId}).populate({path:'products.productId', model:Product});
        // console.log("User cart is", req.data);
        if(!userCart){
            const cart = req.body;
            console.log("Cart is", cart);
            userCart = new Cart({
            user: req.userId,
            products: {
                ...cart.products
            },
            totalPrice: cart.totalPrice
        });
        
        await userCart.save();
        console.log("User cart is ",userCart);
        return res.status(200).json({ userCart});}
    }catch(err){
        console.error(err);
        return res.status(500).send(err);
    }
    }
}
export default handler;

