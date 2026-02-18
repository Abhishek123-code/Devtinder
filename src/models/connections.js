import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: "{VALUE} is not a valid status",
    },
    required: true,
  },
});

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

connectionSchema.pre("save", function () {
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error("Cannot send a request to yourself");
  }
});

const Connections = mongoose.model("ConnectionRequest", connectionSchema);

export default Connections;
