const app = require("./app");
const connectDB = require("./configs/db");
const { SERVER_PORT } = require("./secrets"); // Ensure SERVER_PORT is defined in secrets.js

// Attempt to connect to DB when the module is loaded.
// This is crucial for Vercel's serverless environment.
const dbConnectionSetupPromise = connectDB().catch((err) => {
  console.error(
    "CRITICAL: Initial MongoDB connection setup failed. API requests requiring DB will likely fail.",
    err.message
  );
  // For serverless, we typically don't exit the process here,
  // as the function might still serve non-DB requests or Vercel might retry.
});

// For local development (not on Vercel):
if (!process.env.VERCEL_ENV) {
  // VERCEL_ENV is automatically set by Vercel
  dbConnectionSetupPromise
    .then(() => {
      // This .then() will execute if connectDB resolves successfully.
      console.log(
        "Database connection successful or already in progress for local server."
      );
      app.listen(SERVER_PORT || 3001, () => {
        // Use a fallback port if SERVER_PORT is undefined
        console.log(
          `Server running locally at http://localhost:${SERVER_PORT || 3001}`
        );
      });
    })
    .catch((err) => {
      // This .catch() will execute if connectDB initially rejects (e.g., bad URI, auth failure).
      console.error(
        "Local server startup failed due to MongoDB connection error:",
        err.message
      );
      // process.exit(1); // Optionally exit for local dev if DB is critical
    });
}

// Export the app for Vercel.
// Vercel imports this module and uses the exported Express app.
// The connectDB() call above ensures the connection process is initiated when the function instance starts.
module.exports = app;
