const { client } = require('../config/dbConfig');
const httpStatusText = require('../utils/httpStatusText');

const checkAccountExists = async (req, res, next) => {
  const { employeeId } = req.body;

  console.log('Request Body:', req.body);  // Log the request body to debug

  try {
    const result = await client.query('SELECT EXISTS(SELECT 1 FROM employees_accounts WHERE employee_id = $1)', [employeeId]);
    console.log(result.rows[0].exists);
    if (result.rows[0].exists) {
      return res.status(409).json({ status: httpStatusText.FAIL, message: 'Account already exists' });
    }
    next();
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

module.exports = checkAccountExists;
