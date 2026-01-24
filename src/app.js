import express from "express";

const app = express();

//currenty using node --watch install nodemon if necessary

app.get("/user", (req, res) => {
  res.send({ firstname: "Abhishek", lastname: "Ojha" });
});

app.post("/user", (req, res) => {
  res.send("data posted successfully");
});

app.patch("/user", (req, res) => {
  res.send("data patched successfully");
});

app.put("/user", (req, res) => {
  res.send({ firstname: "kuchu", lastname: "puchu" });
});

app.delete("/user", (req, res) => {
  res.send("Data deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("This is a test route");
});

app.listen(7777, () => {
  console.log("successfully connected to the server");
});
