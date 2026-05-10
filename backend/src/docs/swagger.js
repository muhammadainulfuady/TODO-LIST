const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API Documentation Todo App",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            status: { type: "integer", example: 200 },
            message: { type: "string", example: "OK" },
            data: { nullable: true },
          },
        },
        User: {
          type: "object",
          properties: {
            id_user: { type: "integer", example: 1 },
            username: { type: "string", example: "johndoe" },
            email: { type: "string", example: "john@example.com" },
            nama: { type: "string", example: "John Doe" },
          },
        },
        Todo: {
          type: "object",
          properties: {
            id_todos: { type: "integer", example: 10 },
            id_user: { type: "integer", example: 1 },
            judul: { type: "string", example: "Belajar Swagger" },
            deskripsi: { type: "string", example: "Tambah dokumentasi API" },
            is_completed: { type: "integer", example: 0 },
          },
        },
        CreateTodoInput: {
          type: "object",
          required: ["id_user", "judul", "deskripsi"],
          properties: {
            id_user: { type: "integer", example: 1 },
            judul: { type: "string", example: "Belajar Swagger" },
            deskripsi: { type: "string", example: "Tambah dokumentasi API" },
          },
        },
        UpdateTodoInput: {
          type: "object",
          required: ["id_user", "judul", "deskripsi"],
          properties: {
            id_user: { type: "integer", example: 1 },
            judul: { type: "string", example: "Update judul" },
            deskripsi: { type: "string", example: "Update deskripsi" },
          },
        },
        AuthLoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john@example.com" },
            password: { type: "string", example: "secret" },
          },
        },
        AuthRegisterInput: {
          type: "object",
          required: ["username", "password", "email", "nama"],
          properties: {
            username: { type: "string", example: "johndoe" },
            password: { type: "string", example: "secret" },
            email: { type: "string", example: "john@example.com" },
            nama: { type: "string", example: "John Doe" },
          },
        },
        IdUserBody: {
          type: "object",
          required: ["id_user"],
          properties: {
            id_user: { type: "integer", example: 1 },
          },
        },
      },
    },
  },

  apis: ["./src/App/routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
