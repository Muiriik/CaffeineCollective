const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  // saveUnitialized: true,
}));
app.use(cors());

const userController = require("./controller/users");
const groupController = require("./controller/groups");
const authController = require("./controller/auth");

app.use("/api/v1/users", userController);
app.use("/api/v1/groups", groupController);
app.use("/api/v1/auth", authController);

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Caffeine Collective API",
      version: "1.0.0",
      description: "API for Caffeine Collective",
      contact: {
        name: "Jan Kurs",
        email: "me@jankurs.cz",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1/`,
        description: 'Local development server',
      },
    ],
    tags: [
      { name: "Users", description: "User related endpoints" },
      { name: "Groups", description: "Group related endpoints" },
      { name: "Auth", description: "Authentication related endpoints" },
      { name: "Roles", description: "Role related endpoints" },
      { name: "Queue", description: "Enpoint for queue management" },
      { name: "Inventory", description: "Enpoint for inventory management" },
    ],
  },
  apis: [
    "./app.js",
    "./controller/*.js",
  ],
};
const swaggerSpec = swaggerJsDoc(options);
// console.log(swaggerSpec);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// /**
//  * @openapi
//  * /:
//  *   get:
//  *     description: Returns Hello World!
//  *     responses:
//  *       200:
//  *         description: Hello World!
//  */
app.get("/", (req, res) => {
  res.send(`
    <h1>Hello World!</h1>
    <ul>
      <li><a href="/api-docs">Api-docs</a></li>
    </ul>
    `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
