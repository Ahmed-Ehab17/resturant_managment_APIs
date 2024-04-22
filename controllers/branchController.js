const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");


const branchesList = async (req, res) => {
    try {
        const query = "SELECT * FROM vw_branches";
        const result = await client.query(query);
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
        } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
    }
};

const ingredientSuppliersList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_ingredient_suppliers`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
      }
}
const categoriesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_categories`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
      }
}
const recipesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_recipes`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
      }
}
const generalMenuList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_general_menu`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
      }
}
const branchPriceChangesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_branch_price_changes`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
      }
}
const getActiveEmployees = async(req, res) => {
  const branchId = req.params.branchId
    try{
      const query = `SELECT * FROM fn_get_branch_active_employees(${branchId})`;
      const result = await client.query(query);
      res.status(200).json({status: httpStatusText.SUCCESS, data: {employees: result.rows}});
    }catch (err){
      res.status(500).json({status: httpStatusText.ERROR, message: err.message});
    }
}
const getEmployeesAttendance = async (req, res) => {  
  const branchId  = req.params.branchId
  const {fromDate, toDate} = req.query
    try{
      const query = `SELECT * FROM fn_get_branch_employees_attendance($1, $2, $3)`
      const values = [branchId, fromDate, toDate]
      const result = await client.query(query, values)
      res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
      }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message: err.message});
      }
}
const getEmployeesSchedule = async (req, res) => {
  const branchId  = req.params.branchId
  const {fromDate, toDate} = req.query
    try{
      const query = `SELECT * FROM fn_get_branch_employees_schedule($1, $2, $3)`
      const values = [branchId, fromDate, toDate]
      const result = await client.query(query, values)
      res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
      }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message: err.message});
      }
}
const getItemPriceChanges = async (req, res) => {
  const branchId = req.params.branchId
  try {
    const query = `SELECT * FROM fn_get_branch_item_price_changes(${branchId})`
    const result = await client.query(query)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: {items: result.rows} })
  }catch(err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message })
  }
}
const getMenu = async (req, res) => {
  const branchId = req.params.branchId
  try {
    const query = `SELECT * FROM fn_get_branch_menu(${branchId})`
    const result = await client.query(query)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { menu: result.rows}})
  }catch (err){
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message })
    console.log(err)
  }
}
const getMenuByTime = async (req, res) => {
  const branchId = req.params.branchId
  const dayTime = req.query.dayTime
  try {
    const query = `SELECT * FROM fn_get_branch_menu_by_time($1, $2)`
    const values = [ branchId, dayTime ]
    const result = await client.query(query, values)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { menu: result.rows}})
  }catch (err){
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message })
  }
}
const getSections = async (req, res) => {
  const branchId = req.params.branchId
  try {
    const query = `SELECT * FROM fn_get_branch_sections(${branchId})`
    const result = await client.query(query)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: {sections: result.rows} })
  }catch(err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message })
  }
}
const getTables = async (req, res) => {
  const branchId = req.params.branchId
  try {
    const query = `SELECT * FROM fn_get_branch_tables(${branchId})`
    const result = await client.query(query)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: {tables: result.rows} })
  }catch(err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message })
  }
}




const addNew = async (req, res) => {
    try {
        console.log(req.body);
        const { branchName, branchAddress, branchLocation, coverage, branchPhone, manager_id } = req.body || {}; 
        
        const phoneCheckQuery = "SELECT branch_name FROM branches WHERE branch_phone = $1";
        const phoneCheckValues = [branchPhone];
        const phoneCheckResult = await client.query(phoneCheckQuery, phoneCheckValues);

        if (phoneCheckResult.rows.length > 0) {
            const existingBranchName = phoneCheckResult.rows[0].branch_name;
            return res.status(400).json({status:httpStatusText.FAIL, message: `can not use this number for ${branchName} branch because it is already used by branch: ${existingBranchName}` });

        }
        // Check manager ID existence
        if (manager_id) {
        const managerCheckQuery = "SELECT EXISTS(SELECT 1 FROM employees WHERE employee_id = $1)";
        const managerCheckValues = [manager_id];
        const managerCheckResult = await client.query(managerCheckQuery, managerCheckValues);
  
        if (!managerCheckResult.rows[0].exists) {
          return res.status(409).json({status:httpStatusText.FAIL, message: `Manager with ID ${manager_id} does not exist`});
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

        const result = await client.query(query, values);
        res.status(200).json({status: httpStatusText.SUCCESS, message: Object.values(result.rows[0])[0]})
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({status:httpStatusText.ERROR, message: "server error, " + error });
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
        return res.status(409).json({status:httpStatusText.FAIL, message: "Section name already exists " });

      }

      const query = `SELECT fn_add_general_section($1, $2)`;
      const values = [section_name, section_description];
      await client.query(query, values);
  
      res.status(200).json({status:httpStatusText.SUCCESS, message: "Section added successfully", data: values });

      
     } catch (error) {
      console.error('Error adding general section:', error);
      res.status(409).json({status:httpStatusText.ERROR, message: "server error, "+ error });

    }
}

const addBranchSection =async (req, res) => {
  try {
      const {branch_id, section_id, manager_id} = req.body || {};

    //check if the branch exists or not
    const branchExistsQuery = `SELECT EXISTS(SELECT 1 FROM branches WHERE branch_id = $1);`;
    const branchExistsResult = await client.query(branchExistsQuery, [branch_id]);
    if (!branchExistsResult.rows[0].exists) {
      return res.status(409).json({status:httpStatusText.FAIL, message: `branch id ${branch_id} is not existed` });


    }
    // check if the section exists or not
    const sectionExistsQuery = `SELECT EXISTS(SELECT 1 FROM sections WHERE section_id = $1);`;
    const sectionExistsResult = await client.query(sectionExistsQuery, [section_id]);

    if (!sectionExistsResult.rows[0].exists) {
      return res.status(409).json({status:httpStatusText.FAIL, message: `Section id ${section_id} is not existed` });


    }
    // Check section association with branch (modify as needed)
    const checkAssociationQuery = `SELECT EXISTS(SELECT 1 FROM branch_sections bs WHERE bs.branch_id = $1 AND bs.section_id = $2);`;
    const checkAssociationValues = [branch_id, section_id];
    const { rows: associationResults } = await client.query(checkAssociationQuery, checkAssociationValues);

    if (associationResults[0].exists) {
      return res.status(409).json({status:httpStatusText.FAIL, message: 'Section already exists for this branch' });


    }
    // Check manager ID existence
    if (manager_id) {
        const managerCheckQuery = "SELECT EXISTS(SELECT 1 FROM employees WHERE employee_id = $1)";
        const managerCheckValues = [manager_id];
        const managerCheckResult = await client.query(managerCheckQuery, managerCheckValues);
  
        if (!managerCheckResult.rows[0].exists) {
          return res.status(409).json({status:httpStatusText.FAIL, message: `Manager with ID ${manager_id} does not exist`, data: values });

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

    return res.status(200).json({status:httpStatusText.SUCCESS, message: "Branch Section added successfully", data: values });

  } catch (error) {
    console.error('Error adding branch section:', error);
    return res.status(500).json({status:httpStatusText.ERROR, message: 'Internal server error, ' + error });

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

        res.status(201).json({ message: "Menu Item Added Successfully", data: values });
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
    branchPriceChangesList,
    getActiveEmployees,
    getEmployeesAttendance,
    getItemPriceChanges,
    getEmployeesSchedule,
    getMenu,
    getMenuByTime,
    getSections,
    getTables,
};
