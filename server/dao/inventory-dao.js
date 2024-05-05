const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

function get(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM inventory WHERE id=?", id, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function getGroup(group_id) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM inventory WHERE group_id=?", group_id, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function create(entry) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO inventory (user_id, group_id, timestamp, weight) VALUES (?,?,?,?)`,
      [
        entry.user_id,
        entry.group_id,
        entry.timestamp,
        entry.weight,
      ],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      },
    );
  });
}

function remove(inventoryId) {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM inventory WHERE id = ?", inventoryId, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}


function update(inventory, newData) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE inventory SET weight=? WHERE id=?",
      [
        newData.weight ? newData.weight : inventory.weight,
        inventory.id
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
  getGroup,
  create,
  remove,
  update,
};
