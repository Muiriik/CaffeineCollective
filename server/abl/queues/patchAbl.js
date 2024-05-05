const AJV = require("ajv");
const ajv = new AJV();

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    processed: { type: "string" },
  },
  required: [
    "id",
    "processed",
  ],
  additionalProperties: true,
};

const queuesDao = require("../../dao/queues-dao.js");

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

    // const entry = await queuesDao.get(req.body.group_id);
    // let nextEntry = null;
    // for (const q of await queuesDao.getGroup(req.body.group_id)) {
    //   if (q.processed == 0 && q.user_id == req.body.user_id) {
    //     nextEntry = q;
    //     break;
    //   }
    // }

    const queue = await queuesDao.get(req.params.id);
    if (!queue || queue.length === 0) {
      res.status(404).json({
        message: "No queue entry found",
      });
      return;
    }

    res.status(200).json(await queuesDao.update(queue, req.body));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = PatchAbl;

