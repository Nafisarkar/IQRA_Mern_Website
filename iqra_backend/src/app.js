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
require("dotenv").config();

const rateLimiter = ratelimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 100 requests per windowMs
});

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Also add these headers to all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(xss());
// app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
