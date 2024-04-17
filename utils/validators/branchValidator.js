const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware')

const addIngredientValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('name is required'),

    body('recipeUnit')
        .notEmpty()
        .withMessage('Recipe Unit is required')
        .isIn(['gram', 'milliliter', 'liter', 'piece', 'kilogram'])
        .withMessage('Invalid unit'),

    body('shipmentUnit')
        .notEmpty()
        .withMessage('Shipment Unit is required')
        .isIn(['gram', 'milliliter', 'liter', 'piece', 'kilogram'])
        .withMessage('Invalid unit'),

        validatorMiddleware,
]






module.exports = {
    addIngredientValidator,
}