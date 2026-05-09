const db = require("../config/database");
const { faker } = require("@faker-js/faker");
const setTodos = async () => {
  for (let i = 0; i < 10; i++) {
    const id_user = Math.floor(Math.random() * 10) + 1;
    const judul = faker.lorem.sentence();
    const deskripsi = faker.lorem.paragraph();
    const is_completed = i % 2;
    const query = `INSERT INTO todos (id_user, judul, deskripsi, is_completed) VALUES (?, ?, ?, ?)`;
    await db.promise().query(query, [id_user, judul, deskripsi, is_completed]);
  }
};

module.exports = setTodos;