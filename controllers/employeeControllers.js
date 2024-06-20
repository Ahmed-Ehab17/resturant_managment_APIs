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
       res.status(200).json({status: httpStatusText.SUCCESS, data: {phones: result.rows}});
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

  const getEmployeeSignInInfo = async (req, res) => {
    const employeeEmail = req.params.employeeEmail;
      
      try {
          const query = `SELECT * FROM fn_get_employee_sign_in_info($1)`;
          const values = [employeeEmail];
          const result = await client.query(query, values);
          res.status(200).json({ status: httpStatusText.SUCCESS, data: { employee: result.rows } });
        }catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
      }
};

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
        const {position_name, employeeRole, jop_description} = req.body || {};
        
        const positionCheckQuery = 'SELECT EXISTS(SELECT 1 FROM positions WHERE position_name = $1)';
        const positionCheckValues = [position_name];

        const positionCheckResult = await client.query(positionCheckQuery, positionCheckValues);

        if (positionCheckResult.rows[0].exists) {
            return res.status(409).json({ message: `can not add ${position_name} position because it's already exists` });
    }
        const query = `call pr_add_position($1, $2, $3)`;
        const values = [position_name, employeeRole, jop_description];
        await client.query(query, values);
        res.status(201).json({status:httpStatusText.SUCCESS, data: values });

    } catch (error) {
     console.error('Error adding position:', error);
     return res.status(500).json({status:httpStatusText.ERROR, message: "Server Error, " + error });

   }
    
}



const addTimeInAttendance = async (req, res) => {
  const {employeeId} = req.body
  try{
    query = `call check_in_employee($1)`
    values = [employeeId]
    const result = await client.query(query, values)
    res.status(200).json({status: httpStatusText.SUCCESS, data: result})
    console.log(result);
  }catch(err){
    res.status(500).json({status: httpStatusText.ERROR, message: err.message});
  }
};

const addTimeOutAttendance = async(req, res) => {
  const {employeeId} = req.body
  try{
    query = `call check_out_employee($1)`
    values = [employeeId]
    const result = await client.query(query, values)
    res.status(200).json({status: httpStatusText.SUCCESS, data: result})
    console.log(result);
  }catch(err){
    res.status(500).json({status: httpStatusText.ERROR, message: err.message});
  }
};

const employeeTransfer = async(req, res) => {
  const {employeeId, branchId, transferMadeBy, transferDate, transferReason} = req.body
  try{
    query = `call pr_employee_transfer($1, $2, $3, $4, $5)`
    values = [employeeId, branchId, transferMadeBy, transferDate, transferReason]
    const result = await client.query(query, values)
    res.status(200).json({status: httpStatusText.SUCCESS, data: result})
  }catch(err){
    res.status(500).json({status: httpStatusText.ERROR, message: err.message});
  }
};
const employeeStatusChange = async(req, res) => {
  const {employeeId, employeeStatus} = req.body
  try{
    query = `select fn_employee_status_change($1, $2)`
    values = [employeeId, employeeStatus]
    const result = await client.query(query, values)
    res.status(200).json({status: httpStatusText.SUCCESS, data: result})
  }catch(err){
    res.status(500).json({status: httpStatusText.ERROR, message: err.message});
  }
};


const changePosition = async(req,res)=>{
     try{
        const { employee_id, position_changer_id, new_position, position_change_type } = req.body;
        const query = `call pr_change_employee_position($1, $2, $3, $4)`;
        const values = [employee_id, position_changer_id, new_position, position_change_type];
        await client.query(query, values);
        res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
}

const changeSalary = async (req, res) => {
    const { employeeId, changerId, newSalary, changeReason } = req.body;
    try{
    const query = `SELECT fn_change_salary($1, $2, $3, $4)`;
    const values = [employeeId, changerId, newSalary, changeReason];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const updateEmployeeSalaryPosition = async (req, res) => {
  const { employeeId, changerId, newSalary, newPosition, positionChangeType, changeReason } = req.body;
  try{
  const query = `SELECT fn_update_employee_salary_position($1, $2, $3, $4, $5, $6)`;
  const values = [employeeId, changerId, newSalary, newPosition, positionChangeType, changeReason];
  const result = await client.query(query, values);

  res.status(201).json({ status: httpStatusText.SUCCESS, data: values});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status:httpStatusText.ERROR, message: "Server Error" });
  }

};



const updateEmployeeAddress = async(req,res)=>{
  try{
      const { employeeId, newAddress } = req.body || {};
      
      const query = `SELECT fn_update_employee_address($1, $2)`;
      const values = [employeeId, newAddress];
      const result = await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
}


const updateEmployeePhone = async(req,res)=>{
    try{
        const { employeeId, oldPhone, newPhone } = req.body;
        
        const query = `call pr_update_employee_phone($1, $2, $3)`;
        const values = [employeeId, oldPhone, newPhone];
        await client.query(query, values);
        
        res.status(200).json({
          status: httpStatusText.SUCCESS,
          data: values,
        });
  
    }catch (error){
      console.log(error)
        res.status(500).json({status:httpStatusText.ERROR, message: error.message})
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

const addEmployee = async (req, res) => {
  const {
    ssn,
    firstName,
    lastName,
    gender,
    salary,
    positionId,
    status,
    branchId = null,
    sectionId = null,
    birthDate,
    address,
    dateHired = null
  } = req.body;

  try {
    query = `SELECT fn_add_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    values = [ssn, firstName, lastName, gender, salary, positionId, status, branchId, sectionId, birthDate, address, dateHired]
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
    console.log(error);
    res.status(500).json({ status:httpStatusText.ERROR, message: "Server Error" });
  }
};

const addIngredientSupplier = async (req, res) => {
  const { supplierId, ingredientId } = req.body;

  try {
    const query = `call pr_add_ingredient_supplier($1, $2)`;
    const values = [supplierId, ingredientId];
    const result = await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values});
  } catch (error) {
    console.log(error);
    res.status(500).json({ status:httpStatusText.ERROR, message: "Server Error" });
  }
};




module.exports = {
    addPosition,
    addEmployee,
    addEmployeePhone,
    addEmployeeSchedule,
    addEmployeeVacation,
    addIngredientSupplier,
    addTimeInAttendance,
    addTimeOutAttendance,
    employeeTransfer,
    employeeStatusChange,
  
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
    getEmployeeSignInInfo,
  
    updateEmployeeAddress,
    updateEmployeePhone,
    updateEmployeeSalaryPosition,
}