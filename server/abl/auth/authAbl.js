const AJV = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new AJV();
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 10 },
  },
  required: [
    "email",
    "password",
  ],
  additionalProperties: false,
};

const authDao = require("../../dao/auth-dao.js");

async function AuthAbl(req, res) {
  try {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).json({
        message: "Invalid request",
        validationError: ajv.erors,
      });
      return;
    }

    // * Successful login: `200 OK`
    // * Invalid credentials: `401 Unauthorized`
    // * User lacks permissions: `403 Forbidden`

    user = await authDao.login(req.body.email, req.body.password);
    if (!user) {
      res.status(401).json({
        message: "Invalid credential",
      });
      return;
    }

    req.session.loggedin = true;
    req.session.email = user.email;

    res.status(200).json();
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

module.exports = AuthAbl;
