import express from "express";
import { signup, login, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);

router.delete("/:username", deleteUser);

router.post("/login", login);

export { router as userRoutes };
