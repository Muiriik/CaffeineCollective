const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/getAbl.js");
const ListAbl = require("../abl/user/listAbl.js");
// const CreateAbl = require("../abl/user/createAbl.js");

/**
 * @openapi
 * /user/get/{id}:
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
router.get("/get/:id", GetAbl);

/**
 * @openapi
 * /user/list:
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

router.get("/list", ListAbl);
// router.post("/create", CreateAbl);

module.exports = router;
