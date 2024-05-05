const AJV = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new AJV();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    user_id: { type: "string" },
    group_id: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
    weight: { type: "number" },
  },
  required: [
    "user_id",
    "group_id",
    "weight",
    "timestamp",
  ],
  additionalProperties: false,
};
const inventoryDao = require("../../dao/inventory-dao.js");

async function CreateAbl(req, res) {
  try {
    const queue = req.body;
    const valid = ajv.validate(schema, queue);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    res.status(201).json(inventoryDao.create(queue));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = CreateAbl;
