const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const employeeAccountValidator = [
    body('employeeId')
    .notEmpty()
    .withMessage('id is required')
    .isInt()
    .withMessage('Id must be a number'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
]

const registerValidator = [
    body('ssn')
        .trim()
        .notEmpty()
        .withMessage('SSN is required')
        .isLength({ min: 14, max: 14 })
        .withMessage('SSN must be 14 characters'),

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

    validatorMiddleware,
]

const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be a valid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters'),

    validatorMiddleware,
]



module.exports = {
    employeeAccountValidator,
    registerValidator,
    loginValidator
}