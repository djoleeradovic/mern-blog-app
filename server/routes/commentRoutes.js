import express from "express";
import {
  getComments,
  createComment,
  deleteComment,
  deleteUserComments,
} from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/:id", getComments);
router.post("/", createComment);
router.delete("/:id", deleteComment);
router.delete("/user/:author", deleteUserComments);

export { router as commentRoutes };
