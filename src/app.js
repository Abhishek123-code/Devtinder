import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import userAuth from "./middlewares/auth.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

//FEED API- GET/ feed- get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(500).send("Someting went wrong" + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("Someting went wrong: " + err.message);
  }
});

app.get("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    res.send(req.user.firstName + " sent an user request");
  } catch (err) {
    res.status(404).send("Someting went wrong: " + err.message);
  }
});

app.post("/login", async (req, res) => {
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

app.post("/signup", async (req, res) => {
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

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("successfully connected to the server");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
