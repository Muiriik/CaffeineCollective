const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/users/getAbl.js");
const ListAbl = require("../abl/users/listAbl.js");
const CreateAbl = require("../abl/users/createAbl.js");

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     description: Returns a user by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 // Add any required properties here (e.g., id, name, email)
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No user found
 *       500:
 *         description: An error occurred
 */
router.get("/:id", GetAbl);

/**
 * @openapi
 * /users/list:
 *   get:
 *     tags: [Users]
 *     description: Returns a list of users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of user objects
 *       400:
 *         description: Invalid request (validation error)
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             validationError:
 *               type: array
 *               items:
 *                 type: string
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */

router.get("/", ListAbl);

/** @openapi
 *  /users:
 *    post:
 *      tags: [Users]
 *      description: Creates a new user
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                display_name:
 *                  type: string
 *                  minLength: 3
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  minLength: 10
 *              required:
 *                - display_name
 *                - email
 *                - password
 *              additionalProperties: false
 *      responses:
 *        201:
 *          description: User created successfully
 *        400:
 *          description: Invalid request
 *        409:
 *          description: User with email already exists
 *        500:
 *          description: Internal Server Error
 */
router.post("/", CreateAbl);

module.exports = router;
