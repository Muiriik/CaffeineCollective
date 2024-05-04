const AJV = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new AJV();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    // display_name: { type: "string", minLength: 3, optional: true },
    // email: { type: "string", format: "email", readOnly: true },
    // password: { type: "string", minLength: 10, optional: true },
  },
  required: [
    "id",
  ],
  additionalProperties: true,
};

const userDao = require("../../dao/users-dao.js");

async function PatchAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.params, req.body);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    // console.log(res.session);
    // if (res.session?.id !== req.params.id) {
    //   res.status(401).json({
    //     message: "Unauthorized access",
    //   });
    //   return;
    // }

    if (req.body.email) {
      res.status(403).json({
        message: "You are not allowed to change the email address",
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
    res.status(200).json(await userDao.update(user, req.body));

  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
}

module.exports = PatchAbl;