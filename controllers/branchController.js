
const { client } = require("../config/dbConfig");


const addNew =async (req, res) => {
    try {
        console.log(req.body);
        const { branchName, branchAddress, brachLocation,coverage, branchPhone } = req.body || {}; // Destructuring
        if (!branchName || !branchAddress ||!brachLocation|| !coverage||!branchPhone  ) {
            // Check for required fields
            throw new Error("Missing required fields , please enter all the data");
        }
        const nameCheckQuery = 'SELECT EXISTS(SELECT 1 FROM vw_branches WHERE branch_name = $1)';
        const nameCheckValues = [branchName];

        const nameCheckResult = await client.query(nameCheckQuery, nameCheckValues);

        if (nameCheckResult.rows[0].exists) {
            res.status(409).send(`can not add a Branch with this name, branch ${branchName} already exists`);
            return; // Exit the function if name exists (optional)
    }
        const phoneCheckQuery = "SELECT branch_name FROM branches WHERE branch_phone = $1";
        const phoneCheckValues = [branchPhone];

        const phoneCheckResult = await client.query(phoneCheckQuery, phoneCheckValues);

        if (phoneCheckResult.rows.length > 0) {
            const existingBranchName = phoneCheckResult.rows[0].branch_name;
            res.status(409).send( `can not use this number for ${branchName} branch because it is already used by branch: ${existingBranchName}`);
            return; // Exit the function if phone exists
        }

        const query = "SELECT fn_add_branch($1, $2, $3 , $4, $5)";
        const values = [branchName, branchAddress, brachLocation, coverage, branchPhone ];

        await client.query(query, values);

        res.status(201).send("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error: " + error.message); // Informative error message
    }
}
const branchList = async (req, res) => {
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
}

module.exports = {
    addNew,
    branchList
}