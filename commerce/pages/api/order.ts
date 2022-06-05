import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../connectDB'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcryptjs'
import mongoose  from 'mongoose'
import userModel from '../../models/userModel'
import userCart from '../../models/userCart'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import userShippingModel from '../../models/userShippingModel'
import CustomerOrderModel from '../../models/customerOrderModel'
import Product from '../../models/productModel'
import CustomerModel from '../../models/customerModel'
connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.headers.authorization) {
        return res.status(401).send(`Unauthorized`);
      }
      console.log(req.headers.authorization);
      const { userId } = jwt.verify(req.headers.authorization, process.env.jwtSecret);
      req.userId = userId;

    if (req.method === 'POST') {

        const cart  = await userCart.findOne({user: req.userId})
        if(!cart){
            return res.status(404).send(`User cart not found`);
        }
        const user_account = await userShippingModel.findOne({user: req.userId});
        const user_account_number = user_account.account;
        const totalPrice = cart.totalPrice;
        const transaction = await axios.post(
            'http://localhost:3001/bank/create_transaction',
            {   
                bank_secret: user_account.bank_secret,
                amount:totalPrice,
                fromAccount:user_account_number,
                toAccount:process.env.ecommerce_account
            }
        )

        
        console.log("This is from Order.js",transaction.data);
        const transaction_id = transaction.data.newTransaction.transaction_id;
        console.log("The transaction ID is : ",transaction_id);
        const userShipping = await userShippingModel.findOne({user: userId});
        console.log("The Shipping Info is : ",userShipping);
        console.log("Cart Products",cart.products);
        const cartProducts = cart.products;
        const productList = cartProducts.map(product => {
            return {
                productId: product.productId,
                key: product.key,
                price: product.price,
                quantity: product.quantity
            }
        }
        )


        // console.log("Cart Products",cartProducts);

        let order = new CustomerOrderModel({
            shippingInfo: userShipping._id,
            transactionId: transaction_id,
            totalPrice: totalPrice,
            products:[],

        });
        // order.products = productList[0];
        productList.forEach((p) => {
            console.log({p})
            order.products.push({
                productId: p.productId,
                key: p.key,
                price: p.price,
                quantity: p.quantity
            });
            }
        )
        // order.products.push({
        //     productId: productId,
        //     key: targetProduct.key,
        //     price: targetProduct.price,
        //     quantity: quantity
        // });

        try{
            console.log("Before Saving Order : ",order);
        // console.log("DEAD", order.products.myProductId);
        await order.save();

        console.log("After Saving Order : ",order);
        console.log("After mozo, ", order._id);
        order = await CustomerOrderModel.findById(order._id);
        console.log("The order is : ",order);
        }catch(err){
            console.log("Error in saving order : ",err);
        }
        await axios.post(
            'http://localhost:3002/order',
            {
                order: order,
                ecommerce_account: process.env.ecommerce_account,
                secret_key : process.env.ecommerce_secret
            }
        ).
        then(
            (response) => {
                console.log(response.data);
            }
        )
        .catch(
            (error) => {
                console.log(error);

            }
        )


        res.status(200).json({
            order
        })


    }
}