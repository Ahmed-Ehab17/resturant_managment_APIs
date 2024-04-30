const express = require("express");
const router = express.Router();
const tableControllers = require("../controllers/tableControllers");
const tableValidator = require('../utils/validators/tableValidator')



router.post('/add-newTable',tableValidator.addNewTable,tableControllers.newTable);

module.exports = router;