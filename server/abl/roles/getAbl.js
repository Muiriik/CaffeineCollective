const AJV = require("ajv");
const ajv = new AJV();

const schema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    group_id: { type: "string" },
  },
  required: [
    "user_id",
    "group_id",
  ],
  additionalProperties: false,
}

const rolesDao = require("../../dao/roles-dao.js");

async function GetAbl(req, res) {
  try {

    const valid = ajv.validate(schema, req.params);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    const role = await rolesDao.get(req.params.user_id, req.params.group_id);
    if (!role || role.length === 0) {
      res.status(404).json({
        message: "No combination of user and group found",
      });
      return;
    }

    // console.log(role);
    res.status(200).json(role);

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

module.exports = GetAbl;