const express = require("express");
const router = express.Router();
const branchControllers = require("../controllers/branchControllers");
const branchValidator = require("../utils/validators/branchValidator");
const auth = require("../middlewares/auth");


router.get("/add-new", (req, res) => {
    res.status(200).sendFile("add-new.html", {
        root: "../admin/Downloaded Web Sites/efood-admin.6amtech.com/admin/branch",
    });
});



router.get("/branches-list", branchControllers.branchesList);
router.get("/ingredient-suppliers-list", branchControllers.ingredientSuppliersList);
router.get("/categories-list", branchControllers.categoriesList);
router.get("/recipes-list", branchControllers.recipesList);
router.get("/general-menu-list", branchControllers.generalMenuList);
router.get("/branch-price-changes-list", branchControllers.branchPriceChangesList);
router.get("/ingredients", branchControllers.ingredientList);
router.get("/activeEmployees/:branchId", branchControllers.getActiveEmployees);
router.get("/employeesAttendance/:branchId", branchControllers.getEmployeesAttendance);
router.get("/employeesSchedule/:branchId", branchControllers.getEmployeesSchedule);
router.get("/itemPriceChanges/:branchId", branchControllers.getItemPriceChanges);
router.get("/menu/:branchId", branchControllers.getMenu);
router.get("/menuByTime/:branchId", branchControllers.getMenuByTime);
router.get("/sections/:branchId", branchControllers.getSections);
router.get("/tables/:branchId/:stat", branchControllers.getTables);
router.get("/stock/:branchId", branchControllers.getStock);
router.get("/bookings/:branchId", branchControllers.getBookings);
router.get("/bookingsByStatus/:branchId/:bookingStatus", branchControllers.getBookingsByStatus);
router.get('/branchMenu/:branchId', branchControllers.getBranchMenu);
router.get('/branchLocation/:branchId', branchControllers.getBranchLocation);
router.get('/sectionOverview/:sectionId?/:daysInput?',branchControllers.getSectionOverView);
router.get('/overAllPerformance/:daysInput?', branchControllers.getOverAllPerformance);
router.get('/branchPerformance/:branchId/:daysInput?', branchControllers.getBranchPerformance);
router.get('/branchesCompare/:daysInput?', branchControllers.getBranchesCompare);
router.get('/branches/:branchId?', branchControllers.getBranches);
router.get('/branchSales/:branchId?/:itemId?/:startDate?/:endDate?', branchControllers.getSales);


router.patch("/updateStock", branchControllers.updateStock);
router.patch("/updateBookingStatus",branchValidator.updateBookingStatus, branchControllers.updateBookingStatus);

router.patch("/changeSectionManager", branchControllers.changeSectionManager);
router.patch("/changeBranchManager", branchControllers.changeBranchManager);



router.post("/add-new",branchValidator.addNewBranchValidator, branchControllers.addNew);
router.post('/add-general-section',branchValidator.addGeneralSectionValidator, branchControllers.addGeneralSection);
router.post('/add-branch-section',branchValidator.addBranchSectionValidator, branchControllers.addBranchSection);
router.post("/add-storage", branchControllers.addStorage);
router.post("/add-menu-item", branchControllers.addMenuItem);
router.post("/add-ingredient", branchValidator.addIngredientValidator, branchControllers.addIngredient);
router.post("/addIngredientToStock", branchControllers.addIngredientToStock);
router.post("/addItemBranchMenu", branchValidator.addItemBranchMenuValidator,branchControllers.addItemBranchMenu);
router.post("/addBooking",branchValidator.addBooking, branchControllers.addBooking);
router.post("/addOrderToBooking",branchValidator.addOrderToBooking, branchControllers.addOrderToBooking);



module.exports = router;
