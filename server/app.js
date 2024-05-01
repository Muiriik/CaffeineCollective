const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dao/database/CaffeineCollective");

app.use(express.json());

app.use(cors());

const userController = require("./controller/user");

app.use("/user", userController);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
