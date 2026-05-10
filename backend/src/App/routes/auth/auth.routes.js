const express = require("express");
const router = express.Router();
const db = require("../../config/database");
const response = require("../../utils/response");

// user login
router.post("/login", async (req, res) => {
  const { email, password} = req.body;
  let query =
    "SELECT * FROM user WHERE email = ? AND password = ?";
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

module.exports = router;
