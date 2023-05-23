import { commentModel } from "../models/commentModel.js";

export const getComments = async (req, res) => {
  const post_id = req.params;

  try {
    const comments = await commentModel
      .find({ post_id: post_id.id })
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createComment = async (req, res) => {
  const author = req.user.username;
  const { post_id, comment_content } = req.body;

  try {
    const comment = await commentModel.createComment(
      author,
      post_id,
      comment_content
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete one comment
export const deleteComment = async (req, res) => {
  const id = req.params;
  try {
    const comment = await commentModel.findByIdAndRemove({ _id: id.id });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete all comments from user when deleting account
export const deleteUserComments = async (req, res) => {
  const author = req.params.author;

  try {
    const comment = await commentModel.deleteMany({ author });
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
