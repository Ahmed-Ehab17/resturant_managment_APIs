const express = require("express");
const router = express.Router();
const employeeControllers = require('../controllers/employeeControllers');
const employeeValidator = require('../utils/validators/employeeValidator')


router.get('/manager-employees-list', employeeControllers.managerEmployeesList);
router.get('/active-employees-list', employeeControllers.activeEmployeesList);
router.get('/inactive-employees-list', employeeControllers.inactiveEmployeesList);
router.get('/positions-list',employeeControllers.positionsList);
router.get('/positions-changes-list',employeeControllers.positionsChangesList);
router.get("/supply-employees-list", employeeControllers.supplyEmployeesList);
router.get('/attendance/:employeeId', employeeControllers.getEmployeesAttendance);
router.get('/phones/:employeeId', employeeControllers.getEmployeesPhones);
router.get('/PositionsChanges/:employeeId', employeeControllers.getPositionsChanges);
router.get('/schedule/:employeeId', employeeControllers.getSchedule);
router.post('/add-position',employeeValidator.addPosition, employeeControllers.addPosition);
router.patch('/change-position', employeeControllers.changePosition);
router.patch("/change-salary", employeeControllers.changeSalary);
router.patch("/updateEmployeeAddress",employeeValidator.updateEmployeeAddress, employeeControllers.updateEmployeeAddress);
router.patch("/updateEmployeePhone",employeeValidator.updateEmployeePhone, employeeControllers.updateEmployeePhone);



module.exports = router;
