const express = require("express");
const router = express.Router();
const customerControllers = require('../controllers/customerControllers');
const customerValidator = require('../utils/validators/customerValidator');
const auth = require("../middlewares/auth");
const { allowedTo } = require("../controllers/authControllers");




router.get('/customerAddresses/:customerId', auth, allowedTo("cashier"), customerControllers.getCustomerAddresses);
router.get('/customerInformation/:customerId', auth, allowedTo("cashier"), customerControllers.getCustomerInformation);
router.get('/customerPhones/:customerId', auth, allowedTo("cashier"), customerControllers.getCustomerPhones);
router.get('/customerOrders/:customerId/:limit/:status', auth, allowedTo("branch manager"), customerControllers.getCustomerOrders);
router.get('/customerBookings/:customerId', auth, allowedTo("branch manager"), customerControllers.getCustomerBookings);
router.get('/CustomerSignInInfo/:customerPhone', customerControllers.getCustomerSignInInfo);
router.get('/customerMenuRatings/:customerId', auth, allowedTo("branch manager"), customerControllers.getCustomerMenuRatings);





router.patch('/update-customer-address', customerValidator.updateCustomerAddress, customerControllers.updateCustomerAddress);
router.patch('/changeCustomerPass', customerValidator.changeCustomerPass, customerControllers.changeCustomerPass);
router.patch('/changeCustomerImage',customerControllers.uploadCustomerImage, customerControllers.resizeImage, customerValidator.changeCustomerImage, customerControllers.changeCustomerImage);

router.post("/customer",customerValidator.addCustomer, customerControllers.addCustomer);
router.post("/customer-address",customerValidator.addCustomerAddress, customerControllers.addCustomerAddress);
router.post("/customer-phone",customerValidator.addCustomerPhone, customerControllers.addCustomerPhone);
router.post('/addFavorite', customerControllers.addFavorite);
router.post('/verifyPhone',customerValidator.verifyPhone, customerControllers.verifyPhone);






















module.exports = router;
