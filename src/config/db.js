import mongoose from "mongoose";

export const connectDB = async () => {
  try{
    const connexionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce`)
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

