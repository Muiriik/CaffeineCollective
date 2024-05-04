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
};

const rolesDao = require("../../dao/roles-dao.js");

async function DeleteAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    const role = await rolesDao.get(req.body.user_id, req.body.group_id);
    if (!role || role.length === 0) {
      res.status(404).json({
        message: "Combination not found",
      });
      return;
    }

    res.status(204).json(rolesDao.remove(role.id));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = DeleteAbl;
