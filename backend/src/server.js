require("dotenv").config("../.env");
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../src/App/config/database");
const userRoutes = require("../src/App/routes/user.routes");
const todosRoutes = require("../src/App/routes/todos.routes");
const mainRoutes = require("../src/App/routes/main.routes");
const authRoutes = require("../src/App/routes/auth/auth.routes");
const response = require("../src/App/utils/response");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/docs/swagger");
app.use(express.json());
app.use(cors());
const port = process.env.APP_PORT;

app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);
app.use("/api/users", userRoutes);
app.use("/api", mainRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/api`);
});
