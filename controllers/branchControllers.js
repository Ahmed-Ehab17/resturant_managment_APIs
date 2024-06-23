const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const branchesList = async (req, res) => {
    try {
        const query = "SELECT * FROM vw_branches";
        const result = await client.query(query);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
    }
};

const ingredientSuppliersList = async (req, res) => {
    try {
        const query = `SELECT * FROM vw_ingredient_suppliers`;
        const result = await client.query(query);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
    }
};
const categoriesList = async (req, res) => {
    try {
        const query = `SELECT * FROM vw_categories`;
        const result = await client.query(query);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
    }
};
const recipesList = async (req, res) => {
    try {
        const query = `SELECT * FROM vw_recipes`;
        const result = await client.query(query);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
    }
};
const generalMenuList = async (req, res) => {
    try {
        const query = `SELECT * FROM vw_general_menu`;
        const result = await client.query(query);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
    }
};
const branchPriceChangesList = async (req, res) => {
    try {
        const query = `SELECT * FROM vw_branch_price_changes`;
        const result = await client.query(query);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
    }
};

const ingredientList = async (req,res)=>{
    try {
        const query = `SELECT * FROM ingredients`;
        const result = await client.query(query);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
    }

}
const getActiveEmployees = async (req, res) => {
    const branchId = req.params.branchId;
    try {
        const query = `SELECT * FROM fn_get_branch_active_employees(${branchId})`;
        const result = await client.query(query);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { employees: result.rows } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};
const getEmployeesAttendance = async (req, res) => {
    const branchId = req.params.branchId;
    const { fromDate, toDate } = req.query;
    try {
        const query = `SELECT * FROM fn_get_branch_employees_attendance($1, $2, $3)`;
        const values = [branchId, fromDate, toDate];
        const result = await client.query(query, values);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { attendance: result.rows } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};
const getEmployeesSchedule = async (req, res) => {
    const branchId = req.params.branchId;
    const { fromDate, toDate } = req.query;
    try {
        const query = `SELECT * FROM fn_get_branch_employees_schedule($1, $2, $3)`;
        const values = [branchId, fromDate, toDate];
        const result = await client.query(query, values);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { schedule: result.rows } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};
const getItemPriceChanges = async (req, res) => {
    const branchId = req.params.branchId;
    try {
        const query = `SELECT * FROM fn_get_branch_item_price_changes(${branchId})`;
        const result = await client.query(query);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { items: result.rows } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};
const getMenu = async (req, res) => {
    const branchId = req.params.branchId;
    try {
        const query = `SELECT * FROM fn_get_branch_menu(${branchId})`;
        const result = await client.query(query);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { menu: result.rows } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
        console.log(err);
    }
};
const getMenuByTime = async (req, res) => {
    const branchId = req.params.branchId;
    const dayTime = req.query.dayTime;
    try {
        const query = `SELECT * FROM fn_get_branch_menu_by_time($1, $2)`;
        const values = [branchId, dayTime];
        const result = await client.query(query, values);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { menu: result.rows } });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};
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

const getTables = async(req, res) => {
  const branchId = req.params.branchId;
  const stat = req.params.stat;
  try {
    const query = `SELECT * FROM fn_get_branch_tables($1, $2)`; 
    const values = [branchId, stat];
    const result = await client.query(query, values);

    res.status(200).json({ status:httpStatusText.SUCCESS, data: { tables: result.rows } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: httpStatusText.ERROR, err });
  } 
}


const getStock = async (req, res) => {  
  const branchId  = req.params.branchId
    try{
       const query = `SELECT * FROM fn_get_stock_branch($1)`;
       const values =  [branchId];
       const result = await client.query(query, values)
       res.status(200).json({status: httpStatusText.SUCCESS, data: {stock: result.rows}});
       }catch(err) {
       res.status(500).json({status: httpStatusText.ERROR, message: err.message});
       }
}   

const getBookings = async (req, res) => {
  const branchId = req.params.branchId;

  try {
    const query = `SELECT * FROM fn_get_branch_bookings($1)`;
    const values = [branchId];
    const result = await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { bookings: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getBookingsByStatus = async (req, res) => {
  const branchId = req.params.branchId;
  const bookingStatus = req.params.bookingStatus;

  try {
    const query = `SELECT * FROM fn_get_bookings_by_status($1, $2)`;
    const values = [branchId, bookingStatus];
    const result = await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { bookings: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getBranchMenu = async (req, res) => {
    const branchId = req.params.branchId
    try{
      const query = `SELECT fn_get_branch_menu($1)`;
      const values = [ branchId ];
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };
const getBranchLocation = async (req, res) => {
    const branchId = req.params.branchId
    try{
      const query = `SELECT get_branch_location_coordinates($1)`;
      const values = [ branchId ];
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };
const getSectionOverView = async (req, res) => {
    const { sectionId, daysInput } = req.params;
  
    try {
        let query = `SELECT * FROM get_section_overview(`;
        let values = [];
        let valueCounter = 1; 
  
        if (sectionId) {
            query += `$${valueCounter++}`;
            values.push(sectionId);
        } else {
            query += `NULL`;
        }
  
        query += `, `;
  
        if (daysInput) {
            query += `$${valueCounter++}`;
            values.push(daysInput);
        } else {
            query += `NULL`;
        }
  
        query += `)`;
  
  
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };
const getOverAllPerformance = async (req, res) => {
    const {daysInput} = req.params;
  
    try {
        let query = `SELECT * FROM get_section_overview(`;
        let values = [];
        let valueCounter = 1; 
  
        if (daysInput) {
            query += `$${valueCounter++}`;
            values.push(daysInput);
        } else {
            query += `NULL`;
        }
        query += `)`;
  
  
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };
const getBranchPerformance = async (req, res) => {
    const {branchId, daysInput} = req.params;
  
    try {
        let query = `SELECT * FROM get_branch_performance(`;
        let values = [branchId];
        let valueCounter = 2; 
  
        if (daysInput) {
            query += `$${valueCounter++}`;
            values.push(daysInput);
        } else {
            query += `NULL`;
        }
        query += `)`;
  
  
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };
const getBranchesCompare = async (req, res) => {
    const {daysInput } = req.params;
  
    try {
        let query = `SELECT * FROM compare_branches(`;
        let values = [];
        let valueCounter = 1; 
  
        if (daysInput) {
            query += `$${valueCounter++}`;
            values.push(daysInput);
        } else {
            query += `NULL`;
        }
  
        query += `)`;
  
  
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };

const getBranches = async (req, res) => {
    const {branchId} = req.params;
  
    try {
        let query = `SELECT * FROM fn_get_branches(`;
        let values = [];
        let valueCounter = 1; 
  
        if (branchId) {
            query += `$${valueCounter++}`;
            values.push(branchId);
        } else {
            query += `NULL`;
        }
        query += `)`;
  
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };

const getSales = async (req, res) => {
    const { branchId, itemId, startDate, endDate } = req.params;
  
    try {
        let query = `SELECT * FROM fn_get_sales(`;
        let values = [];
        let valueCounter = 1; 
  
        if (branchId) {
            query += `$${valueCounter++}`;
            values.push(branchId);
        } else {
            query += `NULL`;
        }
  
        query += `, `;
  
        if (itemId) {
            query += `$${valueCounter++}`;
            values.push(itemId);
        } else {
            query += `NULL`;
        }
        query += `, `;
  
        if (startDate) {
            query += `$${valueCounter++}`;
            values.push(startDate);
        } else {
            query += `NULL`;
        }
        query += `, `;
  
        if (endDate) {
            query += `$${valueCounter++}`;
            values.push(endDate);
        } else {
            query += `NULL`;
        }
  
        query += `)`;
  
  
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
    }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message:err.message});
    }
  };

const updateStock = async (req, res) => {
    try {
        const { branchId, ingredientId, quantity } = req.body || {};

        const query = `SELECT fn_update_stock($1, $2, $3)`;
        const values = [branchId, ingredientId, quantity];
        const result = await client.query(query, values);
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: values
        });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    const {bookingId,bookingStatus} = req.body;
  
    try {
      const query = `call pr_update_booking_status($1, $2)`;
      const values = [bookingId,bookingStatus];
      await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
  };

const changeSectionManager = async (req, res) => {
    const {branchId,sectionId,newManagerId,positionChanger} = req.body;
  
    try {
      const query = `call pr_change_section_manager($1, $2, $3, $4)`;
      const values = [branchId,sectionId,newManagerId,positionChanger];
      await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
  };
const changeBranchManager = async (req, res) => {
    const {branchId,newManagerId,positionChanger} = req.body;
  
    try {
      const query = `call pr_change_branch_manager($1, $2, $3)`;
      const values = [branchId, newManagerId, positionChanger];
      await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
  };


const addNew = async (req, res) => {
    try {
        console.log(req.body);
        const { branchName, branchAddress, branchLocation, coverage, branchPhone, manager_id } =
            req.body || {};

        const phoneCheckQuery = "SELECT branch_name FROM branches WHERE branch_phone = $1";
        const phoneCheckValues = [branchPhone];
        const phoneCheckResult = await client.query(phoneCheckQuery, phoneCheckValues);

        if (phoneCheckResult.rows.length > 0) {
            const existingBranchName = phoneCheckResult.rows[0].branch_name;
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: `can not use this number for ${branchName} branch because it is already used by branch: ${existingBranchName}`
            });
        }
        // Check manager ID existence
        if (manager_id) {
            const managerCheckQuery =
                "SELECT EXISTS(SELECT 1 FROM employees WHERE employee_id = $1)";
            const managerCheckValues = [manager_id];
            const managerCheckResult = await client.query(managerCheckQuery, managerCheckValues);

            if (!managerCheckResult.rows[0].exists) {
                return res.status(409).json({
                    status: httpStatusText.FAIL,
                    message: `Manager with ID ${manager_id} does not exist`
                });
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
        res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: Object.values(result.rows[0])[0]
        });
    } catch (error) {
        console.error("Error inserting data:", error);
        return res
            .status(500)
            .json({ status: httpStatusText.ERROR, message: "server error, " + error });
    }
};
const addGeneralSection = async (req, res) => {
    try {
        const { section_name, section_description } = req.body || {};

        // Check for section name before adding
        const checkQuery = `SELECT EXISTS(SELECT 1 FROM sections WHERE section_name = $1)`;
        const checkValues = [section_name];
        const { rows: checkResults } = await client.query(checkQuery, checkValues);
        if (checkResults[0].exists) {
            return res
                .status(409)
                .json({ status: httpStatusText.FAIL, message: "Section name already exists " });
        }

        const query = `SELECT fn_add_general_section($1, $2)`;
        const values = [section_name, section_description];
        await client.query(query, values);

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Section added successfully",
            data: values
        });
    } catch (error) {
        console.error("Error adding general section:", error);
        res.status(409).json({ status: httpStatusText.ERROR, message: "server error, " + error });
    }
};

const addBranchSection = async (req, res) => {
    try {
        const { branch_id, section_id, manager_id } = req.body || {};

        //check if the branch exists or not
        const branchExistsQuery = `SELECT EXISTS(SELECT 1 FROM branches WHERE branch_id = $1);`;
        const branchExistsResult = await client.query(branchExistsQuery, [branch_id]);
        if (!branchExistsResult.rows[0].exists) {
            return res.status(409).json({
                status: httpStatusText.FAIL,
                message: `branch id ${branch_id} is not existed`
            });
        }
        // check if the section exists or not
        const sectionExistsQuery = `SELECT EXISTS(SELECT 1 FROM sections WHERE section_id = $1);`;
        const sectionExistsResult = await client.query(sectionExistsQuery, [section_id]);

        if (!sectionExistsResult.rows[0].exists) {
            return res.status(409).json({
                status: httpStatusText.FAIL,
                message: `Section id ${section_id} is not existed`
            });
        }
        // Check section association with branch (modify as needed)
        const checkAssociationQuery = `SELECT EXISTS(SELECT 1 FROM branch_sections bs WHERE bs.branch_id = $1 AND bs.section_id = $2);`;
        const checkAssociationValues = [branch_id, section_id];
        const { rows: associationResults } = await client.query(
            checkAssociationQuery,
            checkAssociationValues
        );

        if (associationResults[0].exists) {
            return res.status(409).json({
                status: httpStatusText.FAIL,
                message: "Section already exists for this branch"
            });
        }
        // Check manager ID existence
        if (manager_id) {
            const managerCheckQuery =
                "SELECT EXISTS(SELECT 1 FROM employees WHERE employee_id = $1)";
            const managerCheckValues = [manager_id];
            const managerCheckResult = await client.query(managerCheckQuery, managerCheckValues);

            if (!managerCheckResult.rows[0].exists) {
                return res.status(409).json({
                    status: httpStatusText.FAIL,
                    message: `Manager with ID ${manager_id} does not exist`,
                    data: values
                });
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

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Branch Section added successfully",
            data: values
        });
    } catch (error) {
        console.error("Error adding branch section:", error);
        return res
            .status(500)
            .json({ status: httpStatusText.ERROR, message: "Internal server error, " + error });
    }
};

const addStorage = async (req, res) => {
    try {
        const { storageName, managerId, storageAddress } = req.body;
        const query = `CALL pr_add_storage($1,$2,$3)`;
        const values = [storageName, storageAddress, managerId];
        await client.query(query, values);

        res.status(201).json({
            message: "Storage created successfully",
            data: { storageName, storageAddress, managerId }
        });
    } catch (error) {
        res.status(500).send("message:" + error.message);
    }
};

const addMenuItem = async (req, res) => {
    try {
        const { itemName, itemDesc, categoryID, prepTime, picPath, vegetarian, healthy } = req.body;
        const query = `CALL pr_add_menu_item($1, $2, $3, $4, $5, $6, $7)`;
        const values = [itemName, itemDesc, categoryID, prepTime, picPath, vegetarian, healthy];
        await client.query(query, values);

        res.status(201).json({status: httpStatusText.SUCCESS, data: values });
    } catch (error) {
        res.status(500).send({status:httpStatusText.ERROR, message: error.message});
    }
};

const addIngredient = async (req, res) => {
    try {
        const { name, recipeUnit, shipmentUnit } = req.body;

        const ingredientExistsQuery = `SELECT EXISTS(SELECT 1 FROM ingredients WHERE ingredients_name = $1);`;
        const ingredientExistsResult = await client.query(ingredientExistsQuery, [name]);

        if (ingredientExistsResult.rows[0].exists) {
            return res
                .status(409)
                .json({ status: httpStatusText.FAIL, message: "ingredient is already exist" });
        }

        const query = `CALL pr_add_ingredient($1, $2, $3)`;
        const values = [name, recipeUnit, shipmentUnit];
        await client.query(query, values);

        res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: { name, recipeUnit, shipmentUnit }
        });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: "Internal Server Error" });
    }
};

const addIngredientToStock = async (req, res) => {
    const { branchId, ingredientId, ingredientQuantity } = req.body;
    try {
        query = `CALL pr_add_ingredient_to_branch_stock($1, $2, $3)`;
        values = [branchId, ingredientId, ingredientQuantity];
        await client.query(query, values);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

const addItemBranchMenu = async (req, res) => {
  const { branchId, itemId, itemPrice, itemStatus } = req.body;

  try {
    const itemDiscount = req.body.itemDiscount || 0; 
  
    const query = `CALL pr_add_item_branch_menu($1, $2, $3, $4, $5)`;
    const values = [branchId, itemId, itemPrice, itemStatus, itemDiscount];
  
    await client.query(query, values);
  
    res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};


const addBooking = async (req, res) => {
    const {customerId, tableId, branchId, bookingStarTtime, bookingEndTime, bookingStatus} = req.body;
  
    try {
      const query = `call pr_add_booking($1, $2, $3, $4, $5, $6)`;
      const values = [customerId, tableId, branchId, bookingStarTtime, bookingEndTime, bookingStatus];
      await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
  };
  
const addOrderToBooking = async (req, res) => {
    const {bookingId,orderId} = req.body;
  
    try {
      const query = `call pr_add_order_to_booking($1, $2)`;
      const values = [bookingId,orderId];
      await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
  };



module.exports = {
    addNew,
    addStorage,
    addMenuItem,
    addIngredient,
    addGeneralSection,
    addBranchSection,
    addBranchSection,
    addIngredientToStock,
    addItemBranchMenu,
    addBooking,
    addOrderToBooking,

    branchesList,
    ingredientSuppliersList,
    categoriesList,
    recipesList,
    generalMenuList,
    branchPriceChangesList,
    ingredientList,

    getActiveEmployees,
    getEmployeesAttendance,
    getItemPriceChanges,
    getEmployeesSchedule,
    getMenu,
    getMenuByTime,
    getSections,
    getTables,
    getStock,
    getBookings,
    getBookingsByStatus,
    getBranchMenu,
    getBranchLocation,
    getSectionOverView,
    getOverAllPerformance,
    getBranchPerformance,
    getBranchesCompare,
    getBranches,
    getSales,

    updateStock,
    updateBookingStatus,

    changeSectionManager,
    changeBranchManager,
    
};
