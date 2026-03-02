import "dotenv/config";
import express from "express";
import "./utils/cronJob.js";
import connectDB from "./config/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestRouter from "./routes/request.js";
import paymentRouter from "./routes/payment.js";
import http from "http";
import initializeSocket from "./utils/socket.js";
import chatRouter from "./routes/chat.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    server.listen(7777, () => {
      console.log("successfully connected to the server");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", err);
  });
