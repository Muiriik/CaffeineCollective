const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/groups/getAbl.js");
const ListAbl = require("../abl/groups/listAbl.js");
const CreateAbl = require("../abl/groups/createAbl.js");
const PatchAbl = require("../abl/groups/patchAbl.js");

/**
 * @openapi
 * /groups/{id}:
 *   get:
 *     tags: [Groups]
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
 * /groups:
 *   get:
 *     tags: [Groups]
 *     description: Returns a list of groups
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
 *         description: No groups found
 *       500:
 *         description: Internal server error
 */

router.get("/", ListAbl);

/** @openapi
 *  /groups:
 *    post:
 *      tags: [Groups]
 *      description: Creates a new group.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                display_name:
 *                  type: string
 *                  minLength: 3
 *                group_photo:
 *                  type: string
 *                join_code:
 *                  type: string
 *                  minLength: 7
 *                  maxLength: 7
 *                notification_trigger:
 *                  type: number
 *              required:
 *                - display_name
 *                - group_photo
 *                - join_code
 *                - notification_trigger
 *              additionalProperties: false
 *      responses:
 *        201:
 *          description: Group created successfully
 *        400:
 *          description: Invalid request
 *        500:
 *          description: Internal Server Error
 */
router.post("/", CreateAbl);

/** @openapi
 * /groups/{id}:
 *   patch:
 *     tags: [Groups]
 *     description: Updates a group by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *        content:
 *           application/json:
 *            schema:
 *              type: object
 *              properties:
 *                display_name:
 *                  type: string
 *                  minLength: 3
 *                group_photo:
 *                  type: string
 *                join_code:
 *                  type: string
 *                  minLength: 7
 *                  maxLenght: 7
 *                notification_trigger:
 *                  type: number
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No group found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id", PatchAbl);

module.exports = router;
