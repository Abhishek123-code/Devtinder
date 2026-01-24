import express from "express";

const app = express();

//currenty using node --watch install nodemon if necessary

app.use("/test", (req, res) => {
  res.send("This is a test route");
});

app.use("/hello", (req, res) => {
  res.send("HELLO hello hello");
});

app.use("/namaste", (req, res) => {
  res.send("Namaste hgkhslh");
});

app.use((req, res) => {
  res.send("This is a express server");
  // If we write this app.use at top then it will be executed for every route
});
app.listen(7777, () => {
  console.log("successfully connected to the server");
});
