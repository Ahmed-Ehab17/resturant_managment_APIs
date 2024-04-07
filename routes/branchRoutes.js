const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");


router.get("/add-new", (req, res) => {
    res.status(200).sendFile("add-new.html", {
        root: "../admin/Downloaded Web Sites/efood-admin.6amtech.com/admin/branch",
    });
});

router.post("/add-new", branchController.addNew);

router.get("/list", branchController.branchList);

router.post('/add-general-section', branchController.addGeneralSection);

router.post('/add-branch-section', branchController.addBranchSection);

router.post("/add-storage", branchController.addStorage);

router.post("/add-menu-item", branchController.addMenuItem);

router.post("/add-ingredient", branchController.addIngredient);



module.exports = router;
