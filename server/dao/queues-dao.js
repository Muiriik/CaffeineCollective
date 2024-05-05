const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

function get(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM queues WHERE id=?", id, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function getGroup(group_id) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM queues WHERE group_id=?", group_id, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

function create(queue) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO queues (user_id, group_id, timestamp, processed) VALUES (?,?,?,?)`,
      [
        queue.user_id,
        queue.group_id,
        queue.timestamp,
        queue.processed,
      ],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      },
    );
  });
}

function update(queue, newData) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE queues SET processed=? WHERE id=?",
      [
        newData.processed ? newData.processed : queue.processed,
        queue.id
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
  update,
};
