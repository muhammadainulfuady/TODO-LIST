const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kasir_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Ada yang eror dalam koneksi anda");
});

module.exports = connection;
