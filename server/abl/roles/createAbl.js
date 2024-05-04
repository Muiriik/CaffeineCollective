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
  additionalProperties: false,
};
const rolesDao = require("../../dao/roles-dao.js");

async function CreateAbl(req, res) {
  try {
    const role = req.body;
    const valid = ajv.validate(schema, role);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    const roleList = await rolesDao.listAll();
    let existingRole = null;
    for (const r of roleList) {
      if ((role.group_id == r.group_id) && (role.user_id == r.user_id)) {
        existingRole = r;
        break;
      }
    }

    if (existingRole !== null) {
      res.status(400).json({ message: "Combination of group_id or user_id already exists" });
      return;
    }

    res.status(201).json(rolesDao.create(role));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = CreateAbl;
