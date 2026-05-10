const express = require("express");
const router = express.Router();
const db = require("../config/database");
const response = require("../utils/response");

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/ApiResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/User"
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/ApiResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
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
