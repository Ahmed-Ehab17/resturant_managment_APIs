const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeControllers");
const employeeValidator = require("../utils/validators/employeeValidator");
const auth = require("../middlewares/auth");
const { allowedTo } = require("../controllers/authControllers");

router.get("/manager-employees-list", auth, allowedTo("hr", "operation manager"), employeeControllers.managerEmployeesList);
router.get("/active-employees-list", auth, allowedTo("hr", "operation manager"), employeeControllers.activeEmployeesList);
router.get("/inactive-employees-list", auth, allowedTo("hr", "operation manager"), employeeControllers.inactiveEmployeesList);
router.get("/positions-list", employeeControllers.positionsList);
router.get("/positions-changes-list", employeeControllers.positionsChangesList);
router.get("/supply-employees-list", employeeControllers.supplyEmployeesList);
router.get('/attendance/:employeeId', auth, allowedTo("hr", "operation manager", "assistant manager"), employeeControllers.getEmployeesAttendance);
router.get('/phones/:employeeId', auth, allowedTo("hr", "operation manager"), employeeControllers.getEmployeesPhones);
router.get('/PositionsChanges/:employeeId', auth, allowedTo("hr", "operation manager"), employeeControllers.getPositionsChanges);
router.get('/schedule/:employeeId/:fromDate?/:toDate?', auth, allowedTo("hr", "operation manager", "assistant manager"), employeeControllers.getSchedule);
router.get('/employeeSignInInfo/:employeeEmail', auth, allowedTo("hr"), employeeControllers.getEmployeeSignInInfo);
router.get('/employeeTransfer/:employeeId?/:transferMadeBy?/:oldBranchId?/:newBranchId?', auth, allowedTo("operation manager"), employeeControllers.getEmployeeTransfer);
router.get('/employeeData/:branchId?/:status?', auth, allowedTo("hr"),employeeControllers.getEmployeeData);
router.get('/employeeOrders/:employeeId/:deliveryStatus?', auth, allowedTo("hr"), employeeControllers.getEmployeeOrders);
router.get('/tokenData', employeeControllers.getTokenData);

router.post(
	"/employeeAccount",
	auth, allowedTo("hr"),
	employeeControllers.uploadEmployeeImage,
	employeeControllers.resizeImage,
	employeeValidator.addEmployeeAccount,
	employeeControllers.addEmployeeAccount
);
router.post("/add-position", employeeValidator.addPosition, employeeControllers.addPosition);
router.post("/employee", auth, allowedTo("hr"),employeeValidator.addEmployee, employeeControllers.addEmployee);
router.post("/employee-phone", auth, allowedTo("hr"),employeeValidator.addEmployeePhone, employeeControllers.addEmployeePhone);
router.post("/employee-schedule", employeeValidator.addEmployeeSchedule, employeeControllers.addEmployeeSchedule);
router.post("/employee-vacation", auth, allowedTo("branch manager"), employeeValidator.addEmployeeVacation, employeeControllers.addEmployeeVacation);
router.post("/ingredient-supplier", employeeValidator.addIngredientSupplier, employeeControllers.addIngredientSupplier);
router.post("/timeInAttendance", employeeControllers.addTimeInAttendance);
router.post("/timeOutAttendance", employeeControllers.addTimeOutAttendance);
router.post("/employeeTransfer", auth, allowedTo("operation manager"), employeeControllers.employeeTransfer);
router.post("/employeeStatusChange", auth, allowedTo("hr"), employeeControllers.employeeStatusChange);
router.post('/login',employeeValidator.login, employeeControllers.employeeLogin);




router.patch('/change-position', auth, allowedTo("hr"), employeeControllers.changePosition);
router.patch("/change-salary", auth, allowedTo("hr"), employeeControllers.changeSalary);
router.patch("/updateEmployeeSalaryPosition", auth, allowedTo("hr"), employeeValidator.updateEmployeeSalaryPosition, employeeControllers.updateEmployeeSalaryPosition);
router.patch("/update-employee-address", auth, allowedTo("hr"), employeeValidator.updateEmployeeAddress, employeeControllers.updateEmployeeAddress);
router.patch("/update-employee-phone", auth, allowedTo("hr"), employeeValidator.updateEmployeePhone, employeeControllers.updateEmployeePhone);
router.patch("/changeEmployeePass", employeeControllers.changeEmployeePass);
router.patch("/changeEmployeePicture", employeeControllers.uploadEmployeeImage, employeeControllers.resizeImage, employeeValidator.changeEmployeeImage, employeeControllers.changeEmployeePicture);



module.exports = router;
