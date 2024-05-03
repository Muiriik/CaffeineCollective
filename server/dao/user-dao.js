const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

function get(userId) {
  // console.log("Getting user: ", userId);
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", userId, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function listAll() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO users (display_name, email, password) VALUES (?,?,?)`, [
      user.display_name,
      user.email,
      user.password
    ],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
  });
}

module.exports = {
  get,
  listAll,
  create,
};
