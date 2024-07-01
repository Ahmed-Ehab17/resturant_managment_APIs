require("dotenv").config();
const fs = require("fs");
const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcrypt");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const sharp = require("sharp");
const createToken = require("../utils/createToken");
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinaryConfig');

const uploadEmployeeImage = uploadSingleImage("profileImg");

const resizeImage = async (req, res, next) => {
	try {
		const filename = `employee-${Date.now()}.jpeg`;
		if (req.file) {
			await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toBuffer();

			req.file.path = filename;
		}

		next();
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: "Error processing image" });
	}
};

const managerEmployeesList = async (req, res) => {
	try {
		const query = `SELECT * FROM vw_manager_employees`;
		const result = await client.query(query);

		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (error) {
		res.status(500).json({ status: httpStatusText.ERROR, message: `server error, `, error });
	}
};

const activeEmployeesList = async (req, res) => {
	try {
		const query = `SELECT * FROM vw_active_employee`;
		const result = await client.query(query);

		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (error) {
		res.status(500).json({ status: httpStatusText.ERROR, message: "server error, ", error });
	}
};

const inactiveEmployeesList = async (req, res) => {
	try {
		const query = `SELECT * FROM vw_inactive_employee`;
		const result = await client.query(query);

		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (error) {
		res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
	}
};
const positionsList = async (req, res) => {
	try {
		const query = `SELECT * FROM vw_positions`;
		const result = await client.query(query);

		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (error) {
		res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
	}
};
const positionsChangesList = async (req, res) => {
	try {
		const query = `SELECT * FROM vw_positions_changes`;
		const result = await client.query(query);

		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (error) {
		res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
	}
};

const supplyEmployeesList = async (req, res) => {
	try {
		const query = `SELECT * FROM vw_supply_employees`;
		const result = await client.query(query);

		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (error) {
		res.status(500).json({ status: httpStatusText.ERROR, message: "server error", error });
	}
};

const getEmployeesAttendance = async (req, res) => {
	const employeeId = req.params.employeeId;
	const { fromDate, toDate } = req.query;
		try {
		const query = `SELECT * FROM fn_get_employee_attendance($1, $2, $3)`;
		const values = [employeeId, fromDate, toDate];
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: { attendance: result.rows } });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const getEmployeesPhones = async (req, res) => {
	const employeeId = req.params.employeeId;
	try {
		const query = `SELECT * FROM fn_get_employee_phones($1)`;
		const values = [employeeId];
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: { phones: result.rows } });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const getPositionsChanges = async (req, res) => {
	const employeeId = req.params.employeeId;
	try {
		const query = `SELECT * FROM fn_get_employee_positions_changes($1)`;
		const values = [employeeId];
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: { attendance: result.rows } });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};
const getSchedule = async (req, res) => {
	const { employeeId } = req.params; 
	const { fromDate, toDate } = req.query;
  
	try {
	  // Initialize query and values array
	  let query = `SELECT * FROM fn_get_employee_schedule($1, `;
	  let values = [employeeId];
	  let valueCounter = 2;
  
	  // Handle fromDate
	  if (fromDate) {
		query += `$${valueCounter++}, `;
		values.push(fromDate);
	  } else {
		query += `NULL, `;
	  }
  
	  // Handle toDate
	  if (toDate) {
		query += `$${valueCounter++}`;
		values.push(toDate);
	  } else {
		query += `NULL`;
	  }
  
	  query += `)`;
  
	  const result = await client.query(query, values);
	  res.status(200).json({ status: httpStatusText.SUCCESS, data: { attendance: result.rows } });
	} catch (err) {
	  res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
  };

const getEmployeeSignInInfo = async (req, res) => {
	const employeeEmail = req.params.employeeEmail;

	try {
		const query = `SELECT * FROM fn_get_employee_sign_in_info($1)`;
		const values = [employeeEmail];
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: { employee: result.rows } });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const getItemPriceChanges = async (req, res) => {
	const branchId = req.params.branchId;
	try {
		const query = `SELECT * FROM fn_get_item_price_changes(${branchId})`;
		const result = await client.query(query);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: { items: result.rows } });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const getEmployeeTransfer = async (req, res) => {
	const { employeeId, transferMadeBy, oldBranchId, newBranchId } = req.query;

	try {
		let query = `SELECT * FROM fn_get_employees_transfers(`;
		let values = [];
		let valueCounter = 1;

		if (employeeId) {
			query += `$${valueCounter++}`;
			values.push(employeeId);
		} else {
			query += `NULL`;
		}

		query += `, `;

		if (transferMadeBy) {
			query += `$${valueCounter++}`;
			values.push(transferMadeBy);
		} else {
			query += `NULL`;
		}
		query += `, `;

		if (oldBranchId) {
			query += `$${valueCounter++}`;
			values.push(oldBranchId);
		} else {
			query += `NULL`;
		}
		query += `, `;

		if (newBranchId) {
			query += `$${valueCounter++}`;
			values.push(newBranchId);
		} else {
			query += `NULL`;
		}

		query += `)`;

		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const getEmployeeData = async (req, res) => {
	const { branchId, status, employeeRole } = req.query;
  
	try {
	  let query = `SELECT * FROM fn_get_employees_data(`;
	  let values = [];
	  let valueCounter = 1; 
  
	  if (branchId) {
		query += `$${valueCounter++}`;
		values.push(branchId);
	  } else {
		query += `NULL`;
	  }
  
	  query += `, `;
  
	  if (status) {
		query += `$${valueCounter++}`;
		values.push(status);
	  } else {
		query += `NULL`;
	  }
  
	  query += `, `;
  
	  if (employeeRole) {
		query += `$${valueCounter++}`;
		values.push(employeeRole);
	  } else {
		query += `NULL`;
	  }
  
	  query += `)`;
  
	  const result = await client.query(query, values);
	  res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (err) {
	  res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
  };

const getEmployeeOrders = async (req, res) => {
	const { employeeId } = req.params;
	const { deliveryStatus } = req.query;

	try {
		let query = `SELECT * FROM get_employee_orders($1`;
		let values = [employeeId];
		let valueCounter = 2;

		if (deliveryStatus) {
			query += `, $${valueCounter++}`;
			values.push(deliveryStatus);
		} else {
			query += `, NULL`;
		}

		query += `)`;

		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const getTokenData = (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Token is missing' });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
            if (err) {
                return res.status(401).json({ status: 'UNAUTHORIZED', message: 'Invalid Token', error: err.message });
            }
            res.status(200).json({ status: 'SUCCESS', data });
        });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: 'Internal Server Error', error: error.message });
    }
};

const addPosition = async (req, res) => {
	try {
		const { position_name, employeeRole, jop_description } = req.body || {};

		const positionCheckQuery = "SELECT EXISTS(SELECT 1 FROM positions WHERE position_name = $1)";
		const positionCheckValues = [position_name];

		const positionCheckResult = await client.query(positionCheckQuery, positionCheckValues);

		if (positionCheckResult.rows[0].exists) {
			return res.status(409).json({
				message: `can not add ${position_name} position because it's already exists`,
			});
		}
		const query = `call pr_add_position($1, $2, $3)`;
		const values = [position_name, employeeRole, jop_description];
		await client.query(query, values);
		res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (error) {
		return res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error, " + error.message});
	}
};

const addTimeInAttendance = async (req, res) => {
	const { employeeId } = req.body;
	try {
		query = `call check_in_employee($1)`;
		values = [employeeId];
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: result });
		console.log(result);
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const addTimeOutAttendance = async (req, res) => {
	const { employeeId } = req.body;
	try {
		query = `call check_out_employee($1)`;
		values = [employeeId];
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: result });
		console.log(result);
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const employeeTransfer = async (req, res) => {
	const { employeeId, branchId, transferMadeBy, transferDate, transferReason } = req.body;
	try {
		let query = "CALL pr_employee_transfer($1, $2, $3";
		let values = [employeeId, branchId, transferMadeBy];
		let valueCounter = 4;
	
		if (transferDate) {
		  query += `, $${valueCounter++}`;
		  values.push(transferDate);
		} else {
		  query += `, current_timestamp`;
		}
	
		if ( transferReason) {
		  query += `, $${valueCounter++}`;
		  values.push(transferReason);
		} else {
		  query += `, null`;
		}
		query += `)`;
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};
const employeeStatusChange = async (req, res) => {
	const { employeeId, employeeStatus } = req.body;
	try {
		query = `call pr_employee_status_change($1, $2)`;
		values = [employeeId, employeeStatus];
		const result = await client.query(query, values);
		res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const changePosition = async (req, res) => {
	try {
		const { employee_id, position_changer_id, new_position, position_change_type } = req.body;
		const query = `call pr_change_employee_position($1, $2, $3, $4)`;
		const values = [employee_id, position_changer_id, new_position, position_change_type];
		await client.query(query, values);
		res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const changeSalary = async (req, res) => {
	const { employeeId, changerId, newSalary, changeReason } = req.body;
	try {
		const query = `call pr_change_salary($1, $2, $3, $4)`;
		const values = [employeeId, changerId, newSalary, changeReason];
		await client.query(query, values);

		res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const changeEmployeePass = async(req, res) =>{
	const {employeeId,oldPass, newPass} = req.body
	try {
        // Retrieve the current password hash from the database
        const getPasswordQuery = `SELECT employee_password from employees_accounts where employee_id = $1`;
        const passwordResult = await client.query(getPasswordQuery, [employeeId]);
        const currentPasswordHash = passwordResult.rows[0]?.employee_password;

        if (!currentPasswordHash) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'employee not found' });
        }

        // Compare the provided old password with the stored password hash
        const isPasswordMatch = await bcrypt.compare(oldPass, currentPasswordHash);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'Incorrect old password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);

        const query = 'CALL change_employee_password($1, $2)';
        const values = [employeeId, hashedPassword];
        await client.query(query, values);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: { employeeId, hashedPassword } });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
}

const updateEmployeeSalaryPosition = async (req, res) => {
	const { employeeId, changerId, newSalary, newPosition, positionChangeType, changeReason } = req.body;
	try {
		const query = `call pr_update_employee_salary_position($1, $2, $3, $4, $5, $6)`;
		const values = [employeeId, changerId, newSalary, newPosition, positionChangeType, changeReason];
		const result = await client.query(query, values);

		res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
	}
};

const updateEmployeeAddress = async (req, res) => {
	try {
		const { employeeId, newAddress } = req.body || {};

		const query = `SELECT fn_update_employee_address($1, $2)`;
		const values = [employeeId, newAddress];
		const result = await client.query(query, values);
		res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (err) {
		res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
};

const updateEmployeePhone = async (req, res) => {
	try {
		const { employeeId, oldPhone, newPhone } = req.body;

		const query = `call pr_update_employee_phone($1, $2, $3)`;
		const values = [employeeId, oldPhone, newPhone];
		await client.query(query, values);

		res.status(200).json({
			status: httpStatusText.SUCCESS,
			data: values,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
	}
};

const addEmployeeAccount = async (req, res) => {
	const { employeeId, email, password } = req.body;
	const profileImg = req.file; 
  
	try {
	  // Hash the password
	  const salt = await bcrypt.genSalt(10);
	  const hashedPassword = await bcrypt.hash(password, salt);
  
	  let profileImgUrl = null;
  
	  if (profileImg) {
		// Upload image to Cloudinary
		const result = await new Promise((resolve, reject) => {
		  const stream = cloudinary.uploader.upload_stream(
			{ folder: 'employees' },
			(error, result) => {
			  if (error) {
				reject(error);
			  } else {
				resolve(result);
			  }
			}
		  );
		  stream.end(profileImg.buffer);
		});
  
		profileImgUrl = result.secure_url; 
	  }
	  
	  const query = 'CALL pr_insert_employee_account($1, $2, $3, $4)';
	  const values = [employeeId, email, hashedPassword, profileImgUrl];
	  await client.query(query, values);
  
	  res.status(201).json({ status: 'success', data: values });
	} catch (err) {
	  res.status(500).json({ status: 'error', message: err.message });
	}
  };

const employeeLogin = async (req, res) => {
	const { email, password } = req.body;
  
	try {
	  //Get the hashed password from the database
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
  
	  //Get the employee's information from the database
	  const getInfoQuery = `SELECT * FROM fn_get_employee_sign_in_info($1)`;
	  const infoResult = await client.query(getInfoQuery, [email]);
	  const employeeInfo = infoResult.rows[0];
  
	  // Generate a JWT token
	  const token = await createToken (employeeInfo);
  
	  //Send the token to the frontend
	  res.status(200).json({ status: httpStatusText.SUCCESS, token });
	} catch (err) {
	  res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
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
		dateHired = null,
	} = req.body;

	try {
		query = `SELECT fn_add_employee($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
		values = [ssn, firstName, lastName, gender, salary, positionId, status, branchId, sectionId, birthDate, address, dateHired];
		const result = await client.query(query, values);

		res.status(201).json({
			status: httpStatusText.SUCCESS,
			data: values,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
	}
};

const addEmployeePhone = async (req, res) => {
	const { employeeId, employeePhone } = req.body;
	try {
	  const phoneCheckQuery = 'SELECT employee_phone FROM employees_call_list WHERE employee_phone = $1';
	  const phoneCheckResult = await client.query(phoneCheckQuery, [employeePhone]);
  
	  if (phoneCheckResult.rowCount > 0) {
		return res.status(400).json({ status: httpStatusText.FAIL, message: 'Phone number is already exist' });
	  }
  
	  const query = 'select fn_add_employee_phone($1, $2)';
	  await client.query(query, [employeeId, employeePhone]);
  
	  res.status(201).json({status: httpStatusText.SUCCESS, data: { employeeId, employeePhone },
	  });
	} catch (error) {
	  res.status(500).json({ status: httpStatusText.ERROR, message: 'Server Error' });
	}
  };
  
const addEmployeeSchedule = async (req, res) => {
	const { employeeId, shiftStartTime, shiftEndTime } = req.body;

	try {
		const query = `SELECT fn_add_employee_schedule($1, $2, $3)`;
		const values = [employeeId, shiftStartTime, shiftEndTime];
		const result = await client.query(query, values);

		res.status(201).json({
			status: httpStatusText.SUCCESS,
			message: result.rows[0].fn_add_employee_schedule,
			data: values,
		});
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
			data: values,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
	}
};

const addIngredientSupplier = async (req, res) => {
	const { supplierId, ingredientId } = req.body;

	try {
		const query = `call pr_add_ingredient_supplier($1, $2)`;
		const values = [supplierId, ingredientId];
		const result = await client.query(query, values);

		res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
	} catch (error) {
		console.log(error);
		res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
	}
};

const changeEmployeePicture = async (req, res) => {
	const { employeeId } = req.body;
  
	try {
	  // Fetch old profile image path
	  const oldProfileImgResult = await client.query('SELECT picture_path FROM employees_accounts WHERE employee_id = $1', [employeeId]);
	  const oldProfileImg = oldProfileImgResult.rows[0]?.picture_path;
  
	  // Upload new image to Cloudinary
	  const result = await new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream({ folder: 'employees' }, (error, result) => {
		  if (error) reject(error);
		  else resolve(result);
		});
		stream.end(req.file.buffer);
	  });
  
	  const newImagePath = result.secure_url;
	  console.log(newImagePath);
  
	  // Update the database with the new image path
	  const query = 'CALL change_employee_picture($1, $2)';
	  const values = [employeeId, newImagePath];
	  await client.query(query, values);
  
	  // Delete the old image from Cloudinary, if it exists
	  if (oldProfileImg) {
		const publicId = oldProfileImg.split('/').slice(-2).join('/').split('.')[0];
		await cloudinary.uploader.destroy(publicId);
	  }
  
	  res.status(200).json({ status: httpStatusText.SUCCESS, data: { employeeId, newImagePath } });
	} catch (err) {
	  res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
	}
  };
  

module.exports = {
	uploadEmployeeImage,
	resizeImage,
	addPosition,
	addEmployee,
	addEmployeePhone,
	addEmployeeSchedule,
	addEmployeeVacation,
	addIngredientSupplier,
	addTimeInAttendance,
	addTimeOutAttendance,
	addEmployeeAccount,
	employeeTransfer,
	employeeStatusChange,

	employeeLogin,

	changePosition,
	changeSalary,
	changeEmployeePass,
	changeEmployeePicture,

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
	getEmployeeTransfer,
	getEmployeeData,
	getEmployeeOrders,
	getTokenData,

	updateEmployeeAddress,
	updateEmployeePhone,
	updateEmployeeSalaryPosition,
	
};
