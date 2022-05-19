import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../connectDB";
import Product from "../../../models/productModel";

connectDB();

 const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET'){
    const products = await Product.find();
    products.map(product => {
        console.log(product.image);
    });
    res.status(200).json(products);
    };
    if(req.method === 'POST'){
        res.send('this is from the create_product endpoint');
    const product = new Product({
        name: 'Product 2',
        price: 50,
        description: 'Product 2 description',
        available: true,
        amount: 10,
        image: 'https://res.cloudinary.com/mozammalhossain/image/upload/v1639404146/ch0nzcvzi23gx6xeugar.jpg',
        category: 'category 2',
        createdAt: new Date()
    });

    await product.save((err:any, product:any) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log(product);
        }
    }
    );
    }
};

export default getProducts;
