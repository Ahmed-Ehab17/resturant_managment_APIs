const { client } = require("../config/dbConfig");


const newTable = async (req, res) => {
  try {
    const { branchId, capacity, status } = req.body || {};

    // Validate required fields
    if (!branchId || !capacity) {
      throw new Error('Missing required fields, please enter both branch ID and capacity');
    }

    // Check if branch exists
    const branchExistsQuery = `SELECT EXISTS(SELECT 1 FROM branches WHERE branch_id = $1);`;
    const branchExistsResult = await client.query(branchExistsQuery, [branchId]);
    if (!branchExistsResult.rows[0].exists) {
      return res.status(409).send({ message: `there is no branch with id ${branchId} ` });
    }

    // Add table using prepared statement
    const addTableQuery = `SELECT fn_add_table($1, $2, $3)`;
    const values = [branchId, capacity, status];
    await client.query(addTableQuery, values);

    res.status(201).send('Table added successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error: ' + error.message);
  } 
};




  module.exports = {
    newTable
}
