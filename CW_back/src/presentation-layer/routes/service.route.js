const serviceController = require("../controllers/service.controller");
const express = require("express");
const router = express.Router();

router
  .post("/", serviceController.createService)
  .get("/", serviceController.getServices);
router.get("/:serviceId", serviceController.getServices);
router.patch("/:serviceId", serviceController.updateService);
router.delete("/:serviceId", serviceController.deleteService);

module.exports = router;