import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (username) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  return token;
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.login(username, password);
    const token = createToken(user.username);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.signup(username, password);
    const token = createToken(user.username);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    await userModel.findOneAndDelete({ username });

    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
