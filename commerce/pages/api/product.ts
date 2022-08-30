import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../connectDB";
import ProductModel from "../../models/productModel";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const product = req.body;
      const newproduct = new ProductModel({
        name: product.name,
        key: product.key,
        price: +product.price+product.price*.2,
        description: product.description,
        available: product.available,
        amount: product.amount,
        image: product.image,
        category: product.category,
        createdAt: new Date(),
      });
      await newproduct.save((err, product) => {
        if (err) {
          console.log(err);
        } else {
          console.log(product);
        }
      });
      console.log(newproduct);

      res.status(200).json({ newproduct });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
}
