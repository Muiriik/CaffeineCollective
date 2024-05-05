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

const userDao = require("../../dao/users-dao.js");

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

    const user = await userDao.get(req.params.id);
    if (!user || user.length === 0) {
      res.status(404).json({
        message: "No user found",
      });
      return;
    }

    // console.log(user);
    res.status(204).json(await userDao.remove(req.params.id));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = DeleteAbl;
