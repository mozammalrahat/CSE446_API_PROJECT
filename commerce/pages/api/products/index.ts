import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../connectDB";
import Product from "../../../models/productModel";

connectDB();

 const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET'){
    const products = await Product.find();
    res.status(200).json(products);
    };
    if(req.method === 'POST'){
    const product = req.body;
    const newProduct = new Product({
        name: product.name,
        key: product.key,
        price: product.price,
        description: product.description,
        available: product.available,
        amount: product.amount,
        image: product.image,
        category:  product.category,
        createdAt: new Date()
    });

    await newProduct.save((err:any, product:any) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log(product);
        }
    }
    );

    res.status(200).json(newProduct);
    }

};

export default getProducts;
