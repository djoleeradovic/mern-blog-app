import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw new Error("Username and password must be provided!");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw new Error("User not found!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password is incorrect!");
  }

  return user;
};

UserSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw new Error("Username and password must be provided!");
  }

  const exist = await this.findOne({ username });

  if (exist) {
    throw new Error("User already exist!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({
    username,
    password: hash,
  });

  return user;
};

export const userModel = mongoose.model("users", UserSchema);
