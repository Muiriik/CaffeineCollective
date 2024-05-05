const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/inventory/getAbl.js");
const GetGroupAbl = require("../abl/inventory/getGroupAbl.js");
const CreateAbl = require("../abl/inventory/createAbl.js");
const DeleteAbl = require("../abl/inventory/deleteAbl.js");
const PatchAbl = require("../abl/inventory/patchAbl.js");


/**
 * @openapi
 * /inventory/{id}:
 *   get:
 *     tags: [Inventory]
 *     description: Returns a inventroy entry by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A inventroy entry object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No inventroy entry
 *       500:
 *         description: An error occurred
 */
router.get("/:id", GetAbl);

/**
 * @openapi
 * /inventory/in-group/{group_id}:
 *   get:
 *     tags: [Inventory]
 *     description: Returns a inventory for group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: group_id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A inventory object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No inventory for group found
 *       500:
 *         description: An error occurred
 */
router.get("/in-group/:group_id", GetGroupAbl);

/** @openapi
 * /inventory:
 *   post:
 *     tags: [Inventory]
 *     description: Adds a entry to group's inventroy
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
 *               weight:
 *                 type: number
 *                 required: true
 *             required:
 *                - user_id
 *                - group_id
 *                - weight
 *     responses:
 *       201:
 *         description: Entry in group's inventory created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal Server Error
 */
router.post("/", CreateAbl);

/** @openapi
 * /inventory/{id}:
 *   delete:
 *     tags: [Inventory]
 *     description: Delete entry from inventory
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Inventory entry deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", DeleteAbl);

/** @openapi
 * /inventory/{id}:
 *   patch:
 *     tags: [Inventory]
 *     description: Updates inventory entry for group
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *             required:
 *               - weight
 *     responses:
 *       200:
 *         description: Inventory entry updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No inventory entry found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id", PatchAbl);

module.exports = router;
