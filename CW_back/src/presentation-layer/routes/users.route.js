const userController = require("../controllers/users.controller");
const express = require("express");
const { authJwt } = require("../../middleware");
const router = express.Router();

router
  .post("/", userController.createUser)
  .get("/", userController.getUsers);
router.get("/:userId", userController.getUsers);
router.patch("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);

router.get("/:userId/user_roles", userController.getRolesByUserId);
router.get("/:userId/companies", userController.getCompanyByUserId);
router.get("/:userId/jobs", userController.getJobsByUserId);
router.get("/:userId/visits", userController.getVisitsByUserId);

router.get("/test/all", userController.allAccess);
router.get(
  "/test/user",
  [authJwt.verifyToken],
  userController.userBoard
);
router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);
module.exports = router;