const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");
const authValidator = require("../utils/validators/authValidator");
const employeeControllers = require("../controllers/employeeControllers");
const auth = require("../middlewares/auth");
const { allowedTo } = require("../controllers/authControllers");
const customerValidator = require("../utils/validators/customerValidator");
const customerControllers = require("../controllers/customerControllers");



router.post("/login", authValidator.loginValidator, authControllers.login);
router.post("/register", auth, allowedTo("hr"), authValidator.registerValidator, authControllers.register);
router.post('/employeeAccount', auth, allowedTo("hr"), employeeControllers.uploadEmployeeImage, employeeControllers.resizeImage, authValidator.employeeAccountValidator, authControllers.employeeAccount);


router.post('/CustomerAccount',customerControllers.uploadCustomerImage, customerControllers.resizeImage, customerValidator.addCustomerAccount, authControllers.customerAccount);
router.post('/customerLogin',customerValidator.login, authControllers.customerLogin);
router.post('/customerRegister', customerControllers.uploadCustomerImage, customerControllers.resizeImage, customerValidator.signup, authControllers.customerSignup);

module.exports = router;
