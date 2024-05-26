const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


const addSupplyEmployee = [
    body('companyId')
        .trim()
        .notEmpty()
        .withMessage('ID is required')
        .isInt()
        .withMessage('ID must be an integer'),

    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First Name is required'),

    body('phoneNumber')
        .trim()
        .isMobilePhone('ar-EG')
        .withMessage('Invalid phone number format'),
        
    body('gender')
        .trim()
        .isIn('m', 'f')
        .withMessage('Invalid gender'),

    validatorMiddleware,
]






module.exports = {
    addSupplyEmployee,
}
