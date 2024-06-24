const express = require("express");
const router = express.Router();
const customerControllers = require('../controllers/customerControllers');
const customerValidator = require('../utils/validators/customerValidator')


router.get('/customerAddresses/:customerId', customerControllers.getCustomerAddresses);
router.get('/customerInformation/:customerId', customerControllers.getCustomerInformation);
router.get('/customerPhones/:customerId', customerControllers.getCustomerPhones);
router.get('/friendRequests/:accountId', customerControllers.getFriendRequests);
router.get('/friendsList/:accountId', customerControllers.getFriendsList);
router.get('/customerOrders/:customerId/:limit/:status', customerControllers.getCustomerOrders);
router.get('/customerBookings/:customerId', customerControllers.getCustomerBookings);
router.get('/CustomerSignInInfo/:customerPhone', customerControllers.getCustomerSignInInfo);
router.get('/customerMenuRatings/:customerId', customerControllers.getCustomerMenuRatings);





router.patch('/update-customer-address', customerValidator.updateCustomerAddress, customerControllers.updateCustomerAddress);

router.post("/customer",customerValidator.addCustomer, customerControllers.addCustomer);
router.post("/customer-address",customerValidator.addCustomerAddress, customerControllers.addCustomerAddress);
router.post("/customer-phone",customerValidator.addCustomerPhone, customerControllers.addCustomerPhone);
router.post('/addFavorite', customerControllers.addFavorite);
router.post('/addCustomerAccount', customerControllers.addCustomerAccount);






















module.exports = router;
