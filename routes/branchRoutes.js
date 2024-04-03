const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const { client } = require("../config/dbConfig");

router.get('/add-new',(req, res)=>{
    res.status(200).sendFile('add-new.html',{root: "../admin/Downloaded Web Sites/efood-admin.6amtech.com/admin/branch"});
})

router.post('/add-new',branchController.addNew);


router.get('/list', branchController.branchList);
  

module.exports = router;
