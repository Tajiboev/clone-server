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
    username: {
      type: String,
      unique: true,
      trim: true,
      minLength: [5, "Username must be at least 5 characters long"],
    },
    emailStatus: { type: String, enum: ["in-use", "pending", "verified"] },
  },
  { strictQuery: true, timestamps: true }
);

export default model("User", userSchema);
