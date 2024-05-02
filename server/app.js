const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(express.json());

app.use(cors());

const userController = require("./controller/user");

app.use("/api/v1/user", userController);

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
      }
    ],
  },
  apis:
    [
      "./app.js",
      "./controller/*.js",
    ],
};
const swaggerSpec = swaggerJsDoc(options);
console.log(swaggerSpec);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @openapi
 * /:
 *   get:
 *     description: Returns Hello World!
 *     responses:
 *       200:
 *         description: Hello World!
 * 
 */
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
