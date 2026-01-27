import express from "express";
import { adminAuth, userAuth } from "./middlewares/auth.js";

const app = express();

//currenty using node --watch install nodemon if necessary
app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
  res.send("User login successfully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("Fetched user data");
});
app.get("/admin/getAllUser", (req, res) => {
  res.send("All data fetched successfully");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted successfully");
});

// app.get("/user", (req, res) => {
//   http://localhost:7777/user?userid=101&password=secret
//   console.log(req.query); //Object: null prototype] { userid: '101', password: 'secret' }
//   console.log({ ...req.query }); //{ userid: '101', password: 'secret' }
//   res.send({ firstname: "Abhishek", lastname: "Ojha" });
// });

// app.get("/user/:userid/name/:password", (req, res) => {
//   console.log(req.params); //[Object: null prototype] { userid: 'fly' }
//   console.log({...req.params});
//   res.send({ firstname: "Abhishek", lastname: "Ojha" });
// });

// app.get(/.*fly$/, (req, res) => {
//   res.send({ firstname: "Abhishek", lastname: "Ojha" });
// });

//can write anythhing between us and er
// app.get("/us*er", (req, res) => {
//   res.send({ firstname: "Abhishek", lastname: "Ojha" });
// });

//regex
// app.get(/s/, (req, res) => {
//   res.send({ firstname: "Abhishek", lastname: "Ojha" });
// });

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
