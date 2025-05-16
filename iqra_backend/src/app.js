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
const allowedOrigins = [
  "https://iqra-mern-website-abos.vercel.app", // Your Vercel frontend
  "http://localhost:5173", // Vite default port
  "http://localhost:3000", // Express default port
  "http://127.0.0.1:5173", // Also allow localhost as 127.0.0.1
  "http://127.0.0.1:3000",
];

// Add this debug log to check allowed origins
console.log("Allowed Origins for CORS:", allowedOrigins);

const rateLimiter = ratelimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150,
});

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Request origin:", origin); // Log the origin of each request

      // Allow requests with no origin (like Postman or curl requests)
      if (!origin) {
        return callback(null, true);
      }

      // Check if origin is in the allowed list
      if (allowedOrigins.includes(origin)) {
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
