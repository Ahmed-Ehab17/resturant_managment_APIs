const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");
const tableValidator = require('../utils/validators/tableValidator')



router.post('/add-newTable',tableValidator.addNewTable,tableController.newTable);

module.exports = router;