const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


const updateCustomerAddress = [
    body('customerId')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('customer id is required'),

    body('addressId')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('address id is required'),

    body('customerAddress')
    .trim()
    .notEmpty()
    .withMessage('customer Address is required'),

    body('customerCity')
    .trim()
    .notEmpty()
    .withMessage('customer City is required'),
    

    validatorMiddleware
]
 const addCustomer = [
    body('firstName')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('first name is required'),

    body('lastName')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('last name is required'),

    body('gender')
    .trim()
    .notEmpty()
    .withMessage('gender is required'),

    body('phone')
    .trim()
    .isMobilePhone()
    .notEmpty()
    .withMessage('phone is required'),

    body('address')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('address is required'),

    validatorMiddleware
        
    
 ]

 const addCustomerAddress = [
    body('customerId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('customer id is required'),

    body('address')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('address is required'),

    validatorMiddleware
 ]
 const addCustomerPhone = [
    body('customerId')
    .trim()
    .isInt()
    .notEmpty()
    .withMessage('customer id is required'),

    body('phone')
    .trim()
    .isMobilePhone()
    .notEmpty()
    .withMessage('phone is required'),

    validatorMiddleware
 ]


module.exports = {
    updateCustomerAddress,
    addCustomer,
    addCustomerAddress,
    addCustomerPhone,

}