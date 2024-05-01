// AJV here

const userDao = require("../../dao/user-dao.js");

function ListAbl(req, res) {
  // validation here

  try {
    const user = userDao.listAll();

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
