// const db = require("sqlite3").open("./database/CpaffeineCollective").verbose();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY, display_name TEXT, email TEXT, password TEXT)",
  );

  const initUsers = [
    ["Admin", "admin@coffeinecollective.local", "adminheslo"],
    ["Slime", "slime@coffeinecollective.local", "slimeheslo"],
    ["Honza", "honza@coffeinecollective.local", "honzaheslo"],
  ];

  const stmt = db.prepare(
    "INSERT INTO users (display_name, email, password) VALUES (?,?,?)",
  );
  initUsers.forEach((row) => stmt.run(row));
  stmt.finalize();
});

module.exports = db;
