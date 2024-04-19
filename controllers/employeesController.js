const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const managerEmployeesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_manager_employees`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message: `server error, `, error});

      }
}

const activeEmployeesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_active_employee`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});

      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR,message:'server error, ', error});
     }
 }

 const inactiveEmployeesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_inactive_employee`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});

      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
    }
 }
 const positionsList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_positions`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
          }
 }
 const positionsChangesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_positions_changes`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
        }
 }

 const supplyEmployeesList= async(req,res)=> {
    try {
        const query = `SELECT * FROM vw_supply_employees`;
        const result = await client.query(query);
    
        res.status(200).json({status:httpStatusText.SUCCESS, data:result.rows});
      } catch (error) {
        res.status(500).json({status:httpStatusText.ERROR, message:'server error', error});
      }
 }



 const searchEmployeesAttendance = async(req,res)=>{
    try{
    const {employeeId, dateFrom, dateTo} = req.body || {};
        
        let query = `SELECT * FROM fn_get_employee_attendance($1, $2, $3)`;
        let values = [employeeId , dateFrom , dateTo]; 
    
        // Adjust the query and values based on provided dates
        if (!dateFrom && !dateTo) {
          query = `SELECT * FROM fn_get_employee_attendance($1)`;
          values = [employeeId];
        } else if (!dateFrom) {
          query = `SELECT * FROM fn_get_employee_attendance($1, $2)`;
          values = [employeeId, dateTo];
        } else if (!dateTo) {
            query = `SELECT * FROM fn_get_employee_attendance($1, $2)`;
            values = [employeeId, dateFrom];
        }

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({status:httpStatusText.ERROR, message: 'Employee not found'});
    } else {
      res.status(201).json({status:httpStatusText.SUCCESS, message: `Employees attendance:`, data:result.rows});
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({status:httpStatusText.ERROR, message: 'Error retrieving employee attendance, ' + err});
  }
};

const searchEmployeesPhones = async(req,res)=>{
    try{
    const {phoneID, phone} = req.body || {};
        
    let query = `SELECT * FROM fn_get_employee_phones($1, $2)`;
    let values = [phoneID , phone]; 
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({status:httpStatusText.FAIL, message: 'Employee phone not found'});
    } else {
      res.status(201).json({status:httpStatusText.SUCCESS, message: `Employee phone:`, data:result.rows});
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({status:httpStatusText.ERROR, message: 'Error retrieving employee attendance, ' + err});
  }
};

const addPosition = async(req,res)=>{
    try{
        const {position_name , jop_description} = req.body || {};
        
        const positionCheckQuery = 'SELECT EXISTS(SELECT 1 FROM positions WHERE position_name = $1)';
        const positionCheckValues = [position_name];

        const positionCheckResult = await client.query(positionCheckQuery, positionCheckValues);

        if (positionCheckResult.rows[0].exists) {
            return res.status(409).json({ message: `can not add ${position_name} position because it's already exists` });
    }
        const query = `SELECT fn_add_position($1, $2)`;
        const values = [position_name, jop_description];
        await client.query(query, values);
        res.status(201).json({status:httpStatusText.SUCCESS, message: 'position added successfully', data: values });

    } catch (error) {
     console.error('Error adding position:', error);
     return res.status(500).json({status:httpStatusText.ERROR, message: "Server Error, " + error });

   }
    
}

const changePosition = async(req,res)=>{
    try{
        const { employee_id, position_changer_id, new_position, position_change_type } = req.body || {};
        if (!employee_id || !position_changer_id || !new_position || !position_change_type ) {
            return res.status(400).json({ message: 'Error: Missing required fields, please enter all the data' });
        }

        const query = `SELECT fn_change_employee_position($1, $2, $3, $4)`;
        const values = [employee_id, position_changer_id, new_position, position_change_type];
        await client.query(query, values);
        res.status(201).json({ message: 'position changed successfully' });

        // Check if employee exists
    const employeeExistsQuery = 'SELECT 1 FROM employees WHERE employee_id = $1';
    const employeeExistsValues = [employee_id];
    const employeeExistsResult = await client.query(employeeExistsQuery, employeeExistsValues);
    if (employeeExistsResult.rows.length === 0) {
      client.release();
      return res.status(404).json({ error: 'Employee not found' });
    }
    }catch (error){
        console.error('Error changing position:', error);
        return res.status(500).json({ message: "Server Error" });    }
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
    supplyEmployeesList,
    managerEmployeesList,
    searchEmployeesAttendance,
    searchEmployeesPhones,
}