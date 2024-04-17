const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");


const branchesList = async (req, res) => {
    try {
        const query = "SELECT * FROM vw_branches";
        const result = await client.query(query);
        res.status(200).json(result.rows);
        } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "server error, " + error });
    }
};

const ingredientSuppliersList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_ingredient_suppliers`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: "server error, " + error });
      }
}
const categoriesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_categories`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: "server error, " + error });
      }
}
const recipesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_recipes`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: "server error, " + error });
      }
}
const generalMenuList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_general_menu`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: "server error, " + error });
      }
}
const branchPriceChangesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_branch_price_changes`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: "server error, " + error });
      }
}



const addNew = async (req, res) => {
    try {
        console.log(req.body);
        const { branchName, branchAddress, branchLocation, coverage, branchPhone, manager_id } = req.body || {}; // Destructuring
        if (!branchName || !branchAddress || !branchLocation || !coverage || !branchPhone) {

            return res.status(400).json({ message: 'Error: Missing required fields, please enter all the data' });
        }
        const nameCheckQuery = "SELECT EXISTS(SELECT 1 FROM vw_branches WHERE branch_name = $1)";
        const nameCheckValues = [branchName];
        const nameCheckResult = await client.query(nameCheckQuery, nameCheckValues);

        if (nameCheckResult.rows[0].exists) {
            return res.status(400).json({ message: `can not add a Branch with this name, branch ${branchName} already exists` });
        }
        const phoneCheckQuery = "SELECT branch_name FROM branches WHERE branch_phone = $1";
        const phoneCheckValues = [branchPhone];
        const phoneCheckResult = await client.query(phoneCheckQuery, phoneCheckValues);

        if (phoneCheckResult.rows.length > 0) {
            const existingBranchName = phoneCheckResult.rows[0].branch_name;
            return res.status(400).json({ message: `can not use this number for ${branchName} branch because it is already used by branch: ${existingBranchName}` });

        }
        // Check manager ID existence
        if (manager_id) {
        const managerCheckQuery = "SELECT EXISTS(SELECT 1 FROM employees WHERE employee_id = $1)";
        const managerCheckValues = [manager_id];
        const managerCheckResult = await client.query(managerCheckQuery, managerCheckValues);
  
        if (!managerCheckResult.rows[0].exists) {
          return res.status(409).json({ message: `Manager with ID ${manager_id} does not exist`});
        }
      }
         // Construct the query with optional manager_id
        let query;
        if (manager_id) {
        query = "SELECT fn_add_branch($1, $2, $3, $4, $5, $6)";
        values = [branchName, branchAddress, branchLocation, coverage, branchPhone, manager_id];
        } else {
        query = "SELECT fn_add_branch($1, $2, $3, $4, $5)"; // Assuming fn_add_branch handles missing manager_id
        values = [branchName, branchAddress, branchLocation, coverage, branchPhone];
        }

        await client.query(query, values);
        res.status(201).json({ message: "Data inserted successfully", data: values });
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ message: "server error, " + error });
    }
};
const addGeneralSection = async(req,res)=>{
  try {
      const { section_name, section_description } = req.body || {};
      if (!section_name || !section_description ) {
        return res.status(400).json({ message: 'Error: Missing required fields, please enter all the data' });
    }
       // Check for section name before adding
      const checkQuery = `SELECT EXISTS(SELECT 1 FROM sections WHERE section_name = $1)`;
      const checkValues = [section_name];
      const { rows: checkResults } = await client.query(checkQuery, checkValues);
      if (checkResults[0].exists) {
        return res.status(409).json({ message: 'Section name already exists' });
      }

      const query = `SELECT fn_add_general_section($1, $2)`;
      const values = [section_name, section_description];
      await client.query(query, values);
  
      res.status(201).json({ message: "Section added successfully", data: values });
      
     } catch (error) {
      console.error('Error adding general section:', error);
      return res.status(409).json({ message:"server error, "+ error });

    }
}

const addBranchSection =async (req, res) => {
  try {
      const {branch_id, section_id, manager_id} = req.body || {};
      if (!branch_id || !section_id) {
        return res.status(400).json({ message: 'Error: Missing required fields, please enter all the data'  });
    }
    //check if the branch exists or not
    const branchExistsQuery = `SELECT EXISTS(SELECT 1 FROM branches WHERE branch_id = $1);`;
    const branchExistsResult = await client.query(branchExistsQuery, [branch_id]);
    if (!branchExistsResult.rows[0].exists) {
      return res.status(409).json({ message: `branch id ${branch_id} is not existed`  });

    }
    // check if the section exists or not
    const sectionExistsQuery = `SELECT EXISTS(SELECT 1 FROM sections WHERE section_id = $1);`;
    const sectionExistsResult = await client.query(sectionExistsQuery, [section_id]);

    if (!sectionExistsResult.rows[0].exists) {
      return res.status(409).json({ message: `Section id ${section_id} is not existed` });

    }
    // Check section association with branch (modify as needed)
    const checkAssociationQuery = `SELECT EXISTS(SELECT 1 FROM branch_sections bs WHERE bs.branch_id = $1 AND bs.section_id = $2);`;
    const checkAssociationValues = [branch_id, section_id];
    const { rows: associationResults } = await client.query(checkAssociationQuery, checkAssociationValues);

    if (associationResults[0].exists) {
      return res.status(409).json({ message: 'Section already exists for this branch' });

    }
    // Check manager ID existence
    if (manager_id) {
        const managerCheckQuery = "SELECT EXISTS(SELECT 1 FROM employees WHERE employee_id = $1)";
        const managerCheckValues = [manager_id];
        const managerCheckResult = await client.query(managerCheckQuery, managerCheckValues);
  
        if (!managerCheckResult.rows[0].exists) {
          return res.status(409).json({ message: `Manager with ID ${manager_id} does not exist` });

        }
      }
      // Construct the query with optional manager_id
    let query;
    if (manager_id) {
      query = `SELECT fn_add_branch_sections($1, $2, $3)`;
      values = [branch_id, section_id, manager_id];
    } else {
      query = `SELECT fn_add_branch_sections($1, $2)`; 
      values = [branch_id, section_id];
    }

    await client.query(query, values);

    res.status(200).json({ message: "Branch Section added successfully", data: values });
  } catch (error) {
    console.error('Error adding branch section:', error);
    return res.status(500).json({ message: 'Internal server error, ' + error });

  }
}


const addStorage = async (req, res) => {
    try {
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

        const ingredientExistsQuery = `SELECT EXISTS(SELECT 1 FROM ingredients WHERE ingredients_name = $1);`;
        const ingredientExistsResult = await client.query(ingredientExistsQuery, [name]);

        if (ingredientExistsResult.rows[0].exists) {
          return res.status(409).json({ status: httpStatusText.FAIL, message: 'ingredient is already exist' });
        }

        const query = `CALL pr_add_ingredient($1, $2, $3)`;
        const values = [name, recipeUnit, shipmentUnit];
        await client.query(query, values);
        
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { name, recipeUnit, shipmentUnit }});
    } catch (error) {
        res.status(500).json({status: httpStatusText.ERROR, message: 'Internal Server Error'});
    }
};










module.exports = {
    addNew,
    branchesList,
    addStorage,
    addMenuItem,
    addIngredient,
    addGeneralSection,
    addBranchSection,
    addBranchSection,
    ingredientSuppliersList,
    categoriesList,
    recipesList,
    generalMenuList,
    branchPriceChangesList
};
