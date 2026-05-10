const express = require("express");
const router = express.Router();
const db = require("../config/database");
const response = require("../utils/response");

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
