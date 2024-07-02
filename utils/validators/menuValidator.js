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
 const addCategory = [
    body('sectionId')
    .trim()
    .notEmpty()
    .withMessage('section id is required'),

    body('categoryName')
    .trim()
    .notEmpty()
    .withMessage('category name is required'),

    body('categoryDescription')
    .trim()
    .notEmpty()
    .withMessage('category description is required'),
    validatorMiddleware
 ]

 const changeCategoryImage = [
    body('categoryId')
      .trim()
      .isInt()
      .withMessage('Category ID must be an integer')
      .notEmpty()
      .withMessage('ID is required'),
 
    validatorMiddleware
  ]
 const changeItemImage = [
    body('itemId')
       .trim()
       .isInt()
       .notEmpty()
       .withMessage('ID is required'),
 
    validatorMiddleware
  ]


module.exports = {
    addRecipes,
    addCategory,
    changeCategoryImage,
    changeItemImage,
}