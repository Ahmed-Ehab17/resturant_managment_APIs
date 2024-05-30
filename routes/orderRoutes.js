const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");


router.get("/virtualOrderDetails/:orderId", orderControllers.getVirtualOrderDetails);
router.get("/nonVirtualOrderDetails/:orderId", orderControllers.getNonVirtualOrderDetails);


router.post("/VirtualOrder", orderControllers.addVirtualOrder);
router.post("/nonVirtualOrder", orderControllers.addNonVirtualOrder);



























module.exports = router;
