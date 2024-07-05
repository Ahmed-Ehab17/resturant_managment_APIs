const express = require("express");
const router = express.Router();
const branchControllers = require("../controllers/branchControllers");
const branchValidator = require("../utils/validators/branchValidator");
const auth = require("../middlewares/auth");
const { allowedTo } = require("../controllers/authControllers");

router.get("/branches-list", auth, allowedTo("operation manager"), branchControllers.branchesList);
router.get("/ingredient-suppliers-list", branchControllers.ingredientSuppliersList);
router.get("/categories-list", allowedTo("operation manager"), branchControllers.categoriesList);
router.get("/recipes-list", auth, allowedTo("kitchen manager", "chief", "head bar"), branchControllers.recipesList);
router.get("/general-menu-list", allowedTo("operation manager"), branchControllers.generalMenuList);
router.get("/branch-price-changes-list", allowedTo("operation manager"), branchControllers.branchPriceChangesList);
router.get("/ingredients", allowedTo("operation manager"), branchControllers.ingredientList);
router.get("/activeEmployees/:branchId", branchControllers.getActiveEmployees);
router.get("/employeesAttendance/:branchId", auth, allowedTo("kitchen manager", "branch manager", "assistant manager"), branchControllers.getEmployeesAttendance);
router.get("/employeesSchedule/:branchId", auth, allowedTo("kitchen manager", "branch manager", "assistant manager"), branchControllers.getEmployeesSchedule);
router.get("/itemPriceChanges/:branchId", branchControllers.getItemPriceChanges);
router.get("/menu/:branchId", auth, allowedTo("chief", "operation manager", "branch manager", "assistant manager"), branchControllers.getMenu);
router.get("/menuByTime/:branchId", auth, allowedTo("chief", "operation manager", "branch manager", "assistant manager"), branchControllers.getMenuByTime);
router.get("/sections/:branchId", allowedTo("operation manager"), branchControllers.getSections);
router.get("/tables/:branchId/:stat",allowedTo("branch manager", "assistant manager"), branchControllers.getTables);
router.get("/stock/:branchId", auth, allowedTo("kitchen manager", "head bar", "logistics coordinator", "branch manager", "assistant manager"), branchControllers.getStock);
router.get("/bookings/:branchId", auth, allowedTo("branch manager", "assistant manager"), branchControllers.getBookings);
router.get("/bookingsByStatus/:branchId/:bookingStatus", auth, allowedTo("branch manager"), branchControllers.getBookingsByStatus);
router.get("/branchMenu/:branchId", allowedTo("operation manager", "branch manager", "assistant manager"), branchControllers.getBranchMenu);
router.get("/branchLocation/:branchId", branchControllers.getBranchLocation);
router.get("/sectionOverview/:sectionId?/:daysInput?", allowedTo("operation manager"), branchControllers.getSectionOverView);
router.get("/overAllPerformance/:daysInput?", auth, allowedTo("operation manager"), branchControllers.getOverAllPerformance);
router.get("/branchPerformance/:branchId/:daysInput?", auth, allowedTo("operation manager", "branch manager"), branchControllers.getBranchPerformance);
router.get("/branchesCompare/:daysInput?", auth, allowedTo("operation manager"), branchControllers.getBranchesCompare);
router.get("/branches/:branchId?", branchControllers.getBranches);
router.get("/branchSales/:branchId?/:itemId?/:startDate?/:endDate?", branchControllers.getSales);
router.get("/bestSeller/:branchId?/:startDate?/:endDate?", branchControllers.getBestSeller);

router.patch("/updateStock", auth, allowedTo("kitchen manager", "head bar", "logistics coordinator", "branch manager", "assistant manager"), branchControllers.updateStock);
router.patch("/updateBookingStatus", auth, allowedTo("cashier"), branchValidator.updateBookingStatus, branchControllers.updateBookingStatus);

router.patch("/changeSectionManager", auth, allowedTo("operation manager"), branchControllers.changeSectionManager);
router.patch("/changeBranchManager", auth, allowedTo("operation manager"), branchControllers.changeBranchManager);

router.post("/add-new", auth, allowedTo("operation manager"), branchValidator.addNewBranchValidator, branchControllers.addNew);
router.post("/add-general-section", auth, allowedTo("operation manager"), branchValidator.addGeneralSectionValidator, branchControllers.addGeneralSection);
router.post("/add-branch-section", auth, allowedTo("operation manager"), branchValidator.addBranchSectionValidator, branchControllers.addBranchSection);
router.post("/add-storage",auth, allowedTo("logistics coordinator ", "branch manager", "assistant manager"), branchControllers.addStorage);
router.post("/add-menu-item", auth, allowedTo("operation manager", "branch manager"), branchControllers.addMenuItem);
router.post("/add-ingredient", auth, allowedTo("operation manager"), branchValidator.addIngredientValidator, branchControllers.addIngredient);
router.post("/addIngredientToStock", auth, allowedTo("kitchen manager", "branch manager"), branchControllers.addIngredientToStock);
router.post("/addItemBranchMenu", auth, allowedTo("operation manager", "branch manager"), branchValidator.addItemBranchMenuValidator, branchControllers.addItemBranchMenu);
router.post("/addBooking", auth, allowedTo("cashier"), branchValidator.addBooking, branchControllers.addBooking);
router.post("/addOrderToBooking", branchValidator.addOrderToBooking, branchControllers.addOrderToBooking);

module.exports = router;
