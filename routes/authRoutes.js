const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authValidator = require("../utils/validators/authValidator");

router.post("/login", authValidator.loginValidator, authController.login);
router.post("/register", authValidator.registerValidator, authController.register);
router.post('/customer-account',authValidator.employeeAccountValidator, authController.employeeAccount);

module.exports = router;
