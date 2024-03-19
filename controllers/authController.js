const bcrypt = require("bcrypt");
const { client } = require("../config/dbConfig");

const login = async (req, res) => {
    const { email, password } = req.body;
    hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const employee = await client.query(`SELECT * FROM employees_accounts WHERE employee_email = $1`,[email])
    const dbPassword = employee.rows[0].employee_password
    bcrypt.compare(password, dbPassword, function(err, result) {
        if(err){
            throw err
        }
        res.status(200).send('success')
    });



    // client.query(
    //     `SELECT fn_check_login_employee ($1, $2)`,
    //     [email, password],
    //     (err, result) => {
    //         if (err) {
    //             throw err;
    //         }
    //         console.log(result.rows.length);
    //         if (result.rows.length > 0) res.redirect('../dashboard');
    //         else res.send('incorrect email or password');
    //     }
    // );

    // }
};

module.exports = {
    login,
};
