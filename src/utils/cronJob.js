import cron from "node-cron";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { run } from "./sesSendEmail.js";
import Connections from "../models/connections.js";

// This job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => {
  // Send emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await Connections.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.email)),
    ];

    for (const email of listOfEmails) {
      // Send Emails
      try {
        const res = await run(
          "New Friend Requests pending for " + email,
          "Ther eare so many frined reuests pending, please login to DevTinder.in and accept or reject the reqyests.",
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
