import express from "express";
import userAuth from "../middlewares/auth.js";
import Connections from "../models/connections.js";
import User from "../models/user.js";
import { run } from "../utils/sesSendEmail.js";

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
      }

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

      const connectionRequest = new Connections({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();

      res.json({
        message: `${req.user.firstName} ${status} the user ${isUser.firstName}`,
        data: connectionRequest,
      });
    } catch (err) {
      res.status(404).send("Someting went wrong: " + err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.user._id;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status request" });
      }

      const connectionRequest = await Connections.findOne({
        _id: requestId,
        toUserId,
        status: "interested",
      });

      if (!connectionRequest) {
        return res.status(404).json({ message: "Invalid connection request" });
      }

      connectionRequest.status = status;
      await connectionRequest.save();

      const sendEmail = await run();
      console.log(sendEmail);

      res.json({
        message: `Request ${status}`,
        data: connectionRequest,
      });
    } catch (err) {
      res.status(404).send("ERROR" + err.message);
    }
  },
);

export default requestRouter;
