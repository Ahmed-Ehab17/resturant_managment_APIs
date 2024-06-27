const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeControllers");
const employeeValidator = require("../utils/validators/employeeValidator");
const auth = require("../middlewares/auth");

router.get("/manager-employees-list", employeeControllers.managerEmployeesList);
router.get("/active-employees-list", employeeControllers.activeEmployeesList);
router.get("/inactive-employees-list", employeeControllers.inactiveEmployeesList);
router.get("/positions-list", employeeControllers.positionsList);
router.get("/positions-changes-list", employeeControllers.positionsChangesList);
router.get("/supply-employees-list", employeeControllers.supplyEmployeesList);
router.get('/attendance/:employeeId', employeeControllers.getEmployeesAttendance);
router.get('/phones/:employeeId', employeeControllers.getEmployeesPhones);
router.get('/PositionsChanges/:employeeId', employeeControllers.getPositionsChanges);
router.get('/schedule/:employeeId/:fromDate?/:toDate?', employeeControllers.getSchedule);
router.get('/employeeSignInInfo/:employeeEmail', employeeControllers.getEmployeeSignInInfo);
router.get('/employeeTransfer/:employeeId?/:transferMadeBy?/:oldBranchId?/:newBranchId?', employeeControllers.getEmployeeTransfer);
router.get('/employeeData/:branchId?/:status?', employeeControllers.getEmployeeData);

router.post(
	"/employeeAccount",
	employeeControllers.uploadEmployeeImage,
	employeeControllers.resizeImage,
	employeeValidator.addEmployeeAccount,
	employeeControllers.addEmployeeAccount
);
router.post("/add-position", employeeValidator.addPosition, employeeControllers.addPosition);
router.post("/employee", employeeValidator.addEmployee, employeeControllers.addEmployee);
router.post("/employee-phone", employeeValidator.addEmployeePhone, employeeControllers.addEmployeePhone);
router.post("/employee-schedule", employeeValidator.addEmployeeSchedule, employeeControllers.addEmployeeSchedule);
router.post("/employee-vacation", employeeValidator.addEmployeeVacation, employeeControllers.addEmployeeVacation);
router.post("/ingredient-supplier", employeeValidator.addIngredientSupplier, employeeControllers.addIngredientSupplier);
router.post("/add-employee", employeeValidator.addEmployee, employeeControllers.addEmployee);
router.post("/add-employee-phone", employeeValidator.addEmployeePhone, employeeControllers.addEmployeePhone);
router.post("/add-employee-schedule", employeeValidator.addEmployeeSchedule, employeeControllers.addEmployeeSchedule);
router.post("/add-employee-vacation", employeeValidator.addEmployeeVacation, employeeControllers.addEmployeeVacation);
router.post("/timeInAttendance", employeeControllers.addTimeInAttendance);
router.post("/timeOutAttendance", employeeControllers.addTimeOutAttendance);
router.post("/employeeTransfer", employeeControllers.employeeTransfer);
router.post("/employeeStatusChange", employeeControllers.employeeStatusChange);
router.post('/employeeAccount',employeeValidator.addEmployeeAccount, employeeControllers.addEmployeeAccount);
router.post('/login',employeeValidator.login, employeeControllers.employeeLogin);




router.patch('/change-position', employeeControllers.changePosition);
router.patch("/change-salary", employeeControllers.changeSalary);
router.patch("/updateEmployeeSalaryPosition",employeeValidator.updateEmployeeSalaryPosition, employeeControllers.updateEmployeeSalaryPosition);
router.patch("/update-employee-address",employeeValidator.updateEmployeeAddress, employeeControllers.updateEmployeeAddress);
router.patch("/update-employee-phone",employeeValidator.updateEmployeePhone, employeeControllers.updateEmployeePhone);
router.patch("/changeEmployeePass", employeeControllers.changeEmployeePass);



module.exports = router;
