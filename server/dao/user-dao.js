// const db = require("sqlite3").open("./database/CpaffeineCollective").verbose();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dao/database/CaffeineCollective");

async function get(userId) {
  // console.log("Getting user: ", userId);
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", userId, (err, row) => {
          if (err) reject(err);
          resolve(row);
      });
  });
}

async function listAll() {
  return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM users`,(err, row) => {
          if (err) reject(err);
          resolve(row);
      });
  });
}

module.exports = {
  get,
  listAll,
};
