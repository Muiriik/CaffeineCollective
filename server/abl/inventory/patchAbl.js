const AJV = require("ajv");
const ajv = new AJV();

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    weight: { type: "number" },
  },
  required: [
    "id",
    "weight",
  ],
  additionalProperties: false,
};

const inventoryDao = require("../../dao/inventory-dao.js");

async function PatchAbl(req, res) {
  try {
    const valid = ajv.validate(schema, { ...req.body, ...req.params });
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

    res.status(200).json(await inventoryDao.update(inventory, req.body));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = PatchAbl;

