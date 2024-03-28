const bcrypt = require("bcrypt");
const { client } = require("../config/dbConfig");

const register = async (req, res) => {
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

        const isMatch = await bcrypt.compare(password, dbPassword)
            if (isMatch) {
                res.status(200).json({ message: "success" });
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        ;
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    login,
    register,
};
