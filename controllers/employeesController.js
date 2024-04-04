const { client } = require("../config/dbConfig");



const addPosition = async(req,res)=>{
    try{
        const {position_name , jop_description} = req.body || {};
        const positionCheckQuery = 'SELECT EXISTS(SELECT 1 FROM positions WHERE position_name = $1)';
        const positionCheckValues = [position_name];

        const positionCheckResult = await client.query(positionCheckQuery, positionCheckValues);

        if (positionCheckResult.rows[0].exists) {
            res.status(409).send(`can not add ${position_name} position because it's already exists`);
            return; 
    }
        const query = `SELECT fn_add_position($1, $2)`;
        const values = [position_name, jop_description];
        await client.query(query, values);
        res.status(201).send({ message: 'position added successfully' });
    } catch (error) {
     console.error('Error adding position:', error);
     res.status(500).send('Error: Internal server error');
   }
    
}

const changePosition = async(req,res)=>{
    try{
        const { employee_id, position_changer_id, new_position, position_change_type } = req.body || {};
        const query = `SELECT fn_change_employee_position($1, $2, $3, $4)`;
        const values = [employee_id, position_changer_id, new_position, position_change_type];
        await client.query(query, values);
        res.status(201).send({ message: 'position changed successfully' });
        // Check if employee exists
    const employeeExistsQuery = 'SELECT 1 FROM employees WHERE employee_id = $1';
    const employeeExistsValues = [employee_id];
    const employeeExistsResult = await client.query(employeeExistsQuery, employeeExistsValues);
    if (employeeExistsResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ error: 'Employee not found' });
    }
    }catch{
        console.error('Error changing position:', error);
     res.status(500).send('Error: Internal server error');
    }
}
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
    addPosition,
    changePosition,
    changeSalary
}