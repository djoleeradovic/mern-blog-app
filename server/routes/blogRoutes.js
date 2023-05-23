import express from "express";
import {
  getBlogs,
  createBlog,
  deleteBlog,
  getUserBlogs,
  deleteAllUserBlogs,
  getBlog,
  editBlog,
} from "../controllers/blogController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", getBlogs);

router.get("/:id", getBlog);

router.get("/user/:username", getUserBlogs);

router.delete("/:username", deleteAllUserBlogs);

router.post("/", createBlog);

router.patch("/:id", editBlog);

router.delete("/", deleteBlog);

export { router as blogRoutes };
