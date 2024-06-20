const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const updateOrderStatus = [
    body('orderId')
        .notEmpty()
        .withMessage('id is required')
        .isInt()
        .withMessage('Id must be a number'),
    
    body('orderStatus')
        .notEmpty()
        .withMessage('status is required')
        .isString()
        .withMessage('status must be a word'),

    validatorMiddleware,
]
 

module.exports = {
    updateOrderStatus,
}