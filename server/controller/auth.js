const express = require("express");
const router = express.Router();

const authAbl = require("../abl/auth/authAbl.js");

/**
 * @openapi
 * /auth:
 *   post:
 *     tags:
 *       - [Auth]
 *     description: Authenticates user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 minLength: 10
 *                 required: true
 *             required:
 *              - email
 *              - password
 *             additionalProperties: false
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authAbl);

module.exports = router;
