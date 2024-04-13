const express = require("express");
const router = express.Router();
const employeesController = require('../controllers/employeesController');




router.get('/active-employees-list', employeesController.activeEmployeesList);
router.get('/inactive-employees-list', employeesController.inactiveEmployeesList);
router.get('/positions-list',employeesController.positionsList);
router.get('/positions-changes-list',employeesController.positionsChangesList);
router.get("/supply-employees-list", employeesController.supplyEmployeesList);
router.post('/add-position', employeesController.addPosition);
router.patch('/change-position', employeesController.changePosition);
router.patch("/change-salary", employeesController.changeSalary);
router.delete("/delete-employee/:id", employeesController.deleteEmployee);



module.exports = router;
