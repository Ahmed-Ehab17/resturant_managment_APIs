const bcrypt = require("bcrypt");
const httpStatusText = require("../utils/httpStatusText"); 
const { client } = require("../config/dbConfig");

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
        console.log(err.message);
        return res.status(500).json({status: httpStatusText.ERROR, message: "Internal server Error" });
    }
};
const employeeAccount = async (req, res) => {
    const { id, email, password } = req.body;

    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password, saltRounds);

    query = `SELECT fn_insert_employee_account($1, $2, $3)`;
    values = [id, email, hashedPassword];
    try {
        const result = await client.query(query, values);
        res.status(200).json({status: httpStatusText.SUCCESS, message: Object.values(result.rows[0])[0]})
    }catch (err) {
        console.log(err);
        res.status(500).json({status: httpStatusText.ERROR, message: "Internal server Error"});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = `SELECT * FROM employees_accounts WHERE employee_email = $1`;
        const values = [email];
        const employee = await client.query(query, values);

        if (employee.rows.length === 0) {
            return res.status(401).json({status: httpStatusText.FAIL, message: "Invalid email or password"});
        }

        const dbPassword = employee.rows[0].employee_password;

        const isMatch = await bcrypt.compare(password, dbPassword);
        if (isMatch) {
            res.status(200).json({status: httpStatusText.SUCCESS, message: "Log in successfully"});
        } else {
            res.status(401).json({status: httpStatusText.FAIL, message: "Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({ status: "500", message: "Internal Server Error" });
    }
};

module.exports = {
    login,
    employeeAccount,
    register,
};
