import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error("Please define MONGO_URI in .env.local");
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { dbName: "hrms" });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
    }
};

export default connectDB;
