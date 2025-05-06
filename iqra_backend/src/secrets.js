require("dotenv").config();

const SERVER_PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGO_DB_URL;
const MONGODB_USERNAME = process.env.MONGO_DB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {
  SERVER_PORT,
  MONGODB_URL,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  JWT_SECRET_KEY,
};
