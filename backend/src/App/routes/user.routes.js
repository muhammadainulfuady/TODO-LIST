const express = require("express");
const router = express.Router();
const db = require("../config/database");
const response = require("../utils/response");

// get all users
router.get("/", async (req, res) => {
  let query = "SELECT * FROM user";
  try {
    const [rows] = await db.promise().query(query);
    response(res, 200, "Users fetched successfully", rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

// get user by ID
router.get("/:id", async (req, res) => {
  let query = "SELECT * FROM user WHERE id_user = ?";
  try {
    const [rows] = await db.promise().query(query, [req.params.id]);
    if (rows.length === 0) {
      response(res, 404, "User not found", null);
      return;
    }
    response(res, 200, "User fetched successfully", rows[0]);
  } catch (err) {
    response(res, 500, "Tidak ada user yang sesuai", null);
  }
});



module.exports = router;
