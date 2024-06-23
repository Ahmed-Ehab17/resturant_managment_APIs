const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");
const orderValidator = require("../utils/validators/orderValidator");

router.get("/virtualOrderDetails/:orderId", orderControllers.getVirtualOrderDetails);
router.get("/nonVirtualOrderDetails/:orderId", orderControllers.getNonVirtualOrderDetails);
<<<<<<< HEAD
router.get("/orderItemsBySection/:sectionId/:Status?", orderControllers.getOrderItemsBySection);
=======
router.get("/orderItemsBySection/:sectionId/:branchId/:Status?", orderControllers.getOrderItemsBySection);
>>>>>>> 904be0effa7ae20bc1adfe8fb66fb3565d248a4b


router.post("/VirtualOrder", orderControllers.addVirtualOrder);
router.post("/nonVirtualOrder", orderControllers.addNonVirtualOrder);


router.patch("/updateOrderStatus",orderValidator.updateOrderStatus, orderControllers.updateOrderStatus)



























module.exports = router;
