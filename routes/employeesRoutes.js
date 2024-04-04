const express = require("express");
const router = express.Router();
const employeesController = require('../controllers/employeesController');





router.post('/add-position', employeesController.addPosition);
router.patch('/change-position', employeesController.changePosition);




module.exports = router;