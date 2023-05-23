import mongoose, { Mongoose } from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
    },
    comment_content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

CommentSchema.statics.createComment = async function (
  author,
  post_id,
  comment_content
) {
  if (!comment_content) {
    throw new Error("Comment content are required");
  }

  const comment = await this.create({ author, post_id, comment_content });

  return comment;
};

export const commentModel = mongoose.model("comments", CommentSchema);
