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
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests) only in non-Vercel/non-production envs
      if (
        !origin &&
        process.env.NODE_ENV !== "production" &&
        !process.env.VERCEL_ENV
      ) {
        return callback(null, true);
      }
      // If origin is in allowedOrigins, reflect it
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // Reflect the request origin
      } else if (allowedOrigins.length === 0 && !origin) {
        // Fallback for no origin if allowedOrigins is empty (e.g. local dev before CLIENT_URL is set)
        // This might be too permissive for production if CLIENT_URL is accidentally not set.
        // Consider removing this or making it stricter based on environment.
        callback(null, true);
      } else {
        console.error(
          `CORS Error: Origin ${origin} not in allowed list: ${allowedOrigins.join(
            ", "
          )}`
        );
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
