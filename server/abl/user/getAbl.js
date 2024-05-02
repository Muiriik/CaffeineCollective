// AJV here

const userDao = require("../../dao/user-dao.js");

async function GetAbl(req, res) {
  // validation here

  try {
    reqParams = req.params;

    const user = await userDao.get(reqParams.id);

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
