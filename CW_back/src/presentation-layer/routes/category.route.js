const categoryController = require("../controllers/category.controller");
const express = require("express");
const router = express.Router();

router
  .post("/", categoryController.createCategory)
  .get("/", categoryController.getCategories);
router.get("/:categoryId", categoryController.getCategories);
router.patch("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

router.get("/:categoryId/services", categoryController.getServicesByCategoryId);

module.exports = router;