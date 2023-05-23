import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findOne({ username }).select("username");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
