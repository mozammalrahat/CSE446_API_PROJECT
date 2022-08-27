import { products } from "./../../../__mocks__/products";
import mongoose from "mongoose";
import Cart from "../../../models/userCart";
import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../../middleware/authMiddleware";
import userModel from "../../../models/userModel";
import jwt from "jsonwebtoken";
import connectDB from "../../../connectDB";
import UserModel from "../../../models/userModel";
import Product from "../../../models/productModel";
connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.headers.authorization) {
    console.log("Unauthorized", req.headers.authorization);
    return res.status(401).send(`Unauthorized`);
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.jwtSecret
  );
  req.userId = userId;
  const method = req.query.update[0];
  const productId = req.query.update[1];
  const quantity = req.query.update[2];

  if (req.method === "PUT") {
    try {
      if (method === "add") {
        let cart = await Cart.findOne({ user: req.userId });
        const targetProduct = await Product.findById(productId);
        if (!cart) {
          cart = new Cart({
            user: req.userId,
            products: [
              {
                productId: productId,
                key: targetProduct.key,
                price: targetProduct.price,
                quantity: quantity,
              },
            ],
            totalPrice: +quantity * +targetProduct.price,
          });
        } else {
          let is_product = cart.products.find(
            (product) => product.productId.toString() == productId
          );
          if (is_product) {
            for (var i = 0; i < cart.products.length; i++) {
              if (
                cart.products[i].productId.toString() === productId.toString()
              ) {
                cart.products[i].quantity =
                  +cart.products[i].quantity + +quantity;
                cart.totalPrice =
                  cart.totalPrice + +quantity * +targetProduct.price;
              }
            }
          } else if (!is_product) {
            cart.products.push({
              productId: productId,
              key: targetProduct.key,
              price: targetProduct.price,
              quantity: quantity,
            });
            cart.totalPrice =
              +cart.totalPrice + +quantity * +targetProduct.price;
          }
        }
        cart = await cart.save();
        return res.status(200).json({ cart });
      } else if (method === "remove") {
        let cart = await Cart.findOne({ user: req.userId });
        const targetProduct = await Product.findById(productId);

        for (var i = 0; i < cart.products.length; i++) {
          if (cart.products[i].productId.toString() === productId) {
            if (+cart.products[i].quantity - +quantity >= 0) {
              cart.products[i].quantity =
                +cart.products[i].quantity - +quantity;
              cart.totalPrice =
                +cart.totalPrice - quantity * +cart.products[i].price;
            }
          }
        }

        await cart.save();
        return res.status(200).json({ cart });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  if (req.method === "DELETE") {
    try {
      let cart = await Cart.findOne({ user: userId }).populate({
        path: "products.productId",
        model: Product,
      });
      console.log(cart);
      let index = 100;
      for (var i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId._id.toString() === productId) {
          index = i;
        }
      }
      cart.products.splice(index, 1);
      await cart.save();
      return res.status(200).json({ cart });
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
  if (req.method === "POST") {
    try {
      let userCart = await Cart.findOne({ user: userId }).populate({
        path: "products.productId",
        model: Product,
      });
      if (!userCart) {
        const cart = req.body;
        userCart = new Cart({
          user: req.userId,
          products: {
            ...cart.products,
          },
          totalPrice: cart.totalPrice,
        });

        await userCart.save();
        return res.status(200).json({ userCart });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
};
export default handler;
