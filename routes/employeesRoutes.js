const express = require("express");
const router = express.Router();
const employeesController = require('../controllers/employeesController');
const employeesValidator = require('../utils/validators/employeesValidator')


router.get('/manager-employees-list', employeesController.managerEmployeesList);
router.get('/active-employees-list', employeesController.activeEmployeesList);
router.get('/inactive-employees-list', employeesController.inactiveEmployeesList);
router.get('/positions-list',employeesController.positionsList);
router.get('/positions-changes-list',employeesController.positionsChangesList);
router.get("/supply-employees-list", employeesController.supplyEmployeesList);
router.get('/search-employees-attendance',employeesValidator.searchEmployeesAttendance, employeesController.searchEmployeesAttendance);
router.get('/search-employees-phones',employeesValidator.searchEmployeesPhones, employeesController.searchEmployeesPhones);
router.post('/add-position',employeesValidator.addPosition, employeesController.addPosition);
router.patch('/change-position', employeesController.changePosition);
router.patch("/change-salary", employeesController.changeSalary);



module.exports = router;
