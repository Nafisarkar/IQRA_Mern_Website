const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const postRouter = require("./routers/postRouter");
const ratelimiter = require("express-rate-limit");
const { xss } = require("express-xss-sanitizer");
const userRouter = require("./routers/userRouter");
const seedUserRouter = require("./seed/routers/seedUserRouter");
const seedPostRouter = require("./seed/routers/seedPostRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./configs/db");
require("dotenv").config();

// Ensure CLIENT_URL is defined in your .env or Vercel environment variables
// e.g., CLIENT_URL=https://your-frontend-app.vercel.app
const allowedOrigins = [];
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL_ENV) {
  // For local development
  allowedOrigins.push("http://localhost:5173");
}
console.log("Allowed Origins for CORS:", allowedOrigins);

const rateLimiter = ratelimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
});

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// The cors middleware above should handle all necessary CORS headers,
// including Access-Control-Allow-Origin, Access-Control-Allow-Credentials, etc.
// The manual header setting block below is removed as it's redundant and can conflict.

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(xss());
// app.use(rateLimiter); // Consider re-enabling after fixing auth
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("API DB Connection Middleware Error:", error.message);
    next(
      createError(503, "Database service unavailable. Please try again later.")
    );
  }
});

//base url
app.get("/", (req, res, next) => {
  res.send("Quran Sunnah API");
});

//routes
app.use("/api", postRouter);
app.use("/api", userRouter);

//seeding routes
app.use("/api/seed", seedUserRouter);
app.use("/api/seed", seedPostRouter);

//client error
app.use((req, res, next) => {
  next(createError(404, "Page Not Found"));
});

//server error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
