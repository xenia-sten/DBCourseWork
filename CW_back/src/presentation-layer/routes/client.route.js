const clientController = require("../controllers/client.controller");
const express = require("express");
const router = express.Router();

router
  .post("/", clientController.createClient)
  .get("/", clientController.getClients);
router.get("/:clientId", clientController.getClients);
router.patch("/:clientId", clientController.updateClient);
router.delete("/:clientId", clientController.deleteClient);
router.get("/:clientId/visits", clientController.getVisitsByClientId);

module.exports = router;