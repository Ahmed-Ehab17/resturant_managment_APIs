const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

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

const addNewBranchValidator = [
    body('branchName')
    .trim()
    .notEmpty()
    .withMessage('branch name is required'),

    body('branchAddress')
    .trim()
    .notEmpty()
    .withMessage('branch address is required'),

    body('branchLocation')
    .trim()
    .notEmpty()
    .withMessage('branch location is required'),

    body('coverage')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('coverage is required'),

    body('branchPhone')
    .trim()
    .notEmpty()
    .withMessage('branch phone is required')
    .isMobilePhone()
    .withMessage('Invalid phone number format'),
    
    body('manager_id')
    .toInt(),

    validatorMiddleware

]

const addGeneralSectionValidator = [
    body('section_name')
    .trim()
    .notEmpty()
    .withMessage('section name is required'),

    body('section_description')
    .trim()
    .notEmpty()
    .withMessage('section description is required'),

    validatorMiddleware

]

const addBranchSectionValidator = [
    body('branch_id')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('branch id is required'), 
    
    body('section_id')
    .trim()
    .toInt()
    .notEmpty()
    .withMessage('section id is required'), 

    validatorMiddleware
]




module.exports = {
    addIngredientValidator,
    addNewBranchValidator,
    addGeneralSectionValidator,
    addBranchSectionValidator,
}