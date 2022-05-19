import  jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next'

const authMiddleware=(req: NextApiRequest,  res: NextApiResponse)=> {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send(`Unauthorized`);
    }
    console.log(req.headers.authorization);
    const { userId } = jwt.verify(req.headers.authorization, process.env.jwtSecret);
    req.userId = userId;
  } catch (error) {
    console.error(error);
    return res.status(401).send(`Unauthorized`);
  }
};

export default authMiddleware;
