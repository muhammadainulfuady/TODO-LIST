const express = require("express");
const router = express.Router();
const db = require("../config/database");
const response = require("../utils/response");

router.get("/", (req, res) => {
  res.send("My api is working");
});

module.exports = router;
