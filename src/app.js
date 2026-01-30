import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js";
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Sachin",
    lastName: "Tendulkar",
    email: "sachin@tendulkar.com",
    password: "sachin123",
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.send(400).send("Error saving user " + err.message);
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
