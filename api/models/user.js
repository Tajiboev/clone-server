import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: { type: Boolean, default: false },
  },
  { strictQuery: true, timestamps: true }
);

export default model("User", userSchema);
