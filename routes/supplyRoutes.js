const express = require("express");
const router = express.Router();
const supplyController = require('../controllers/supplyControllers');
const supplyValidator = require('../utils/validators/supplyValidator');


router.post('/addSupplier',  supplyController.addSupplier);
router.post('/addSupplyEmployee', supplyValidator.addSupplyEmployee, supplyController.addSupplyEmployee);




module.exports = router;