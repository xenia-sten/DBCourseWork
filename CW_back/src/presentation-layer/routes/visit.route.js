const visitController = require("../controllers/visit.controller");
const express = require("express");
const router = express.Router();

router
  .post("/", visitController.createVisit)
  .get("/", visitController.getVisits);
router.get("/:visitId", visitController.getVisits);
router.patch("/:visitId", visitController.updateVisit);
router.delete("/:visitId", visitController.deleteVisit);

module.exports = router;