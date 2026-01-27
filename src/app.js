import express from "express";

const app = express();

//currenty using node --watch install nodemon if necessary
// app.use("/user", (req, res) => {
//   res.send("LOL");
// });
app.get(
  "/user",
  [
    (req, res, next) => {
      console.log("handling route 1");
      next();
    },

    (req, res, next) => {
      console.log("handling route 2");
      next();
    },
  ],
  (req, res, next) => {
    console.log("handling route 3");
    next();
  },
  (req, res, next) => {
    console.log("handling route 4");
    next();
  },
  (req, res, next) => {
    res.send("1st route handler");
    console.log("handling route 5");
    next();
  },
);
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
