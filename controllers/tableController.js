const { client } = require("../config/dbConfig");


async function addTable(branchId, capacity , status) {
    try {
      const query = `SELECT fn_add_table($1, $2 , $3)`;
      const values = [branchId, capacity , status];
  
      await client.query(query, values);
  
      return 'Table added successfully!'; 
    } catch (error) {
      console.error('Error adding table:', error);
      throw error; 
    }
  }
  
  const newTable = async (req, res) => {
    try {
      const { branchId, capacity , status } = req.body || {}; 
      console.log(req.body);
      if (!branchId || !capacity) {
        throw new Error('Missing required fields, please enter both branch ID and capacity');
      }
      const branchExistsQuery = `SELECT EXISTS(SELECT 1 FROM branches WHERE branch_id = $1);`;
      const branchExistsResult = await client.query(branchExistsQuery, [branchId]);
      if (!branchExistsResult.rows[0].exists) {
        return res.status(409).send({ message: `there is no branch with id ${branchId} ` });
    }
  
      const message = await addTable(branchId, capacity , status);
      res.status(201).send(message); 
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error: ' + error.message); 
    }
  }



  module.exports = {
    newTable
}
