const { client } = require("../config/dbConfig");

const activeEmployeesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_active_employee`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).send('Error: Internal server error');
      }
 }

 const inactiveEmployeesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_inactive_employee`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).send('Error: Internal server error');
      }
 }
 const positionsList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_positions`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).send('Error: Internal server error');
      }
 }
 const positionsChangesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_positions_changes`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).send('Error: Internal server error');
      }
 }

 const supplyEmployeesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_supply_employees`;
        const result = await client.query(query);
    
        res.status(200).json(result.rows); // Send data as JSON
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).send('Error: Internal server error');
      }
 }

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
    const fn = 'fn_change_salary'
    const { employeeId, changerId, newSalary, changeReason } = req.body;
    const query = `SELECT ${fn}($1, $2, $3, $4)`;
    const values = [employeeId, changerId, newSalary, changeReason];
    const result = await client.query(query, values);

    res.status(200).json({message: Object.values(result.rows[0])[0], data: { employeeId, changerId, newSalary, changeReason },
    });
};

const addEmployeeAccount = async(req, res) => {
    const { id, email, password } = req.body;   

    if (!email || !password) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    // Check if email already exists
    try {
        const user = await client.query(
            "SELECT * FROM employees_accounts WHERE employee_email = $1",
            [email]
        );
        if (user.rows.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    try {
        await client.query("SELECT fn_insert_employee_account($1, $2, $3)", [
            id,
            email,
            hashedPassword,
        ]);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};



module.exports = {
    addPosition,
    changePosition,
    changeSalary,
    activeEmployeesList,
    inactiveEmployeesList,
    positionsList,
    positionsChangesList,
    supplyEmployeesList
}