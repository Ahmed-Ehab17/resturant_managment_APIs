const createToken = require("../utils/createToken");
const bcrypt = require("bcrypt");
const httpStatusText = require("../utils/httpStatusText"); 
const { client } = require("../config/dbConfig");

const allowedTo = (...roles) =>
    async (req, res, next) => {
        console.log(req.user);
      // 1) access roles
      // 2) access registered user (req.user.role)
      if (!roles.includes(req.user.employee_position)) {
        return next(
            res.status(403).json({status: httpStatusText.FAIL, message: "NOT ALLOWED!" })
        );
      }
      next();
    };

const register = async (req, res) => {
    const { ssn, firstName, lastName, gender, salary, positionId, status, branchId, sectionId, birthDate, address, dateHired} = req.body;

    if (!dateHired){
        query = `SELECT fn_add_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
        values = [ssn, firstName, lastName, gender, salary, positionId, status, branchId, sectionId, birthDate, address]
    }else{
        query = `SELECT fn_add_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
        values = [ssn, firstName, lastName, gender, salary, positionId, status, branchId, sectionId, birthDate, address, dateHired]
    }
    try{
        const result = await client.query(query, values)
        res.status(201).json({status: httpStatusText.SUCCESS, message: Object.values(result.rows[0])[0]})
    }catch (err) {
        return res.status(500).json({status: httpStatusText.ERROR, message: err.message });
    }
};
const employeeAccount = async (req, res) => {
    const { id, email, password } = req.body;

    console.log(id, email, password);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    query = `CALL pr_insert_employee_account($1, $2, $3)`;
    values = [id, email, hashedPassword];
    try {
        const result = await client.query(query, values);
        res.status(201).json({status: httpStatusText.SUCCESS, message: Object.values(result.rows[0])[0]})
    }catch (err) {
        console.log(err);
        res.status(500).json({status: httpStatusText.ERROR, message: err.message});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const getPasswordQuery = `SELECT fn_get_employee_hash($1) AS hashed_password`;
	  const passwordResult = await client.query(getPasswordQuery, [email]);
	  const hashedPassword = passwordResult.rows[0]?.hashed_password;
  
	  if (!hashedPassword) {
		return res.status(404).json({ status: httpStatusText.FAIL, message: 'Incorrect Email or password' });
	  }
  
	  //Compare the provided password with the hashed password
	  const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
  
	  if (!isPasswordMatch) {
		return res.status(401).json({ status: httpStatusText.FAIL, message: 'Incorrect Email or password' });
	  }

      const getInfoQuery = `SELECT * FROM fn_get_employee_sign_in_info($1)`;
	  const infoResult = await client.query(getInfoQuery, [email]);
	  const employeeInfo = infoResult.rows[0];

      const employeePosition = employeeInfo.employee_position;
      console.log(employeePosition);
	  // Generate a JWT token
	  const token = await createToken (employeeInfo);
  
	  //Send the token to the frontend
	  res.status(200).json({ status: httpStatusText.SUCCESS, token });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });

    }
};

module.exports = {
    allowedTo,
    login,
    employeeAccount,
    register,
};
