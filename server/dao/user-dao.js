// const db = require("sqlite3").open("./database/CpaffeineCollective").verbose();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dao/database/CaffeineCollective");

function get(userId) {
  db.get("SELECT * FROM users WHERE id = ?", userId, (err, rows) => {
    if (err) {
      // Handle or log the error here
      console.error(`Error getting user ${userId}:`, err);
      return null; // or throw an error, depending on your use case
    }
    // const user = JSON.parse(rows); // assuming this is what you want to do with the result
    const user = rows;
    console.log("User: ", user);
    return user;
  });
}

function listAll() {
  db.each("SELECT * FROM users", (err, rows) => {
    if (err) {
      // Handle or log the error here
      console.error(`Error getting users`, err);
      return null; // or throw an error, depending on your use case
    }
    // const user = JSON.parse(rows); // assuming this is what you want to do with the result
    const user = rows;
    // console.log("Users: ", JSON.stringify(user));

    console.log("Users: ", user);
    return user;
  });
}

module.exports = {
  get,
  listAll,
};
