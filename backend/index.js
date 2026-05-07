const port = 3000;
const express = require("express");
const db = require("./connect");
const response = require("./response");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error database" });
    } else {
      res.status(200).json({
        statusCode: 200,
        success: true,
        data: result,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
