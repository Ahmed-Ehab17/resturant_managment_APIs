const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const { client } = require("../config/dbConfig");

router.get('/add-new',(req, res)=>{
    res.status(200).sendFile('add-new.html',{root: "../admin/Downloaded Web Sites/efood-admin.6amtech.com/admin/branch"});
})

router.post('/add-new',branchController.addNew);

router.get('/list',async (req, res) => {
    try {
        const query = "SELECT * FROM vw_branches";
        const result = await client.query(query);
        const rows = result.rows;

        let formattedData = "";
        for (const row of rows) {
            formattedData += `\n branch name: ${row.branch_name},\n branch address: ${row.branch_address},\n manager name: ${row.manager_name},\n branch contact information: ${row.branch_phone} }`; // Include desired columns
        }

        res.status(200).send(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error: Internal server error");
    }
})

module.exports = router;
