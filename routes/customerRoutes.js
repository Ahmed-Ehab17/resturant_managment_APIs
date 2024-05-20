const express = require("express");
const router = express.Router();
const customerControllers = require('../controllers/customerControllers');
const customerValidator = require('../utils/validators/customerValidator')


router.get('/customerAddresses/:customerId', customerControllers.getCustomerAddresses);
router.get('/customerInformation/:customerId', customerControllers.getCustomerInformation);
router.get('/customerPhones/:customerId', customerControllers.getCustomerPhones);
router.get('/friendRequests/:accountId', customerControllers.getFriendRequests);
router.get('/friendsList/:accountId', customerControllers.getFriendsList);
router.patch('/update-customer-address', customerValidator.updateCustomerAddress, customerControllers.updateCustomerAddress);





















module.exports = router;
