import express from "express";
import userAuth from "../middlewares/auth.js";
import Connections from "../models/connections.js";
import User from "../models/user.js";

const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    res.send(req.user.firstName + " sent an user request");
  } catch (err) {
    res.status(404).send("Someting went wrong: " + err.message);
  }
});

requestRouter.post("/request/:status/:userId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;

    const isUser = await User.findById(toUserId);

    if (!isUser) {
      throw new Error("User not found");
    }

    const connectionExists = await Connections.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (connectionExists) {
      throw new Error("Request already sent");
    }

    const connectionRequest = new Connections({ fromUserId, toUserId, status });
    await connectionRequest.save();
    res.json({
      message: `${req.user.firstName} ${status} the user ${isUser.firstName}`,
      data: connectionRequest,
    });
  } catch (err) {
    res.status(404).send("Someting went wrong: " + err.message);
  }
});

export default requestRouter;
