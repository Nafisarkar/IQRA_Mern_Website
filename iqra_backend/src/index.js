const app = require("./app");
const connectDB = require("./configs/db");
const { SERVER_PORT } = require("./secrets");

app.listen(SERVER_PORT, async () => {
  console.log(`Listening on port ${SERVER_PORT}`);
  await connectDB();
});
