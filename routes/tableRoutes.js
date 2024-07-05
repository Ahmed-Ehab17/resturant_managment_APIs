const express = require("express");
const router = express.Router();
const tableControllers = require("../controllers/tableControllers");
const tableValidator = require('../utils/validators/tableValidator')
const auth = require("../middlewares/auth");
const { allowedTo } = require("../controllers/authControllers");

router.post('/add-newTable',auth, allowedTo("branch manager", "assistant manager"), tableValidator.addNewTable,tableControllers.newTable);

module.exports = router;