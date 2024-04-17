const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const branchValidator = require("../utils/validators/branchValidator");


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

router.post("/add-new", branchController.addNew);
router.post('/add-general-section', branchController.addGeneralSection);
router.post('/add-branch-section', branchController.addBranchSection);
router.post("/add-storage", branchController.addStorage);
router.post("/add-menu-item", branchController.addMenuItem);
router.post("/add-ingredient", branchValidator.addIngredientValidator, branchController.addIngredient);



module.exports = router;
