const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const changeDeliveryOrderStatus = [
    body('orderId')
        .trim()
        .isInt()
        .notEmpty()
        .withMessage('Order ID is required and must be a number'),
    
    body('newStatus')
        .trim()
        .notEmpty()
        .withMessage('New status is required'),
    
        validatorMiddleware
];


const assignOrderToDelivery = [
    body('orderId')
        .trim()
        .isInt()
        .notEmpty()
        .withMessage('Order ID is required and must be a number'),
    
    body('deliveryEmployeeId')
        .trim()
        .isInt()
        .notEmpty()
        .withMessage('Delivery Employee ID is required and must be a number'),
    
        validatorMiddleware
];

const reassignDeliveryOrderEmployee = [
    body('orderId')
        .trim()
        .isInt()
        .notEmpty()
        .withMessage('Order ID is required and must be a number'),
    
    body('newEmployeeId')
        .trim()
        .isInt()
        .notEmpty()
        .withMessage('New Employee ID is required and must be a number'),

        validatorMiddleware
];






module.exports = {
    changeDeliveryOrderStatus,

    
    assignOrderToDelivery,
    reassignDeliveryOrderEmployee
}