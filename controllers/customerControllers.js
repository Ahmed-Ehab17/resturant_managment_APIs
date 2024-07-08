const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require('bcrypt')
require("dotenv").config();
const createToken = require("../utils/createToken");
const cloudinary = require('../config/cloudinaryConfig');
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const sharp = require("sharp");


const uploadCustomerImage = uploadSingleImage("profileImg");

const resizeImage = async (req, res, next) => {
	try {
		const filename = `customer-${Date.now()}.jpeg`;
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


const getCustomerAddresses = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const query = `SELECT * FROM fn_get_customer_addresses($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { attendance: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};
const getCustomerInformation = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const query = `SELECT * FROM fn_get_customer_info($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { information: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};
const getCustomerPhones = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const query = `SELECT * FROM fn_get_customer_phones($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { phones: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerOrders = async (req, res) => {
  const customerId = req.params.customerId;
  const limit = req.params.limit;
  const status = req.params.status;

  try {
    const query = `SELECT * FROM fn_get_customer_orders($1, $2, $3)`;
    const values = [customerId, limit, status];
    const result = await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { orders: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerBookings = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const query = `SELECT * FROM fn_get_customer_bookings($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { bookings: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerSignInInfo = async (req, res) => {
  const customerPhone = req.params.customerPhone;

  try {
    const query = `SELECT * FROM fn_get_customer_sign_in_info($1)`;
    const values = [customerPhone];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { customerInfo: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerMenuRatings = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const query = `SELECT * FROM fn_get_customer_menu_ratings($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { customerMenuRatings: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const updateCustomerAddress = async (req, res) => {
  const { customerId, addressId, customerAddress, customerCity, locationCoordinates } = req.body;

    try {
      const query = `call pr_update_customer_address($1, $2, $3, $4, $5)`;
      const values = [customerId, addressId, customerAddress, customerCity, locationCoordinates];
      await client.query(query, values);
  
      res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: res.locals.notice,
        data: values
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" }); 
    }
  };

const changeCustomerPass = async (req, res) => {
    const { customerId, oldPass, newPass } = req.body;

    try {
        // Retrieve the current password hash from the database
        const getPasswordQuery = `SELECT customer_password FROM customers_accounts WHERE customer_id = $1`;
        const passwordResult = await client.query(getPasswordQuery, [customerId]);
        const currentPasswordHash = passwordResult.rows[0]?.customer_password;

        if (!currentPasswordHash) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'Customer not found' });
        }

        // Compare the provided old password with the stored password hash
        const isPasswordMatch = await bcrypt.compare(oldPass, currentPasswordHash);
        if (!isPasswordMatch) {
            return res.status(400).json({ status: httpStatusText.FAIL, message: 'Incorrect old password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);

        const query = 'CALL change_customer_password($1, $2)';
        const values = [customerId, hashedPassword];
        await client.query(query, values);

        res.status(200).json({ status: httpStatusText.SUCCESS, data: { customerId, hashedPassword } });
    } catch (error) {
        res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
};
 
const addCustomer = async (req, res) => {
  const { firstName, lastName, gender, phone, address, city = null, locationCoordinates = null, birthDate = null } = req.body;

  try {
    const query = `call pr_add_customer($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [firstName, lastName, gender, phone, address, city, locationCoordinates, birthDate];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (error) {
    res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
  }
};

const addCustomerAddress = async (req, res) => {
  const { customerId, address, city = null, locationCoordinates = null } = req.body;

  try {
    const query = `call pr_add_customer_address($1, $2, $3, $4)`;
    const values = [customerId, address, city, locationCoordinates];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
  }
};

const addCustomerPhone = async (req, res) => {
  const { customerId, phone } = req.body;

  try {
    const query = `call pr_add_customer_phone($1, $2)`;
    const values = [customerId, phone];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (error) {
    res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
  }
};

const addFavorite = async (req, res) => {
  const { customerId, itemId } = req.body;
  try {
    const query = `CALL pr_add_favorite($1, $2)`;
    const values = [customerId, itemId];
    await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        customerId: customerId,
        itemId: itemId,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const verifyPhone = async (req, res) => {
  const { phone } = req.body;
  
  try {
    // Verify the phone number
    const verificationQuery = `SELECT fn_verify_phone($1) AS customer_id`;
    const verificationValues = [phone];
    const verificationResult = await client.query(verificationQuery, verificationValues);

    const customerId = verificationResult.rows[0]?.customer_id;

    if (customerId) {
      // fetch customer information
      const infoQuery = `SELECT * FROM fn_get_customer_info($1) AS customer_info`;
      const infoValues = [customerId];
      const infoResult = await client.query(infoQuery, infoValues);

      res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: { information: infoResult.rows },
      });
    } else {
      res.status(404).json({
        status: httpStatusText.FAIL,
        message: 'Phone number not found or invalid',
      });
    }
  } catch (err) {
      res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
  };
 
const changeCustomerImage = async (req, res) => {
  const { customerId } = req.body;

  try {
    // Fetch old profile image path
    const oldProfileImgResult = await client.query('SELECT picture_path FROM customers_accounts WHERE customer_id = $1', [customerId]);
    const oldProfileImg = oldProfileImgResult.rows[0]?.picture_path;

    // Upload new image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'customers' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      stream.end(req.file.buffer);
    });

    const newImagePath = result.secure_url;
    console.log(newImagePath);

    // Update the database with the new image path
    const query = 'CALL change_customer_picture($1, $2)';
    const values = [customerId, newImagePath];
    await client.query(query, values);

    // Delete the old image from Cloudinary, if it exists
    if (oldProfileImg) {
      const publicId = oldProfileImg.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: { customerId, newImagePath } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};


module.exports = {
  getCustomerAddresses,
  getCustomerInformation,
  getCustomerPhones,
  getCustomerOrders,
  getCustomerBookings,
  getCustomerSignInInfo,
  getCustomerMenuRatings,


  updateCustomerAddress,
  changeCustomerPass,
  changeCustomerImage,

  addCustomer,
  addCustomerAddress,
  addCustomerPhone,
  addFavorite,




  verifyPhone,


  uploadCustomerImage,
  resizeImage,
};
