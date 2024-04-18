const { verifySignUp } = require("../../middleware");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post(
//     "/api/auth/signup",
//     [
//       verifySignUp.checkDuplicateEmail,
//       verifySignUp.checkRolesExisted
//     ],
//     controller.signup
//   );

//   app.post("/api/auth/signin", controller.signin);
// };

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);
router.post("/signin", controller.signin);
module.exports = router;