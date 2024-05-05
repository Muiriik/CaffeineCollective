const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/queues/getAbl.js");
const GetGroupAbl = require("../abl/queues/getGroupAbl.js");
const CreateAbl = require("../abl/queues/createAbl.js");
const PatchAbl = require("../abl/queues/patchAbl.js");


/**
 * @openapi
 * /queues/{id}:
 *   get:
 *     tags: [Queue]
 *     description: Returns a single queue object by id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A queue object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No queue entry found by id
 *       500:
 *         description: An error occurred
 */
router.get("/:id", GetAbl);

/**
 * @openapi
 * /queues/in-group/{group_id}:
 *   get:
 *     tags: [Queue]
 *     description: Returns a queue for group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: group_id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A queue object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No queue for group found
 *       500:
 *         description: An error occurred
 */
router.get("/in-group/:group_id", GetGroupAbl);

/** @openapi
 * /queues:
 *   post:
 *     tags: [Queue]
 *     description: Adds a user to queue for group
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 required:
 *               group_id:
 *                 type: string
 *                 required: true
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 required: true
 *               processed:
 *                 type: string
 *                 enum:
 *                   - 0
 *                   - 1
 *                 default: 0
 *                 required: true
 *             required:
 *                - user_id
 *                - group_id
 *                - processed
 *     responses:
 *       201:
 *         description: Role for user and group created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */
router.post("/", CreateAbl);

/** @openapi
 * /queues/{id}:
 *   patch:
 *     tags: [Queue]
 *     description: Updates queue for group
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
 *                processed:
 *                  type: string
 *                  enum:
 *                    - 0
 *                    - 1
 *                  default: 1
 *                  required: true
 *              required:
 *                 - processed
 *     responses:
 *       200:
 *         description: Queue updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No queue entry found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id", PatchAbl);

module.exports = router;
