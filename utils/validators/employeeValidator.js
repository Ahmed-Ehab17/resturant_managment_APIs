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
const addEmployee = [
body('ssn')
    .trim()
    .notEmpty()
    .withMessage('employee ssn is required'),

body('firstName')
    .trim()
    .notEmpty()
    .withMessage('first Name is required'),
   
body('lastName')
    .trim()
    .notEmpty()
    .withMessage('last Name is required'),

body('gender')
    .trim()
    .notEmpty()
    .withMessage('gender is required'),
   
body('salary')
    .trim()
    .notEmpty()
    .withMessage('salary is required'),

body('positionId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('position Id is required'),

body('status')
    .trim()
    .notEmpty()
    .withMessage('status is required'),

body('birthDate')
    .trim()
    .notEmpty()
    .withMessage('birth Date is required'),

body('address')
    .trim()
    .notEmpty()
    .withMessage('address is required'),
    
    validatorMiddleware,
    
]
const addEmployeePhone = [
    body('employeeId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('employee id is required'),
    
    body('employeePhone')
    .trim()
    .notEmpty()
    .withMessage('employee Phone is required'),
    validatorMiddleware,
]
const addEmployeeSchedule = [
    body('employeeId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('employee id is required'),
    
    body('shiftStartTime')
    .trim()
    .notEmpty()
    .withMessage('shift start time is required'),
    body('shiftEndTime')
    .trim()
    .notEmpty()
    .withMessage('shift end time is required'),
    validatorMiddleware,
]

const addEmployeeVacation = [
    body('employeeId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('employee id is required'),
    
    body('vacationStartDate')
    .trim()
    .notEmpty()
    .withMessage('vacation Start Date is required'),
    body('vacationEndDate')
    .trim()
    .notEmpty()
    .withMessage('vacation End Date is required'),
    body('vacationReason')
    .trim()
    .notEmpty()
    .withMessage('vacation Reason is required'),

    validatorMiddleware,
]

const addIngredientSupplier = [
    body('supplierId' )
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('supplier id is required'),

    body('ingredientId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('ingredient id is required'),
    validatorMiddleware
]

const changePosition = [
    body('employee_id')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('employee id is required'),

    body('position_changer_id')
    .trim()
    .isInt()
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
    .isInt()
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
    .isInt()
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

const updateEmployeeSalaryPosition = [
    body('employeeId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('employee id is required'),
    body('changerId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('changer id is required'),
    body('newSalary')
    .trim()
    .notEmpty()
    .withMessage('new salary is required'),
    body('positionChangeType')
    .trim()
    .notEmpty()
    .withMessage('new salary is required')
    .isString()
    .withMessage('the position must be a word'),
    body('changeReason')
    .trim()
    .notEmpty()
    .withMessage('new salary is required')
    .isString()
    .withMessage('the reason must be a word'),
    
    
    


    validatorMiddleware
]



module.exports = {
    addPosition,
    addEmployee,
    addEmployeePhone,
    addEmployeeSchedule,
    addEmployeeVacation,
    changePosition,
    updateEmployeeAddress,
    updateEmployeePhone,
    updateEmployeeSalaryPosition,
    addIngredientSupplier,

}