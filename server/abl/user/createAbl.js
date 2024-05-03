const AJV = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new AJV();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    display_name: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 10 },
  },
  required: [
    "display_name",
    "email",
    "password",
  ],
  additionalProperties: false,
};

const userDao = require("../../dao/user-dao.js");

async function CreateAbl(req, res) {
  try {
    const user = req.body;

    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }
    console.log("valid");

    const userList = userDao.listAll();
    const emailExists = Array.prototype.some.call(userList, (u) => u.email === user.email);
    console.log("emailExists", emailExists);
    if (emailExists) {
      res.status(409).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} already exists`,
      });
      return;
    }

    console.log("creating ", user);
    res.status(201).json(userDao.create(user));
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = CreateAbl;
