// const db = require("sqlite3").open("./database/CpaffeineCollective").verbose();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/CaffeineCollective");

db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY, display_name TEXT, email TEXT UNIQUE, password TEXT)",
  );

  const initUsers = [
    ["Admin", "admin@coffeinecollective.local", "adminheslo"],
    ["Slime", "slime@coffeinecollective.local", "slimeheslo"],
    ["Honza", "honza@coffeinecollective.local", "honzaheslo"],
    ["Veru", "cajik@coffeinecollective.local", "cajikheslo"],
  ];

  const stmt = db.prepare(
    "INSERT INTO users (display_name, email, password) VALUES (?, ?, ?)",
  );
  initUsers.forEach((row) => stmt.run(row));
  stmt.finalize();
});

db.serialize(() => {
  db.run(
    "CREATE TABLE groups (id INTEGER PRIMARY KEY, display_name TEXT, group_photo TEXT, join_code TEXT UNIQUE, notification_trigger INT)",
  );

  const initGroups = [
    [
      "Expresso Experts",
      "https://picsum.photos/id/48/5000/3333",
      "hiduB9x",
      "300",
    ],
    [
      "Cappuccino Coders",
      "https://picsum.photos/id/113/4168/2464",
      "Cai5ohp",
      "500",
    ],
    [
      "Cajik",
      "https://picsum.photos/id/137/4752/3168",
      "kotatko",
      "10",
    ],
  ];

  const stmt = db.prepare(
    "INSERT INTO groups (display_name, group_photo, join_code, notification_trigger) VALUES (?, ?, ?, ?)",
  );
  initGroups.forEach((row) => stmt.run(row));
  stmt.finalize();
});

db.serialize(() => {
  db.run(
    "CREATE TABLE roles (id INTEGER PRIMARY KEY, user_id INT, group_id INT, permission TEXT, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(group_id) REFERENCES groups(id))",
  );

  const initRoles = [
    ["2", "1", "user"],
    ["3", "2", "admin"],
    ["3", "1", "user"],
    ["4", "3", "admin"],
  ];

  const stmt = db.prepare(
    "INSERT INTO roles (user_id, group_id, permission) VALUES (?, ?, ?)",
  );
  initRoles.forEach((row) => stmt.run(row));
  stmt.finalize();
});

db.serialize(() => {
  db.run(
    "CREATE TABLE queue (id INTEGER PRIMARY KEY, user_id INT, group_id INT, timestamp TEXT, proccessed INT, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(group_id) REFERENCES groups(id))",
  );

  const initQueue = [
    ["3", "1", "1714601896", "1"],
    ["3", "2", "1714688296", "1"],
    ["2", "1", "1714774696", "1"],
    ["3", "1", "1714774815", "0"],
    ["2", "1", "1714775214", "0"],
  ];

  const stmt = db.prepare(
    "INSERT INTO queue (user_id, group_id, timestamp, proccessed) VALUES (?, ?, ?, ?)",
  );
  initQueue.forEach((row) => stmt.run(row));
  stmt.finalize();
});

db.serialize(() => {
  db.run(
    "CREATE TABLE inventory (id INTEGER PRIMARY KEY, user_id INT, group_id INT, timestamp TEXT, weight REAL, FOREIGN KEY(user_id) REFERENCES users(id), FOREIGN KEY(group_id) REFERENCES groups(id))",
  );

  const initInventory = [
    ["3", "1", "1714601896", "1000,69"],
    ["3", "2", "1714688296", "500"],
    ["2", "1", "1714774696", "420,69"],
    ["3", "1", "1714774815", "200"],
  ];

  const stmt = db.prepare(
    "INSERT INTO inventory (user_id, group_id, timestamp, weight) VALUES (?, ?, ?, ?)",
  );
  initInventory.forEach((row) => stmt.run(row));
  stmt.finalize();
});
module.exports = db;
