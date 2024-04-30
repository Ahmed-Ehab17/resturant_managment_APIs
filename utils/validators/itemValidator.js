const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


const addRecipes = [
    body('itemId')
        .notEmpty()
        .withMessage('id is required')
        .isInt()
        .withMessage('Id must be a number'),
    
    body('ingredientId')
        .notEmpty()
        .withMessage('id is required')
        .isInt()
        .withMessage('Id must be a number'),

    body('quantity')
        .notEmpty()
        .withMessage('id is required')
        .isInt()
        .withMessage('Id must be a number'),

    body('recipeStatus')
        .notEmpty()
        .withMessage('Recipe Status is required')
        .isIn(['optional', 'required'])
        .withMessage('Invalid recipe status'),

    validatorMiddleware,
]



module.exports = {
    addRecipes,
}