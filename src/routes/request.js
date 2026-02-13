import express from "express";
import userAuth from "../middlewares/auth.js";

const requestRouter = express.Router();

requestRouter.get("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    res.send(req.user.firstName + " sent an user request");
  } catch (err) {
    res.status(404).send("Someting went wrong: " + err.message);
  }
});

export default requestRouter;
