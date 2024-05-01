// AJV here

const userDao = require("../../dao/user-dao.js");

function GetAbl(req, res) {
  // validation here

  try {
    reqParams = req.query?.id ? req.query : req.body;

    const user = userDao.get(reqParams.id);

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
