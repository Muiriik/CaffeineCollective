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
}

const queuesDao = require("../../dao/queues-dao.js");

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

    const queue = await queuesDao.get(req.params.id);
    if (!queue || queue.length === 0) {
      res.status(404).json({
        message: "No queue entry found by id",
      });
      return;
    }

    res.status(200).json(queue);

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

module.exports = GetAbl;