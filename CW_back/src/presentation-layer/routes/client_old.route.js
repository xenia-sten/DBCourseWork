const clientOldController = require("../controllers/client_old.controller");
const express = require("express");
const router = express.Router();

router.get("/", clientOldController.getClients);
router.get("/:clientOldId", clientOldController.getClients);

module.exports = router;