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

const changePosition = [
    body('employee_id')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('employee id is required'),

    body('position_changer_id')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('position changer id is required'),

    body('new_position')
    .trim()
    .notEmpty()
    .withMessage('new position is required'),

    body('position_change_type')
    .trim()
    .notEmpty()
    .withMessage('position change type is required'),

    validatorMiddleware

]
const updateEmployeeAddress = [
    body('employeeId')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('employee id is required'),
    body('newAddress')
    .trim()
    .notEmpty()
    .withMessage('new employee address is required'),

    validatorMiddleware
]
const updateEmployeePhone = [
    body('employeeId')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('employee id is required'),
    body('oldPhone')
    .trim()
    .isMobilePhone()
    .notEmpty()
    .withMessage('old employee phone is required'),
    body('newPhone')
    .trim()
    .isMobilePhone()
    .notEmpty()
    .withMessage('new employee phone is required'),


    validatorMiddleware
]



module.exports = {
    addPosition,
    changePosition,
    updateEmployeeAddress,
    updateEmployeePhone,

}