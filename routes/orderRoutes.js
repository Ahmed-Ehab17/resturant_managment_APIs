const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const orderValidator = require("../utils/validators/orderValidator");

router.get("/virtualOrderDetails/:orderId", orderControllers.getVirtualOrderDetails);
router.get("/nonVirtualOrderDetails/:orderId", orderControllers.getNonVirtualOrderDetails);
router.get("/orderItemsBySection/:sectionId/:branchId/:Status?", orderControllers.getOrderItemsBySection);
router.get("/orderItemsStatus/:orderId/:status?", orderControllers.getOrderItemsStatus);
router.get("/orders/:branchId?/:orderType?", orderControllers.getOrders);


router.post("/VirtualOrder", orderControllers.addVirtualOrder);
router.post("/nonVirtualOrder", orderControllers.addNonVirtualOrder);


router.patch("/updateOrderStatus",orderValidator.updateOrderStatus, orderControllers.updateOrderStatus)



























module.exports = router;
