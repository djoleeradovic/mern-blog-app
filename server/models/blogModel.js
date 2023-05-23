import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.createBlog = async function (title, body, author) {
  if (!title || !body) {
    throw new Error("Title and body are required");
  }

  const blog = await this.create({ title, body, author });

  return blog;
};

UserSchema.statics.edit = async function (title, body, author) {
  if (!title && !body) {
    throw new Error("Title and body are required");
  }

  const blog = await this.findOneAndUpdate({ author }, { title, body });

  return blog;
};

export const blogModel = mongoose.model("blogs", UserSchema);
