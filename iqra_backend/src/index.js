const app = require("./app");
const connectDB = require("./configs/db");
const { SERVER_PORT } = require("./secrets"); // Ensure SERVER_PORT is defined in secrets.js

app.listen(SERVER_PORT, async () => {
  // Use a fallback port if SERVER_PORT is undefined
  console.log(`Server running locally at http://localhost:${SERVER_PORT}`);
  await connectDB();
});

module.exports = app;
