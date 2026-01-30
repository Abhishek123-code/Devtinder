import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb://nodeDemo:nodeDemo712249@ac-5atkqy7-shard-00-00.n2cleyg.mongodb.net:27017,ac-5atkqy7-shard-00-01.n2cleyg.mongodb.net:27017,ac-5atkqy7-shard-00-02.n2cleyg.mongodb.net:27017/devTinder?ssl=true&authSource=admin&retryWrites=true&w=majority",
  );
};

export default connectDB;
