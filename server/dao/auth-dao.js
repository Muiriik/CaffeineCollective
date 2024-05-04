const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

function login(email, password) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      email,
      password,
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      },
    );
  });
}

module.exports = {
  login,
};

