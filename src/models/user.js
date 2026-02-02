import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
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
      minLength: 6,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate: (value) => {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Invalid gender value");
        }
      },
    },
    description: {
      type: String,
      maxLength: 300,
      default: "description not provided",
    },
    PhotoURL: {
      type: String,
      default: "https://cdn-icons-png.freepik.com/256/5580/5580988.png",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
// module.exports= User;
