const db = require("../config/database");

const resetSeeder = async () => {
  try {
    // disable foreign key
    await db.promise().query("SET FOREIGN_KEY_CHECKS = 0");

    // truncate child table dulu
    await db.promise().query("DELETE FROM todos");

    // truncate parent table
    await db.promise().query("DELETE FROM user");

    // reset auto increment
    await db.promise().query("ALTER TABLE user AUTO_INCREMENT = 1");

    // enable lagi
    await db.promise().query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (error) {
    console.error("Error resetting database:", error);
  }
};

resetSeeder();
