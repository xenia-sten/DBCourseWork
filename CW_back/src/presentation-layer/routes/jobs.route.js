const jobsController = require("../controllers/jobs.controller");
const express = require("express");
const router = express.Router();

router
  .post("/", jobsController.createJob)
  .get("/", jobsController.getJobs);
router.get("/:jobId", jobsController.getJobs);
router.patch("/:jobId", jobsController.updateJob);
router.delete("/:jobId", jobsController.deleteJob);
router.get("/:jobId/categories", jobsController.getCategoriesByJobId);

module.exports = router;