import express from "express";
import connectDB from "./config/database.js";
import User from "./models/user.js";
const app = express();

app.use(express.json());
//Get user by ID
app.get("/user", async (req, res) => {
  const userId = req.body;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (err) {
    res.status(404).send("Someting went wrong" + err.message);
  }

  // try {
  //   const user = await User.findOne({ email: userEmail });
  //     res.send(user);
  //   }
  // } catch (err) {
  //   res.status(404).send("Someting went wrong" + err.message);
  // }

  // try {
  //   const user= await User.find({email: userEmail})
  //   if(user.length === 0){
  //     res.send("User not found");
  //   }
  //   else{
  //     res.send(user);
  //   }
  // } catch (err) {
  //   res.status(404).send("Someting went wrong" + err.message);
  // }
});

//FEED API- GET/ feed- get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(500).send("Someting went wrong" + err.message);
  }
});

//delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("Someting went wrong" + err.message);
  }
});

//Update a user
app.patch("/user", async (req, res) => {
  const userID = req.body.email;
  const data = req.body;

  try {
    const user = await User.findOneAndUpdate({ email: userID }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("Someting went wrong" + err.message);
  }
  // try {
  //   const user= await User.findByIdAndUpdate(userID, data, { returnDocument: "after" });
  //   console.log(user);
  //   res.send("User updated successfully");
  // } catch (err) {
  //   res.status(404).send("Someting went wrong" + err.message);
  // }
});

app.post("/signup", async (req, res) => {
  //create an instance of User model
  const user = new User(req.body);
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
