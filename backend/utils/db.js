import mongoose from "mongoose";

let isConnected = false;

export const connectdb = async () => {
  // If already connected, no need to connect again
  if (isConnected) return;

  try {
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(`MONGODB Connected: ${con.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};
