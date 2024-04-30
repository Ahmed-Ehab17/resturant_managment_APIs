const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const authValidator = require("../utils/validators/authValidator");

router.post("/login", authValidator.loginValidator, authControllers.login);
router.post("/register", authValidator.registerValidator, authControllers.register);
router.post('/employee-account',authValidator.employeeAccountValidator, authControllers.employeeAccount);

module.exports = router;
