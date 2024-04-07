const express = require("express");
const router = express.Router();
const employeesController = require('../controllers/employeesController');





router.post('/add-position', employeesController.addPosition);
router.patch('/change-position', employeesController.changePosition);
router.patch("/change-salary", employeesController.changeSalary);
router.delete("/delete-employee/:id", employeesController.deleteEmployee);



module.exports = router;
