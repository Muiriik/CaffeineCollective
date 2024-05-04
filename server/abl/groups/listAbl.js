// AJV here
const AJV = require("ajv");
const ajv = new AJV();

const schema = {
  type: "object",
  properties: {},
  required: [],
  additionalProperties: false,
}

const groupsDao = require("../../dao/groups-dao.js");

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

    const group = await groupsDao.listAll();
    if (!group || group.length === 0) {
      res.status(404).json({
        message: "No group found",
      });
      return;
    }

    // console.log(user);
    res.status(200).json(group);

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

module.exports = ListAbl;
