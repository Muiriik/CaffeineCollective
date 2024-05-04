const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

function get(userId) {
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

function remove(userId) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM users WHERE id = ?", userId, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function update(user, newData) {
  return new Promise((resolve, reject) => {
    db.run("UPDATE users SET display_name=?, password=? WHERE id=?",
      [
        newData.display_name ? newData.display_name : user.display_name,
        newData.password ? newData.password : user.password,
        user.id
      ], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
  });
};

module.exports = {
  get,
  listAll,
  create,
  remove,
  update,
};
