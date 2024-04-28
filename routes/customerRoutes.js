const express = require("express");
const router = express.Router();
const customerControllers = require('../controllers/customerControllers');


router.get('/customerAddresses/:customerId', customerControllers.getCustomerAddresses);
router.get('/customerInformation/:customerId', customerControllers.getCustomerInformation);
router.get('/customerPhones/:customerId', customerControllers.getCustomerPhones);
router.get('/friendRequests/:accountId', customerControllers.getFriendRequests);
router.get('/friendsList/:accountId', customerControllers.getFriendsList);




















module.exports = router;
