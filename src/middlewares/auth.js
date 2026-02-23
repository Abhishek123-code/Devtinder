import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedMessage = jwt.verify(token, "random");
    const user = await User.findById(decodedMessage._id);
    if (!user) {
      throw new Error("user doesn't exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Someting went wrong: " + err.message);
  }
};

export default userAuth;
