const express = require("express");
const router = express.Router();
const db = require("../config/database");
const response = require("../utils/response");

/**
 * @openapi
 * /api/todos:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get all todos
 *     responses:
 *       200:
 *         description: Todos fetched successfully
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
 *                         $ref: "#/components/schemas/Todo"
 *       500:
 *         description: Internal Server Error
 */
// get all todos
router.get("/", async (req, res) => {
  let query = "SELECT * FROM todos";
  try {
    const [rows] = await db.promise().query(query);
    response(res, 200, "Todos fetched successfully", rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

/**
 * @openapi
 * /api/todos/{id}:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get todo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/ApiResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: "#/components/schemas/Todo"
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */
// get todos by ID
router.get("/:id", async (req, res) => {
  let query = "SELECT * FROM todos WHERE id_todos = ?";
  try {
    const [rows] = await db.promise().query(query, [req.params.id]);
    if (rows.length === 0) {
      response(res, 404, "Todo not found", null);
      return;
    }
    response(res, 200, "Todo fetched successfully", rows[0]);
  } catch (err) {
    response(res, 500, "Tidak ada todo yang sesuai", null);
  }
});

/**
 * @openapi
 * /api/todos/user/{userId}:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get todos by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todos fetched successfully
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
 *                         $ref: "#/components/schemas/Todo"
 *       500:
 *         description: Internal Server Error
 */
// get todos by user ID
router.get("/user/:userId", async (req, res) => {
  let query = "SELECT * FROM todos WHERE id_user = ?";
  try {
    const [rows] = await db.promise().query(query, [req.params.userId]);
    response(res, 200, "Todos fetched successfully", rows);
  } catch (err) {
    console.error("Error fetching todos:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

/**
 * @openapi
 * /api/todos/create:
 *   post:
 *     tags:
 *       - Todos
 *     summary: Create new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateTodoInput"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/ApiResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: "#/components/schemas/Todo"
 *       500:
 *         description: Internal Server Error
 */
// create new todo
router.post("/create", async (req, res) => {
  const { id_user, judul, deskripsi } = req.body;
  let query = "INSERT INTO todos (id_user, judul, deskripsi) VALUES (?, ?, ?)";
  try {
    const [result] = await db
      .promise()
      .query(query, [id_user, judul, deskripsi]);
    response(res, 201, "Todo created successfully", {
      id_todos: result.insertId,
      judul,
      deskripsi,
      id_user,
    });
  } catch (err) {
    console.error("Error creating todo:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

/**
 * @openapi
 * /api/todos/complete/{id}:
 *   put:
 *     tags:
 *       - Todos
 *     summary: Mark todo as complete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/IdUserBody"
 *     responses:
 *       200:
 *         description: Todo marked as complete
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */
// complete todo
router.put("/complete/:id", async (req, res) => {
  let query =
    "UPDATE todos SET is_completed = 1 WHERE id_todos = ? AND id_user = ?";
  try {
    const [result] = await db
      .promise()
      .query(query, [req.params.id, req.body.id_user]);
    if (result.affectedRows === 0) {
      response(res, 404, "Todo not found", null);
      return;
    }
    response(res, 200, "Todo marked as complete", null);
  } catch (err) {
    console.error("Error completing todo:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

/**
 * @openapi
 * /api/todos/decomplete/{id}:
 *   put:
 *     tags:
 *       - Todos
 *     summary: Mark todo as incomplete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/IdUserBody"
 *     responses:
 *       200:
 *         description: Todo marked as incomplete
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */
// decomplete todo
router.put("/decomplete/:id", async (req, res) => {
  let query =
    "UPDATE todos SET is_completed = 0 WHERE id_todos = ? AND id_user = ?";
  try {
    const [result] = await db
      .promise()
      .query(query, [req.params.id, req.body.id_user]);
    if (result.affectedRows === 0) {
      response(res, 404, "Todo not found", null);
      return;
    }
    response(res, 200, "Todo marked as incomplete", null);
  } catch (err) {
    console.error("Error decompleting todo:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

/**
 * @openapi
 * /api/todos/update/{id}:
 *   put:
 *     tags:
 *       - Todos
 *     summary: Update todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateTodoInput"
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/ApiResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: "#/components/schemas/Todo"
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */
// update todo
router.put("/update/:id", async (req, res) => {
  const { id_todos, id_user, judul, deskripsi } = req.body;
  let query =
    "UPDATE todos SET judul = ?, deskripsi = ? WHERE id_todos = ? AND id_user = ?";
  try {
    const [result] = await db
      .promise()
      .query(query, [judul, deskripsi, req.params.id, id_user]);
    if (result.affectedRows === 0) {
      response(res, 404, "Todo not found", null);
      return;
    }
    response(res, 200, "Todo updated successfully", {
      id_todos: req.params.id,
      id_user,
      judul,
      deskripsi,
    });
  } catch (err) {
    console.error("Error updating todo:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

/**
 * @openapi
 * /api/todos/delete/{id}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Delete todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/IdUserBody"
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Internal Server Error
 */
// delete todo
router.delete("/delete/:id", async (req, res) => {
  let query = "DELETE FROM todos WHERE id_todos = ? AND id_user = ?";
  try {
    const [result] = await db
      .promise()
      .query(query, [req.params.id, req.body.id_user]);
    if (result.affectedRows === 0) {
      response(res, 404, "Todo not found", null);
      return;
    }
    response(res, 200, "Todo deleted successfully", null);
  } catch (err) {
    console.error("Error deleting todo:", err);
    response(res, 500, "Internal Server Error", null);
  }
});

module.exports = router;
