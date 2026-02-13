import express from "express";
import User from "../models/user.js";

const userRouter = express.Router();

//FEED API- GET/ feed- get all the users from the database
userRouter.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(500).send("Someting went wrong" + err.message);
  }
});

export default userRouter;
