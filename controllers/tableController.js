const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const newTable = async (req, res) => {
  try {
    const { branchId, capacity, status } = req.body || {};

    // Check if branch exists
    const branchExistsQuery = `SELECT EXISTS(SELECT 1 FROM branches WHERE branch_id = $1);`;
    const branchExistsResult = await client.query(branchExistsQuery, [branchId]);
    if (!branchExistsResult.rows[0].exists) {
      return res.status(409).json({status:httpStatusText.FAIL, message: `there is no branch with id ${branchId} ` });

    }

    // Add table using prepared statement
    const addTableQuery = `SELECT fn_add_table($1, $2, $3)`;
    const values = [branchId, capacity, status];
    await client.query(addTableQuery, values);

    res.status(201).json({status:httpStatusText.SUCCESS, message: 'Table added successfully!' });


  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({status:httpStatusText.ERROR, message: 'server error, ' + error });


  } 
};




  module.exports = {
    newTable
}
