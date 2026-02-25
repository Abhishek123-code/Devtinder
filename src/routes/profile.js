import express from "express";
import userAuth from "../middlewares/auth.js";
import profileEditValidations from "../utils/validations.js";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(401).send("User not authorized " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const user = req.user;
  const updateFields = req.body;
  try {
    if (profileEditValidations(updateFields)) {
      Object.keys(updateFields).forEach(
        (key) => (user[key] = updateFields[key]),
      );
      await user.save();
      res.json({ message: "Profile Updated Successfully", data: user });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const user = req.user;
  const { oldPassword, password } = req.body;
  try {
    const isPasswordValid = await user.comparePassword(oldPassword);
    if (isPasswordValid) {
      user.password = password;
      await user.save();
    } else {
      throw new Error("Wrong Old Password");
    }
    res.send("Password updated successfully.");
  } catch (err) {
    res.status(404).send("Someting  went wrong:" + err.message);
  }
});

export default profileRouter;
