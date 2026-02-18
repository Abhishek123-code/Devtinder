import express from "express";
import User from "../models/user.js";
import userAuth from "../middlewares/auth.js";
import Connections from "../models/connections.js";

const userRouter = express.Router();

const USER_REF_DATA =
  "firstName lastName PhotoURL gender age description skills";

//FEED API- GET/ feed- get all the users from the database
userRouter.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(500).send("Someting went wrong" + err.message);
  }
});

//get all pending requests
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const toUserId = req.user._id;

    const requestReceived = await Connections.find({
      toUserId,
      status: "interested",
    }).populate("fromUserId", USER_REF_DATA);
    res.json({ message: "Data fetched successfully", data: requestReceived });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

userRouter.get("/user/requests/connection", userAuth, async (req, res) => {
  try {
    const connection = await Connections.find({
      $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
      status: "accepted",
    })
      .populate("fromUserId", USER_REF_DATA)
      .populate("toUserId", USER_REF_DATA);

    console.log(connection);

    const data = connection.map((item) => item.fromUserId);
    console.log(data);
    res.json({
      message: "successfully fetched data",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

export default userRouter;
