const express = require("express");
const router = express.Router();
const tableController = require("../controllers/tableController");



router.post('/add-newTable',tableController.newTable);

module.exports = router;