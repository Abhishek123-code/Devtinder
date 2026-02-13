import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //create an instance of User model
  //NEVER TRUST request BODY, VALIDATE THE DATA BEFORE SAVING IT TO THE DATABASE
  //using bcrypt , use argon2 for better security
  const { firstName, lastName, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  const user = new User({ firstName, lastName, email, password: hashPassword });
  console.log(user);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving user " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
      console.log("wrong password");
      throw new Error("Invalid Credentials");
    } else {
      //create a JWT token
      const token = await user.getJWT();
      res.cookie("token", token);

      res.send("Login Successful!!");
    }
  } catch (err) {
    res.status(404).send("Someting went wrong: " + err.message);
  }
});

export default authRouter;
