const AJV = require("ajv");
const ajv = new AJV();

const schema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    group_id: { type: "string" },
    permission: { type: "string" },
  },
  required: [
    "user_id",
    "group_id",
    "permission",
  ],
  additionalProperties: true,
};

const rolesDao = require("../../dao/roles-dao.js");

async function PatchAbl(req, res) {
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
        message: "No user found",
      });
      return;
    }

    res.status(200).json(await rolesDao.update(role, req.body));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = PatchAbl;

