import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});

