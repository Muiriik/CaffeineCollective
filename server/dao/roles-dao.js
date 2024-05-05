const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

function get(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM roles WHERE id=?", id, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function listAll() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM roles`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function create(role) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO roles (user_id, group_id, permission) VALUES (?,?,?)`,
      [
        role.user_id,
        role.group_id,
        role.permission,
      ],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      },
    );
  });
}

function remove(roleId) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM roles WHERE id = ?", roleId, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function update(role, newData) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE roles SET permission=? WHERE user_id=? AND group_id=?",
      [
        newData.permission ? newData.permission : role.permission,
        role.user_id,
        role.group_id,
      ],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      },
    );
  });
}

module.exports = {
  get,
  listAll,
  create,
  remove,
  update,
};
