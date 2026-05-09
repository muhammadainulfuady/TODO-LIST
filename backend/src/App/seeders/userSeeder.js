const db = require("../config/database");
const { faker } = require("@faker-js/faker");
const setUsers = async () => {
  for (let i = 0; i < 10; i++) {
    const username = faker.person.firstName();
    const password = i % 2 === 0 ? "admin123" : "user123";
    const email = faker.internet.email();
    const role = i % 2 === 0 ? "admin" : "user";
    const nama = faker.person.fullName();
    const query = `INSERT INTO user (username, password, email, role, nama) VALUES (?, ?, ?, ?, ?)`;
    await db.promise().query(query, [username, password, email, role, nama]);
  }
};

module.exports = setUsers;
