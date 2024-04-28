const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const branchValidator = require("../utils/validators/branchValidator");
const auth = require("../middlewares/auth");


router.get("/add-new", (req, res) => {
    res.status(200).sendFile("add-new.html", {
        root: "../admin/Downloaded Web Sites/efood-admin.6amtech.com/admin/branch",
    });
});



router.get("/branches-list", branchController.branchesList);
router.get("/ingredient-suppliers-list", branchController.ingredientSuppliersList);
router.get("/categories-list", branchController.categoriesList);
router.get("/recipes-list", branchController.recipesList);
router.get("/general-menu-list", branchController.generalMenuList);
router.get("/branch-price-changes-list", branchController.branchPriceChangesList);
router.get("/activeEmployees/:branchId", branchController.getActiveEmployees);
router.get("/employeesAttendance/:branchId", branchController.getEmployeesAttendance);
router.get("/employeesSchedule/:branchId", branchController.getEmployeesAttendance);
router.get("/itemPriceChanges/:branchId", branchController.getItemPriceChanges);
router.get("/menu/:branchId", branchController.getMenu);
router.get("/menuByTime/:branchId", branchController.getMenuByTime);
router.get("/sections/:branchId", branchController.getSections);
router.get("/tables/:branchId", branchController.getTables);

router.post("/add-new",branchValidator.addNewBranchValidator, branchController.addNew);
router.post('/add-general-section',branchValidator.addGeneralSectionValidator, branchController.addGeneralSection);
router.post('/add-branch-section',branchValidator.addBranchSectionValidator, branchController.addBranchSection);
router.post("/add-storage", branchController.addStorage);
router.post("/add-menu-item", branchController.addMenuItem);
router.post("/add-ingredient", branchValidator.addIngredientValidator, branchController.addIngredient);



module.exports = router;
