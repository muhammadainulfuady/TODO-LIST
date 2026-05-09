const setUser = require("./userSeeder");
const setTodos = require("./todoSeeder");

const runSeeders = async () => {
  try {
    await setUser();
    await setTodos();
  } catch (error) {
    console.error("Error running seeders:", error);
  }
};
