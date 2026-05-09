require("dotenv").config("../.env");
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./App/config/database");
const port = process.env.APP_PORT;

app.use(cors());

app.get("/", (req, res) => {
  db.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching users");
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
