import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../connectDB";
import Product from "../../../models/productModel";

connectDB();

 const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET'){
    console.log('req.query', req.query);
    const product = await Product.findOne({_id: req.query.id});
    res.status(200).json(product);
    };
};

export default getProducts;
