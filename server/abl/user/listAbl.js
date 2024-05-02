// AJV here

const userDao = require("../../dao/user-dao.js");

async function ListAbl(req, res) {
  // validation here

  try {
    const user = await userDao.listAll();

    console.log(user);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
