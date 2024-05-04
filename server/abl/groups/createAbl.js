const AJV = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new AJV();
addFormats(ajv);

schema = {
  type: "object",
  properties: {
    display_name: { type: "string", minLength: 3 },
    group_photo: { type: "string" },
    join_code: { type: "string", minLength: 7, maxLength: 7 },
    notification_trigger: { type: "number" },
  },
  required: [
    "display_name",
    "group_photo",
    "join_code",
    "notification_trigger",
  ],
  additionalProperties: false,
};

const groupsDao = require("../../dao/groups-dao.js");

async function CreateAbl(req, res) {
  try {
    const group = req.body;

    const valid = ajv.validate(schema, group);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    const groupList = await groupsDao.listAll();
    const joinCode = Array.prototype.some.call(groupList, (g) => g.join_code === group.join_code);
    if (joinCode) {
      res.status(409).json({
        code: "groupJoinCodeAlreadyExists",
        message: `Group with join code ${group.join_code} already exists`,
      });
      return;
    }

    res.status(201).json(groupsDao.create(group));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = CreateAbl;
