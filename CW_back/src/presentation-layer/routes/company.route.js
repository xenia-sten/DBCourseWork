const companyController = require("../controllers/company.controller");
const express = require("express");
const router = express.Router();

router
  .post("/", companyController.createCompany)
  .get("/", companyController.getCompanies);
router.get("/:companiesId", companyController.getCompanies);
router.patch("/:companiesId", companyController.updateCompany);
router.delete("/:companiesId", companyController.deleteCompany);
router.get("/:companiesId/users", companyController.getUsersByCompanyId);
router.get("/:companiesId/clients", companyController.getClientsByCompanyId);

router.post("/:companiesId/users/:userId", companyController.addUserInCompany);
router.delete("/:companiesId/users/:userId", companyController.deleteUserInCompany);

module.exports = router;



// module.exports = function (app) {
//   app.get("/api/companies/", companyController.getCompanies);
//   app.patch("/api/companies/:id", companyController.updateCompany);
//   app.delete("/api/companies/:id", companyController.deleteCompany);
//   app.post("/api/companies/:id", companyController.createCompany);
// };