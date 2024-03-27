const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const { client } = require("../config/dbConfig");

router.get('/add-new',(req, res)=>{
    res.status(200).sendFile('add-new.html',{root: "../admin/Downloaded Web Sites/efood-admin.6amtech.com/admin/branch"});
})

router.post('/add-new',branchController.addNew);


router.get('/list', async (req, res) => {
    try {
      const query = "SELECT * FROM vw_branches";
      const result = await client.query(query);
      const rows = result.rows;
  
      // Create an empty array to store branch objects
      const branchData = [];
  
      for (const row of rows) {
        // Create a new object for each branch
        const branch = {
          "branch ID": row.branch_id,
          "branch name": row.branch_name,
          "branch address": row.branch_address,
          "manager name": row.manager_name === null ? "null" : row.manager_name, // Handle null values
          "branch contact information": row.branch_phone
        };
  
        // Add the branch object to the array
        branchData.push(branch);
      }
  
      res.status(200).send(branchData);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error: Internal server error");
    }
  });
  

module.exports = router;
