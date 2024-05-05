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

const inventoryDao = require("../../dao/inventory-dao.js");

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

    const inventory = await inventoryDao.get(req.params.id);
    if (!inventory || inventory.length === 0) {
      res.status(404).json({
        message: "No inventory entry found by id",
      });
      return;
    }

    res.status(204).json(await inventoryDao.remove(req.params.id));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = DeleteAbl;
