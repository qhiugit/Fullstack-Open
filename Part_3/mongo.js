const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log({ error: "Not connected" });
  }
};
connectDB();
