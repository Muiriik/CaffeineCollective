const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

function get(groupId) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM groups WHERE id = ?", groupId, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function listAll() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM groups`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function create(group) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO groups (display_name, group_photo, join_code, notification_trigger) VALUES (?,?,?,?)`,
      [
        group.display_name,
        group.group_photo,
        group.join_code,
        group.notification_trigger,
      ],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      },
    );
  });
}

function update(group, newData) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE groups SET display_name=?, group_photo=?, join_code=?, notification_trigger=? WHERE id=?",
      [
        newData.display_name ? newData.display_name : group.display_name,
        newData.group_photo ? newData.group_photo : group.group_photo,
        newData.join_code ? newData.join_code : group.join_code,
        newData.notification_trigger
          ? newData.notification_trigger
          : group.notification_trigger,
        group.id,
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
  update,
};
