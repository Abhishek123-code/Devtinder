import express from "express";
import User from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //create an instance of User model
  //NEVER TRUST request BODY, VALIDATE THE DATA BEFORE SAVING IT TO THE DATABASE
  //using bcrypt , use argon2 for better security
  const { firstName, lastName, email, password, gender, skills } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    gender,
    skills,
  });
  try {
    const savedUser = await user.save();

    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie (Security)
      secure: false, // MUST be false for localhost (since you are using http, not https)
      sameSite: "lax",
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.send({ message: "User Added Successfully", data: savedUser });
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
      throw new Error("Invalid Credentials");
    } else {
      //create a JWT token
      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript from accessing the cookie (Security)
        secure: false, // MUST be false for localhost (since you are using http, not https)
        sameSite: "lax",
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send(user);
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now(0)),
  });
  res.send("Logged out successfully");
});

export default authRouter;
