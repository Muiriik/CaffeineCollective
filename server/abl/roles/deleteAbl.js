const AJV = require("ajv");
const ajv = new AJV();

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: [
    "id",
  ],
  additionalProperties: false,
};

const rolesDao = require("../../dao/roles-dao.js");

async function DeleteAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.params);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    const role = await rolesDao.get(req.params.id);
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
