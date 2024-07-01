const express = require("express");
const router = express.Router();
const socialControllers = require('../controllers/socialControllers');
const socialValidators = require('../utils/validators/socialValidator');

router.get('/friend-requests/:accountId', socialControllers.getFriendRequests);
router.get('/friendsList/:accountId', socialControllers.getFriendsList);
router.get('/friendsFavoriteItems/:customerId', socialControllers.getFriendsFavoriteItem);
router.get('/getAccountByPhone/:phone', socialControllers.getAccountByPhone);

router.post('/friend-request', socialValidators.addFriendRequest, socialControllers.addFriendRequests);

router.patch('/updateFriendRequest', socialControllers.updateFriendRequest);


module.exports = router;
