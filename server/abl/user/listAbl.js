// AJV here
const AJV = require("ajv");
const ajv = new AJV();

const schema = {
  type: "object",
  properties: {},
  required: [],
  additionalProperties: false,
}

const userDao = require("../../dao/user-dao.js");

async function ListAbl(req, res) {
  try {
    // validation here
    const valid = ajv.validate(schema, req.params);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    const users = await userDao.listAll();
    if (!users || users.length === 0) {
      res.status(404).json({
        message: "No users found",
      });
      return;
    }

    // console.log(user);
    res.json(users);

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

module.exports = ListAbl;
