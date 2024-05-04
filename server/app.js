const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());

app.use(cors());

const userController = require("./controller/users");
const groupController = require("./controller/groups");

app.use("/api/v1/users", userController);
app.use("/api/v1/groups", groupController);

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
      },
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

/**
 * @openapi
 * /:
 *   get:
 *     description: Returns Hello World!
 *     responses:
 *       200:
 *         description: Hello World!
 */
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
