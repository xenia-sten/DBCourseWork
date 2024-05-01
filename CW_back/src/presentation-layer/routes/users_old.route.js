const userOldController = require("../controllers/users_old.controller");
const express = require("express");
const router = express.Router();

router.get("/", userOldController.getUsersOld);
router.get("/:userOldId", userOldController.getUsersOld);

module.exports = router;