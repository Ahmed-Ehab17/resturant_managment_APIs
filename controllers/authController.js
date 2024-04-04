const bcrypt = require("bcrypt");
const { client } = require("../config/dbConfig");


const register = async (req, res) => {          // NOT WORKING
    const {
        ssn,
        firstName,
        lastName,
        gender,
        salary,
        status,
        positionId,
        branchId,
        sectionId,
        birthDate,
        address,
        dateHired,
    } = req.body;

    // Insert new user into database
    try {
        await client.query(
            "SELECT fn_add_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
            [
                ssn,
                firstName,
                lastName,
                gender,
                salary,
                status,
                positionId,
                branchId,
                sectionId,
                birthDate,
                address,
                dateHired || moment().format(),
            ]
        );
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Server Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }

        const query = `SELECT * FROM employees_accounts WHERE employee_email = $1`;
        const values = [email];
        const employee = await client.query(query, values);

        if (employee.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const dbPassword = employee.rows[0].employee_password;

        const isMatch = await bcrypt.compare(password, dbPassword);
        if (isMatch) {
            res.status(200).json({ message: "success" });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    login,
    register,
};
