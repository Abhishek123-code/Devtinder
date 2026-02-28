import express from "express";
import User from "../models/user.js";
import userAuth from "../middlewares/auth.js";
import Connections from "../models/connections.js";

const userRouter = express.Router();

const USER_REF_DATA =
  "firstName lastName PhotoURL gender age description skills";

//FEED API- GET/ feed- get all the users from the database
userRouter.get("/feed", userAuth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 50;
  limit = limit > 50 ? 50 : limit;

  const skip = (page - 1) * limit;

  try {
    const user = await Connections.find({
      $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
    }).select("fromUserId toUserId");

    const hideUser = new Set();
    user.forEach((user) => {
      hideUser.add(user.fromUserId.toString());
      hideUser.add(user.toUserId.toString());
    });

    const feedUser = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUser) } },
        { _id: { $ne: req.user._id } },
      ],
    })
      .select(USER_REF_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ message: "Users fetched successfully", data: feedUser });
  } catch (err) {
    res.status(500).send("ERROR" + err.message);
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
//get all accepted requests
userRouter.get("/user/requests/connection", userAuth, async (req, res) => {
  try {
    const connection = await Connections.find({
      $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
      status: "accepted",
    })
      .populate("fromUserId", USER_REF_DATA)
      .populate("toUserId", USER_REF_DATA);

    const data = connection.map((item) => {
      if (item.fromUserId.equals(req.user._id)) {
        return item.toUserId;
      }
      return item.fromUserId;
    });

    res.json({
      message: "successfully fetched data",
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

export default userRouter;
