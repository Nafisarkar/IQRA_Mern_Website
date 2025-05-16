const mongoose = require("mongoose");
const { MONGODB_URL } = require("../secrets");
const createHttpError = require("http-errors");

let connectionPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log(
      "MongoDB already connected. State:",
      mongoose.connection.readyState
    );
    return Promise.resolve(); // Already connected
  }

  if (connectionPromise) {
    console.log("MongoDB connection attempt already in progress.");
    return connectionPromise; // Return existing promise
  }

  console.log("Attempting new MongoDB connection...");
  connectionPromise = mongoose
    .connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      bufferCommands: false, // Disable Mongoose's command buffering
      // Operations will fail immediately if not connected
    })
    .then(() => {
      console.log(
        "MongoDB connected successfully at",
        mongoose.connection.host,
        "- State:",
        mongoose.connection.readyState
      );
      connectionPromise = null; // Clear promise on successful connection
    })
    .catch((err) => {
      console.error(
        "MongoDB connection error during new attempt:",
        err.message
      );
      connectionPromise = null; // Clear promise on failed connection
      // Re-throw to be caught by the caller, e.g., in index.js
      throw createHttpError(500, `MongoDB Connection Error: ${err.message}`);
    });

  return connectionPromise;
};

module.exports = connectDB;
