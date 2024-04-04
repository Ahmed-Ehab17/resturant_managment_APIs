const Joi = require("joi");
const { client } = require("../config/dbConfig");

const addNew = async (req, res) => {
    try {
        console.log(req.body);
        const { branchName, branchAddress, branchLocation, coverage, branchPhone } = req.body || {}; // Destructuring
        if (!branchName || !branchAddress || !branchLocation || !coverage || !branchPhone) {
            // Check for required fields
            throw new Error("Missing required fields , please enter all the data");
        }
        const nameCheckQuery = "SELECT EXISTS(SELECT 1 FROM vw_branches WHERE branch_name = $1)";
        const nameCheckValues = [branchName];

        const nameCheckResult = await client.query(nameCheckQuery, nameCheckValues);

        if (nameCheckResult.rows[0].exists) {
            res.status(409).send(
                `can not add a Branch with this name, branch ${branchName} already exists`
            );
            return; // Exit the function if name exists (optional)
        }
        const phoneCheckQuery = "SELECT branch_name FROM branches WHERE branch_phone = $1";
        const phoneCheckValues = [branchPhone];

        const phoneCheckResult = await client.query(phoneCheckQuery, phoneCheckValues);

        if (phoneCheckResult.rows.length > 0) {
            const existingBranchName = phoneCheckResult.rows[0].branch_name;
            res.status(409).send(
                `can not use this number for ${branchName} branch because it is already used by branch: ${existingBranchName}`
            );
            return; // Exit the function if phone exists
        }

        const query = "SELECT fn_add_branch($1, $2, $3 , $4, $5)";
        const values = [branchName, branchAddress, branchLocation, coverage, branchPhone];

        await client.query(query, values);

        res.status(201).send("Data inserted successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error: " + error.message); // Informative error message
    }
};
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
                "branch contact information": row.branch_phone,
            };

            // Add the branch object to the array
            branchData.push(branch);
        }

        res.status(200).send(branchData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error: Internal server error");
    }
};
const addGeneralSection = async(req,res)=>{
  try {
      const { section_name, section_description } = req.body || {};
       // Check for section name before adding
    const checkQuery = `SELECT EXISTS(SELECT 1 FROM sections WHERE section_name = $1)`;
    const checkValues = [section_name];
    const { rows: checkResults } = await client.query(checkQuery, checkValues);
    if (checkResults[0].exists) {
      res.status(409).send({ message: 'Section name already exists' });
      return;
    }

      const query = `SELECT fn_add_general_section($1, $2)`;
      const values = [section_name, section_description];
      await client.query(query, values);
  
      res.status(201).send({ message: 'Section added successfully' });
      
     } catch (error) {
      console.error('Error adding general section:', error);
      res.status(500).send('Error: Internal server error');
    }
}

const addBranchSection =async (req, res) => {
  try {
      const {branch_id, section_id, manager_id} = req.body || {};
      if (!branch_id || !section_id) {
        return res.status(400).send({ message: 'Error: Missing required fields, please enter all the data' });
    }
    //check if the branch exists or not
    const branchExistsQuery = `SELECT EXISTS(SELECT 1 FROM branches WHERE branch_id = $1);`;
    const branchExistsResult = await client.query(branchExistsQuery, [branch_id]);
    if (!branchExistsResult.rows[0].exists) {
      return res.status(409).send({ message: `branch id ${branch_id} is not existed` });
    }
    // check if the section exists or not
    const sectionExistsQuery = `SELECT EXISTS(SELECT 1 FROM sections WHERE section_id = $1);`;
    const sectionExistsResult = await client.query(sectionExistsQuery, [section_id]);

    if (!sectionExistsResult.rows[0].exists) {
      return res.status(409).send({ message: `Section id ${section_id} is not existed` });
    }
        // Check section association with branch (modify as needed)
    const checkAssociationQuery = `SELECT EXISTS(
      SELECT 1 FROM branch_sections bs WHERE bs.branch_id = $1 AND bs.section_id = $2);`;
    const checkAssociationValues = [branch_id, section_id];
    const { rows: associationResults } = await client.query(checkAssociationQuery, checkAssociationValues);

    if (associationResults[0].exists) {
      return res.status(409).send({ message: 'Section already exists for this branch' });
    }
      const query = `SELECT fn_add_branch_sections($1, $2, $3)`;
      const values = [branch_id, section_id, manager_id];
      await client.query(query, values);
      
      res.status(200).send( "Branch Section inserted successfully");
} catch (error) {
  console.error('Error adding branch section:', error);
  res.status(500).send('Error: Internal server error');
}  
}


const addStorage = async (req, res) => {
    try {
        const schema = Joi.object({
            storageName: Joi.string().required(),
            managerId: Joi.number().integer().positive().max(35),
            storageAddress: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(404).send(error.details[0].message);
            return;
        }

        const { storageName, managerId, storageAddress } = req.body;
        const query = `CALL pr_add_storage($1,$2,$3)`;
        const values = [storageName, storageAddress, managerId];
        await client.query(query, values);


        res.status(201).json({
            message: "Storage created successfully",
            data: { storageName, storageAddress, managerId },
        });
    } catch (error) {
        res.status(500).send("message:" + error.message);
    }
};

const addMenuItem = async (req, res) => {
    try {
        const schema = Joi.object({
            itemName: Joi.string().max(35).required(),
            itemDesc: Joi.string().max(254).required(),
            categoryID: Joi.number().integer().positive().required(),
            prepTime: Joi.number(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(404).send(error.details[0].message);
            return;
        }

        const { itemName, itemDesc, categoryID, prepTime } = req.body;
        const query = `CALL pr_menu_item($1, $2, $3, $4)`;
        const values = [itemName, itemDesc, categoryID, prepTime];
        await client.query(query, values);

        res.status(201).json({ message: "Menu Item Added Succesfully", data: values });
    } catch (error) {
        res.status(500).send("message:" + error.message);
    }
};

const addIngredient = async (req, res) => {
    try {
        const { name, recipeUnit, shipmentUnit } = req.body;
        const query = `CALL pr_add_ingredient($1, $2, $3)`;
        const values = [name, recipeUnit, shipmentUnit];
        await client.query(query, values);

        console.log("qeury:" + test.message)
        res.status(201).json({
            message: "Ingredient added successfully",
            data: { name, recipeUnit, shipmentUnit },
        });
    } catch (error) {
        res.status(500).send("message:" + error.message);
    }
};










module.exports = {
    addNew,
    branchList,
    addStorage,
    addMenuItem,
    addIngredient,
    addGeneralSection,
    addBranchSection
};
