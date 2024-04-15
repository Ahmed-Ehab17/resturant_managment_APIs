const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", [
    body('ssn')
        .trim()
        .notEmpty()
        .withMessage('SSN is required'),
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First Name is required'),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last Name is required'),
    body('gender')
        .trim()
        .notEmpty()
        .withMessage('Gender is required'),
    body('salary')
        .trim()
        .notEmpty()
        .withMessage('Salary is required'),
    body('status')
        .trim()
        .notEmpty()
        .withMessage('Status is required'),
], authController.register);
router.post('/customer-account',[
    body('id')
        .isInt().withMessage('Id must be a number'),
    body('email')
        .isEmail().withMessage('Email must be a valid email'),
    body('password')
        .isLength({min: 8}).withMessage('The minimum password length is 8 characters'),
], authController.employeeAccount);

module.exports = router;
