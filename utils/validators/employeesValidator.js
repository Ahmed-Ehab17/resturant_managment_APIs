const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');



const addPosition = [
    body('position_name')
        .trim()
        .notEmpty()
        .withMessage('position name is required'),

    body('jop_description')
        .trim()
        .notEmpty()
        .withMessage('jop description is required'),

        validatorMiddleware,
]

const searchEmployeesAttendance = [
    body('employeeId')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('employee id is required'),


    validatorMiddleware
]

const searchEmployeesPhones = [
    body('phoneID')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('employee phone id is required'),

    body('phone')
    .trim()
    .isMobilePhone()
    .notEmpty()
    .withMessage('mobile phone number is required'),

    validatorMiddleware
]



module.exports = {
    addPosition,
    searchEmployeesAttendance,
    searchEmployeesPhones
}