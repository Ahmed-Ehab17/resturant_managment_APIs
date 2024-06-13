const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const addFriendRequest = [
    body("senderId")
        .trim()
        .notEmpty()
        .withMessage("Sender ID is required")
        .isInt()
        .withMessage("ID must be a number"),
        
    body("receiverId")
        .trim()
        .notEmpty()
        .withMessage("Receiver ID is required")
        .isInt()
        .withMessage("ID must be a number"),
    
    validatorMiddleware,
];


module.exports = {
    addFriendRequest,
}