import mongoose, { Schema } from "mongoose";
const userschema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,

    },
    fullname: {
      type: String,
    },
    password: {
      type: String,
    },

  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userschema,"users");