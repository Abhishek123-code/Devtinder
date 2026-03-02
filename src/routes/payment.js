import express from "express";
import userAuth from "../middlewares/auth.js";
import { instance } from "../utils/razorpay.js";
import Payment from "../models/payment.js";
import { membershipAmount } from "../utils/constants.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import User from "../models/user.js";
const paymentRouter = express.Router();

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  const { type } = req.body;
  const { firstName, lastName, email } = req.user;

  try {
    const order = await instance.orders.create({
      amount: membershipAmount[type] * 100,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: false,
      notes: {
        firstName,
        lastName,
        email,
        membershipType: type,
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON(), keyId: process.env.TEST_KEY_ID });
  } catch (Err) {
    console.log(Err);
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  const webhookSignature = req.get("X-Razorpay-Signature");

  try {
    const isWebhookValid = await validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });

    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    if (!isWebhookValid) {
      return res.status(500).json({ message: "Not a valid webhook signature" });
    }
    return res.status(200).json({ message: "received webhook signature" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user;
  if (user.isPremium) {
    return res.json({ isPremium: true });
  } else {
    return res.json({ isPremium: false });
  }
});

export default paymentRouter;
