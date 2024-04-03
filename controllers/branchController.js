const { query } = require("express");
const { client } = require("../config/dbConfig");

const addNew = async (req, res) => {
    try {
        console.log(req.body);
        const { branchName, branchAddress, brachLocation, coverage, branchPhone } = req.body || {}; // Destructuring
        if (!branchName || !branchAddress || !brachLocation || !coverage || !branchPhone) {
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
        const values = [branchName, branchAddress, brachLocation, coverage, branchPhone];

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

const addStorage = async (req, res) => {
    try {
        const schema = Joi.object({
            storageId: Joi.number().integer().positive().required(),
            storageName: Joi.string().required(),
            managerId: Joi.number().integer().positive().max(35),
            storageAddress: Joi.string().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(404).send(error.detailes[0].message);
            return;
        }

        const { storageId, storageName, managerId, storageAddress } = req.body;
        const query = `CALL pr_add_storage($1,$2,$3,$4)`;
        const values = [storageId, storageName, managerId, storageAddress];
        await client.query(query, values);

        res.status(201).json({
            message: "Storage created successfully",
            data: { storageId, storageName, managerId, storageAddress },
        });
    } catch (error) {
        res.status(500).send("message:" + error.message);
    }
};

const addMenuItem = async (req, res) => {
    try {
        const schema = Joi.object({
            itemId: Joi.number().integer().positive(),
            itemName: Joi.string().max(35).required(),
            categoryID: Joi.number().integer().positive().required(),
            itemDesc: Joi.string().max(254).required(),
            prepTime: Joi.number(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(404).send(error.details[0].message);
            return;
        }

        const { itemId, itemName, categoryID, itemDesc, prepTime } = req.body;
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

        res.status(201).json({
            message: "Ingredient added successfully",
            data: { name, recipeUnit, shipmentUnit },
        });
    } catch (error) {
        res.status(500).send("message:" + error.message);
    }
};

const changeSalary = async (req, res) => {
    const { employeeId, changerId, newSalary, changeReason } = req.body;
    const query = `CALL pr_change_salary($1, $2, $3, $4)`;
    const values = [employeeId, changerId, newSalary, changeReason];
    await client.query(query, values);
    res.json({
        message: "Salary updated successfully",
        data: { employeeId, changerId, newSalary, changeReason },
    });
};








module.exports = {
    addNew,
    branchList,
    addStorage,
    addMenuItem,
    addIngredient,
    changeSalary,
};
