const express = require("express");
const router = express.Router();
const employeeControllers = require('../controllers/employeeControllers');
const employeeValidator = require('../utils/validators/employeeValidator');
const auth = require('../middlewares/auth');


router.get('/manager-employees-list', employeeControllers.managerEmployeesList);
router.get('/active-employees-list',auth, employeeControllers.activeEmployeesList);
router.get('/inactive-employees-list', employeeControllers.inactiveEmployeesList);
router.get('/positions-list',employeeControllers.positionsList);
router.get('/positions-changes-list',employeeControllers.positionsChangesList);
router.get("/supply-employees-list", employeeControllers.supplyEmployeesList);
router.get('/attendance/:employeeId', employeeControllers.getEmployeesAttendance);
router.get('/phones/:employeeId', employeeControllers.getEmployeesPhones);
router.get('/PositionsChanges/:employeeId', employeeControllers.getPositionsChanges);
router.get('/schedule/:employeeId', employeeControllers.getSchedule);
router.post('/add-position',employeeValidator.addPosition, employeeControllers.addPosition);
router.post('/add-employee',employeeValidator.addEmployee, employeeControllers.addEmployee);
router.post('/add-employee-phone',employeeValidator.addEmployeePhone, employeeControllers.addEmployeePhone);
router.post('/add-employee-schedule',employeeValidator.addEmployeeSchedule, employeeControllers.addEmployeeSchedule);
router.post('/add-employee-vacation',employeeValidator.addEmployeeVacation, employeeControllers.addEmployeeVacation);
router.post('/timeInAttendance', employeeControllers.addTimeInAttendance);
router.post('/timeOutAttendance', employeeControllers.addTimeOutAttendance);



router.patch('/change-position', employeeControllers.changePosition);
router.patch("/change-salary", employeeControllers.changeSalary);
router.patch("/updateEmployeeAddress",employeeValidator.updateEmployeeAddress, employeeControllers.updateEmployeeAddress);
router.patch("/updateEmployeePhone",employeeValidator.updateEmployeePhone, employeeControllers.updateEmployeePhone);



module.exports = router;
