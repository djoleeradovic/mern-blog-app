import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRoutes } from "./routes/userRoutes.js";
import { blogRoutes } from "./routes/blogRoutes.js";
import { commentRoutes } from "./routes/commentRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);
// Connect to database and run the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
