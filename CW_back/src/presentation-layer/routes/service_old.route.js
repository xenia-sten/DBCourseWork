const serviceOldController = require("../controllers/service_old.controller");
const express = require("express");
const router = express.Router();

router.get("/", serviceOldController.getServicesOld);
router.get("/:serviceOldId", serviceOldController.getServicesOld);

module.exports = router;