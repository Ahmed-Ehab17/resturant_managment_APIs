const express = require("express");
const router = express.Router();
const deliveryControllers = require('../controllers/deliveryControllers');
const deliveryValidator = require("../utils/validators/deliveryValidator");

router.get('/deliveryOrders/:employeeId?/:orderType?/:branchId?/:inDeliveredOrders?/:deliveryStatus?', deliveryControllers.getDeliveringOrders);


router.patch('/changeDeliveryOrderStatus', deliveryValidator.changeDeliveryOrderStatus, deliveryControllers.changeDeliveryOrderStatus);


router.post('/assignOrderToDelivery', deliveryValidator.assignOrderToDelivery, deliveryControllers.assignOrderToDelivery);
router.post('/reassignDeliveryOrderEmployee', deliveryValidator.reassignDeliveryOrderEmployee, deliveryControllers.reassignDeliveryOrderEmployee);





















module.exports = router;
