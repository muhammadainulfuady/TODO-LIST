const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const response = require("../../utils/response");

// user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let query = "SELECT * FROM user WHERE email = ? AND password = ?";
  try {
    const [rows] = await db.promise().query(query, [email, password]);
    if (rows.length === 0) {
      response(res, 401, "Invalid email or password", null);
      return;
    }
    response(res, 200, "Login successful", rows[0]);
  } catch (err) {
    console.error("Error during login:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

// user register
router.post("/register", async (req, res) => {
  const { username, password, email, nama } = req.body;
  let query =
    "INSERT INTO user (username, password, email, nama) VALUES (?, ?, ?, ?)";
  try {
    const [rows] = await db
      .promise()
      .query(query, [username, password, email, nama]);
    if (rows.length === 0) {
      response(res, 401, "Invalid email or password", null);
      return;
    }
    response(res, 200, "Registration successful", rows[0]);
  } catch (err) {
    console.error("Error during registration:", err);
    response(res, 500, "Email maybe already exists", null);
  }
});

module.exports = router;
