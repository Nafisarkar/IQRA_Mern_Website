const mongoose = require("mongoose");
const { MONGODB_URL } = require("../secrets");
const createHttpError = require("http-errors");

const connectDB = async () => {
  try {
    await mongoose
      .connect(MONGODB_URL)
      .then((db) => console.log("Connected to MongoDB at", db.connection.host))
      .catch((error) => {
        createHttpError(500, error.message);
      });
  } catch (error) {
    throw error;
  }
};

module.exports = connectDB;
