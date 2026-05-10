const express = require("express");
const router = express.Router();
const db = require("../config/database");
const response = require("../utils/response");

/**
 * @openapi
 * /api:
 *   get:
 *     tags:
 *       - Main
 *     summary: Health check
 *     responses:
 *       200:
 *         description: API is working
 */
router.get("/", (req, res) => {
  res.send("My api is working");
});

module.exports = router;
