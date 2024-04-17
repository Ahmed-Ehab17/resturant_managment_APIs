const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText"); 

const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: httpStatusText.FAIL, data: errors.array() });
    }
    next();
};

module.exports = validatorMiddleware;
