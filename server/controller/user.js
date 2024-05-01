const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/user/getAbl.js");
const ListAbl = require("../abl/user/listAbl.js");
// const CreateAbl = require("../abl/user/createAbl.js");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
// router.post("/create", CreateAbl);

module.exports = router;
