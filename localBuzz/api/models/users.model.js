import mongoose from "mongoose";
import { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: () => "Invalid Email",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  refreshTokens: [
    {
      type: String,
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;
  }

  return next;
});

userSchema.post("save", (error, _doc, next) => {
  console.log("post error", error);

  if (error.code === 11000) {
    return next({ message: "Email already exists" });
  }

  return next();
});

userSchema.set("toJSON", {
  transform: function (_doc, ret, _opt) {
    delete ret.password;
    delete ret.refreshTokens;
    delete ret.__v;

    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
