const express = require("express");
const router = express.Router();
const socialControllers = require('../controllers/socialControllers');

router.get('/friend-requests/:accountId', socialControllers.getFriendRequests);






module.exports = router;
