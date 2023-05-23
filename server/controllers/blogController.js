import { blogModel } from "../models/blogModel.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.find({ _id: id });

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createBlog = async (req, res) => {
  const { title, body } = req.body;
  const author = req.user.username;

  try {
    const blog = await blogModel.createBlog(title, body, author);

    res.status(200).json(blog._id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.body;

  try {
    const blog = await blogModel.findByIdAndDelete(id);

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAllUserBlogs = async (req, res) => {
  const { username } = req.params;

  try {
    const blog = await blogModel.deleteMany({ author: username });

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserBlogs = async (req, res) => {
  const { username } = req.params;

  try {
    const blogs = await blogModel
      .find({ author: username })
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editBlog = async (req, res) => {
  const { title, body } = req.body;
  const author = req.user.username;

  try {
    const blog = await blogModel.edit(title, body, author);

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
