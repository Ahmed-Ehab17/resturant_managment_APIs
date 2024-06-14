const express = require("express");
const router = express.Router();
const socialControllers = require('../controllers/socialControllers');
const socialValidators = require('../utils/validators/socialValidator');

router.get('/friend-requests/:accountId', socialControllers.getFriendRequests);

router.post('/friend-request', socialValidators.addFriendRequest, socialControllers.addFriendRequests);

router.patch('/updateFriendRequest', socialControllers.updatFriendRequest);


module.exports = router;
