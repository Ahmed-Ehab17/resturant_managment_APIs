const createToken = require("../utils/createToken");
const bcrypt = require("bcrypt");
const httpStatusText = require("../utils/httpStatusText"); 
const { client } = require("../config/dbConfig");
const cloudinary = require('../config/cloudinaryConfig');

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
  const { employeeId, email, password } = req.body;
  const profileImg = req.file; // Assuming multer stores file information in req.file

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
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(profileImg.buffer);
      });

      profileImgUrl = result.secure_url; // Use result.secure_url as the image URL from Cloudinary
    }

    // Insert employee account details into the database
    const query = 'CALL pr_insert_employee_account($1, $2, $3, $4)';
    const values = [employeeId, email, hashedPassword, profileImgUrl];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: { employeeId, email, profileImgUrl } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
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


const customerAccount = async (req, res) => {
  const {
    customerId,
    firstName,
    lastName,
    gender,
    phone,
    password,
    address,
    city = null,
    locationCoordinates = null,
    birthDate = null
  } = req.body;

  const profileImg = req.file; // Assuming multer stores file information in req.file

  try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'customers' },
        (error, result) => {
          if (error) {
            // If an error occurs, reject the promise with the error
            reject(error);
          } else {
            // If no error, resolve the promise with the result
            resolve(result);
          }
        }
      );
      // End the stream and send the buffer
      stream.end(profileImg.buffer);
    });

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Construct the query to call PostgreSQL stored procedure
    const query = `CALL pr_add_account_to_customer($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const values = [
      customerId,
      firstName,
      lastName,
      gender,
      phone,
      hashedPassword,
      address,
      city,
      locationCoordinates,
      birthDate,
      result.secure_url // Use result.secure_url as the image URL from Cloudinary
    ];
    await client.query(query, values);
    
    res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const customerLogin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Get the hashed password from the database
    const getPasswordQuery = `SELECT fn_get_customer_hash($1) AS hashed_password`;
    const passwordResult = await client.query(getPasswordQuery, [phone]);
    const hashedPassword = passwordResult.rows[0]?.hashed_password;

    if (!hashedPassword) {
      return res.status(404).json({ status: httpStatusText.FAIL, message: 'Phone number not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({ status: httpStatusText.FAIL, message: 'Incorrect password' });
    }

    // Get the customer's information from the database
    const getInfoQuery = `SELECT * FROM fn_get_customer_sign_in_info($1)`;
    const infoResult = await client.query(getInfoQuery, [phone]);
    const customerInfo = infoResult.rows[0];

    // Generate a JWT token
	  const token = await createToken (customerInfo);

    // Send the token to the frontend
    res.status(200).json({ status: httpStatusText.SUCCESS, token });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const customerSignup = async (req, res) => {
    const {
        firstName,
        lastName,
        gender,
        phone,
        password,
        address,
        city,
        locationCoordinates,
        birthDate
        
        
    } = req.body;
    const profileImg = req.file;

    let profileImgUrl = null;

    try {
      // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
      if (profileImg) {
        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: 'customers' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
          stream.end(req.file.buffer);
        });
        profileImgUrl = result.secure_url
      }

        // Construct the query to call PostgreSQL stored procedure
        const query = `CALL pr_customer_signup($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
        const values = [
          firstName,
          lastName,
          gender,
          phone,
          hashedPassword,
          address,
          city,
          locationCoordinates,
          birthDate,
          profileImgUrl // Use result.secure_url as the image URL from Cloudinary
        ];
        await client.query(query, values);
        res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
    } catch (err) {
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};

module.exports = {
    allowedTo,
    login,
    employeeAccount,
    register,
    customerAccount,
    customerLogin,
    customerSignup
};
