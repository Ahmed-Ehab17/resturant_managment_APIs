const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const orderValidator = require("../utils/validators/orderValidator");
const auth = require("../middlewares/auth");
const { allowedTo } = require("../controllers/authControllers");

router.get("/virtualOrderDetails/:orderId", orderControllers.getVirtualOrderDetails);
router.get("/nonVirtualOrderDetails/:orderId", auth, allowedTo("chief"), orderControllers.getNonVirtualOrderDetails);
router.get("/orderItemsBySection/:sectionId/:branchId/:Status?", auth, allowedTo("chief"), orderControllers.getOrderItemsBySection);
router.get("/orderItemsStatus/:orderId/:status?", auth, allowedTo("chief"), orderControllers.getOrderItemsStatus);
router.get("/orders/:branchId?/:orderType?", auth, allowedTo("cashier"), orderControllers.getOrders);


router.post("/VirtualOrder", orderControllers.addVirtualOrder);
router.post("/nonVirtualOrder", auth, allowedTo("cashier"), orderControllers.addNonVirtualOrder);


router.patch("/updateOrderStatus", auth, allowedTo("cashier", "delivery driver"), orderValidator.updateOrderStatus, orderControllers.updateOrderStatus)



























module.exports = router;
