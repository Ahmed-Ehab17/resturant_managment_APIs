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



module.exports = {
    updateCustomerAddress

}