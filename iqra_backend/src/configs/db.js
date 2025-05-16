const mongoose = require("mongoose");
const { MONGODB_URL } = require("../secrets");
const createHttpError = require("http-errors");

const connectDB = async () => {
  try {
    // Check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB.");
      return;
    }

    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Optional: Increase socket timeout
    });
    console.log("Connected to MongoDB at", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Throwing the error or creating an HttpError can be handled by global error handler
    // For Vercel, logging is often more immediately useful for initial diagnostics.
    throw createHttpError(500, `MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
