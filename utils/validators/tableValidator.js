const { body } = require("express-validator");
const validatorMiddleware = require('../../middlewares/validatorMiddleware');



const addNewTable = [
    body('branchId')
        .trim()
        .notEmpty()
        .withMessage('branch id is required')
        .toInt(),

    body('capacity')
        .trim()
        .notEmpty()
        .withMessage('capacity is required')
        .toInt(),

        validatorMiddleware,
]




module.exports = {
    addNewTable
}