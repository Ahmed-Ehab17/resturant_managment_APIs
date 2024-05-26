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



 const getEmployeesAttendance = async (req, res) => {  
  const employeeId  = req.params.employeeId
  const {fromDate, toDate} = req.query
    try{
      const query = `SELECT * FROM fn_get_employee_attendance($1, $2, $3)`;
      const values = [employeeId, fromDate, toDate]
      const result = await client.query(query, values)
      res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
      }catch(err) {
      res.status(500).json({status: httpStatusText.ERROR, message: err.message});
      }
    }

 const getEmployeesPhones = async (req, res) => {  
  const employeeId  = req.params.employeeId
    try{
       const query = `SELECT * FROM fn_get_employee_phones($1)`;
       const values =  [employeeId];
       const result = await client.query(query, values)
       res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
       }catch(err) {
       res.status(500).json({status: httpStatusText.ERROR, message: err.message});
       }
      }

 const getPositionsChanges = async (req, res) => {  
  const employeeId  = req.params.employeeId
    try{
       const query = `SELECT * FROM fn_get_employee_positions_changes($1)`;
       const values =  [employeeId];
       const result = await client.query(query, values)
       res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
       }catch(err) {
       res.status(500).json({status: httpStatusText.ERROR, message: err.message});
       }
      }
const getSchedule = async (req, res) => {  
  const employeeId  = req.params.employeeId
  const {fromDate, toDate} = req.query
    try{
       const query = `SELECT * FROM fn_get_employee_schedule($1, $2, $3)`;
       const values =  [employeeId, fromDate, toDate];
       const result = await client.query(query, values)
       res.status(200).json({status: httpStatusText.SUCCESS, data: {attendance: result.rows}});
       }catch(err) {
       res.status(500).json({status: httpStatusText.ERROR, message: err.message});
       }
      }

const getItemPriceChanges = async (req, res) => {
  const branchId = req.params.branchId
  try {
    const query = `SELECT * FROM fn_get_item_price_changes(${branchId})`
    const result = await client.query(query)
    res.status(200).json({ status: httpStatusText.SUCCESS, data: {items: result.rows} })
  }catch(err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message })
  }
}

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

const addEmployee = async (req, res) => {
  const {
    ssn,
    firstName,
    lastName,
    gender,
    salary,
    positionId,
    status,
    branchId,
    sectionId,
    birthDate,
    address,
    dateHired
  } = req.body;

  try {
    const query = `SELECT fn_add_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
    const values = [ssn, firstName, lastName, gender, salary, positionId, status, branchId, sectionId, birthDate, address, dateHired]
    const result = await client.query(query, values);

    res.status(201).json({status:httpStatusText.SUCCESS, message: result.rows[0].fn_add_employee, data:values });
  } catch (error) {
    console.log(error);
    res.status(500).json({status:httpStatusText.ERROR, message: "Server Error" });
  }
};

const addEmployeePhone = async (req, res) => {
  const { employeeId, employeePhone } = req.body;

  try {
    const query = `SELECT fn_add_employee_phone($1, $2)`
    const values = [employeeId, employeePhone]
    const result = await client.query(query, values);

    res.status(201).json({status:httpStatusText.SUCCESS, message: result.rows[0].fn_add_employee_phone, data:values });
  } catch (error) {
    console.log(error);
    res.status(500).json({status:httpStatusText.ERROR, message: "Server Error" });
  }
};

const addEmployeeSchedule = async (req, res) => {
  const { employeeId, shiftStartTime, shiftEndTime } = req.body;

  try {
    const query = `SELECT fn_add_employee_schedule($1, $2, $3)`;
    const values = [employeeId, shiftStartTime, shiftEndTime];
    const result = await client.query(query, values);

    res.status(201).json({status: httpStatusText.SUCCESS, message: result.rows[0].fn_add_employee_schedule, data: values });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
  }
};

const addEmployeeVacation = async (req, res) => {
  const { employeeId, vacationStartDate, vacationEndDate, vacationReason } = req.body;

  try {
    const query = `SELECT fn_add_employee_vacation($1, $2, $3, $4)`;
    const values = [employeeId, vacationStartDate, vacationEndDate, vacationReason];
    const result = await client.query(query, values);

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      message: result.rows[0].fn_add_employee_vacation,
      data: values
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status:httpStatusText.ERROR, message: "Server Error" });
  }
};

const addTimeInAttendance = async (req, res) => {
  const {scheduleId, employeeId, timeIn} = req.body
  try{
    query = `SELECT fn_add_time_in_attendance($1, $2, $3)`
    values = [scheduleId, employeeId, timeIn]
    const result = await client.query(query, values)
    res.status(200).json({status: httpStatusText.SUCCESS, data: result})
    console.log(result);
  }catch(err){
    res.status(500).json({status: httpStatusText.ERROR, message: err.message});
  }
};

const addTimeOutAttendance = async(req, res) => {
  const {scheduleId, employeeId, timeOut} = req.body
  try{
    query = `SELECT fn_add_time_out_attendance($1, $2, $3)`
    values = [scheduleId, employeeId, timeOut]
    const result = await client.query(query, values)
    res.status(200).json({status: httpStatusText.SUCCESS, data: result})
    console.log(result);
  }catch(err){
    res.status(500).json({status: httpStatusText.ERROR, message: err.message});
  }
};



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

const updateEmployeeAddress = async(req,res)=>{
  try{
      const { employeeId, newAddress } = req.body || {};
      
      const query = `SELECT fn_update_employee_address($1, $2)`;
      const values = [employeeId, newAddress];
      const result = await client.query(query, values);
      res.status(200).json({status:httpStatusText.SUCCESS, message: Object.values(result.rows[0])[0], data:values})

  }catch (error){
      console.error('Error updating address:', error);
      console.log(error);
      return res.status(500).json({ status:httpStatusText.ERROR, message: "Server Error" });    
    }
}


const updateEmployeePhone = async(req,res)=>{
    try{
        const { employeeId, oldPhone, newPhone } = req.body;
        
        const query = `call pr_update_employee_phone($1, $2, $3)`;
        const values = [employeeId, oldPhone, newPhone];
        const result = await client.query(query, values);
        console.log(values);
        res.status(200).json({
          status: httpStatusText.SUCCESS,
          message: Object.values(result.rows?.[0])?.[0], 
          data: values,
        });
  
    }catch (error){
      console.log(error)
        res.status(500).json({status:httpStatusText.ERROR, message: 'server error', error})
  }
}


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
    getEmployeesAttendance,
    getEmployeesPhones,
    getPositionsChanges,
    getSchedule,
    getItemPriceChanges,
    updateEmployeeAddress,
    updateEmployeePhone,
    addEmployee,
    addEmployeePhone,
    addEmployeeSchedule,
    addEmployeeVacation,
    addTimeInAttendance,
    addTimeOutAttendance,
}