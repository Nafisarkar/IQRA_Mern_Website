const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/name", (req, res) => {
  res.send("hello nafi!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
