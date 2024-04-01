import mongoose, { Model } from "mongoose";
import { userSchema } from "./Schema.js";

export const users = mongoose.model(
  "User", userSchema
)
