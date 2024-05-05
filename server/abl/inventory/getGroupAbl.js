const AJV = require("ajv");
const ajv = new AJV();

const schema = {
    type: "object",
    properties: {
        group_id: { type: "string" },
    },
    required: [
        "group_id",
    ],
    additionalProperties: false,
}

const inventoryDao = require("../../dao/inventory-dao.js");

async function GetGroupAbl(req, res) {
    try {

        const valid = ajv.validate(schema, req.params);
        if (!valid) {
            res.status(400).json({
                message: "Invalid request",
                validationError: ajv.erors,
            });
            return;
        }

        const inventory = await inventoryDao.getGroup(req.params.group_id);
        if (!inventory || inventory.length === 0) {
            res.status(404).json({
                message: "No inventory for group found",
            });
            return;
        }

        res.status(200).json(inventory);

    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}

module.exports = GetGroupAbl;