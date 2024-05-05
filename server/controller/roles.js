const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/roles/getAbl.js");
const ListAbl = require("../abl/roles/listAbl.js");
const CreateAbl = require("../abl/roles/createAbl.js");
const PatchAbl = require("../abl/roles/patchAbl.js");
const DeleteAbl = require("../abl/roles/deleteAbl.js");


/**
 * @openapi
 * /roles/{user_id}/{group_id}:
 *   get:
 *     tags: [Roles]
 *     description: Returns a role for user by user_id in group group_id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user_id
 *         in: path
 *         required: true
 *         type: string
 *       - name: group_id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A role object
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No role for user found
 *       500:
 *         description: An error occurred
 */
router.get("/:user_id/:group_id", GetAbl);

/**
 * @openapi
 * /roles:
 *   get:
 *     tags: [Roles]
 *     description: Returns a list of roles
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of roles objects
 *       400:
 *         description: Invalid request (validation error)
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */

router.get("/", ListAbl);

/** @openapi
 * /roles:
 *   post:
 *     tags: [Roles]
 *     description: Creates a new role for user and group
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               group_id:
 *                 type: string
 *               permission:
 *                 type: string
 *                 enum:
 *                   - user
 *                   - admin
 *                 default: user
 *             required:
 *                - user_id
 *                - group_id
 *                - permission
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
 * /roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     description: Delete role
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Combination not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", DeleteAbl);

/** @openapi
 * /roles/{id}:
 *   patch:
 *     tags: [Roles]
 *     description: Updates a role for user
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
 *                permission:
 *                  type: string
 *                  enum:
 *                    - user
 *                    - admin
 *                  default: user
 *                  minLength: 1
 *                  maxLength: 1
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No role found
 *       500:
 *         description: Internal Server Error
 */
router.patch("/:id", PatchAbl);

module.exports = router;
